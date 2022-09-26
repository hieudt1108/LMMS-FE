import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";

import ProtectedRoute from "./Components/ProtectedRoute";
const Dashboard = lazy(() =>
  import("./Components/Dashboard/Dashboard/Dashboard")
);
const Login = lazy(() => import("./Components/Login/Login"));
const LandingPage = lazy(() => import("./Components/LandingPage/LandingPage"));

function App() {
  moment.locale("vi");
  return (
      <Router>
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            <Route path="/" component={LandingPage} exact />
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/dashboard" component={Dashboard}  />
          </Switch>
        </Suspense>
      </Router>
  );
}

export default App;
