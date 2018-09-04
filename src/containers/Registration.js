import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import SimpleModalLauncher from '../components/ModalLauncher';
import LoaderButton from "../components/LoaderButton";
import ConfNavbar from './ConfNavbar';
// import config from "../config";
import { invokeApig } from '../libs/awsLib';

import '../css/Registration.css';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      conferences: [],
      confTitle: '',
      confAbbr: '',
      conferenceId: '',
      regTypeContexts: [],
      regCategoryContext: '',
      regCategoryName: '',
      regCategoryPrice: '',
      regCategoryNotes: '',
      value: null
    };
  }

  async componentDidMount() {
    try {
      const results = await this.getConference();
      const regContexts = await this.getRegContext();

      this.setState({
        conferences: results,
        confTitle: results.confTitle,
        confAbbr: results.confAbbr,
        regTypeContexts: regContexts
      });
    } catch (e) {
      alert(e);
    }
  }

  getRegContext() {
    return invokeApig({ path: '/regcontexts' })
  }

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem('confIdKey')}` });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  regContextDropdown(regTypeContexts) {
    return regTypeContexts.map(
      (regTypeContext, i) =>
        <option>
          {regTypeContexts[i].regTypeFullName}
        </option>
    );
  }


  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const createRegCategoryObject = {
        conferenceId: localStorage.getItem('confIdKey'),
        regCategoryContext: this.state.regCategoryContext === '' ? undefined : this.state.regCategoryContext,
        regCategoryName: this.state.regCategoryName === '' ? undefined : this.state.regCategoryName,
        regCategoryPrice: this.state.regCategoryPrice === '' ? undefined : this.state.regCategoryPrice,
        regCategoryNotes: this.state.regCategoryNotes === '' ? undefined : this.state.regCategoryNotes
      }

      console.log(createRegCategoryObject);

      await this.createRegCategory(createRegCategoryObject);

    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createRegCategory(regcategory) {
    return invokeApig({
      path: '/regcategories',
      method: 'POST',
      body: regcategory
    });
  }

  render() {
    return (
      <div className="registrationdetailsall">

        <ConfNavbar {...this.props} />

        <div className="RegistrationDetails">

          <div className="RegandTitle">

            <h2> {this.state.confTitle} </h2>

            <h3>Registration Categories</h3>

          </div>

          <div className="buttonsformore">
            <SimpleModalLauncher
              buttonLabel= "+ New Category">
              <div>
                <h2>Registration Category</h2>
                <form onSubmit={this.handleSubmit}>
                  <FormGroup controlId="regCategoryContext">
                    <ControlLabel>Registration Context</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      componentClass="select">
                        <option></option>
                        {this.regContextDropdown(this.state.regTypeContexts)}
                    </FormControl>
                  </FormGroup>
                  <FormGroup controlId="regCategoryName">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.regCategoryName}
                      type="text" />
                  </FormGroup>
                  <FormGroup controlId="regCategoryPrice">
                    <ControlLabel>Price</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.regCategoryPrice}
                      type="text" />
                  </FormGroup>
                  <FormGroup controlId="regCategoryNotes">
                    <ControlLabel>Notes</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.regCategoryNotes}
                      type="textarea" />
                  </FormGroup>
                  <LoaderButton
                    className="create-reg-button"
                    block
                    bsSize="large"
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Create Category"
                    loadingText="Creating…"
                  />
                </form>
              </div>
            </SimpleModalLauncher>
          </div>

        </div>

      </div>
    );
  }
}
