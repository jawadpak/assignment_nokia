import React from "react";
import i18n from "../config/i18n";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

type toggleAutoRefreshInterface = {
  autoRefresh: boolean;
  handleChangeAutoRefresh: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ToggleAutoRefresh = (props: toggleAutoRefreshInterface) => {
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={props.autoRefresh}
            onChange={props.handleChangeAutoRefresh}
            name="rdAutoRefresh"
            data-testid="rdAutoRefresh"
          />
        }
        label={i18n.t("Auto refresh")}
        data-testid="autoRefresh"
      />
    </>
  );
};
export default ToggleAutoRefresh;
