import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

export default function AppLoading({ loading }) {
  return (
    <React.Fragment>
      <LoadingOverlay
        active={loading}
        spinner
        styles={{
          wrapper: {
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 99999999,
            width: '100%',
            height: '100%',
          },
        }}
      ></LoadingOverlay>
    </React.Fragment>
  );
}
