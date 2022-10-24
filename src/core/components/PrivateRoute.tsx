import { Navigate, Route, RouteProps } from "react-router";
import { useAuth } from "../../auth/contexts/AuthProvider";
import { ROUTER } from "../../Router";

type PrivateRouteProps = {
  roles?: string[];
} & RouteProps;

const PrivateRoute = ({
  children,
  roles,
  ...routeProps
}: PrivateRouteProps) => {
  // @ts-ignore
  const { hasRole, userInfo } = useAuth();

  if (userInfo) {
    if (!hasRole(roles)) {
      return <Navigate to={ROUTER[403]} />;
    }
    return <Route {...routeProps} />;
  } else {
    return <Navigate to={ROUTER.LOGIN} />;
  }
};

export default PrivateRoute;
