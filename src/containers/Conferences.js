import React, { Component } from 'react';
import { Table, Button, PageHeader, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';
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
      showModal2: false,
      conferenceId: '',
      regTypeFullName: '',
      regTypeAbbrName: '',
      regTypeCurrency: '',
      regTypeLanguage: '',
      regTypeUsePackage: '',
      regTypeAddScience: '',
      regTypeAddTours: '',
      regTypeAddAccommodation: '',
      regTypeAddAP: '',
      regTypePaymentMethod: '',
      regTypeQuestions: '',
      regTypeNotes: '',
      regTypeMailing: '',
    };

    this.openModal = this.openModal.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModal2 = this.closeModal2.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleOutsideClick2 = this.handleOutsideClick2.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
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

  handleClick2() {
    if (!this.state.showModal2) {
      document.addEventListener("click", this.handleOutsideClick2, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick2, false);
    }

    this.setState(prevState => ({
      showModal2: !prevState.showModal2,
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

  handleOutsideClick2(e) {
    if (!isNil(this.node2)) {
      if (this.node2.contains(e.target)) {
        return;
      }

      this.handleClick2();
    }
  }

  openModal() {
    this.setState({
      showModal: true
    })
  }

  openModal2() {
    this.setState({
      showModal2: true
    })
  }

  closeModal() {
    this.setState({
      showModal: false
    })
  }

  closeModal2() {
    this.setState({
      showModal2: false
    })
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

        <div className="DetailsTitle">

          <div className="buttonsformore">
            <Button
              id="update"
              onClick={this.handleClick} >
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
          </div>

          <div className="Details">
            <h2> {this.state.confTitle} </h2>

            <div className="conferenceDetails">
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
                      value={this.state.confTitle}
                      onChange={this.handleChange}
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

          {this.state.showModal2 ?
            <div className="regtype-modal__container">
              <div className="regtype-modal" ref={node2 => (this.node2 = node2)}>
                <Button className="regtype-modal_exitButton" onClick={this.closeModal2}>x</Button>
                <div className="inner-regtype-modal">
                  <PageHeader>Registration Contexts</PageHeader>
                  <h2>Details</h2>
                  <form>
                    <h3>Naming</h3>
                    <FormGroup controlId="regTypeFullName">
                      <ControlLabel>Full Name</ControlLabel>
                      <FormControl
                        onChange={this.handleChange}
                        value={this.state.regTypeFullName}
                        type="text" />
                    </FormGroup>
                    <FormGroup controlId="regTypeAbbrName">
                      <ControlLabel>Abbreviated Name</ControlLabel>
                      <FormControl
                        onChange={this.handleChange}
                        value={this.state.regTypeAbbrName}
                        type="text" />
                    </FormGroup>
                    <h3>General</h3>
                    <Checkbox controlid="addHebrew">Hebrew interface</Checkbox>
                    <Checkbox controlid="addRegistration">Add Registration</Checkbox>
                    <Checkbox controlid="onlyoneregoption">Allow only one registration date</Checkbox>
                    <Checkbox controlid="addScience">Add Scientific</Checkbox>
                    <Checkbox controlid="addTours">Add Tourism</Checkbox>
                    <Checkbox controlid="addHotel">Accommodation</Checkbox>
                    <Checkbox controlid="addAP">Allow accompanying person</Checkbox>
                    <Checkbox controlid="attendParts">Allow participants to attend part of the conference</Checkbox>
                    <h3>Payment Options</h3>
                    <FormGroup controlId="regTypeCurrency">
                      <ControlLabel>Currency</ControlLabel>
                      <FormControl
                        onChange={this.handleChange}
                        value={this.state.regTypeCurrency}
                        componentClass="select">
                        <option value="dollar">Dollar</option>
                        <option value="shekel">Shekel</option>
                        <option value="euro">Euro</option>
                      </FormControl>
                    </FormGroup>
                    <FormGroup controlId="regPayment">
                      <ControlLabel>Payment Method</ControlLabel>
                      <div>
                        <Checkbox controlid="payCash">Cash</Checkbox>
                        <Checkbox controlid="payCheque">Cheque</Checkbox>
                        <Checkbox controlid="payCard">Credit Card</Checkbox>
                        <Checkbox controlid="payGuard">Credit Guard</Checkbox>
                        <Checkbox controlid="payEFT">Bank Transfer</Checkbox>
                      </div>
                    </FormGroup>
                    <Checkbox controlid="paymentInPayments">Allow participants to pay less than the amount due</Checkbox>
                    <h3>Custom Questions</h3>
                    <h3>Custom Messages</h3>
                    <h3>Extras</h3>
                    <FormGroup controlId="regNotes">
                      <ControlLabel>Notes</ControlLabel>
                      <FormControl
                        onChange={this.handleChange}
                        value={this.state.regTypeNotes}
                        componentClass="textarea"/>
                    </FormGroup>
                    <LoaderButton
                      className="create-reg-button"
                      block
                      bsSize="large"
                      disabled={!this.validateForm()}
                      type="submit"
                      isLoading={this.state.isLoading}
                      text="Create Context"
                      loadingText="Creating…"
                    />
                  </form>
                </div>
              </div>
            </div>
          : null}

      </div>
  );
  }
}
