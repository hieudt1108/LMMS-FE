import React, { useState } from "react";

import CelendarSm from "../../../../Assets/Dashboard/celendar-sm.svg";
import Style from "./Style.module.scss";

import {
   UncontrolledButtonDropdown,
   DropdownMenu,
   DropdownToggle,
   DropdownItem,
   UncontrolledCollapse,
   Card,
   CardBody,
   Button,
   Input,
   FormGroup,
   Col,
} from "reactstrap";
export default function Celendar() {
   return (
      <div className={Style["dropdownCalendar"]}>
         <UncontrolledButtonDropdown className={Style["btn-uncontroll"] + " w-100"}>
            <DropdownToggle
               className={Style["btnDrop"] + " d-flex mx-auto bg-white text-dark w-75 "}
            >
               <p className="mb-0 flex-grow-1">Thứ 2 (22.11) - Thứ 7 (27.11)</p>
               <img className={Style["absolute-img"]} src={CelendarSm} alt="" />
            </DropdownToggle>
            <DropdownMenu className={Style["drop-menu"]}>
               <DropdownItem>Tuần này</DropdownItem>
               <DropdownItem>Tuần trước</DropdownItem>
               <DropdownItem>Tháng này</DropdownItem>
               <DropdownItem>Tháng trước</DropdownItem>
               <DropdownItem divider />
               <Button id="toggler" className={Style["toggle-btn"] + " border-none w-100 d-flex"}>
                  Tùy chỉnh
               </Button>
               <UncontrolledCollapse toggler="#toggler">
                  <Card>
                     <FormGroup row>
                        <Col className="text-center">
                           <Input placeholder="dd/mm"/> Ngày bắt đầu
                        </Col>
                        -
                        <Col className="text-center">
                           <Input placeholder="dd/mm" /> Ngày kết thúc
                        </Col>
                        <CardBody className="d-flex justify-content-around">
                           <Button className={Style["cancel-date"] + " border-none d-flex"}>Hủy</Button>
                           <Button className={Style["apply-date"] + " border-none d-flex"}>Áp dụng</Button>
                        </CardBody>
                     </FormGroup>
                  </Card>
               </UncontrolledCollapse>
            </DropdownMenu>
         </UncontrolledButtonDropdown>
      </div>
   );
}
