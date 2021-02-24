import * as _ from 'lodash';
import { AppHelper } from 'utils/app.helper';

export type LocalStorageItem = {
  key: string;
  value: string;
};

export enum LocalStorageKey {
  token = '_token',
  user = '_uid',
  tokenExpired = '_expired',
  tnb = '_tnb',
  room = '_room',
  screenType = '_screen',
}

export class LocalStorageService {
  public _value: any;
  public _key: any;
  public initValue: any;

  set value(newValue: any) {
    this._value = newValue;
  }

  set key(newkey: string) {
    this._key = newkey;
  }

  get value() {
    return this._value;
  }

  get key() {
    return this._key;
  }

  constructor(initValue?: any) {
    this.initValue = initValue;
  }

  public setItem({ key, value }: LocalStorageItem): LocalStorageService {
    localStorage.setItem(key, JSON.stringify(value));
    return this;
  }

  public getItem(key: string): string | null {
    const value: any = localStorage.getItem(key);
    if (_.isEmpty(value) || value === 'undefined') return null;
    return JSON.parse(value);
  }

  public removeItem(key: LocalStorageKey): LocalStorageService {
    localStorage.removeItem(key);
    return this;
  }

  static clear() {
    localStorage.clear();
  }

  public setMultipleItem(listItem: LocalStorageItem[]): LocalStorageService {
    if (listItem.length) {
      listItem.forEach((item: LocalStorageItem) => {
        this.setItem({ ...item });
      });
    }
    return this;
  }

  public setLocalUser(user): this {
    const listLocalStorageItem: LocalStorageItem[] = [];
    listLocalStorageItem.push({
      key: LocalStorageKey.token,
      value: JSON.stringify(_.get(user, 'token')),
    });
    listLocalStorageItem.push({
      key: LocalStorageKey.user,
      value: JSON.stringify(_.get(user, 'id')),
    });
    listLocalStorageItem.push({
      key: LocalStorageKey.tokenExpired,
      value: JSON.stringify(_.get(user, 'token_exp')),
    });
    this.setMultipleItem(listLocalStorageItem);
    return this;
  }

  public expiredToken(tokenExpiredTime: string): boolean {
    if (!AppHelper.checkEmptyString(tokenExpiredTime)) {
      const expiredTime = new Date(tokenExpiredTime).getTime();
      const current = new Date().getTime() - 60000;
      return expiredTime < current ? true : false;
    }
    return false;
  }
}
