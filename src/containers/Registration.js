import React, { Component } from "react";
import { PageHeader, Button, ListGroupItem, ListGroup, Table } from "react-bootstrap";

// import LoaderButton from "../components/LoaderButton";
import ConfNavbar from "./ConfNavbar";
// import config from "../config";
import { invokeApig } from "../libs/awsLib";

import './Registration.css';

export default class Registration extends Component {
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

  createURL() {
    const path1 = window.location.href;
    return path1;
  }

  regCategoryList(regcategories) {
    return regcategories.map(
      (regcategory, i) =>
        regcategory.conferenceId === this.props.match.params.id
          // i !== 0
          ? <ListGroupItem
              id="regcatlist"
              key={regcategory.regCategoryId}>
              <Table>
                <tbody>
                  <tr>
                    <td>{regcategory.regFullName}</td>
                    <td>{regcategory.regFee}</td>
                    <td>{regcategory.regCurrency}</td>
                    <td>{new Date(regcategory.createdAt).toLocaleString()}</td>
                    <td> {this.createURL()} </td>
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
        </div>
      </div>
    );
  }
}
