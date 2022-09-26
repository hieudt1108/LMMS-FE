import React from "react";
import Style from "./Style.module.scss";

import DocQuestion from "../../../../Assets/Dashboard/document-ques.svg";
import HomeworkDetail from "../../../../Assets/Dashboard/homework-detail.svg";
import { Link } from "react-router-dom";

export default function Homework_doc() {
   return (
      <div className={Style[""] + " bg-white aka-br-3 "}>
         <div className={Style["right-header"]}>
            <div className={Style["border-bottomRight"]}>
               <div>
                  <img src={HomeworkDetail} alt="" />
                  <span className="aka-fz-2 aka-fw-400">Bài tập</span>
               </div>
            </div>
         </div>

         <div className="status">
            <div className="p-3 aka-br-bp">
               <div className={"aka-mb-12"}>
                  <div
                     className={
                        Style["header-status"] +
                        " d-flex aka-br-bp aka-mb-12 aka-pt-12 aka-pb-12 justify-content-between"
                     }
                  >
                     <span className="aka-fz-3 aka-ms-12 aka-color-9 aka-fw-700">
                        Chưa chấm (3)
                     </span>
                     <Link className="aka-fz-2 aka-ms-12 aka-fw-700 text-decoration-none text-black">
                        Xem tất cả <i className="bi bi-arrow-right"></i>
                     </Link>
                  </div>
                  <span className="aka-fz-3 fw-bold aka-fw-600">Thứ 3 - 23.11.2021</span>
                  <div
                     className={
                        Style["doc_file"] +
                        " d-flex align-items-center aka-br-2 mt-3 p-3 aka-mb-12 aka-bg-11"
                     }
                  >
                     <div className="flex-grow-1 ms-2">
                        <p>Kiểm tra tự học</p>
                        <p className="m-0">Lăng kính 1: Tư duy toàn cầu (24/11) | 5 câu hỏi</p>
                     </div>
                     <div>
                        <div>
                           {" "}
                           <span className="aka-fz-2 aka-ms-12 aka-color-9 aka-fw-700">
                              Chưa chấm{" "}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className={"aka-mb-12 "}>
                  <span className="aka-fz-3 fw-bold aka-fw-600">Thứ 3 - 23.11.2021</span>
                  <div
                     className={
                        Style["doc_file"] +
                        " d-flex align-items-center aka-br-2 mt-3 p-3 aka-mb-12 aka-bg-11"
                     }
                  >
                     <div className="flex-grow-1 ms-2">
                        <p>Kiểm tra tự học</p>
                        <p className="m-0">Lăng kính 1: Tư duy toàn cầu (24/11) | 5 câu hỏi</p>
                     </div>
                     <div>
                        <div>
                           {" "}
                           <span className="aka-fz-2 aka-ms-12 aka-color-9 aka-fw-700">
                              Chưa chấm{" "}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="status">
            <div className="p-3 aka-br-bp">
               <div className={"aka-mb-12 "}>
                  <div
                     className={
                        Style["header-status"] +
                        " d-flex aka-br-bp aka-pt-12 aka-pb-12 justify-content-between"
                     }
                  >
                     <span className="aka-fz-3 aka-ms-12 aka-color-10 aka-fw-700">Đã chấm (5)</span>
                     <Link className="aka-fz-2 aka-ms-12 aka-fw-700 text-decoration-none text-black">
                        Xem tất cả <i className="bi bi-arrow-right"></i>{" "}
                     </Link>
                  </div>
                  <span className="aka-fz-3 fw-bold aka-fw-600">Thứ 3 - 23.11.2021</span>
                  <div
                     className={
                        Style["doc_file"] +
                        " d-flex align-items-center aka-br-2 mt-3 p-3 aka-mb-12 aka-bg-12"
                     }
                  >
                     <div className="flex-grow-1 ms-2">
                        <p>Kiểm tra tự học</p>
                        <p className="m-0">Lăng kính 1: Tư duy toàn cầu (24/11) | 5 câu hỏi</p>
                     </div>
                     <div>
                        <div>
                           {" "}
                           <span className="aka-fz-2 aka-ms-12 aka-color-10 aka-fw-700">
                              Đã chấm{" "}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className={"aka-mb-12 "}>
                  <span className="aka-fz-3 fw-bold aka-fw-600">Thứ 3 - 23.11.2021</span>
                  <div
                     className={
                        Style["doc_file"] +
                        " d-flex align-items-center aka-br-2 mt-3 p-3 aka-mb-12 aka-bg-12"
                     }
                  >
                     <div className="flex-grow-1 ms-2">
                        <p>Kiểm tra tự học</p>
                        <p className="m-0">Lăng kính 1: Tư duy toàn cầu (24/11) | 5 câu hỏi</p>
                     </div>
                     <div>
                        <div>
                           {" "}
                           <span className="aka-fz-2 aka-ms-12 aka-color-10 aka-fw-700">
                              Đã chấm{" "}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="status">
            <div className="p-3 ">
               <div className={"aka-mb-12"}>
                  <div
                     className={
                        Style["header-status"] +
                        " d-flex aka-br-bp aka-mb-12 aka-mb-12 aka-pt-12 aka-pb-12 justify-content-between"
                     }
                  >
                     <span className="aka-fz-3 aka-ms-12 aka-fw-700">Bản nháp (12)</span>
                     <Link className="aka-fz-2 aka-ms-12 aka-fw-700 text-decoration-none text-black">
                        Xem tất cả <i className="bi bi-arrow-right"></i>
                     </Link>
                  </div>
                  <span className="aka-fz-3 fw-bold aka-fw-600">Thứ 3 - 23.11.2021</span>
                  <div
                     className={
                        Style["doc_file"] +
                        " d-flex align-items-center aka-br-2 mt-3 p-3 aka-mb-12 aka-bg-13"
                     }
                  >
                     <div className="flex-grow-1 ms-2">
                        <p>Kiểm tra tự học</p>
                        <p className="m-0">Lăng kính 1: Tư duy toàn cầu (24/11) | 5 câu hỏi</p>
                     </div>
                     <div>
                        <div>
                           {" "}
                           <span className="aka-fz-2 aka-ms-12 aka-color-3 aka-fw-700 fw-bold">
                              Bản nháp{" "}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className={"aka-mb-12 "}>
                  <span className="aka-fz-3 fw-bold aka-fw-600">Thứ 3 - 23.11.2021</span>
                  <div
                     className={
                        Style["doc_file"] +
                        " d-flex align-items-center aka-br-2 mt-3 p-3 aka-mb-12 aka-bg-13"
                     }
                  >
                     <div className="flex-grow-1 ms-2">
                        <p>Kiểm tra tự học</p>
                        <p className="m-0">Lăng kính 1: Tư duy toàn cầu (24/11) | 5 câu hỏi</p>
                     </div>
                     <div>
                        <div>
                           {" "}
                           <span className="aka-fz-2 aka-ms-12 aka-color-3 aka-fw-700">
                              Bản nháp{" "}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
