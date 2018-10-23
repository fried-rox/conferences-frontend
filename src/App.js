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
          <Navbar.Header>
            <Navbar.Brand>
              <img id="logo" src="/target_logo.png" alt="TARGET CONFERENCES LTD" />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem id="logoutlink" onClick={this.handleLogout}>Logout</NavItem>
                : <RouteNavItem id="loginlink" key={1} href="/login">
                      Login
                    </RouteNavItem>
                  }
            </Nav>
            <Nav pullLeft>
              {this.state.isAuthenticated
                ? <RouteNavItem id="conflistlink" key={2} href="/">
                    Conferences & Groups
                  </RouteNavItem>
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
