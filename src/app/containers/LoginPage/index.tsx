/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import * as AuthSelectors from 'store/auth/shared/selectors';
import * as AuthSlice from 'store/auth/shared/slice';
import * as CommonSelectors from 'store/common/shared/selectors';
import { useInjectReducer, useInjectSaga } from 'store/core/@reduxjs/redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { AuthSaga } from 'store/auth/shared/saga';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useSnackbar } from 'notistack';
import { NotifyService } from 'services/notify.service';
import AppLoading from 'app/components/Loading';
import * as _ from 'lodash';

export function LoginPage() {
  useInjectReducer({ key: AuthSlice.sliceKey, reducer: AuthSlice.reducer });
  useInjectSaga({ key: AuthSlice.sliceKey, saga: AuthSaga });
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  const authLoading = useSelector(AuthSelectors.selectLoading);
  const commonLoading = useSelector(CommonSelectors.selectLoading);
  const error = useSelector(AuthSelectors.selectError);
  const defaultSetting: any = useSelector(CommonSelectors.selectDefaultSetting);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!commonLoading && !authLoading) {
      setLoading(false);
    }else {
      setLoading(true);
    }
  }, [commonLoading, authLoading]);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(AuthSlice.actions.clearError());
    }
  }, [error]);

  const login = user => {
    dispatch(AuthSlice.actions.login(user));
  };

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
        <meta name="description" content="Web Admin" />
      </Helmet>
      {loading ? <AppLoading loading={true} /> : null}
      <div
        className="limiter"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <div
          className="container-locardFormStategin100"
          style={{ flex: 1, display: 'flex' }}
        >
          <div className="wrap-login101 m-auto">
            <form
              autoComplete="on"
              className="login100-form validate-form"
              onSubmit={handleSubmit(login)}
            >
              <span
                className="login100-form-logo"
                style={{ background: 'transparent' }}
              >
                <img alt="" src={defaultSetting.logoUrl} />
              </span>
              <span className="login100-form-title p-b-34 p-t-27">
                { defaultSetting.viName }
              </span>
              <div
                className="wrap-input100 validate-input"
                data-validate="Nhập tên đăng nhập"
              >
                <input
                  className="input101"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Tên đăng nhập"
                  ref={register({
                    required: true,
                  })}
                />
                <span
                  className="focus-input101"
                  data-placeholder="&#xf207;"
                ></span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Nhập mật khẩu"
              >
                <input
                  className="input101"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mật khẩu"
                  ref={register({
                    required: true,
                  })}
                />
                <span
                  className="focus-input101"
                  data-placeholder="&#xf191;"
                ></span>
              </div>
              <div className="contact100-form-checkbox">
                <input
                  className="input-checkbox100"
                  id="remember"
                  type="checkbox"
                />
                <label className="label-checkbox100" htmlFor="remember">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  Đăng nhập
                </button>
              </div>
              <div className="text-center p-t-30">
                <a className="txt1" href="#">
                  Quên mật khẩu?
                </a>
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="page-footer">
            <div className="page-footer-inner">
              2020 © Eye BTC System Development By
              <a href="tekmedi.com" target="_top" className="makerCss">
                Tekmedi JSC
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
