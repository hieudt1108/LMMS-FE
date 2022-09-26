import React from "react";
import { Button, Form, Input } from "reactstrap";
import Arrcss from "./RollCall.module.scss";

export default function SearchBox({ title }) {
  return (
    <div className={Arrcss.search_box + " bg-white p-3"}>
      <h4 className="fw-bold">{title}</h4>
      <Form className="mx-auto w-50 d-flex">
        <Input
          type="text"
          id="search"
          className="w-75 me-2"
          placeholder="Tên học sinh"
        />
        <Button className="main-btn">Tìm kiếm</Button>
      </Form>
    </div>
  );
}
