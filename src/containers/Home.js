import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem, Button } from "react-bootstrap";
//import Search from 'react-search'

import { invokeApig } from '../libs/awsLib';

import "../css/Home.css";

//import SearchNotes from "../components/SearchNotes";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      conferences: [],
      search: '',
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.conferences();
      this.setState({ conferences: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  conferences() {
    return invokeApig({ path: "/conferences" });
  }

  searchList(event) {
    this.setState({search: event.target.value});
  }

  // storeConfId() {
  //   localStorage.setItem('confId', conference.conferenceId);
  // }

  renderConferencesList(conferences) {
    return conferences.map(
      (conference) =>
         <ListGroupItem
            id={conference.conferenceId}
            key={conference.conferenceId}
            href={`/conferences/${conference.confAbbr}`}
            onClick={this.handleConferenceClick}
            header={conference.confTitle}>
              {"Created: " + new Date(conference.createdAt).toLocaleString()}
          </ListGroupItem>
    );
  }

  handleConferenceClick = event => {
    event.preventDefault();
    localStorage.setItem("confIdKey", event.currentTarget.id);
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Target Conferences Ltd</h1>
        <p>Online Managment System</p>
        <div>
          <Link to="/login" id="loginbtn">
            Click to Login
          </Link>
        </div>
      </div>
    );
  }

  renderConferences(conferences) {
    let filteredConferences = this.state.conferences.filter(
      (conference) => {
        return conference.confTitle.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return (
      <div className="conferences">

        <div className="confbuttonandsearch">
          <Button
            className="newconf"
            key="new"
            href="/conferences/new"
            onClick={this.handleConferenceClick} >
              <b>{"\uFF0B"}</b> Create a new conference
          </Button>
          <input id="confsearch"
            type="text"
            placeholder="Search list by name..."
            value={this.state.search}
            onChange={this.searchList.bind(this)} />
        </div>
        <PageHeader>Conferences and Groups</PageHeader>
        <ListGroup className="conference-list">
          {!this.state.isLoading && this.renderConferencesList(filteredConferences)}
        </ListGroup>

      </div>

    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderConferences() : this.renderLander()}
      </div>
    );
  }
}
