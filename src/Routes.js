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

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/conferences/new" exact component={NewConference} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id" exact component={Conferences} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id/update" exact component={ConferencesUpdate} props={childProps} />
    <AuthenticatedRoute path="/conferences/:id/participants" exact component={Participants} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
