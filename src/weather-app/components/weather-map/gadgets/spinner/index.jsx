import { Grid } from "react-loader-spinner";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { SpinnerWrapper } from "./SpinnerWrapper.jsx";

export const Spinner = ({ isVisible }) => {
  const theme = useContext(ThemeContext)

  return (
    <SpinnerWrapper>
      <Grid
        visible={isVisible}
        height="40"
        width="40"
        color={theme.colors.spinner.color}
        ariaLabel="grid-loading"
        radius="12.5"
      />
    </SpinnerWrapper>
  )
}