import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Fab from '@mui/material/Fab';
import { ROUTER } from '../../Router';
const AchievementWidget = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex">
      <Fab color="secondary" component={RouterLink} to={ROUTER.ADMIN_PROFILE} variant="extended">
        {t('admin.home.achievement.action')}
        <ArrowRightIcon sx={{ color: '#757de8' }} />
      </Fab>
    </div>
  );
};

export default AchievementWidget;
