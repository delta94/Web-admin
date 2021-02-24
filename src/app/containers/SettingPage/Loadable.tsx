import * as React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import styled from 'styled-components/macro';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SystemAccess = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.SystemAccess,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);
export const TitleManagement = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.TitleManagement,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);
export const Position = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.Position,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const GroupService = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.GroupService,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const Service = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.Service,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const DepartmentType = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.DepartmentType,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const Department = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.Department,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const Medicine = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.Medicine,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const Pharmacy = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.Pharmacy,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const Device = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.Device,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const TablePatientReceition = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.TablePatientReceition,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const DepartmentService = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.DepartmentService,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const Faculty = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.Faculty,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const DefaultSetting = lazyLoad(
  () => import('app/containers/SettingPage/index'),
  module => module.DefaultSetting,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);
