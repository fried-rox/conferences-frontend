import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Checkbox, PageHeader } from 'react-bootstrap';

// import LoaderButton from "../components/LoaderButton";
// import config from "../config";
import { invokeApig } from '../libs/awsLib';

// import "react-day-picker/lib/style.css";

// import "../css/NewConference.css";

export default class NewConference extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      regcategories: [],
      conference: [],
      regCatIds: [],
      confTitle: '',
      confTitleAbr: '',
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
      const results = await this.regCategories();
      debugger;
      this.setState({
        regcategories: results,
        conference: confreg,
        confTitle: confreg.confTitle,
        confTitleAbr: confreg.confAbbr
      });
    } catch (e) {
      alert(e);
    }
  }

  regCategories() {
    return invokeApig({ path: '/regcategories' })
  }

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem('confIdKey')}` });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleRegCatClick = event => {
    event.preventDefault();
    debugger;
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  render() {
    return (
      <div className="NewConferenceDetails">
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
          <Checkbox controlid="addScience">Scientific</Checkbox>
          <Checkbox controlid="addTours">Tourism</Checkbox>
          <Checkbox controlid="addHotel">Accommodation</Checkbox>
          <Checkbox controlid="addAP">Accompanying person</Checkbox>
          <Checkbox controlid="attendParts">Allow participants to attend part of the conference</Checkbox>
          <h3>Payment Options</h3>
          <FormGroup controlId="regCurrency">
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
            <Checkbox controlid="payCash" >Cash</Checkbox>
            <Checkbox controlid="payCheque">Cheque</Checkbox>
            <Checkbox controlid="payCard">Credit Card</Checkbox>
            <Checkbox controlid="payGuard">Credit Guard</Checkbox>
            <Checkbox controlid="payEFT">Bank Transfer</Checkbox>
          </FormGroup>
          <FormGroup controlId="regNotes">
            <ControlLabel>Notes</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.regTypeNotes}
              componentClass="textarea"/>
          </FormGroup>
        </form>

      </div>
    );
  }
}
