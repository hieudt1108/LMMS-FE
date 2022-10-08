import * as React from "react";

import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";
import { useTranslation } from "react-i18next";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@material-ui/core/Typography";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Link as RouterLink } from "react-router-dom";
import Fab from "@mui/material/Fab";


function createData(
  week: number,
  slot: number,
  schedule: string,
  note: string
) {
  return { week, slot, schedule, note };
}

const rows = [
  createData(
    1,
    1,
    "Bài 1: Tập hợp",
    "Hoàn thành bài tập 1.1 - 1.6 SBT trang 6"
  ),
  createData(
    1,
    2,
    "Bài 1: Tập hợp",
    "Hoàn thành bài tập 1.1 - 1.6 SBT trang 6"
  ),
  createData(
    1,
    3,
    "Bài 1: Tập hợp",
    "Hoàn thành bài tập 1.1 - 1.6 SBT trang 6"
  ),
  createData(
    1,
    4,
    "Bài 1: Tập hợp",
    "Hoàn thành bài tập 1.1 - 1.6 SBT trang 6"
  ),
  createData(
    2,
    5,
    "Bài 1: Tập hợp",
    "Hoàn thành bài tập 1.1 - 1.6 SBT trang 6"
  ),
  createData(
    2,
    6,
    "Bài 1: Tập hợp",
    "Hoàn thành bài tập 1.1 - 1.6 SBT trang 6"
  ),
  createData(
    2,
    7,
    "Bài 1: Tập hợp",
    "Hoàn thành bài tập 1.1 - 1.6 SBT trang 6"
  ),
  createData(
    2,
    8,
    "Bài 1: Tập hợp",
    "Hoàn thành bài tập 1.1 - 1.6 SBT trang 6"
  ),
  createData(
    3,
    9,
    "Bài 1: Tập hợp",
    "Hoàn thành bài tập 1.1 - 1.6 SBT trang 6"
  ),
  createData(
    3,
    10,
    "Bài 1: Tập hợp",
    "Hoàn thành bài tập 1.1 - 1.6 SBT trang 6"
  ),
  createData(
    3,
    11,
    "Bài 1: Tập hợp",
    "Hoàn thành bài tập 1.1 - 1.6 SBT trang 6"
  ),
];

export default function Document() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title={t("syllabus.title")} />
      </AdminAppBar>
      <Typography component="div" variant="h6">
        Môn Toán
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                Kỳ 1
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={10}>Tuần</TableCell>
              <TableCell width={10}>Tiết</TableCell>
              <TableCell align="center">Bài dạy/ chủ đề</TableCell>
              <TableCell align="center">Ghi chú/ BTVN</TableCell>
              <TableCell width={50} align="center">Tài liệu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.week}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.week}
                </TableCell>
                <TableCell align="center">{row.slot}</TableCell>
                <TableCell align="center">{row.schedule}</TableCell>
                <TableCell align="center">{row.note}</TableCell>
                <TableCell align="right">
                  <div className="d-flex">
                    <Fab
                      style={{
                        backgroundColor: "#8BC6EC",
                        backgroundImage:
                          "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
                      }}
                      color="secondary"
                      component={RouterLink}
                      to={`/${process.env.PUBLIC_URL}/admin/document/:subjectSlot`}
                      variant="extended"
                    >
                      Document
                      <ArrowRightIcon sx={{ color: "#757de8" }} />
                    </Fab>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
