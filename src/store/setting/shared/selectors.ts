/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectSettingState = (state: RootState) => state.setting || initialState;

export const selectError = createSelector(
  [selectSettingState],
  setting => setting.error,
);

export const selectSuccess = createSelector(
  [selectSettingState],
  setting => setting.success,
);

export const selectLoading = createSelector(
  [selectSettingState],
  setting => setting.loading,
);

export const selectSettingList = createSelector(
  [selectSettingState],
  setting => setting.settingList,
);

export const selectSettingType = createSelector(
  [selectSettingState],
  setting => setting.settingType,
);

export const selectSettingTemp = createSelector(
  [selectSettingState],
  setting => setting.cacheSetting,
);
