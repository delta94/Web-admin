/* eslint-disable array-callback-return */
import * as _ from 'lodash';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
const moment = require('moment');

interface HttpResponse {
  data: any;
  code: number;
  success: boolean;
}
export class AppHelper {
  /**
   * Format queryParams Url
   * @param  {String} url queryString
   * @return {Object} format query parameter
   */
  static getParamsFromUrl(url: string): any {
    url = decodeURI(url);
    if (typeof url === 'string') {
      let params = url.split('?');
      let eachParamsArr = params[1].split('&');
      let obj = {};
      if (eachParamsArr && eachParamsArr.length) {
        eachParamsArr.map((param: any): any => {
          let keyValuePair = param.split('=');
          let key = keyValuePair[0];
          let value = keyValuePair[1];
          obj[key] = value;
        });
      }
      return obj;
    }
  }

  /**
   * Sort Collection
   * @param {Array}: any[],
   * @return {Array}: sorted array
   */

  static sortColection(array: any[], keys: string[]): any[] {
    return _.sortBy(array, [keys]);
  }

  /**
   * Format Current To VND
   * @param  {String} cur input string currency
   * @return {String}  Price with format VND  "123.457 ₫"
   */
  static formatCurrency(cur): string {
    if (isNaN(cur)) return AppHelper.getVND(0);
    return AppHelper.getVND(cur);
  }

  static getVND(vnd): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(vnd);
  }

  static formDateTime(dateTime) {
    if (!dateTime) return '-';
    return moment(dateTime).format('DD/MM/YYYY');
  }

  static createDownloadFile({ file_path, file_name }): void {
    const url = APP_CONSTANT.API.ENDPOINT + '/' + file_path;
    let a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', file_name);
    a.click();
  }

  static truncate(text: string, length: number): string {
    if (text.length > length) return text.substring(0, length) + '...';
    else return text;
  }

  /**
   * Text To TitleCase
   * @param   { String } str string text input
   * @returns { String } string text to TitleCase
   */

  static toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  static capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static generateUUID(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  static getFirstLastName(fullName: string): any {
    const name: string[] = fullName.split(/(?<=^\S+)\s/);
    return {
      firstName: name[1],
      lastName: name[0],
    };
  }

  static getCurrentTimeAndDate(times): string {
    const today = new Date(times);
    const day = today.getDate() >= 10 ? today.getDate() : '0' + today.getDate();
    const month =
      today.getMonth() + 1 >= 10
        ? today.getMonth() + 1
        : '0' + (today.getMonth() + 1);
    const year = today.getFullYear();
    const date = ' Ngày ' + day + ' Tháng ' + month + ' Năm ' + year;
    const time = today.getHours() + ':' + today.getMinutes();
    const dateTime = time + ', ' + date;
    return dateTime;
  }

  static getYearOldsByBirth(birthDay: string | Date): number {
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(birthDay).getFullYear();
    return currentYear - birthYear;
  }

  static addMinutesToDate(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

  static getYearBirthDay(birthDay: string): string {
    const years: number = new Date(birthDay).getFullYear();
    if (isNaN(years)) {
      return '';
    }
    return years.toString();
  }

  static getValueFromProxy(proxyTarget): any {
    return JSON.parse(JSON.stringify(proxyTarget));
  }

  static cloneDeepCollections(collection: any[]): any[] {
    if (!collection.length) return [];
    return JSON.parse(JSON.stringify(collection));
  }

  static compareAndModifyTwoCollections(
    modifyList: any[],
    optionsList: any[],
    key: string,
    modifyKey: string,
  ): any[] {
    if (!modifyList.length || !optionsList.length) {
      return modifyList;
    }
    let updateList = AppHelper.cloneDeepCollections(modifyList);
    updateList = updateList.map(item => {
      const optionItem = optionsList.find(updateItem => {
        return updateItem[key] === item[key];
      });
      return {
        ...item,
        [modifyKey]: optionItem ? true : false,
      };
    });
    return updateList;
  }

  static descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  static getComparator(order: Order, orderBy: string): (a, b) => any {
    return order === 'desc'
      ? (a, b) => AppHelper.descendingComparator(a, b, orderBy)
      : (a, b) => -AppHelper.descendingComparator(a, b, orderBy);
  }

  static stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  static checkEmptyString(str: string): boolean {
    if (
      typeof str == 'undefined' ||
      !str ||
      str.length === 0 ||
      str === '' ||
      !/[^\s]/.test(str) ||
      /^\s*$/.test(str) ||
      str.replace(/\s/g, '') === ''
    )
      return true;
    else return false;
  }

  static vietnamesePattern(): RegExp {
    return new RegExp(
      /^[^-\s][a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéếêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ_\s-]+$/,
    );
  }

  static numberTextOnlyPattern(): RegExp {
    return new RegExp(/^[^-\s][a-zA-Z0-9_\s-]+$/);
  }

  static numberTextWithDotPattern(): RegExp {
    return new RegExp(/^[^-\s][a-zA-Z0-9.]+$/);
  }

  static removeSpaceStartEnd(): RegExp {
    return new RegExp(/^[^\s]+(\s+[^\s]+)*$/);
  }

  static checkResponseData(responseData: HttpResponse): boolean {
    if (
      !_.isEmpty(responseData) &&
      _.get(responseData, 'code') === 200 &&
      _.get(responseData, 'success')
    ) {
      return true;
    }
    return false;
  }

  static setPagiClient(
    list: any[],
    pagi: any,
    setState: (setList?) => void,
  ): any {
    if (!list.length || _.isEmpty(pagi)) {
      return null;
    }
    const { page, rowsPerPage } = pagi;
    const takeFrom = page * rowsPerPage;
    const takeTo = !page ? rowsPerPage : page * rowsPerPage + rowsPerPage;
    const listSlice = list.slice(takeFrom, takeTo);
    return {
      listSlice,
      setPagi: setState(listSlice),
    };
  }
  static setSearchPagiClient(
    list: any[],
    pagi: any,
    keySearch: string = '',
    setState: (setList?) => void,
  ) {
    if (!list.length || _.isEmpty(pagi)) return null;
    const searchTable = list.filter((item: any) => {
      return (
        (item.name &&
          item.name.toLowerCase().includes(keySearch.toLowerCase())) ||
        (item.code && item.code.toLowerCase().includes(keySearch.toLowerCase()))
      );
    });
    AppHelper.setPagiClient(searchTable, pagi, setState);
  }
  static getUnique(arr: any[], comp: string): any[] {
    if (!arr.length || comp === '') return [];
    const unique = arr
      .map((e: any) => e[comp])
      .map((e: any, i: number, final: any) => final.indexOf(e) === i && i)
      .filter((e: any) => arr[e])
      .map((e: any) => arr[e]);
    return unique;
  }

  static getFileUploadName(file: FileList): string {
    return file[0].name;
  }

  static formalUrlUploads(fileName: string): string {
    return APP_CONSTANT.API.ENDPOINT + '/uploads/' + fileName;
  }
}

export type Order = 'asc' | 'desc';
