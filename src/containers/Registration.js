import React, { Component } from "react";
import { Button, Tabs, Tab } from "react-bootstrap";
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
      confTitle: ""
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

          <Tabs defaultActiveKey={1} id="RegistrationControl">
            <Tab eventKey={1} title="Registration Types">
            </Tab>
            <Tab eventKey={2} title="Registration Categories">
            </Tab>
          </Tabs>

          <div className="buttonsformore">
            <Button
              id="settings">
                <span className="glyphicon glyphicon-cog"></span> Settings
            </Button>
            <Button
              id="newregcat"
              key="newregcat"
              href={`/conferences/${localStorage.getItem('confIdKey')}/registration_new`}
              onClick={this.handleRegCatClick} >
                <span className="glyphicon glyphicon-plus"></span> New Reg Cat
            </Button>
          </div>

        </div>

      </div>
    );
  }
}
