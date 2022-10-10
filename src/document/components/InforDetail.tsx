import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import { Link as RouterLink } from "react-router-dom";

export default function InforDetail() {
  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <Typography variant="h4" className="mb-3">Lecture_7_p2.ppt</Typography>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column text-left">
            <Typography className="font-weight-bold">Author</Typography>
            <Typography className="font-weight-bold">Filesize</Typography>
            <Typography className="font-weight-bold">Downloads:</Typography>
            <Typography className="font-weight-bold">
              Uploaded:{" "}
            </Typography>
            <Typography className="font-weight-bold">
              Permissions:{" "}
            </Typography>
            <Typography className="font-weight-bold">Sharing: </Typography>
          </div>
          <div className="d-flex flex-column text-left">
            <Typography>Minh Quang</Typography>
            <Typography>968.00kb</Typography>
            <Typography>9</Typography>
            <Typography>22/09/2022 16:42:09 </Typography>
            <Typography>View & Dowload</Typography>
            <Typography>Public File - Can be Shared</Typography>
          </div>
        </div>

        <CardActions
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            size="large"
            component={RouterLink}
            to={`/${process.env.PUBLIC_URL}/admin/document/math/1`}
          >
            Edit
          </Button>
          <Button size="large">Download</Button>
        </CardActions>
      </Box>
    </>
  );
}
