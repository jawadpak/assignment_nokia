import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DataTable from "./pages/dataTable";
import i18n from "../src/config/i18n";
import Select from "@material-ui/core/Select";
import Footer from "./pages/footer";

export default function Album() {
  const [lng, setLng] = useState<string>("FI");
  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const l = event.target.value as string;
    setLng(l);
    i18n.changeLanguage(l);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            {/* whatever is on the left side */}
            <Typography variant="h6" color="inherit" noWrap display="block">
              {i18n.t("NOKIA")}
            </Typography>
          </Box>
          <Select
            native
            onChange={handleLanguageChange}
            defaultValue={"FI"}
            label="Language"
            name="language"
          >
            <option value="FI">{i18n.t("drop-down-suomi")}</option>
            <option value="GB">{i18n.t("drop-down-english")}</option>
          </Select>{" "}
          *
        </Toolbar>
      </AppBar>
      <main>
        <Container>
          <DataTable></DataTable>
        </Container>
      </main>
      {/* Footer */}
      <Footer></Footer>
      {/* End footer */}
    </React.Fragment>
  );
}
