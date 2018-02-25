import React, { Component } from "react";
import { PageHeader, Button } from "react-bootstrap";

import ConfNavbar from "./ConfNavbar";

import '../css/Scientific.css';

export default class Scientific extends Component {

  render() {
    return (
      <div>

        <ConfNavbar {...this.props} />

        <PageHeader id="scienceHeader">Scientific</PageHeader>

        <div className="science">
          <Button>New Abstract</Button>
        </div>
      </div>
    );
  }
}
