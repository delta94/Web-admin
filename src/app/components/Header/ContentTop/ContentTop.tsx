/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { sliceKey, reducer, actions } from 'store/auth/shared/slice';
import { AuthSaga } from 'store/auth/shared/saga';
import { NavLink } from 'react-router-dom';
import { LocalStorageService } from 'services/localStorage.service';
import { useSnackbar } from 'notistack';
import { NotifyService } from 'services/notify.service';
import * as fromAuth from 'store/auth/shared/selectors';
import * as fromCommon from 'store/common/shared/selectors';
import * as _ from 'lodash';

export default function ContentTop({ router }) {
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: AuthSaga });
  const user = useSelector(fromAuth.selectUser);
  const success = useSelector(fromAuth.selectSuccess);
  const error: any = useSelector(fromAuth.selectError);
  const setting: any = useSelector(fromCommon.selectDefaultSetting);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      dispatch(actions.clearSuccess());
    }
  }, [success]);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(actions.clearError());
    }
  }, [error]);

  const logout = () => {
    LocalStorageService.clear();
    router.history.push('/');
    dispatch(actions.logout());
  };

  return (
    <div className="page-header-inner ">
      <div
        className="page-logo pt-0"
        style={{ background: '#fff', display: 'flex' }}
      >
        <NavLink
          to="/"
          activeStyle={{
            display: 'flex',
            width: '60px',
            height: '50px',
            margin: 'auto',
          }}
        >
          <img src={setting.logoUrl} alt="" className="w-100" />
        </NavLink>
      </div>
      <form className="search-form-opened">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            autoComplete="off"
          />
          <span className="input-group-btn">
            <a href="#" className="btn submit">
              <i className="icon-magnifier"></i>
            </a>
          </span>
        </div>
      </form>
      <a
        href="#"
        className="menu-toggler responsive-toggler"
        data-toggle="collapse"
        data-target=".navbar-collapse"
      >
        <span></span>
      </a>
      <div className="top-menu">
        <ul className="nav navbar-nav pull-right">
          <li className="dropdown dropdown-user">
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              data-hover="dropdown"
              data-close-others="true"
            >
              <span className="username username-hide-on-mobile" id="full_name">
                {!_.isEmpty(user) ? user.full_name : ''}
              </span>
              <i className="fa fa-angle-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-default">
              <li>
                <NavLink to="/system-user">
                  <i className="icon-user"></i> Hồ sơ
                </NavLink>
              </li>
              <li>
                <a onClick={logout}>
                  <i className="icon-logout"></i> Đăng xuất
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
