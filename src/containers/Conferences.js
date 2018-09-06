import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

import { invokeApig } from '../libs/awsLib';
import ConfNavbar from './ConfNavbar';
// import RouteNavItem from "../components/RouteNavItem";

import '../css/Conferences.css';

export default class Conferences extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      conference: [],
      regcontexts: [],
      regcontextids: [],
      confTitle: '',
      confAbbr: '',
      projectManager: '',
      accountClient: '',
      confVenue: '',
      confStartDate: '',
      confEndDate: '',
      regAccess: '',
      regEarlyStart: '',
      regNormalStart: '',
      regNormalEnd: '',
      confLanguage: '',
      confCurrency: '',
      confExRate: '',
      notes: ''
    };
  }

  async componentDidMount() {
    try {
      const results = await this.getConference();
      const regresults = await this.getContexts();
      this.setState({
        regcontexts: regresults,
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

  getContexts() {
    return invokeApig({ path: '/regcontexts' })
  }

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem('confIdKey')}` });
  }

  handleConferenceClick = event => {
    event.preventDefault();
    this.props.history.push(`/conferences/${this.state.confAbbr}/update`);
  }

  handleConferenceClick2 = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  handleConferenceContext = event => {
    event.preventDefault();
    this.props.history.push(`/conferences/${this.state.confAbbr}/reg_context`);
  }

  createURL() {
    const path1 = window.location.pathname;
    return path1;
  }

  conferenceGoersLink() {
    const domain = `http://localhost:3001/login/${localStorage.getItem('confIdKey')}`;
    window.open(domain);
  }

  regContextList(regcontexts) {
    return regcontexts.map(
      (regcontext, i) =>
        regcontext.conferenceId === localStorage.getItem('confIdKey')
          ? <tbody key={i.toString()}>
            <tr>
              <td>{regcontext.regTypeFullName}</td>
              <td>
                <a
                    id="regcatlist"
                    key={regcontext.regContextId}
                    onClick={this.conferenceGoersLink}>
                  {this.createURL()}
                </a>
              </td>
            </tr>
          </tbody>
          : null
    );
  }

  regContextsIds(regcontexts) {
    regcontexts.map(
      (regcontext) =>
        regcontext.conferenceId === localStorage.getItem('confIdKey')
          ? this.state.regcontextids.push(regcontext.regContextId)
          : null
    );
  }

  render() {
    return (
      <div className="conferencedetailsall">

        <ConfNavbar {...this.props} />

        <div className="Details">

          <div className="conferenceDetails">
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
            <div className="regcontextsview">
              <Table className="regcontexts" hover>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Website Link</th>
                  </tr>
                </thead>
                {this.regContextList(this.state.regcontexts)}
              </Table>
              <div>
                {this.regContextsIds(this.state.regcontexts)}
              </div>
            </div>
          </div>

          <div className="buttonsformore">
            <Button
              id="update"
              key={this.state.conferenceId}
              onClick={this.handleConferenceClick} >
              <span className="glyphicon glyphicon-pencil"></span> Edit Conference
            </Button>
            <Button
              id="settings">
              <span className="glyphicon glyphicon-cog"></span> Settings
            </Button>
            <Button
              id="newconf"
              key="new"
              href="/conferences/new"
              onClick={this.handleConferenceClick2} >
              <span className="glyphicon glyphicon-plus"></span> New Conference
            </Button>
            <Button
              id="newcontext"
              key="newcontext"
              onClick={this.handleConferenceContext}>
              <span className="glyphicon glyphicon-plus"></span> New Reg Type
            </Button>
          </div>

        </div>

      </div>
  );
  }
}
