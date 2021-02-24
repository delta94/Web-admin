/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useInjectReducer } from 'store/core/@reduxjs/redux-injectors';
import { NavbarItem } from './NavbarItem';
import { NavLink } from 'react-router-dom';
import { AppHelper } from 'utils/app.helper';
import { useSelector } from 'react-redux';
import * as AuthSlice from 'store/auth/shared/slice';
import * as AuthSelector from 'store/auth/shared/selectors';
import * as _ from 'lodash';

export function Navbar({ routes }) {
  useInjectReducer({ key: AuthSlice.sliceKey, reducer: AuthSlice.reducer });
  const user = useSelector(AuthSelector.selectUser);
  const [userRoutes, setUserRoutes] = useState<any[]>([]);
  const [isUserCard, setIsUserCard] = useState<boolean>(false);

  useEffect(() => {
    if (!_.isEmpty(user)) {
      const userRole: string = _.get(user, 'role.code');
      if (userRole === 'TEKMEDI' || userRole === 'ADMIN') {
        setIsUserCard(true);
      } else {
        setIsUserCard(false);
      }
      setUserRoutes(user.userRoutes);
    }
  }, [user]);

  const renderDataItem = () => {
    if (!_.isEmpty(userRoutes)) {
      let routes = userRoutes.filter(
        route => route.path !== '/transaction/detail',
      );
      let dataItems = AppHelper.getUnique(routes, 'category').sort(
        (cur, next) => {
          return cur.categoryOrder - next.categoryOrder;
        },
      );
      return dataItems.map((item: any, index: number) => {
        if (item.category !== 'Thẻ' && item.category !== 'User') {
          return <NavbarItem item={item} key={index} routes={routes} />;
        }
        return null;
      });
    }
  };

  return (
    <div className="navbar-custom">
      <div className="hor-menu hidden-sm hidden-xs">
        <ul className="nav navbar-nav">
          {isUserCard ? (
            <li className="mega-menu-dropdown" style={{ display: 'block' }}>
              <a href="#" className="dropdown-toggle tek-menu-item">
                <i className="material-icons">payment</i>Thẻ
                <i className="fa fa-angle-down"></i>
              </a>
              <ul className="dropdown-menu pull-left">
                <li className="dropdown-submenu" style={{ display: 'block' }}>
                  <a href="#">
                    <i className="fa fa-briefcase"></i> Tekmedi
                  </a>
                  <ul className="dropdown-menu">
                    {routes.map((route: any, index: number) => {
                      if (route.category === 'Thẻ') {
                        return (
                          <li
                            className="nav-item"
                            style={{ display: 'block' }}
                            key={index}
                          >
                            <NavLink
                              to={route.path}
                              className="nav-link tek-menu-item"
                            >
                              <i className="material-icons">{route.icon}</i>
                              <span className="title">{route.title}</span>
                            </NavLink>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </li>
              </ul>
            </li>
          ) : null}
          {!_.isEmpty(user) ? renderDataItem() : null}
        </ul>
      </div>
    </div>
  );
}
