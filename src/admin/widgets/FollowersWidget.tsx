import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import React from "react";
import { useTranslation } from "react-i18next";
import Math from "../../Assets/Subjects/mathLogo.png";
import Chemistry from "../../Assets/Subjects/chemistryLogo.png";
import English from "../../Assets/Subjects/englishLogo.png";
import Geography from "../../Assets/Subjects/geography.png";

import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
import Fab from "@mui/material/Fab";

const socials = [
  {
    image: <img src={Math} />,
    bgcolor: "primary.main",
    icon: <ThumbUpIcon sx={{ color: "#fff" }} />,
    name: "Math",
    trend: (
      <div className="d-flex">
        <Fab
          style={{
            backgroundColor: "#8BC6EC",
            backgroundImage:
              "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
          }}
          color="secondary"
          component={RouterLink}
          to={`/${process.env.PUBLIC_URL}/admin/profile`}
          variant="extended"
        >
          Document
          <ArrowRightIcon sx={{ color: "#757de8" }} />
        </Fab>
      </div>
    ),
    unitKey: "admin.home.followers.units.likes",
    teacher: "Adam",
  },
  {
    image: <img src={Chemistry} />,
    bgcolor: "error.main",
    icon: <FavoriteIcon style={{ color: "#fff" }} />,
    name: "Chemistry",
    trend: (
      <div className="d-flex">
        <Fab
          style={{
            backgroundColor: "#8BC6EC",
            backgroundImage:
              "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
          }}
          color="secondary"
          component={RouterLink}
          to={`/${process.env.PUBLIC_URL}/admin/profile`}
          variant="extended"
        >
          Document
          <ArrowRightIcon sx={{ color: "#757de8" }} />
        </Fab>
      </div>
    ),
    unitKey: "admin.home.followers.units.love",
    teacher: "T?? Sena",
  },
  {
    image: <img src={English} />,
    bgcolor: "warning.main",
    icon: <EmojiEmotionsIcon style={{ color: "#fff" }} />,
    name: "English",
    trend: (
      <div className="d-flex">
        <Fab
          style={{
            backgroundColor: "#8BC6EC",
            backgroundImage:
              "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
          }}
          color="secondary"
          component={RouterLink}
          to={`/${process.env.PUBLIC_URL}/admin/profile`}
          variant="extended"
        >
          Document
          <ArrowRightIcon sx={{ color: "#757de8" }} />
        </Fab>
      </div>
    ),
    unitKey: "admin.home.followers.units.smiles",
    teacher: "John Smith",
  },
  {
    image: <img src={Geography} />,
    bgcolor: "warning.main",
    icon: <EmojiEmotionsIcon style={{ color: "#fff" }} />,
    name: "Geography",
    trend: (
      <div className="d-flex">
        <Fab
          style={{
            backgroundColor: "#8BC6EC",
            backgroundImage:
              "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
          }}
          color="secondary"
          component={RouterLink}
          to={`/${process.env.PUBLIC_URL}/admin/profile`}
          variant="extended"
        >
          Document
          <ArrowRightIcon sx={{ color: "#757de8" }} />
        </Fab>
      </div>
    ),
    unitKey: "admin.home.followers.units.smiles",
    teacher: "Pault",
  },
];

const FollowersWidget = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {socials.map((social) => (
        <Card key={social.name} sx={{ mb: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ mr: 2 }}>{social.image}</Box>
            {/* <Avatar
              aria-label={`${social.name} avatar`}
              sx={{ bgcolor: social.bgcolor, mr: 2 }}
            >
              {social.icon}
            </Avatar> */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography component="div" variant="h6">
                Teacher: {social.teacher}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="div"
              >
                Subject: {t(social.name)}
              </Typography>
            </Box>
            {social.trend}
          </CardContent>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default FollowersWidget;
