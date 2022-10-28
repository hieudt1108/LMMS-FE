import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import { useTranslation } from "react-i18next";
import {NavLink, Outlet} from "react-router-dom";
import QueryWrapper from "../../core/components/QueryWrapper";
import CircleProgressWidget from "../widgets/CircleProgressWidget";
import ProfileHeader from "../components/ProfileHeader";

const profileMenuItems = [

  {
    key: "profile.menu.info",
    path: "",
  },
  {
    key: "profile.menu.password",
    path: "./password",
  },
];

const Profile = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
        <ProfileHeader title={"Thông tin cá nhân"}/>
      <Grid container spacing={12}>
        <Grid item xs={12} md={4} marginTop={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 6,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "background.paper",
                mb: 3,
                height: 160,
                width: 160,
              }}
            >
              <PersonIcon sx={{ fontSize: 120 }} />
            </Avatar>
          </Box>
          <CircleProgressWidget
            height={244}
            title={t("profile.completion.title")}
            value={75}
          />
        </Grid>
        <Grid item xs={12} md={8} marginTop={3} >
          <Box sx={{ mb: 4 }}>
            <Tabs aria-label="profile nav tabs" value={false}>
              {profileMenuItems.map((item) => (
                <Tab
                  key={item.key}
                  activeClassName="Mui-selected"
                  end={true}
                  component={NavLink}
                  label={t(item.key)}
                  to={item.path}
                />
              ))}
            </Tabs>
          </Box>
          <QueryWrapper>
            <Outlet />
          </QueryWrapper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
