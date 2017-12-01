import React, { Component } from "react";
import { FormGroup, Checkbox, FormControl, ControlLabel, PageHeader } from "react-bootstrap";

import LoaderButton from "../components/LoaderButton";
import ConfNavbar from "./ConfNavbar";
// import config from "../config";
// import { invokeApig } from "../libs/awsLib";

import './Registration.css';

export default class Registration extends Component {

  render() {
    return (
      <div>
        <ConfNavbar {...this.props} />
        <div className="regcategories">
          <PageHeader>Registration Categories</PageHeader>
          <h3>Registration Category Details</h3>
          <form>
            <FormGroup controlId="regFullName">
              <ControlLabel>Full Name</ControlLabel>
              <FormControl
                type="text" />
            </FormGroup>
            <FormGroup controlId="regAbbrName">
              <ControlLabel>Abbreviated Name</ControlLabel>
              <FormControl
                type="text" />
            </FormGroup>
            <FormGroup controlId="regCurrency">
              <ControlLabel>Currency</ControlLabel>
              <FormControl
                componentClass="select">
                  <option value="dollar">Dollar</option>
                  <option value="shekel">Shekel</option>
                  <option value="euro">Euro</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="regLanguage">
              <ControlLabel>Language</ControlLabel>
              <FormControl
                componentClass="select">
                  <option value="English">English</option>
                  <option value="Hebrew">Hebrew</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="regIncludes">
              <ControlLabel>Include</ControlLabel>
              <Checkbox>Scientific</Checkbox>
              <Checkbox>Tourism</Checkbox>
              <Checkbox>Accomodation</Checkbox>
              <Checkbox>Accompanying person</Checkbox>
            </FormGroup>
            <FormGroup controlId="regFee">
              <ControlLabel>Registration Fee</ControlLabel>
              <FormControl
                type="text"/>
            </FormGroup>
            <FormGroup controlId="regPayment">
              <ControlLabel>Payment Method</ControlLabel>
              <Checkbox>Cash</Checkbox>
              <Checkbox>Cheque</Checkbox>
              <Checkbox>Credit Card</Checkbox>
              <Checkbox>Credit Guard</Checkbox>
              <Checkbox>Bank Transfer</Checkbox>
            </FormGroup>
            <FormGroup controlId="regNotes">
              <ControlLabel>Notes</ControlLabel>
              <FormControl
                componentClass="textarea"/>
            </FormGroup>
            <LoaderButton
              className="reg-create-button"
              block
              bsSize="large"
              type="submit"
              text="Save"
              loadingText="Saving..."
            />
          </form>
        </div>
      </div>
    );
  }
}
