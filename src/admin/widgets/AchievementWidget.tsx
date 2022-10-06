import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Fab from "@mui/material/Fab";
const AchievementWidget = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="d-flex">
      <Fab
        color="secondary"
        component={RouterLink}
        to={`/${process.env.PUBLIC_URL}/admin/profile`}
        variant="extended"
      >
        {t("admin.home.achievement.action")}
        <ArrowRightIcon sx={{ color: "#757de8" }} />
      </Fab>
    </div>
  );
};


export default AchievementWidget;
