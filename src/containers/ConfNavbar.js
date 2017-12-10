import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

import RouteNavItem from "../components/RouteNavItem";

import './ConfNavbar.css';

export default class ConfNavbar extends Component {

  handleDetailsClick = event => {
    event.preventDefault();
    this.props.history.push(`/conferences/${this.props.match.params.id}`);
  }

  handleParticipantsClick = event => {
    event.preventDefault();
    this.props.history.push(`/conferences/${this.props.match.params.id}/participants`);
  }

  handleRegistrationClick = event => {
    event.preventDefault();
    this.props.history.push(`/conferences/${this.props.match.params.id}/registration`);
  }

  handleScientificClick = event => {
    event.preventDefault();
    this.props.history.push(`/conferences/${this.props.match.params.id}/scientific`);
  }

  handleTourismClick = event => {
    event.preventDefault();
    this.props.history.push(`/conferences/${this.props.match.params.id}/tourism`);
  }

  handleReportsClick = event => {
    event.preventDefault();
    this.props.history.push(`/conferences/${this.props.match.params.id}/reports`);
  }

  handleProgramPlanningClick = event => {
    event.preventDefault();
    this.props.history.push(`/conferences/${this.props.match.params.id}/programplanning`);
  }

  render() {
    return (
      <div>
        <Navbar>
          <Nav>
            <RouteNavItem key={10} onClick={this.handleDetailsClick}>Details</RouteNavItem>
            <RouteNavItem key={4} onClick={this.handleParticipantsClick}>Participants</RouteNavItem>
            <RouteNavItem key={5} onClick={this.handleRegistrationClick}>Registration</RouteNavItem>
            <RouteNavItem key={6} onClick={this.handleScientificClick}>Scientific</RouteNavItem>
            <RouteNavItem key={7} onClick={this.handleTourismClick}>Tourism</RouteNavItem>
            <RouteNavItem key={8} onClick={this.handleReportsClick}>Reports</RouteNavItem>
            <RouteNavItem key={9} onClick={this.handleProgramPlanningClick}>Program Planning</RouteNavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
