/* eslint-disable array-callback-return */
import * as _ from 'lodash';

export class PrivateAuthRoute {
  user: any;
  constructor(user: any) {
    this.user = user;
  }

  public seperateRoute(defaultRoute: any[]): any[] {
    let permissionRoutes: any[] = [];
    const permissions: any[] = _.get(this.user, 'permissions');
    const userRole: any = _.get(this.user, 'role.code');
    if (_.isEmpty(permissions) || !userRole || userRole === 'ADMIN') {
      permissionRoutes = defaultRoute;
    } else {
      permissionRoutes = _.flatten(
        permissions
          .map(permission => {
            const authRoute = defaultRoute.filter(
              route => route.permission === permission.code,
            );
            if (authRoute) {
              return authRoute;
            }
          })
          .filter(route => route),
      ).sort((cur, next) => cur.categoryOrder - next.categoryOrder);
    }
    return permissionRoutes;
  }
}
