import React, { Component } from "react";
import { PageHeader, Button, ListGroup } from "react-bootstrap";

import ConfNavbar from "./ConfNavbar";

export default class Accommodation extends Component {

  render() {
    return (
      <div>
        <ConfNavbar {...this.props} />
        <div className="accommodation">
          <PageHeader>Accommodation</PageHeader>
          <Button
            className="newroomblock"
            key="new"
            href={`/conferences/${this.props.match.params.id}/accommodation`} >
              <b>{"\uFF0B"}</b> Create a new room block
          </Button>
          <input id="roomsearch"
            type="text"
            placeholder="Search list by name..." />
          <ListGroup className="room-list">
          </ListGroup>
        </div>
      </div>
    );
  }
}
