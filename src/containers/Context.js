import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Checkbox, PageHeader } from 'react-bootstrap';

import LoaderButton from "../components/LoaderButton";
// import config from "../config";
import { invokeApig } from '../libs/awsLib';

// import "react-day-picker/lib/style.css";

// import "../css/NewConference.css";

export default class NewContext extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
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
      value: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      const confreg = await this.getConference();
      this.setState({
        conference: confreg,
        confTitle: confreg.confTitle,
        confTitleAbr: confreg.confAbbr
      });
    } catch (e) {
      alert(e);
    }
  }

  validateForm() {
    return this.state.regTypeFullName.length > 0 && this.state.regTypeAbbrName.length > 0;
  }

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem('confIdKey')}` });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
        const createRegContextObject = {
          confTitle: this.state.confTitle,
          regTypeFullName: this.state.regTypeFullName === '' ? undefined : this.state.regTypeFullName,
          regTypeAbbrName: this.state.regTypeAbbrName === '' ? undefined : this.state.regTypeAbbrName,
          regTypeCurrency: this.state.regTypeCurrency === '' ? undefined : this.state.regTypeCurrency,
          regTypeLanguage: this.state.regTypeLanguage === '' ? undefined : this.state.regTypeLanguage,
          regTypeUsePackage: this.state.regTypeUsePackage === '' ? undefined : this.state.regTypeUsePackage,
          regTypeAddScience: this.state.regTypeAddScience === '' ? undefined : this.state.regTypeAddScience,
          regTypeAddTours: this.state.regTypeAddTours === '' ? undefined : this.state.regTypeAddTours,
          regTypeAddAccommodation: this.state.regTypeAddAccommodation === '' ? undefined : this.state.regTypeAddAccommodation,
          regTypeAddAP: this.state.regTypeAddAP === '' ? undefined : this.state.regTypeAddAP,
          regTypePaymentMethod: this.state.regTypePaymentMethod === '' ? undefined : this.state.regTypePaymentMethod,
          regTypeQuestions: this.state.regTypeQuestions === '' ? undefined : this.state.regTypeQuestions,
          regTypeNotes: this.state.regTypeNotes === '' ? undefined : this.state.regTypeNotes,
          regTypeMailing: this.state.regTypeMailing === '' ? undefined : this.state.regTypeMailing
        }

      console.log(createRegContextObject);

      await this.createContext(createRegContextObject);
      this.props.history.push(`/conferences/${this.state.confAbbr}/registration`);
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createContext(context) {
    return invokeApig({
      path: '/regcontexts',
      method: 'POST',
      body: context
    });
  }

  render() {
    return (
      <div className="NewConferenceDetails">
        <h1> {this.state.confTitle} </h1>
        <PageHeader>Registration Contexts</PageHeader>
        <h2>Details</h2>
        <form onSubmit={this.handleSubmit}>
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
    );
  }
}
