import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

import RouteNavItem from "../components/RouteNavItem";

import './ConfNavbar.css';

export default class ConfNavbar extends Component {

  handleDetailsClick = event => {
    event.preventDefault();
    this.props.history.push(`/conferences/${this.props.match.params.id}`);
  }


  // twoFunctions() {
  //   this.changeHover();
  //   this.handleDetailsClick();
  // }

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

  render() {
    return (
      <div className="confnavbar">
        <Navbar collapseOnSelect>
          <Nav pullLeft>
            <RouteNavItem key={4} id="detailsnav" onClick={this.handleDetailsClick}>Details</RouteNavItem>
            <RouteNavItem key={5} id="detailsnav2" onClick={this.handleParticipantsClick}>Participants</RouteNavItem>
            <RouteNavItem key={6} id="detailsnav3" onClick={this.handleRegistrationClick}>Registration</RouteNavItem>
            <RouteNavItem key={7} id="detailsnav4" onClick={this.handleScientificClick}>Scientific</RouteNavItem>
            <RouteNavItem key={8} id="detailsnav5" onClick={this.handleTourismClick}>Tourism</RouteNavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
