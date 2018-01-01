import React, { Component } from "react";
import { PageHeader, Button, ListGroup } from "react-bootstrap";

import ConfNavbar from "./ConfNavbar";

export default class Tourism extends Component {

  render() {
    return (
      <div>
        <ConfNavbar {...this.props} />
        <div className="tourism">
          <PageHeader>Tourism</PageHeader>
          <Button
            className="newtour"
            key="new"
            href={`/conferences/${this.props.match.params.id}/tourism`} >
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
