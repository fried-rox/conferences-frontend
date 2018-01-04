import React, { Component } from "react";
import { Table, Nav, Navbar } from "react-bootstrap";

import { invokeApig } from "../libs/awsLib";
import ConfNavbar from './ConfNavbar';
import RouteNavItem from "../components/RouteNavItem";

import "./Conferences.css";

export default class Conferences extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      conference: null,
      confTitle: "",
      confAbbr: "",
      projectManager: "",
      accountClient: "",
      confVenue: "",
      confStartDate: "",
      confEndDate: "",
      regAccess: "",
      regEarlyStart: "",
      regNormalStart: "",
      regNormalEnd: "",
      confLanguage: "",
      confCurrency: "",
      confExRate: "",
      notes: "",
    };
  }

  async componentDidMount() {
    try {
      const results = await this.getConference();
      this.setState({
        conference: results,
        confTitle: results.confTitle,
        confAbbr: results.confAbbr,
        projectManager: results.projectManager,
        accountClient: results.accountClient,
        confVenue: results.confVenue,
        confStartDate: results.confStartDate,
        confEndDate: results.confEndDate,
        regAccess: results.regAccess,
        regEarlyStart: results.regEarlyStart,
        regNormalStart: results.regNormalStart,
        regNormalEnd: results.regNormalEnd,
        confLanguage: results.confLanguage,
        confCurrency: results.confCurrency,
        confExRate: results.confExRate,
        notes: results.notes,
      });
    } catch (e) {
      alert(e);
    }
  }

  getConference() {
    return invokeApig({ path: `/conferences/${this.props.match.params.id}` });
  }

  handleConferenceClick = event => {
    event.preventDefault();
    this.props.history.push(`/conferences/${this.props.match.params.id}/update`);
  }

  render() {
    return (
      <div>
        <ConfNavbar id="confnavbar" {...this.props} />

        <div>
          <Navbar flex-column>
            <Nav>
              <RouteNavItem id="confdetailsnav">Settings</RouteNavItem>
              <br />
              <RouteNavItem key={this.state.conferenceId} id="confdetailsnav" onClick={this.handleConferenceClick}>Edit Details</RouteNavItem>
            </Nav>
          </Navbar>
        </div>

        <div className="conferences">
          <h2> {this.state.confTitle} </h2>
          <h3> Conference Details </h3>
          <div>
            <Table responsive>
              <tbody>
                <tr>
                  <td>Conference Title</td>
                  <td> {this.state.confTitle} </td>
                </tr>
                <tr>
                  <td>Abbreviated title</td>
                  <td> {this.state.confAbbr} </td>
                </tr>
                <tr>
                  <td>Project Manager</td>
                  <td> {this.state.projectManager} </td>
                </tr>
                <tr>
                  <td>Account Client</td>
                  <td> {this.state.accountClient} </td>
                </tr>
                <tr>
                  <td>Conference Venue</td>
                  <td> {this.state.confVenue} </td>
                </tr>
                <tr>
                  <td>Conference Dates</td>
                  <td> {this.state.confStartDate} - {this.state.confEndDate} </td>
                </tr>
                <tr>
                  <td>Conference Language</td>
                  <td> {this.state.confLanguage} </td>
                </tr>
                <tr>
                  <td>Conference Currency</td>
                  <td> {this.state.confCurrency} with {this.state.confExRate} exchange rate </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <h3>Registration details</h3>
          <div>
            <Table responsive>
              <tbody>
                <tr>
                  <td>Registration</td>
                  <td> {this.state.regAccess} </td>
                </tr>
                <tr>
                  <td>Early Bird Dates</td>
                  <td> {this.state.regEarlyStart} </td>
                </tr>
                <tr>
                  <td>Registration Normal Dates</td>
                  <td> {this.state.regNormalStart} - {this.state.regNormalEnd} </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <h3>Registration Categories</h3>
          <div>
          </div>
        </div>
      </div>
    );
  }
}
