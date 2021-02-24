import * as React from 'react';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import styled from 'styled-components/macro';
import { lazyLoad } from 'utils/loadable';

const LoadingWrapper = styled.div`
  width: 100%;
  heigth: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HRMPage = lazyLoad(
  () => import('./index'),
  module => module.HRM,
  {
    fallback: <LoadingWrapper>{<LoadingIndicator />}</LoadingWrapper>,
  },
);

export const Schedule = lazyLoad(
  () => import('./index'),
  module => module.Schedule,
  {
    fallback: <LoadingWrapper>{<LoadingIndicator />}</LoadingWrapper>,
  },
);
