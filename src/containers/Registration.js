import React, { Component } from 'react';

import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import isNil from "lodash/fp/isNil";
// import SimpleModalLauncher from '../components/ModalLauncher';
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
      value: null,
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
        <option key={i.toString()}>
          {regTypeContexts[i].regTypeFullName}
        </option>
    );
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

      await this.createRegCategory(createRegCategoryObject);
      this.closeModal();
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false});
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
        <div className="CategoriesTitle">

          <div className="buttonsformore">
            <Button
              id="newcategories"
              onClick={this.handleClick2}>
              <span className="glyphicon glyphicon-plus"></span> New Category
            </Button>
            <Button
              id="settings">
              <span className="glyphicon glyphicon-cog"></span> Settings
            </Button>
          </div>

          <div className="categoriesinfo">
            <h2> {this.state.confTitle} </h2>

            <div className="categoriesDetails">
              <h3>Registration Categories</h3>
            </div>
          </div>
        </div>

        {this.state.showModal ?
          <div className="registration-modal__container">
            <div className="registration-modal" ref={node => (this.node = node)}>
              <Button className="modal_exitButton" onClick={this.closeModal}>x</Button>
              <div className="inner-registration-modal">
                <h2>Registration Category</h2>
                <form>
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
                    onClick={this.handleSubmit}
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
