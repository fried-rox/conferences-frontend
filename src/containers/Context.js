import React, { Component } from 'react';
import { FormGroup, Button, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';

import LoaderButton from "../components/LoaderButton";
// import config from "../config";
import { invokeApig } from '../libs/awsLib';
import ConfNavbar from './ConfNavbar';

// import "react-day-picker/lib/style.css";

import "../css/Context.css";

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
          conferenceId: localStorage.getItem('confIdKey'),
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
      <div className="contextdetailsall">
        <ConfNavbar {...this.props} />
        <div className="ContextTitle">

          <div className="buttonsformore">
            <Button
              id="newcontext"
              onClick={this.handleClick2}>
              <span className="glyphicon glyphicon-plus"></span> New Reg Type
            </Button>
            <Button
              id="settings">
              <span className="glyphicon glyphicon-cog"></span> Settings
            </Button>
          </div>

          <div className="contextinfo">
            <h2> {this.state.confTitle} </h2>

            <div className="contextDetails">
              <h3>Registration Contexts</h3>
              <form onSubmit={this.handleSubmit}>
                <h4>Naming</h4>
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
                <h4>General</h4>
                <Checkbox controlid="addHebrew">Hebrew interface</Checkbox>
                <Checkbox controlid="addRegistration">Add Registration</Checkbox>
                <Checkbox controlid="onlyoneregoption">Allow only one registration date</Checkbox>
                <Checkbox controlid="addScience">Add Scientific</Checkbox>
                <Checkbox controlid="addTours">Add Tourism</Checkbox>
                <Checkbox controlid="addHotel">Accommodation</Checkbox>
                <Checkbox controlid="addAP">Allow accompanying person</Checkbox>
                <Checkbox controlid="attendParts">Allow participants to attend part of the conference</Checkbox>
                <h4>Payment Options</h4>
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
                <h4>Custom Questions</h4>
                <h4>Custom Messages</h4>
                <h4>Extras</h4>
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

      </div>
    );
  }
}
