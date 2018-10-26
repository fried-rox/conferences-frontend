import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap"; //adding a navigation bar from bootstrap

import { authUser, signOutUser } from "./libs/awsLib";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";

import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser();

    this.userHasAuthenticated(false);

    localStorage.clear();

    this.props.history.push("/login");
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App-container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Collapse>
            <Nav pullLeft>
              {this.state.isAuthenticated
                ? [<RouteNavItem id="conflistlink" href="/">
                    <span className="glyphicon glyphicon-home"></span>
                  </RouteNavItem>,
                  <RouteNavItem id="newconfplusmain" href="/conferences/new">
                    <span className="glyphicon glyphicon-plus"></span>
                  </RouteNavItem>]
                : []
              }
            </Nav>
            <Navbar.Brand>
              <img id="logo" src="/target_logo.png" alt="TARGET CONFERENCES LTD" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem id="logoutlink" onClick={this.handleLogout}>Logout</NavItem>
                : []
                  }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
