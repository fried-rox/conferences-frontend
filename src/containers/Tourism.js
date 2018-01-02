import React, { Component } from "react";
import { PageHeader, Button, ListGroup } from "react-bootstrap";

import ConfNavbar from "./ConfNavbar";

import "./Tourism.css";

export default class Tourism extends Component {

  render() {
    return (
      <div>
        <ConfNavbar {...this.props} />

        <PageHeader id="tourHeader">Tourism</PageHeader>

        <div className="tourism">
          <Button
            className="newtour"
            key="new" >
              <b>{"\uFF0B"}</b> Create a new tour
          </Button>
          <input id="toursearch"
            type="text"
            placeholder="Search list by name..." />
          <ListGroup className="tour-list">
          </ListGroup>
        </div>
      </div>
    );
  }
}
