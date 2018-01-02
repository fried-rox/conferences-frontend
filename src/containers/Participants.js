import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem, Button } from "react-bootstrap";

import ConfNavbar from "./ConfNavbar";
import { invokeApig } from '../libs/awsLib';

import './Participants.css';

export default class Participants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      participants: [],
      search: '',
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.participants();
      this.setState({ participants: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
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
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  // renderParticipants(participants) {
  //   let filteredParticipants = this.state.participants.filter(
  //     (participant) => {
  //       return participant.parLastName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
  //     }
  //   );
  // }

  render() {
    return (
      <div>
        <ConfNavbar {...this.props} />

        <PageHeader id="parHeader">Participants</PageHeader>

        <div className="participants">
          <Button
            className="newpar"
            key="new"
            href="/participants/new"
            onClick={this.handleParticipantClick} >
              <b>{"\uFF0B"}</b> Create a new participant
          </Button>
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
    );
  }
}
