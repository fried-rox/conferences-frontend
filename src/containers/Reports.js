import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

import ConfNavbar from './ConfNavbar';


export default class Reports extends Component {

  render() {
    return (
      <div>
        <ConfNavbar {...this.props} />
        <PageHeader>Reports</PageHeader>
      </div>
    );
  }
}
