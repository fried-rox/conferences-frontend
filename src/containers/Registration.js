import React, { Component } from "react";
import { Button, Tabs, Tab, FormGroup, Checkbox, FormControl, ControlLabel  } from "react-bootstrap";
// import { Link } from "react-router-dom";

// import LoaderButton from "../components/LoaderButton";
import ConfNavbar from "./ConfNavbar";
// import config from "../config";
import { invokeApig } from "../libs/awsLib";

import '../css/Registration.css';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      regcategories: [],
      conference: [],
      regCatIds: [],
      confTitle: "",
      confTitleAbr: "",
      conferenceId: "",
      regTypeFullName: "",
      regTypeAbbrName: "",
      regTypeCurrency: "",
      regTypeLanguage: "",
      regTypeUsePackage: "",
      regTypeAddScience: "",
      regTypeAddTours: "",
      regTypeAddAccommodation: "",
      regTypeAddAP: "",
      regTypePaymentMethod: "",
      regTypeQuestions: "",
      regTypeNotes: "",
      regTypeMailing: "",
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
    return invokeApig({ path: "/regcategories" })
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
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  render() {
    return (
      <div className="registrationdetailsall">

        <ConfNavbar {...this.props} />


        <div className="RegistrationDetails">

          <div className="RegandTitle">

            <h2> {this.state.confTitle} </h2>

            <Tabs defaultActiveKey={1} id="RegistrationControl">
              <Tab eventKey={1} title="Registration Types">
                <Button
                  id="newregcat"
                  key="newregcat" >
                    <span className="glyphicon glyphicon-plus"></span> New Reg Type
                </Button>
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
                  <h3>Include in registration:</h3>
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
              </Tab>
              <Tab eventKey={2} title="Registration Categories">
              </Tab>
            </Tabs>

          </div>



        </div>

      </div>
    );
  }
}

// <div className="buttonsformore">
//   <Button
//     id="settings">
//       <span className="glyphicon glyphicon-cog"></span> Settings
//   </Button>
//   <Button
//     id="newregcat"
//     key="newregcat"
//     href={`/conferences/${this.state.confTitleAbr}/registration_new`}
//     onClick={this.handleRegCatClick} >
//       <span className="glyphicon glyphicon-plus"></span> New Reg Cat
//   </Button>
// </div>
