import React, { Component } from "react";
import { Button, ListGroupItem, ListGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

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
      confAbbr: "",
      projectManager: "",
      accountClient: "",
      confVenue: "",
      confStartDate: "",
      confEndDate: "",
      regAccess: "",
      regEarlyStart: "",
      regNormalStart: "",
      regNormalEnd: "",
      confLanguage: "",
      confCurrency: "",
      confExRate: "",
      notes: ""
    };
  }

  async componentDidMount() {
    try {
      const confreg = await this.getConference();
      const results = await this.regCategories();
      this.setState({
        regcategories: results,
        conference: confreg,
        confTitle: confreg.confTitle
      });
    } catch (e) {
      alert(e);
    }
  }

  regCategories() {
    return invokeApig({ path: "/regcategories" })
  }

  getConference() {
    return invokeApig({ path: `/conferences/${this.props.match.params.id}` });
  }

  createURL() {
    const path1 = window.location.pathname;
    return path1;
  }

  regCategoryList(regcategories) {
    return regcategories.map(
      (regcategory) =>
        regcategory.conferenceId === this.props.match.params.id
          ? <ListGroupItem
              id="regcatlist"
              key={regcategory.regCategoryId}>
              <Table>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Website Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{regcategory.regFullName}</td>
                    <td> <Link to={"localhost:3001/"} target="_blank"> {this.createURL()} </Link></td>
                  </tr>
                </tbody>
              </Table>
            </ListGroupItem>
          : null
    );
  }

  handleRegCatClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  saveConference(conference) {
    return invokeApig({
      path: `/conferences/${this.props.match.params.id}`,
      method: "PUT",
      body: conference
    });
  }

  regCategoriesIds(regcategories) {
    regcategories.map(
      (regcategory) =>
        regcategory.conferenceId === this.props.match.params.id
          ? this.state.regCatIds.push(regcategory.regCategoryId)
          : null
    );
  }

  render() {
    return (
      <div className="registrationdetailsall">

        <ConfNavbar {...this.props} />

        <div className="RegistrationDetails">

          <div className="regcategoriesview">
            <h2> {this.state.confTitle} </h2>
            <h3>Registration Categories</h3>

            <ListGroup id="regcategory-list">
              {this.regCategoryList(this.state.regcategories)}
            </ListGroup>
            <div>
              {this.regCategoriesIds(this.state.regcategories)}
            </div>
          </div>

          <div className="buttonsformore">
            <Button
              id="settings">
                <span className="glyphicon glyphicon-cog"></span> Settings
            </Button>
            <Button
              id="newregcat"
              key="newregcat"
              href={`/conferences/${this.props.match.params.id}/registration_new`}
              onClick={this.handleRegCatClick} >
                <span className="glyphicon glyphicon-plus"></span> New Reg Cat
            </Button>
          </div>

        </div>

      </div>
    );
  }
}
