import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import DataTable from "./pages/dataTable";
import ViewTicket from "./pages/viewTicket";
import i18n from "../src/config/i18n";
import Select from "@material-ui/core/Select";
import Footer from "./pages/footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import PageNotFound from "./pages/pageNotFound";
import { withTranslation } from "react-i18next";

function App() {
  //set the language from dropdown
  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const language = event.target.value as string;
    i18n.changeLanguage(language);
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
          {/* language dropdown  */}
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
        </Toolbar>
      </AppBar>
      <main>
        <Container>
          {/* routing component,load routing page here  */}
          <RoutingComponent />
        </Container>
      </main>
      {/* Footer */}
      <Footer></Footer>
      {/* End footer */}
    </React.Fragment>
  );
}

{
  /* routing component,where we define the routing path  */
}
function RoutingComponent() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/dashboard" component={DataTable} />
          <Route exact path="/ticket/:ticketId?" component={ViewTicket} />
          <Redirect exact from="/" to="/dashboard" />
          <Route component={PageNotFound} exact path="*" />
        </Switch>
      </div>
    </Router>
  );
}
export default withTranslation()(App);
