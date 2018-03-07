import React, { Component } from "react";
import { Button, ListGroup } from "react-bootstrap";

import ConfNavbar from "./ConfNavbar";
import { invokeApig } from "../libs/awsLib";

import "../css/Tourism.css";

export default class Tourism extends Component {
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
    return invokeApig({ path: `/conferences/${this.props.match.params.id}` });
  }

  render() {
    return (
      <div className="tourismdetailsall">

        <ConfNavbar {...this.props} />

        <div className="TourismDetails">

          <div className="tourism">
            <h2> {this.state.confTitle} </h2>
            <div className="toursearching">
              <h3>Tourism</h3>
              <input id="toursearch"
                type="text"
                placeholder="Search list by name..." />
            </div>
            <ListGroup className="tour-list">
            </ListGroup>
          </div>

          <div className="buttonsformore">
            <Button
              id="settings">
                <span className="glyphicon glyphicon-cog"></span> Settings
            </Button>
            <Button
              id="newtour"
              key="new" >
              <span className="glyphicon glyphicon-plus"></span> New Tour
            </Button>
          </div>

        </div>

      </div>
    );
  }
}
