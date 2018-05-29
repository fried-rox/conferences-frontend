import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewConference from "./containers/NewConference";
import ConferencesUpdate from "./containers/ConferencesUpdate";
import Conferences from "./containers/Conferences";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Participants from "./containers/Participants";
import RegistrationNew from "./containers/RegistrationNew";
import Registration from "./containers/Registration";
import RegistrationView from "./containers/RegistrationView";
import Scientific from "./containers/Scientific";
import Accommodation from "./containers/Accommodation";
import Tourism from "./containers/Tourism";
import Reports from "./containers/Reports";
import ProgramPlanning from "./containers/ProgramPlanning";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/conferences/new" exact component={NewConference} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id" exact component={Conferences} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id/update" exact component={ConferencesUpdate} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id/participants" exact component={Participants} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id/registration" exact component={Registration} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id/registration/regcategories" exact component={RegistrationView} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id/registration_new" exact component={RegistrationNew} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id/scientific" exact component={Scientific} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id/accommodation" exact component={Accommodation} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id/tourism" exact component={Tourism} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id/reports" exact component={Reports} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id/programplanning" exact component={ProgramPlanning} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
