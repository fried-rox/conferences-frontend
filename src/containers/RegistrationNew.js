import React, { Component } from "react";
import { FormGroup, Checkbox, FormControl, ControlLabel } from "react-bootstrap";

import LoaderButton from "../components/LoaderButton";
import ConfNavbar from "./ConfNavbar";
// import config from "../config";
import { invokeApig } from "../libs/awsLib";

import '../css/RegistrationNew.css';

export default class RegistrationNew extends Component {
  constructor(props) {
    super(props);

    this.state= {
      isLoading: false,
      conference: [],
      confTitle: "",
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
      regcategory: null
    };
  }

  async componentDidMount() {
    try {
      const confreg = await this.getConference();
      this.setState({
        conference: confreg,
        confTitle: confreg.confTitle
      });
    } catch (e) {
      alert(e);
    }
  }

  // validateForm(){
  //   return this.state.regFullName.length > 0 && this.state.regAbbrName.length > 0
  // }

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem('confIdKey')}` });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // regIncludes(event) {
  //   debugger;
  //   const box = document.getElementById(event.target.id);
  //   const boxChecked = box.checked;
  //   debugger;
  //   if (boxChecked === "true") {
  //     this.setState({
  //       [box.id]: boxChecked
  //     });
  //   } else return;
  // }


  // handleSubmit = async event => {
  //   event.preventDefault();
  //
  //   this.setState({ isLoading: true });
  //
  //   try {
  //     const createRegCategoryObject = {
  //       conferenceId: this.props.match.params.id,
  //       regFullName: this.state.regFullName === "" ? undefined : this.state.regFullName,
  //       regAbbrName: this.state.regAbbrName === "" ? undefined : this.state.regAbbrName,
  //       regCurrency: this.state.regCurrency === "" ? undefined : this.state.regCurrency,
  //       regLanguage: this.state.regLanguage === "" ? undefined : this.state.regLanguage,
  //       addScience: this.state.addScience === "" ? undefined : this.state.addScience,
  //       addTours: this.state.addTours === "" ? undefined : this.state.addTours,
  //       addHotel: this.state.addHotel === "" ? undefined : this.state.addHotel,
  //       addAP: this.state.addAP === "" ? undefined : this.state.addAP,
  //       regFee: this.state.regFee === "" ? undefined : this.state.regFee,
  //       payCash: this.state.payCash === "" ? undefined : this.state.payCash,
  //       payCheque: this.state.payCheque === "" ? undefined : this.state.payCheque,
  //       payCard: this.state.payCard === "" ? undefined : this.state.payCard,
  //       payGuard: this.state.payGuard === "" ? undefined : this.state.payGuard,
  //       payEFT: this.state.payEFT === "" ? undefined : this.state.payEFT,
  //       regNotes: this.state.regNotes === "" ? undefined : this.state.regNotes,
  //     }
  //
  //     console.log(createRegCategoryObject);
  //
  //     await this.createRegCategory(createRegCategoryObject);
  //     this.props.history.push(`/conferences/${localStorage.getItem('confIdKey')}/registration`);
  //   } catch (e) {
  //     alert(e);
  //     this.setState({ isLoading: false });
  //   }
  // }
  //
  // createRegCategory(regcategory) {
  //   return invokeApig({
  //     path: "/regcategories",
  //     method: "POST",
  //     body: regcategory
  //   });
  // }

  render() {
    return (
      <div className="NewRegCat">

        <ConfNavbar {...this.props} />

        <div className="regcategories">

          <h2> {this.state.confTitle} </h2>

          <h3>Registration Categories</h3>

          <form>
            <FormGroup controlId="regType">
              <ControlLabel>Registration Type</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.regType}
                type="select">
                  <option value="default">Default</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="regFullName">
              <ControlLabel>Categroy Name</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.regFullName}
                type="text" />
            </FormGroup>
            <FormGroup controlId="regAbbrName">
              <ControlLabel>Abbreviated Name</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.regAbbrName}
                type="text" />
            </FormGroup>
            <FormGroup controlId="regCurrency">
              <ControlLabel>Currency</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.regCurrency}
                componentClass="select">
                  <option value="dollar">Dollar</option>
                  <option value="shekel">Shekel</option>
                  <option value="euro">Euro</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="regLanguage">
              <ControlLabel>Language</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.regLanguage}
                componentClass="select">
                  <option value="English">English</option>
                  <option value="Hebrew">Hebrew</option>
              </FormControl>
            </FormGroup>
            <div id="regIncludes">
              <ControlLabel>Form to include:</ControlLabel>
              <div>
                <input type="checkbox" id="addScience" value=""/>
                <label id="addScience"> Scientific</label>
              </div>
              <div>
                <input type="checkbox" id="addTours" value="Tourism" />
                <label id="addTours"> Tourism</label>
              </div>
              <div>
                <input type="checkbox" id="addHotel" value="Accommodation" />
                <label id="addHotel"> Accommodation</label>
              </div>
              <div>
                <input type="checkbox" id="addAP" value="Accompanyingperson" />
                <label id="addAP"> Accompanying person</label>
              </div>
            </div>
            <FormGroup controlId="regFee">
              <ControlLabel>Registration Fee</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.regFee}
                type="text"/>
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
                value={this.state.regNotes}
                componentClass="textarea"/>
            </FormGroup>
            <LoaderButton
              className="reg-create-button"
              block
              bsSize="large"
              // disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving..."
            />
          </form>
        </div>

      </div>
    );
  }
}
