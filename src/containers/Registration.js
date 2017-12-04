import React, { Component } from "react";
import { PageHeader, Button, ListGroupItem, ListGroup } from "react-bootstrap";

// import LoaderButton from "../components/LoaderButton";
import ConfNavbar from "./ConfNavbar";
// import config from "../config";
import { invokeApig } from "../libs/awsLib";

import './Registration.css';

export default class RegistrationNew extends Component {
  constructor(props) {
    super(props);

    this.state= {
      isLoading: false,
      regcategories: []
    };
  }

  async componentDidMount() {
    try {
      const results = await this.regCategories();
      this.setState({ regcategories: results });
    } catch (e) {
      alert(e);
    }
  }

  regCategories() {
    return invokeApig({ path: "/regcategories" })
  }

  regCategoryList(regcategories) {
    return regcategories.map(
      (regcategory, i) =>
        regcategory.conferenceId === this.props.match.params.id
          // i !== 0
          ? <ListGroupItem
              id="regcatlist"
              key={regcategory.regCategoryId}
              href={`/regcategories/${regcategory.regCategoryId}`}
              onClick={this.handleRegCatClick}
              header={regcategory.regFullName}>
                {"Created: " + new Date(regcategory.createdAt).toLocaleString()}
            </ListGroupItem>
          : null
    );
  }

  handleRegCatClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  render() {
    return (
      <div>

        <ConfNavbar {...this.props} />

        <PageHeader id="regCatHeader">Registration Categories</PageHeader>

        <div className="regcategories">
          <h3>Registration Category Details</h3>
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
        </div>
      </div>
    );
  }
}
