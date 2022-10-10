import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Link as RouterLink } from "react-router-dom";
import { ROUTER } from "../../Router";

export default function ListDocument() {
  return (
    <Card
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      sx={{ maxWidth: 345 }}
    >
      <PictureAsPdfIcon
        sx={{ fontSize: 50, color: "#00a4fd", marginTop: "10px" }}
      />
      <Typography gutterBottom variant="h5" component="div">
        Profile.pdf
      </Typography>
      <Typography variant="body2" color="text.secondary">
        1010.00 KB
      </Typography>
      <CardActions
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <Button
          size="large"
          component={RouterLink}
          to={`/${process.env.PUBLIC_URL}/admin/document/math/1`}
        >
          View
        </Button>
        <Button size="large">Share</Button>
      </CardActions>
    </Card>
  );
}
