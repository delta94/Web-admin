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

export const PatientPage = lazyLoad(
  () => import('./index'),
  module => module.PatientPage,
  {
    fallback: <LoadingWrapper>{<LoadingIndicator />}</LoadingWrapper>,
  },
);
export const BalancePage = lazyLoad(
  () => import('./index'),
  module => module.BalancePage,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);
