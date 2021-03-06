import React, { Component } from 'react';
import { Table, Button, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';
import DayPicker from 'react-day-picker';

import isNil from "lodash/fp/isNil";

import { invokeApig } from '../libs/awsLib';
import LoaderButton from '../components/LoaderButton';
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
      notes: '',
      showModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
        notes: results.notes
      });
    } catch (e) {
      alert(e);
    }
  }

  validateForm() {
    return this.state.confTitle.length > 0;
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

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem('confIdKey')}` });
  }

  getContexts() {
    return invokeApig({ path: '/regcontexts' })
  }

  // handleConferenceClick = event => {
  //   event.preventDefault();
  //   this.props.history.push(`/conferences/${this.state.confAbbr}/update`);
  // }

  handleConferenceClick2 = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  // handleConferenceContext = event => {
  //   event.preventDefault();
  //   this.props.history.push(`/conferences/${this.state.confAbbr}/reg_context`);
  // }

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

        <div className="DetailsTitle">

          <div className="conferenceDetails">
            <h1> {this.state.confTitle} </h1>
            <h2> Conference Details </h2>
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
            <h2>Registration details</h2>
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
            <h2>Registration Categories</h2>
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
              id="confsettings">
              <span className="glyphicon glyphicon-cog"></span> Settings
            </Button>
            <Button
              id="update"
              onClick={this.handleClick} >
              <span className="glyphicon glyphicon-pencil"></span> Edit Conference
            </Button>
          </div>

        </div>

        {this.state.showModal ?
          <div className="registration-modal__container">
            <div className="registration-modal" ref={node => (this.node = node)}>
              <Button className="modal_exitButton" onClick={this.closeModal}>x</Button>
              <div className="inner-registration-modal">
                <h2>Update Conference Details</h2>
                <form>
                  <FormGroup controlId="confTitle">
                    <ControlLabel>Conference Title</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.confTitle}
                      type="text"/>
                  </FormGroup>
                  <FormGroup controlId="confAbbr">
                    <ControlLabel>Conference Abbreviated Name</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.confAbbr}
                      type="text"/>
                  </FormGroup>
                  <FormGroup controlId="projectManager">
                    <ControlLabel>Project Manager</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.projectManager}
                      componentClass="select">
                      <option value="John Smith">John Smith</option>
                      <option value="Mary Murphy">Mary Murphy</option>
                    </FormControl>
                  </FormGroup>
                  <FormGroup controlId="accountClient">
                    <ControlLabel>Account Client</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.accountClient}
                      type="text"/>
                  </FormGroup>
                  <FormGroup controlId="confVenue">
                    <ControlLabel>Conference Venue</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.confVenue}
                      type="text"/>
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Conference dates</ControlLabel>
                    <br />
                    <DayPicker
                      onDayClick={this.handleDayClick}
                      selectedDays={this.state.selectedDay} />
                  </FormGroup>
                  <FormGroup controlId="regAccess">
                    <Checkbox>Allow Registration</Checkbox>
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Registration Early Bird Dates</ControlLabel>
                    <br />
                    <ControlLabel>Registration Normal Dates</ControlLabel>
                    <br />
                  </FormGroup>
                  <FormGroup controlId="confLanguage">
                    <ControlLabel>Language</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.confLanguage}
                      componentClass="select">
                      <option value="English">English</option>
                      <option value="Hebrew">Hebrew</option>
                    </FormControl>
                  </FormGroup>
                  <FormGroup controlId="confCurrency">
                    <ControlLabel>Currency</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.confCurrency}
                      componentClass="select">
                      <option value="dollar">Dollar</option>
                      <option value="shekel">Shekel</option>
                      <option value="euro">Euro</option>
                    </FormControl>
                  </FormGroup>
                  <FormGroup controlId="confExRate">
                    <ControlLabel>Exchange Rate</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.confExRate}
                      type="text" />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Mailing</ControlLabel>
                  </FormGroup>
                  <FormGroup controlId="notes">
                    <ControlLabel>Notes</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.notes}
                      componentClass="textarea" />
                  </FormGroup>
                  {this.state.conference.confGraphic &&
                    <FormGroup >
                      <ControlLabel>Conference Banner</ControlLabel>
                      <FormControl.Static>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={this.state.conference.confGraphic}
                        >
                          {this.formatFilename(this.state.conference.confGraphic)}
                        </a>
                      </FormControl.Static>
                    </FormGroup>}
                  <FormGroup controlId="file">
                    {!this.state.conference.confGraphic &&
                      <ControlLabel>Conference Banner</ControlLabel>}
                    <FormControl onChange={this.handleFileChange} type="file" />
                  </FormGroup>

                  <div className="button-panel">
                    <LoaderButton
                      className="save-button"
                      bsSize="large"
                      disabled={!this.validateForm()}
                      type="submit"
                      isLoading={this.state.isLoading}
                      text="Save"
                      loadingText="Saving…"
                    />
                    <LoaderButton
                      className="delete-button"
                      bsSize="large"
                      isLoading={this.state.isDeleting}
                      onClick={this.handleDelete}
                      text="Delete"
                      loadingText="Deleting…"
                    />
                  </div>

                </form>
              </div>
            </div>
          </div>
        : null}

      </div>
  );
  }
}
