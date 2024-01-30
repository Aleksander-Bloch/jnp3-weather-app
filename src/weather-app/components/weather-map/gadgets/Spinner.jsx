import { Grid } from "react-loader-spinner";

export const Spinner = ({ isVisible }) => (
  <Grid
    visible={isVisible}
    height="40"
    width="40"
    color="#4fa94d"
    ariaLabel="grid-loading"
    radius="12.5"
    wrapperStyle={{ "zIndex": "400", "position": "absolute", "top": "10px", "right": "10px" }}
    wrapperClass="grid-wrapper"
  />
)