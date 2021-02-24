/* eslint-disable prettier/prettier */
import { LocationHttp } from 'store/location/services/location.http';
import { AppHelper } from 'utils/app.helper';
import * as _ from 'lodash';

type setPatientInfo = (patientInfo: any) => void;

export class PatientService {
  static setAddressPatientData(
    patientData: any = {},
    listProvince: any[],
    listDist: any[],
    listWard: any[],
  ): any {
    if (
      !patientData ||
      !listProvince.length ||
      !listDist.length ||
      !listWard.length
    ) {
      console.error('Empty filter Data, please check args');
      return patientData;
    }
    let newPatientInfo = _.cloneDeep(patientData);

    /* Province */
    const selectProvince = PatientService.filterProvince(
      listProvince,
      patientData.province_id,
    );

    if (selectProvince) {
      newPatientInfo.province_name = selectProvince.province_name;
    }

    /* Dist */
    const selectDist = PatientService.filterDist(
      listDist,
      patientData.district_id,
    );

    if (selectDist) {
      newPatientInfo.district_name = selectDist.district_name;
    }

    /* Ward */
    const selectWard: any = PatientService.filterWard(
      listWard,
      patientData.ward_id,
    );

    if (selectWard) {
      newPatientInfo.ward_name = selectWard.ward_name;
    }
    return newPatientInfo;
  }

  static setAddressPatientWithLocationName(
    patientData: any = {},
    listProvince: any[],
    listDist: any[],
    listWard: any[],
  ): any {
    if (
      !patientData ||
      !listProvince.length ||
      !listDist.length ||
      !listWard.length
    ) {
      console.error('Empty filter Data, please check args');
      return patientData;
    }
    let newPatientInfo = _.cloneDeep(patientData);

    /* Province */
    const selectProvince = PatientService.filterProvinceName(
      listProvince,
      patientData.province_name,
    );

    if (selectProvince) {
      newPatientInfo.province_id = selectProvince.province_code;
    }

    /* Dist */
    const selectDist = PatientService.filterDistName(
      listDist,
      patientData.district_name,
    );

    if (selectDist) {
      newPatientInfo.district_id = selectDist.district_code;
    }

    /* Ward */
    const selectWard: any = PatientService.filterWardName(
      listWard,
      patientData.ward_name,
    );

    if (selectWard) {
      newPatientInfo.ward_id = selectWard.ward_code;
    }
    return newPatientInfo;
  }


  static filterProvince(listProvince: any[] = [], selectProvince): any | null {
    if (!listProvince.length || selectProvince === '') {
      return null;
    }
    return listProvince.find(
      province => +province.province_code === +selectProvince,
    );
  }

  static filterDist(listDist: any[] = [], selectDist): any | null {
    if (!listDist.length || selectDist === '') {
      return null;
    }
    return listDist.find(dist => +dist.district_code === +selectDist);
  }

  static filterWard(listWard: any[] = [], selectWard): any | null {
    if (!listWard.length || selectWard === '') {
      return null;
    }
    return listWard.find(ward => +ward.ward_code === +selectWard);
  }

  static filterProvinceName(listProvince: any[] = [], provinceName): any | null {
    if (!listProvince.length || provinceName === '') {
      return null;
    }
    return listProvince.find(
      province => province.province_name === provinceName,
    );
  }

  static filterDistName(listDist: any[] = [], distsName): any | null {
    if (!listDist.length || distsName === '') {
      return null;
    }
    return listDist.find(dist => dist.district_name === distsName);
  }

  static filterWardName(listWard: any[] = [], wardName): any | null {
    if (!listWard.length || wardName === '') {
      return null;
    }
    return listWard.find(ward => ward.ward_name === wardName);
  }

  static checkAndCallPatientAddress = (patientInfo, setPatientInfo: setPatientInfo): void => {
    const isValidAdress = PatientService.checkValidAddress(
      patientInfo,
    );
    if (isValidAdress) {
      const address = PatientService.convertAddress(patientInfo);
      setPatientInfo({
        ...patientInfo,
        address,
      });
    } else {
      PatientService.callPatientAddress(
        patientInfo,
        setPatientInfo,
      );
    }
  }

  static checkValidAddress = (patientInfo: any): boolean => {
    if (
      patientInfo.district_name === '' ||
      patientInfo.province_name === '' ||
      patientInfo.ward_name === ''
    ) {
      return false;
    }
    return true;
  };

  static convertAddress = (patientInfo: any): string => {
    let address: string = '';
    const {district_name, province_name, ward_name, street} = patientInfo;
    if (!AppHelper.checkEmptyString(street)) {
      address += street + ' ';
    }
    if (!AppHelper.checkEmptyString(ward_name)) {
      address += ward_name + ', ';
    }
    if (!AppHelper.checkEmptyString(district_name)) {
      address += district_name + ', ';
    }
    if (!AppHelper.checkEmptyString(province_name)) {
      address += province_name;
    }
    return address;
  }

  static validAddressWithName = (patientInfo: any): boolean => {
    if (
      patientInfo.district_name &&
      patientInfo.province_name &&
      patientInfo.ward_name
    ) {
      return true;
    }
    return false;
  };

  static validAddressWithId = (patientInfo: any): boolean => {
    if (
      patientInfo.district_id &&
      patientInfo.province_id &&
      patientInfo.ward_id) {
        return true;
      }
    return false;
  }

  static callPatientAddress(
    patientInitInfo: any,
    setPatientInfo: setPatientInfo,
  ): void {
    const { province_id, district_id, ward_id } = patientInitInfo;
    new LocationHttp()
      .getAddressByCode({
        provinceId: province_id,
        distId: district_id,
        wardid: ward_id,
      })
      .then(response => response.data)
      .then(location => {
        if (AppHelper.checkResponseData(location)) {
          let address: string = _.get(patientInitInfo, 'street');
          const locationResult = _.get(location, 'result');
          const block = _.get(locationResult, 'block');
          const district = _.get(locationResult, 'district');
          const province = _.get(locationResult, 'province');
          if (!AppHelper.checkEmptyString(block)) {
            address += locationResult.block + ', ';
          }
          if (!AppHelper.checkEmptyString(district)) {
            address += locationResult.district + ', ';
          }
          if (!AppHelper.checkEmptyString(province)) {
            address += locationResult.province;
          }
          const patientInfo: any = {
            ...patientInitInfo,
            address,
          };
          setPatientInfo(patientInfo);
        }
      })
      .catch(err => {
        setPatientInfo({
          ...patientInitInfo,
          address: '',
        });
      });
  }
}
