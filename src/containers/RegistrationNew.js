import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

// import LoaderButton from "../components/LoaderButton";
import ConfNavbar from './ConfNavbar';
// import config from "../config";
import { invokeApig } from '../libs/awsLib';

import '../css/RegistrationNew.css';

export default class RegistrationNew extends Component {
  constructor(props) {
    super(props);

    this.state= {
      isLoading: false,
      conference: [],
      confTitle: '',
      confAbbr: '',
      conferenceId: '',
      regTypeContext: [],
      regCategoryName: '',
      regCategoryPrice: '',
      regTypeNotes: '',
      value: null
    };
  }

  async componentDidMount() {
    try {
      const results = await this.getConference();
      const regContext = await this.getRegContext();
      this.setState({
        conference: results,
        confTitle: results.confTitle,
        confAbbr: results.confAbbr,
        regTypeContext: regContext
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
        conferenceId: this.props.match.params.id,
        regFullName: this.state.regFullName === '' ? undefined : this.state.regFullName,
        regAbbrName: this.state.regAbbrName === '' ? undefined : this.state.regAbbrName,
        regCurrency: this.state.regCurrency === '' ? undefined : this.state.regCurrency,
        regLanguage: this.state.regLanguage === '' ? undefined : this.state.regLanguage,
        addScience: this.state.addScience === '' ? undefined : this.state.addScience,
        addTours: this.state.addTours === '' ? undefined : this.state.addTours,
        addHotel: this.state.addHotel === '' ? undefined : this.state.addHotel,
        addAP: this.state.addAP === '' ? undefined : this.state.addAP,
        regFee: this.state.regFee === '' ? undefined : this.state.regFee,
        payCash: this.state.payCash === '' ? undefined : this.state.payCash,
        payCheque: this.state.payCheque === '' ? undefined : this.state.payCheque,
        payCard: this.state.payCard === '' ? undefined : this.state.payCard,
        payGuard: this.state.payGuard === '' ? undefined : this.state.payGuard,
        payEFT: this.state.payEFT === '' ? undefined : this.state.payEFT,
        regNotes: this.state.regNotes === '' ? undefined : this.state.regNotes,
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

          <form>
            <FormGroup>
              <ControlLabel>Registration Context</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.regTypeContext}
                componentClass="select">
              </FormControl>
            </FormGroup>

          </form>

        </div>

      </div>
    );
  }
}
