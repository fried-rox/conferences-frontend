import React, { Component } from "react";
import { PageHeader } from "react-bootstrap";

import ConfNavbar from "./ConfNavbar";

export default class Registration extends Component {

  render() {
    return (
      <div className="regcategories">
        <ConfNavbar {...this.props} />
        <PageHeader>Registration Categories</PageHeader>
      </div>
    );
  }
}
