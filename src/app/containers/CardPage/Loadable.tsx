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

export const RegisterPage = lazyLoad(
  () => import('./index'),
  module => module.RegisterPage,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const ReturnPage = lazyLoad(
  () => import('./index'),
  module => module.ReturnPage,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const RechargePage = lazyLoad(
  () => import('./index'),
  module => module.RechargePage,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const HistoryPage = lazyLoad(
  () => import('./index'),
  module => module.HistoryPage,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const WithDrawPage = lazyLoad(
  () => import('./index'),
  module => module.WithDrawPage,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const LostPage = lazyLoad(
  () => import('./index'),
  module => module.LostPage,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);
export const Statistical = lazyLoad(
  () => import('./index'),
  module => module.Statistical,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);
