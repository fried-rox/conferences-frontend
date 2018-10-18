import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Table } from 'react-bootstrap';

import isNil from "lodash/fp/isNil";

import ConfNavbar from './ConfNavbar';
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
      confTitle: '',
      participants: [],
      showModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.getConference();
      const parresults = await this.participants();

      this.setState({
        conference: results,
        confTitle: results.confTitle,
        participants: parresults
      });

    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem('confIdKey')}` });
  }

  handleClick() {
    if (!this.state.showModal) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  }

  handleOutsideClick(e) {
    if (!isNil(this.node)) {
      if (this.node.contains(e.target)) {
        return;
      }

      this.handleClick();
    }
  }

  openModal() {
    this.setState({
      showModal: true
    })
  }

  closeModal() {
    this.setState({
      showModal: false
    })
  }

  participants() {
    return invokeApig({ path: '/participants' });
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

          <div className="buttonsformore">
            <Button
              id="settings">
              <span className="glyphicon glyphicon-cog"></span> Settings
            </Button>
            <Button
              id="newpar"
              key="new"
              onClick={this.handleClick} >
              <span className="glyphicon glyphicon-plus"></span> New Participant
            </Button>
          </div>

          <div className="participants">

            <h2> {this.state.confTitle} </h2>

            <div className="participantsInfo">

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

          </div>

        </div>

        {this.state.showModal ?
          <div className="registration-modal__container">
            <div className="registration-modal" ref={node => (this.node = node)}>
              <Button className="modal_exitButton" onClick={this.closeModal}>x</Button>
              <div className="inner-registration-modal">
                <h2>new Participant</h2>
              </div>
            </div>
          </div>
        : null}

      </div>
  );
  }
}
