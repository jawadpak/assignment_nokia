import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import i18n from "../config/i18n";

interface lngDropdownProps {
  handleLanguageChange: (value: string) => void;
}

const LanguageDropdown = (props: lngDropdownProps) => {
  const [lng, setLng] = useState<string>("FI");

  const dropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const l = event.target.value as string;
    props.handleLanguageChange(l);
    setLng(l);
  };
  useEffect(() => {
    alert("change");
  }, [lng]);

  return (
    <>
      <FormControl>
        <InputLabel id="demo-controlled-open-select-label">
          select language
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          //   open={open}
          //   onClose={handleClose}
          //   onOpen={handleOpen}
          value={lng}
          onChange={dropdownChange}
        >
          <MenuItem value={"FI"}>{i18n.t("drop-down-suomi")}</MenuItem>
          <MenuItem value={"GB"}>{i18n.t("drop-down-english")}</MenuItem>
        </Select>
      </FormControl>
      <Select
        native
        onChange={dropdownChange}
        defaultValue={"FI"}
        label="Language"
        name="language"
      >
        <option value="FI">{i18n.t("drop-down-suomi")}</option>
        <option value="GB">{i18n.t("drop-down-english")}</option>
      </Select>
    </>
  );
};
export default LanguageDropdown;
