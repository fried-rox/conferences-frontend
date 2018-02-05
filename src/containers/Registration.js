import React, { Component } from "react";
import { PageHeader, Button, ListGroupItem, ListGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

// import LoaderButton from "../components/LoaderButton";
import ConfNavbar from "./ConfNavbar";
// import config from "../config";
import { invokeApig } from "../libs/awsLib";

import './Registration.css';

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
      notes: "",
      regCategories: "",
      participantList: ""
    };
  }

  async componentDidMount() {
    try {
      const confreg = await this.getConference();
      const results = await this.regCategories();
      this.setState({
        regcategories: results,
        conference: confreg,
        confTitle: confreg.confTitle,
        confAbbr: confreg.confAbbr,
        projectManager: confreg.projectManager,
        accountClient: confreg.accountClient,
        confVenue: confreg.confVenue,
        confStartDate: confreg.confStartDate,
        confEndDate: confreg.confEndDate,
        regAccess: confreg.regAccess,
        regEarlyStart: confreg.regEarlyStart,
        regNormalStart: confreg.regNormalStart,
        regNormalEnd: confreg.regNormalEnd,
        confLanguage: confreg.confLanguage,
        confCurrency: confreg.confCurrency,
        confExRate: confreg.confExRate,
        notes: confreg.notes,
        regCategories: confreg.regCategories,
        participantList: confreg.participantList
      });
      debugger;
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
    console.log(this.state.regCatIds);
  }

  //   componentDidUpdate() {
  //     this.saveConference({
  //       ...this.state.conference,
  //       confTitle: this.state.confTitle,
  //       confAbbr: this.state.confAbbr,
  //       projectManager: this.state.projectManager,
  //       accountClient: this.state.accountClient,
  //       confVenue: this.state.confVenue,
  //       confStartDate: this.state.confStartDate,
  //       confEndDate: this.state.confEndDate,
  //       regAccess: this.state.regAccess,
  //       regEarlyStart: this.state.regEarlyStart,
  //       regNormalStart: this.state.regNormalStart,
  //       regNormalEnd: this.state.regNormalEnd,
  //       confLanguage: this.state.confLanguage,
  //       confCurrency: this.state.confCurrency,
  //       confExRate: this.state.confExRate,
  //       notes: this.state.notes,
  //       regCategories: this.state.regCatIds,
  //       participantList: this.state.participantList
  //     });
  //     debugger;
  //   }
  // }

  render() {
    return (
      <div>

        <ConfNavbar {...this.props} />

        <PageHeader id="regCatHeader">Registration Categories</PageHeader>

        <div className="regcategoriesview">
          <Button
            className="newregcat"
            key="newregcat"
            href={`/conferences/${this.props.match.params.id}/registration_new`}
            onClick={this.handleRegCatClick} >
              <b>{"\uFF0B"}</b> New reg category
          </Button>
          <input id="regcatsearch"
            type="text"
            placeholder="Search..."
            // value={this.state.search}
            // onChange={this.searchList.bind(this)}
            />
          <br />
          <ListGroup className="regcategory-list">
            {this.regCategoryList(this.state.regcategories)}
          </ListGroup>
          <div>
            {this.regCategoriesIds(this.state.regcategories)}
          </div>
        </div>
      </div>
    );
  }
}
