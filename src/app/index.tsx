/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import * as AuthSlice from 'store/auth/shared/slice';
import * as CommonSlice from 'store/common/shared/slice';
import { CommonSaga } from 'store/common/shared/saga';
import { AuthSaga } from 'store/auth/shared/saga';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from 'store/auth/constants/auth.constant';
import { selectSuccess, selectUser } from 'store/auth/shared/selectors';
/* Routing */
import { AppRouting } from './routes';
import { SnackbarProvider } from 'notistack';
import {
  LocalStorageService,
  LocalStorageKey,
} from 'services/localStorage.service';

/* Layout */
import { Header } from 'app/components/Header';
import { Breadcrumb } from 'app/components/Breadcrumb';
import { Footer } from 'app/components/Footer';
import * as _ from 'lodash';

/* Static Route */
import { LoginPage } from 'app/containers/LoginPage/Loadable';

/* Animated */
import { AnimatedSwitch } from 'react-router-transition';
import { bounceTransition } from 'animation/AnimationSwitch';
import { AppHelper } from 'utils/app.helper';

export function App() {
  const local = new LocalStorageService();
  useInjectReducer({ key: AuthSlice.sliceKey, reducer: AuthSlice.reducer });
  useInjectSaga({ key: AuthSlice.sliceKey, saga: AuthSaga });
  useInjectReducer({ key: CommonSlice.sliceKey, reducer: CommonSlice.reducer });
  useInjectSaga({ key: CommonSlice.sliceKey, saga: CommonSaga });
  const dispatch = useDispatch();
  const history = useHistory();
  const activatedRoute = useLocation();
  const success: any = useSelector(selectSuccess);
  const user: any = useSelector(selectUser);

  React.useEffect(() => {
    function validateToken() {
      const tokenExpired: any = local.getItem(LocalStorageKey.tokenExpired);
      if (_.isEmpty(tokenExpired)) {
        return history.push('/');
      }
      const isExpiredToken: boolean = local.expiredToken(tokenExpired);
      if (!isExpiredToken) {
        const userValue: any = local.getItem(LocalStorageKey.user);
        const userId: any = JSON.parse(userValue);
        if (!_.isEmpty(userId)) {
          dispatch(AuthSlice.actions.getUserByIdToken(userId));
        }
      } else {
        history.push('/');
        LocalStorageService.clear();
        dispatch(
          AuthSlice.actions.setError({
            id: AppHelper.generateUUID() + Date.now(),
            key: RESPONSE_CONSTANT.TOKEN_EXPIRED,
            message: RESPONSE_MESSAGE.TOKEN_EXPIRED,
          }),
        );
      }
    }
    dispatch(AuthSlice.actions.getListPermission());
    dispatch(AuthSlice.actions.getListRole());
    dispatch(CommonSlice.actions.getDefaultSetting());
    validateToken();
  }, []);

  React.useEffect(() => {
    if (!_.isEmpty(success) && !_.isEmpty(user)) {
      const userRoutes: any[] = _.get(user, 'userRoutes');
      if (success.key === RESPONSE_CONSTANT.LOGIN_SUCCESS) {
        local.setLocalUser(user);
        history.push(_.head(userRoutes).path);
      } else if (success.key === RESPONSE_CONSTANT.GET_USER_BY_ID_SUCCESS) {
        if (!_.isEmpty(userRoutes) && userRoutes.length) {
          const activeRoute = _.get(activatedRoute, 'pathname');
          const search = _.get(activatedRoute, 'search');
          const canActiveRoute = userRoutes
            .map(({ path }) => path)
            .some(route => {
              return route === activeRoute;
            });
          if (canActiveRoute) {
            if (search === '') {
              history.push(activeRoute);
            } else {
              history.push(activeRoute + search);
            }
          } else {
            history.push(_.head(userRoutes).path);
          }
        }
      } else if (
        success.key === RESPONSE_CONSTANT.UPDATE_PROFILE_USER_SUCCESS
      ) {
        history.push(_.head(userRoutes).path);
      }
    }
  }, [user, success]);

  const renderAppRouting = () => {
    return AppRouting.map(({ path, name, Component, title }) => (
      <Route
        exact
        path={path}
        key={name}
        render={props => {
          const crumbs = AppRouting.filter(({ path }) =>
            props.match.path.includes(path),
          ).map(({ path, ...rest }) => {
            return {
              path: Object.keys(props.match.params).length
                ? Object.keys(props.match.params).reduce(
                    (path, param) =>
                      path.replace(`:${param}`, props.match.params[param]),
                    path,
                  )
                : path,
              ...rest,
            };
          });
          return (
            <React.Fragment>
              <div className="page-wrapper">
                <Header routes={AppRouting} router={props} />
                <section className="content">
                  <div className="page-container">
                    <div className="page-content-wrapper">
                      <div className="page-content">
                        <Helmet>
                          <title>{title}</title>
                          <meta
                            name="description"
                            content={`TekMedi Admin - ${title}`}
                          />
                        </Helmet>
                        <Breadcrumb crumbs={crumbs} />
                        <Component />
                      </div>
                    </div>
                  </div>
                  <Footer />
                </section>
              </div>
            </React.Fragment>
          );
        }}
      />
    ));
  };

  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transitionDuration={{ enter: 300, exit: 200 }}
      autoHideDuration={2000}
    >
      <Switch>
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          className="route-wrapper"
        >
          <Route exact path="/" component={LoginPage} />
          {renderAppRouting()}
        </AnimatedSwitch>
      </Switch>
    </SnackbarProvider>
  );
}
