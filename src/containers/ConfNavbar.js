import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

import RouteNavItem from "../components/RouteNavItem";

import './ConfNavbar.css';

export default class ConfNavbar extends Component {

  handleParticipantsClick = event => {
    event.preventDefault();
    this.props.history.push(`/conferences/${this.props.match.params.id}/participants`);
  }

  render() {
    return (
      <div>
        <Navbar className="nav-container">
          <Nav>
            <RouteNavItem key={4} onClick={this.handleParticipantsClick}>Participants</RouteNavItem>
            <RouteNavItem key={7} href="#">Registration</RouteNavItem>
            <RouteNavItem key={5} href="#">Scientific</RouteNavItem>
            <RouteNavItem key={6} href="#">Tourism</RouteNavItem>
            <RouteNavItem key={8} href="#">Reports</RouteNavItem>
            <RouteNavItem key={9} href="#">Program Planning</RouteNavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
