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
    const path1 = window.location.pathname;
    const path2 = window.location.href;
    window.sessionStorage.setItem("conferenceId", path1.split("/")[2]);
    window.localStorage.setItem("conferenceId", path1.split("/")[2]);
    return path1 && path2;
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
                    <td> <Link to={`http://` + window.location.pathname.split("/")[1] + `.${regcategory.regAbbrName}.targetknasim.com`} target="_blank"> {this.createURL()} </Link></td>
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
    debugger;
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
