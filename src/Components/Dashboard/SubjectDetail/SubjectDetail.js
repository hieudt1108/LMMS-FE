import React, { useState } from "react";
import Style from "./Style.module.scss";
import GoBack from "../Utils/GoBack";

import Banner from "./Banner/Banner";
import ScheduleTeach from "./ScheduleTeach/ScheduleTeach";
import DocumentHomework from "./DcmtHomework/Homework_doc";
import "../../../Styles/Global.scss";

import { UPDATE_CLASSROOM } from "../../../Redux/Actions/ActionTypes";
function SubjectDetail({ match }) {
   
   console.log("Path Subject: " , match);

   return (
      <div>
         <GoBack />
         <Banner />

         <div className=" d-flex justify-content-between mb-3">
            <div className={Style["schedule-teach"] + " bg-white aka-br-3"}>
               <ScheduleTeach match={match} />
            </div>
            {/* <div className={Style["document"] + " bg-white aka-br-3"}>
               <DocumentHomework />
            </div> */}
         </div>
      </div>
   );
}

export default SubjectDetail;
