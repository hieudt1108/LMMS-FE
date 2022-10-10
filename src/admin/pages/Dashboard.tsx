import Grid from "@material-ui/core/Grid";
import React from "react";
import { useTranslation } from "react-i18next";
import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";
import ActivityWidget from "../widgets/ActivityWidget";
import BudgetWidget from "../widgets/BudgetWidget";
import OverviewWidget from "../widgets/OverviewWidget";
import SalesByAgeWidget from "../widgets/SalesByAgeWidget";
import SubjectTeacherWidget from "../widgets/SubjectTeacherWidget";
import DownloadByClassWidget from "../widgets/DownloadByClassWidget";
import UsersWidget from "../widgets/UsersWidget";
import Header from "../../users/components/Header";

const overviewItems = [
  {
    unit: "dashboard.overview.subjects",
    value: "20 700",
  },
  {
    unit: "dashboard.overview.class",
    value: "$ 1 550",
  },
  {
    unit: "dashboard.overview.documents",
    value: "149",
  },
  {
    unit: "dashboard.overview.downloads",
    value: "657",
  },
];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {overviewItems.map((item, index) => (
          <Grid key={index} item xs={6} md={3}>
            <OverviewWidget description={t(item.unit)} title={item.value} />
          </Grid>
        ))}
        <Grid item xs={12} md={8}>
          <ActivityWidget />
        </Grid>
        <Grid item xs={12} md={4}>
          <SubjectTeacherWidget />
        </Grid>

        <Grid item xs={12} md={4}>
          <UsersWidget />
        </Grid>
        <Grid item xs={12} md={8}>
          <DownloadByClassWidget />
        </Grid>
        <Grid item xs={12} md={4}>
          <BudgetWidget />
        </Grid>
        <Grid item xs={12} md={8}>
          <SalesByAgeWidget />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
