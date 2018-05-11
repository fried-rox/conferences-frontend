import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button, Table } from "react-bootstrap";

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
      confTitle: "",
      participants: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.getConference();
      const parresults = await this.participants();
      debugger;
      this.setState({
        conference: results,
        confTitle: results.confTitle,
        participants: parresults
      });
      debugger;
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem('confIdKey')}` });
  }

  participants() {
    return invokeApig({ path: "/participants" });
  }

  searchList(event) {
    this.setState({search: event.target.value});
  }

  participantsList(participants) {
    return participants.map(
      (participant) =>
        participant.conferenceId === localStorage.getItem('confIdKey')
          ? <ListGroupItem
              id="parConfList"
              key={participant.participantId}>
              <Table>
                <thead>
                  <tr>
                    <th>Full Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{participant.parTitle} {participant.parFirstName} {participant.parMiddleName} {participant.parLastName}</th>
                  </tr>
                </tbody>
              </Table>
            </ListGroupItem>
          : null
    );
  }

  // handleParticipantClick = event => {
  //   event.preventDefault();
  //   this.props.history.push(`/participants/${participant.participantId}`);
  // }

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
            </div>

            <div className="ParticipantsFullList">
              <ListGroup id="participant-list">
                {this.participantsList(this.state.participants)}
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
