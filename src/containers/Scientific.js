import React, { Component } from "react";
import { Button } from "react-bootstrap";

import ConfNavbar from "./ConfNavbar";
import { invokeApig } from "../libs/awsLib";

import '../css/Scientific.css';

export default class Scientific extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conference: [],
      confTitle: ""
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

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem('confIdKey')}` });
  }

  render() {
    return (
      <div className="scientificdetailsall">

        <ConfNavbar {...this.props} />

        <div className="ScientificDetails">

          <div className="scientific">
            <h2> {this.state.confTitle} </h2>
            <h3>Scientific</h3>
          </div>

          <div className="buttonsformore">
            <Button
              id="settings">
                <span className="glyphicon glyphicon-cog"></span> Settings
            </Button>
            <Button
              id="newabstract"
              key="new" >
                <span className="glyphicon glyphicon-plus"></span> New Abstract
            </Button>
          </div>

        </div>

      </div>
    );
  }
}
