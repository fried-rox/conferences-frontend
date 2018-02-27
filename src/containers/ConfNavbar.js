import React, { Component } from "react";
// import { Navbar } from "react-bootstrap";
// import { IndexLinkContainer } from "react-router-bootstrap";

import RouteNavItem from "../components/RouteNavItem";

import '../css/ConfNavbar.css';

export default class ConfNavbar extends Component {

  // handleClickColorChange = event => {
  //   const details = document.getElementById("detailsnav");
  //   details.style.backgroundColor = "#fbb031";
  // }

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

  render() {
    return (
      <div className="secondnav">
        <RouteNavItem key={4} id="detailsnav" onClick={this.handleDetailsClick}>Details</RouteNavItem>
        <RouteNavItem key={5} id="detailsnav2" onClick={this.handleParticipantsClick}>Participants</RouteNavItem>
        <RouteNavItem key={6} id="detailsnav3" onClick={this.handleRegistrationClick}>Registration</RouteNavItem>
        <RouteNavItem key={7} id="detailsnav4" onClick={this.handleScientificClick}>Scientific</RouteNavItem>
        <RouteNavItem key={8} id="detailsnav5" onClick={this.handleTourismClick}>Tourism</RouteNavItem>
      </div>
    );
  }
}
