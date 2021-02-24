/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { isEmpty } from 'lodash';
import { NavLink } from 'react-router-dom';

export function NavbarItem({ item, routes }) {
  const list = routes.filter(f => f.category === item.category);
  return (
    <li className="mega-menu-dropdown" key={item.path}>
      <NavLink to={item.path} className="dropdown-toggle tek-menu-item">
        <i className="material-icons">{item.icon}</i>
        {item.category}
        <i className="fa fa-angle-down"></i>
        <span className="arrow "></span>
      </NavLink>
      {list.length ? (
        <ul className="dropdown-menu pull-left">
          <div className="dropdown-submenu">
            {!isEmpty(list) &&
              list.map((itemMapping: any, index: number) => {
                return (
                  <li className="nav-item" key={index}>
                    <NavLink
                      to={itemMapping.path}
                      className="nav-link tek-menu-item"
                    >
                      <i className="material-icons">{itemMapping.icon}</i>
                      <span className="title">{itemMapping.title}</span>
                    </NavLink>
                  </li>
                );
              })}
          </div>
        </ul>
      ) : null}
    </li>
  );
}
