import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/contexts/AuthProvider";
import { ReactComponent as WelcomeSvg } from "../../core/assets/welcome.svg";
import SvgContainer from "../../core/components/SvgContainer";

const WelcomeWidget = () => {
  const { t } = useTranslation();

  return (
    <Card elevation={0} sx={{ backgroundColor: "transparent" }}>
      <CardContent sx={{ display: "flex" }}>
        <Typography component="div" sx={{ fontWeight: 300 }} variant="h1">
          {" "}
          {t("admin.home.welcome.subTitle")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WelcomeWidget;
