/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import './breadcrumb.css';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

export const Breadcrumb = ({ crumbs }) => {
  return (
    <div className="page-bar">
      <div className="page-title-breadcrumb ">
        <ol className="breadcrumb page-breadcrumb pull-left custom">
          <li>
            <i className="fa fa-home"></i>
            &nbsp;
            <a href="/" className="parent-item pagePrev">
              Trang chủ
            </a>
            &nbsp;
            {!isEmpty(crumbs) && <i className="fa fa-angle-right fa-fw"></i>}
          </li>
          {!isEmpty(crumbs) &&
            crumbs.map(({ name, path, title, category }, key) =>
              key + 1 === crumbs.length ? (
                <span key={key} className="breadcrumbItem">
                  {category}
                  <i className="fa fa-angle-right fa-fw"></i>
                  {title}
                </span>
              ) : (
                key > 0 && (
                  <li key={key}>
                    &nbsp;
                    <Link to={path} className="pagePrev">
                      {category}
                    </Link>
                    &nbsp;
                    <i className="fa fa-angle-right fa-fw"></i>
                    &nbsp;
                  </li>
                )
              ),
            )}
        </ol>
      </div>
    </div>
  );
};
Breadcrumb.propTypes = {
  crumbs: PropTypes.array,
};
