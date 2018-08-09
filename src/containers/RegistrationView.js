import React, { Component } from 'react';
import { PageHeader, Button, Table } from 'react-bootstrap';

// import LoaderButton from "../components/LoaderButton";
import ConfNavbar from './ConfNavbar';
// import config from "../config";
import { invokeApig } from '../libs/awsLib';

// import './RegistrationView.css';

export default class RegistrationView extends Component {
  constructor(props) {
    super(props);

    this.state= {
      isLoading: false,
      regcategory: null,
      // conferenceId: "",
      regFullName: '',
      regAbbrName: '',
      regCurrency: '',
      regLanguage: '',
      addScience: '',
      addTours: '',
      addHotel: '',
      addAP: '',
      regFee: '',
      payCash: '',
      payCheque: '',
      payCard: '',
      payGuard: '',
      payEFT: '',
      regNotes: ''
    };
  }

  async componentDidMount() {
    try {
      const results = await this.getRegCategories();
      this.setState({
        regcategories: results,
        regFullName: results.regFullName,
        regAbbrName: results.regAbbrName,
        regCurrency: results.regCurrency,
        regLanguage: results.regLanguage,
        addScience: results.addScience,
        addTours: results.addTours,
        addHotel: results.addHotel,
        addAP: results.addAP,
        regFee: results.regFee,
        payCash: results.payCash,
        payCheque: results.payCheque,
        payCard: results.payCard,
        payGuard: results.payGuard,
        payEFT: results.payEFT,
        regNotes: results.regNotes
      });
    } catch (e) {
      alert(e);
    }
  }

  getRegCategories() {
    return invokeApig({ path: `/regcategories/${localStorage.getItem('confIdKey')}` })
  }

  handleRegCatViewClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute(`/regcategories/${localStorage.getItem('confIdKey')}/update`));
  }

  render() {
    return (
      <div>

        <ConfNavbar {...this.props} />

        <PageHeader id="regCatHeader">Registration Categories</PageHeader>

        <div className="regcategoriesview">
          <Button
            className="regupdate"
            key={this.state.regCategoryId}
            onClick={this.handleRegCatViewClick} >
            <b>{'\uFF0B'}</b> Edit
          </Button>
          <div>
            <Table responsive>
              <tbody>
                <tr>
                  <td> Full name </td>
                  <td> {this.state.regFullName} </td>
                </tr>
                <tr>
                  <td> Price </td>
                  <td> {this.state.regFee} </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
