import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

import ConfNavbar from "./ConfNavbar";
import { invokeApig } from '../libs/awsLib';
// import RouteNavItem from "../components/RouteNavItem";

import '../css/Participants.css';

export default class Participants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      search: '',
      conference: null,
      confTitle: ""
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.getConference();
      this.setState({
        conference: results,
        confTitle: results.confTitle
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  getConference() {
    return invokeApig({ path: `/conferences/${this.props.match.params.id}` });
  }

  participants() {
    return invokeApig({ path: "/participants" });
  }

  searchList(event) {
    this.setState({search: event.target.value});
  }

  renderParticipantsList(participants) {
    return participants.map(
      (participant, i) =>
        i !== 0
          ? <ListGroupItem
              key={participant.participantId}
              href={`/participants/${participant.participantId}`}
              onClick={this.handleParticipantClick}
              header={participant.parLastName}>
                {"Created: " + new Date(participant.createdAt).toLocaleString()}
            </ListGroupItem>
          : null
    );
  }

  handleParticipantClick = event => {
    event.preventDefault();
    this.props.history.push("href");
  }

  render() {
    return (
      <div className="participantsdetails">

        <ConfNavbar {...this.props} />

        <div className="ParticipantsDetails">

          <div className="participants">

          <h2> {this.state.confTitle} </h2>

            <div className="parsearching">
              <h3>Participants</h3>
              <input id="parsearch"
                type="text"
                placeholder="Search list by name..."
                value={this.state.search}
                onChange={this.searchList.bind(this)} />
              <ListGroup className="participant-list">
                {!this.state.isLoading && this.renderParticipantsList}
              </ListGroup>
            </div>

          </div>

          <div className="buttonsformore">
            <Button
              id="settings">
                <span className="glyphicon glyphicon-cog"></span> Settings
            </Button>
            <Button
              id="newpar"
              key="new"
              href="/participants/new" >
              <span className="glyphicon glyphicon-plus"></span> New Participant
            </Button>
          </div>

        </div>

      </div>
    );
  }
}
