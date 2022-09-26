import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Style from "./Style.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Topnav from "./Topnav/Topnav";
const Home = lazy(() => import("../Home/Home"));
const ClassRooms = lazy(() => import("../ClassRooms/ClassRooms"));
const ClassRoomDetail = lazy(() =>
  import("../ClassRoomDetail/ClassRoomDetail")
);
const SubjectList = lazy(() => import("../SubjectList/SubjectList"));
const SubjectDetail = lazy(() => import("../SubjectDetail/SubjectDetail"));
const LessonDetail = lazy(() => import("../LessonDetail/LessonDetail"));
const ArrayStudent = lazy(() =>
  import("../LessonDetail/RollCall/RollCall")
);
const ListStudent = lazy(() =>
  import("../SubjectDetail/ListStudent/ListStudent")
);

function Dashboard({ match }) {
  return (
    <div className={Style["dashboard"] + " d-flex align-items-stretch"}>
      <Sidebar />
      <div className="w-100 d-flex flex-column">
        <Topnav />
        <div className="ms-3 me-4 my-4 flex-grow-1">
          <Suspense fallback={<div>Loading ...</div>}>
            <Switch>
              <Route path={match.path + "/home"} component={Home} />
              <Route
                path={match.path + "/classroom"}
                exact
                component={ClassRooms}
              />
              <Route
                path={match.path + "/classroom/:roomId"}
                exact
                component={ClassRoomDetail}
              />
              <Route
                path={match.path + "/classroom/:roomId/:nameSubject"}
                exact
                component={SubjectDetail}
              />
              <Route
                path={match.path + "/classroom/:roomId/:nameSubject/studentList/:listId"}
                exact
                component={ListStudent}
              />
              <Route
                path={match.path + "/classroom/:roomId/:nameSubject/:lessonId"}
                exact
                component={LessonDetail}
              />
              <Route
                path={
                  match.path +
                  "/classroom/:roomId/:nameSubject/:lessonId/roll-call/:lessonId"
                }
                component={ArrayStudent}
              />
              <Route
                path={match.path + "/subjects"}
          
                component={SubjectList}
              />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
