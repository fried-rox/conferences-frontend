import React, { Component } from "react";
import { Button } from "react-bootstrap";

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
    this.props.history.push(`/conferences/${this.state.confAbbr}/registration_new`);
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

        </div>

        <div className="buttonsformore">
          <Button
            id="newregcat"
            onClick={this.handleRegCatClick}>
            <span className="glyphicon glyphicon-plus"></span> New Reg Categroy
          </Button>
        </div>

      </div>
    );
  }
}
