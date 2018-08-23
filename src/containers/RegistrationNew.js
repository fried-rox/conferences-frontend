import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import LoaderButton from "../components/LoaderButton";
import ConfNavbar from './ConfNavbar';
// import config from "../config";
import { invokeApig } from '../libs/awsLib';

import '../css/RegistrationNew.css';

export default class RegistrationNew extends Component {
  constructor(props) {
    super(props);

    this.state= {
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

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem('confIdKey')}` });
  }

  getRegContext() {
    return invokeApig({ path: '/regcontexts' })
  }

  regContextDropdown(regTypeContexts) {
    return regTypeContexts.map(
      (regTypeContext, i) =>
        <option>
          {regTypeContexts[i].regTypeFullName}
        </option>
    );
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
      const createRegCategoryObject = {
        conferenceId: localStorage.getItem('confIdKey'),
        regCategoryContext: this.state.regCategoryContext === '' ? undefined : this.state.regCategoryContext,
        regCategoryName: this.state.regCategoryName === '' ? undefined : this.state.regCategoryName,
        regCategoryPrice: this.state.regCategoryPrice === '' ? undefined : this.state.regCategoryPrice,
        regCategoryNotes: this.state.regCategoryNotes === '' ? undefined : this.state.regCategoryNotes
      }

      console.log(createRegCategoryObject);

      await this.createRegCategory(createRegCategoryObject);
      this.props.history.push(`/conferences/${this.state.confAbbr}/registration`);
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
      <div className="NewRegCat">

        <ConfNavbar {...this.props} />

        <div className="regcategories">

          <h2> {this.state.confTitle} </h2>

          <h3>Registration Categories</h3>

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

      </div>
    );
  }
}
