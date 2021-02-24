/* eslint-disable no-useless-concat */
export class CurrencyService {
  defaultNumbers: string = ' hai ba bốn năm sáu bảy tám chín';
  units: string[] = ('1 một' + this.defaultNumbers).split(' ');
  ch: string = 'lẻ mười' + this.defaultNumbers;
  tr: string = 'không một' + this.defaultNumbers;
  tram: string[] = this.tr.split(' ');
  u: string[] = '2 nghìn triệu tỉ'.split(' ');
  chuc: string[] = this.ch.split(' ');
  sl1: string = '';
  sl2: string = '';
  sl3: string = '';
  sl12: string = '';

  /**
   * format nunber to vnd typeof 'vnd'
   * @param  {[type]} number [number]
   * @return {[type]}   [string]
   */
  static formatCurrency(cur): string {
    if (isNaN(cur)) return CurrencyService.getVND(0);
    return CurrencyService.getVND(cur);
  }
  /**
   * format nuMber to vnd typeof 'vnd'
   * @param  {[type]} number [number]
   * @return {[type]}   [string]
   */
  static getVND(number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(number);
  }

  /**
   * additional words
   * @param  {[type]} a [description]
   * @return {[type]}   [description]
   */
  public tenth(a): string {
    this.sl1 = this.units[a[1]];
    this.sl2 = this.chuc[a[0]];
    let append: string = '';
    if (a[0] > 0 && a[1] === 5) this.sl1 = 'lăm';
    if (a[0] > 1) {
      append = ' mươi';
      if (a[1] === 1) this.sl1 = ' mốt';
    }
    let str = this.sl2 + '' + append + ' ' + this.sl1;
    return str;
  }
  /**
   * convert number in blocks of 3
   * @param  {[type]} d [description]
   * @return {[type]}   [description]
   */
  public blockOfThree(d): any {
    let _a: string = d + '';
    if (d === '000') return '';
    switch (_a.length) {
      case 0:
        return '';

      case 1:
        return this.units[_a];

      case 2:
        return this.tenth(_a);

      case 3:
        this.sl12 = '';
        if (_a.slice(1, 3) !== '00') this.sl12 = this.tenth(_a.slice(1, 3));
        this.sl3 = this.tram[_a[0]] + ' trăm';
        return this.sl3 + ' ' + this.sl12;
    }
  }
  /**
   * Get number from unit, to string
   * @param  {mixed} nStr input money
   * @return {String}  money string, removed digits
   */
  public formatNumber(nStr) {
    nStr += '';
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  public toVietnamese(_str): string {
    const str = parseInt(_str) + '';
    let i = 0;
    const arr: any[] = [];
    let index = str.length;
    const result: any[] = [];
    let string = '';
    if (index === 0 || str === 'NaN') return '';

    while (index >= 0) {
      arr.push(str.substring(index, Math.max(index - 3, 0)));
      index -= 3;
    }

    for (i = arr.length - 1; i >= 0; i--) {
      if (arr[i] !== '' && arr[i] !== '000') {
        result.push(this.blockOfThree(arr[i]));
        if (this.u[i]) result.push(this.u[i]);
      }
    }
    result.push('đồng');
    string = result.join(' ');
    return string.replace(/[0-9]/g, '').replace(/ {2}/g, ' ').replace(/ $/, '');
  }
}
