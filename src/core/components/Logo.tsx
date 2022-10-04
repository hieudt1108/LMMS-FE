import Box, {BoxProps} from "@material-ui/core/Box";
import {ReactComponent as LogoSvg} from "../assets/lmms-logo.svg";

type LogoProps = {
  colored?: boolean;
  size?: number;
  margin?: number;
} & BoxProps;

const Logo = ({colored = false, size = 90, ...boxProps}: LogoProps) => {
  return (
      <Box {...boxProps}>
        <LogoSvg height={size} width={size} />
      </Box>
  );
};

export default Logo;
