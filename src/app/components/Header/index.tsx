/* eslint-disable prettier/prettier */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ContentTop from './ContentTop/ContentTop';
import { Navbar } from './Navbar';
import PropTypes from 'prop-types';
export function Header({routes, router}) {
  return (
    <div className="page-header navbar navbar-fixed-top" style={{zIndex: 101}}>
      <ContentTop router={router} />
      <Navbar routes={routes} />
    </div>
  );
}
Header.propTypes = {
  routers: PropTypes.array,
};
