/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from '@reduxjs/toolkit';
import { InjectedReducersType } from 'store/core/types/injector-typings';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  if (Object.keys(injectedReducers).length === 0) {
    return state => state;
  } else {
    return combineReducers({
      ...injectedReducers,
    });
  }
}
