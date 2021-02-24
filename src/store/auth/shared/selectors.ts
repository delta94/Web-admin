/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectAuthState = (state: RootState) => state.auth || initialState;

export const selectUser = createSelector(
  [selectAuthState],
  auth => auth.user,
);
export const selectUsers = createSelector(
  [selectAuthState],
  auth => auth.users,
);
export const selectRoles = createSelector(
  [selectAuthState],
  auth => auth.roles,
);
export const selectPermissions = createSelector(
  [selectAuthState],
  auth => auth.permissions,
);

export const selectToken = createSelector(
  [selectAuthState],
  auth => auth.token,
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  auth => auth.isAuthenticated,
);

export const selectLoading = createSelector(
  [selectAuthState],
  auth => auth.loading,
);

export const selectError = createSelector(
  [selectAuthState],
  auth => auth.error,
);

export const selectSuccess = createSelector(
  [selectAuthState],
  auth => auth.success,
);

export const selectRoleEditing = createSelector(
  [selectAuthState],
  auth => auth.isEditingRole,
);

export const selectUserFind = createSelector(
  [selectAuthState],
  auth => auth.userFind,
);