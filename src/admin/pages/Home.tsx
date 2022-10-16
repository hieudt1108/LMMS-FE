import Grid from '@material-ui/core/Grid';
import React from 'react';
import AdminAppBar from '../components/AdminAppBar';
import AdminToolbar from '../components/AdminToolbar';
import RecentNotifications from '../components/RecentNotifications';
import AchievementWidget from '../widgets/AchievementWidget';
import FollowersWidget from '../widgets/FollowersWidget';
import ViewsWidget from '../widgets/ViewsWidget';
import WelcomeWidget from '../widgets/WelcomeWidget';

const Home = () => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <WelcomeWidget />
          <AchievementWidget />
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <FollowersWidget />
          {/* <ViewsWidget /> */}
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          {/* <MeetingWidgets />
          <PersonalTargetsWidget /> */}
          <ViewsWidget />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
