/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import * as _ from 'lodash';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import { AppHelper } from 'utils/app.helper';
import { useSelector } from 'react-redux';
import { SettingModel } from 'store/common/shared/slice';
import DateFnsUtils from '@date-io/date-fns';
import * as fromCommon from 'store/common/shared/selectors';

const Barcode = require('react-barcode');

type Props = {
  patient: any;
  queue: any;
  type: any;
};

export const PrintPriorityPatient = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const dateUtil = new DateFnsUtils();
    const setting: SettingModel = useSelector(fromCommon.selectDefaultSetting);
    if (
      _.isEmpty(_.get(props, 'patient')) ||
      _.isEmpty(_.get(props, 'queue')) ||
      _.isEmpty(_.get(props, 'type'))
    ) {
      return <p>Empty Data</p>;
    }
    const { patient, queue, type } = props;
    const birth = patient.birthDay ? patient.birthDay : patient.birthday;
    const lastName = patient.lastName ? patient.lastName : patient.last_name;
    const firstName = patient.firstName
      ? patient.firstName
      : patient.first_name;
    let fullName = '';
    if (lastName === undefined) {
      fullName = firstName;
    } else if (firstName === undefined) {
      fullName = lastName;
    } else if (lastName === undefined && firstName === undefined) {
      fullName = patient.fullName;
    } else {
      fullName = lastName + ' ' + firstName;
    }
    return (
      <div ref={ref} {...props}>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        ></link>
        <style type="text/css" />
        <div
          className="printer__bill"
          style={{ margin: '0 auto', padding: '0 10px' }}
        >
          <div className="container printer__container">
            <div className="printer__top">
              <div className="printer__top__header" style={{ display: 'flex' }}>
                <div className="printer__header-left">
                  <img
                    src={setting.logoUrl}
                    alt="Logo-K"
                    width={90}
                    height={60}
                  />
                </div>
                <div className="printer__header-right">
                  <div
                    className="printer__header-right-title"
                    style={{ marginLeft: '2px' }}
                  >
                    <p
                      style={{
                        marginTop: '10px',
                        padding: '0px',
                        letterSpacing: '1px',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {setting.enName}
                    </p>
                    <p
                      style={{
                        margin: '0px',
                        padding: '0px',
                        textTransform: 'uppercase',
                        marginTop: '-8px',
                        fontSize: '24px',
                      }}
                    >
                      {setting.viName}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="printer__header-body"
                style={{ width: '380px', height: 'auto', display: 'block' }}
              >
                <div
                  className="printer__header__body-title"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '8px',
                    marginLeft: '20px',
                  }}
                >
                  <p
                    className="printer__header__body-title-Size"
                    style={{
                      display: 'block',
                      fontSize: '22px',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                    }}
                  >
                    Số thứ tự nhận bệnh ưu tiên
                  </p>
                </div>
                <div
                  className="printer__header__body-time"
                  style={{ display: 'block' }}
                >
                  <p
                    style={{
                      textAlign: 'center',
                      marginTop: '-5px',
                      fontSize: '14px',
                    }}
                  >
                    {AppHelper.getCurrentTimeAndDate(new Date())}
                  </p>
                </div>
                <div
                  className="printer__header__body-line"
                  style={{ display: 'block' }}
                >
                  <p
                    style={{
                      textAlign: 'center',
                      marginTop: '-14px',
                      fontSize: '15px',
                    }}
                  >
                    --- --- --- --- --- --- --- --- --- --- ---
                  </p>
                </div>
                <div
                  className="printer__header__body-brcode"
                  style={{ display: 'block', marginBottom: '10px' }}
                >
                  <span style={{ textAlign: 'center', display: 'block' }}>
                    {!_.isEmpty(patient) && (
                      <Barcode
                        value={_.get(patient, 'code')}
                        width={2}
                        displayValue={false}
                        height={50}
                        fontSize={16}
                        format={'CODE128'}
                        font={'Roboto'}
                        textAlign={'center'}
                        // textMargin={2}
                        textPosition={'bottom'}
                        background={'#ffffff'}
                        lineColor={'#000000'}
                        margin={2}
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="printer__mid">
              <div className="printer__mid__content">
                <div
                  className="printer__mid__content-patient"
                  style={{
                    display: 'flex',
                    width: '410px',
                    height: 'auto',
                    justifyContent: 'flex-start',
                  }}
                >
                  <div className="patient-left">
                    <p
                      style={{
                        width: '100px',
                        height: 'auto',
                        fontSize: '24px',
                      }}
                    >
                      Tên NB:
                    </p>
                  </div>
                  <div className="patient-right">
                    <p
                      style={{
                        padding: '0px',
                        margin: '0px',
                        fontSize: '26px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {!_.isEmpty(patient) ? fullName.toUpperCase() : ''}
                    </p>
                  </div>
                </div>
                <div
                  className="printer__mid__content-gender-birthday"
                  style={{
                    display: 'flex',
                    width: '410px',
                    height: 'auto',
                    justifyContent: 'flex-start',
                    marginTop: '-12px',
                  }}
                >
                  <div
                    className="gender-birthday-left"
                    style={{
                      display: 'flex',
                      width: '180px',
                      height: 'auto',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <div className="gender-left">
                      <p
                        style={{
                          width: '100px',
                          height: 'auto',
                          fontSize: '24px',
                        }}
                      >
                        Giới tính:
                      </p>
                    </div>
                    <div className="gender-right">
                      <p
                        style={{
                          fontSize: '26px',

                        }}
                      >
                        {!_.get(patient, 'gender') ? 'Nữ' : 'Nam'}
                      </p>
                    </div>
                  </div>
                  <div
                    className="gender-birthday-right"
                    style={{
                      display: 'flex',
                      width: '220px',
                      height: 'auto',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <div className="birthday-left">
                      <p
                        style={{
                          width: '120px',
                          height: 'auto',
                          fontSize: '24px',
                        }}
                      >
                        Năm sinh:
                      </p>
                    </div>
                    <div className="birthday-right">
                      <p
                        style={{
                          fontSize: '26px',
                        }}
                      >
                        {AppHelper.getYearBirthDay(birth)}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="printer__mid__content-employee"
                  style={{
                    display: 'flex',
                    width: '410px',
                    height: 'auto',
                    justifyContent: 'flex-start',
                    marginTop: '-12px',
                  }}
                >
                  <div className="employee-left">
                    <p
                      style={{
                        width: '100px',
                        height: 'auto',
                        fontSize: '24px',
                      }}
                    >
                      Tên NV:
                    </p>
                  </div>
                  <div className="employee-right">
                    <p
                      style={{
                        fontSize: '26px',
                      }}
                    >
                      NBUUTIEN
                    </p>
                  </div>
                </div>
                <div
                  className="printer__mid__content-number-order"
                  style={{
                    width: '410px',
                    height: 'auto',
                    marginTop: '-12px',
                  }}
                >
                  <div className="number-order-top">
                    <p
                    style={{
                      fontSize: '24px',
                    }}
                    >
                      Số thứ tự
                    </p>
                  </div>
                  <div
                    className="number-order-bottom"
                    style={{ display: 'block', marginTop: '-35px' }}
                  >
                    <p
                      style={{
                        fontSize: '50px',
                        textAlign: 'center',
                      }}
                    >
                      {_.get(queue, 'number')}
                    </p>
                  </div>
                </div>
                <div
                  className="printer__text-UT"
                  style={{
                    width: '410px',
                    height: 'auto',
                    marginTop: '-6px',
                    display: 'block',
                  }}
                >
                  <div
                    className="text-UT-content"
                    style={{
                      width: '150px',
                      height: '60px',
                      border: '3px solid black',
                      display: 'block',
                      borderRadius: '5px',
                      margin: '0 auto',
                    }}
                  >
                    <p
                      style={{
                        display: 'block',
                        fontSize: '20px',
                        textAlign: 'center',
                        borderRadius: '4px',
                        lineHeight: '55px',
                        textTransform: 'uppercase',
                        // padding: '10px 16px',
                      }}
                    >
                      {type.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="printer__bot-title"
              style={{ display: 'block', width: '410px', marginTop: '15px' }}
            >
              <p
                style={{
                  fontSize: '16px',
                  textAlign: 'center',
                }}
              >
                Bệnh nhân vui lòng giữ phiếu qua khu nhận bệnh
              </p>
              <p style={{ marginTop: '-12px', padding: '0px' }}>
                -----------------------------------------------------------------------------------------
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
