import React, { Component } from 'react';
import { FormGroup, Button, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';

import LoaderButton from "../components/LoaderButton";
// import config from "../config";
import { invokeApig } from '../libs/awsLib';
import ConfNavbar from './ConfNavbar';

// import "react-day-picker/lib/style.css";

import "../css/Categories.css";

export default class NewCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      conferenceId: '',
    };
  }

  async componentDidMount() {
    try {
      const confreg = await this.getConference();
      this.setState({
        conference: confreg,
        confTitle: confreg.confTitle,
        confTitleAbr: confreg.confAbbr
      });
    } catch (e) {
      alert(e);
    }
  }

  validateForm() {
    return this.state.regTypeFullName.length > 0 && this.state.regTypeAbbrName.length > 0;
  }

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem('confIdKey')}` });
  }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });
  // }

  // handleSubmit = async event => {
  //   event.preventDefault();
  //
  //   this.setState({ isLoading: true });
  //
  //   try {
  //       const createRegCategoryObject = {
  //         conferenceId: localStorage.getItem('confIdKey'),
  //         regTypeFullName: this.state.regTypeFullName === '' ? undefined : this.state.regTypeFullName,
  //         regTypeAbbrName: this.state.regTypeAbbrName === '' ? undefined : this.state.regTypeAbbrName,
  //         regTypeCurrency: this.state.regTypeCurrency === '' ? undefined : this.state.regTypeCurrency,
  //         regTypeLanguage: this.state.regTypeLanguage === '' ? undefined : this.state.regTypeLanguage,
  //         regTypeUsePackage: this.state.regTypeUsePackage === '' ? undefined : this.state.regTypeUsePackage,
  //         regTypeAddScience: this.state.regTypeAddScience === '' ? undefined : this.state.regTypeAddScience,
  //         regTypeAddTours: this.state.regTypeAddTours === '' ? undefined : this.state.regTypeAddTours,
  //         regTypeAddAccommodation: this.state.regTypeAddAccommodation === '' ? undefined : this.state.regTypeAddAccommodation,
  //         regTypeAddAP: this.state.regTypeAddAP === '' ? undefined : this.state.regTypeAddAP,
  //         regTypePaymentMethod: this.state.regTypePaymentMethod === '' ? undefined : this.state.regTypePaymentMethod,
  //         regTypeQuestions: this.state.regTypeQuestions === '' ? undefined : this.state.regTypeQuestions,
  //         regTypeNotes: this.state.regTypeNotes === '' ? undefined : this.state.regTypeNotes,
  //         regTypeMailing: this.state.regTypeMailing === '' ? undefined : this.state.regTypeMailing
  //       }
  //
  //     console.log(createRegCategoryObject);
  //
  //     await this.createCategory(createRegCategoryObject);
  //     this.props.history.push(`/conferences/${this.state.confAbbr}/registration`);
  //   } catch (e) {
  //     alert(e);
  //     this.setState({ isLoading: false });
  //   }
  // }
  //
  // createCategory(category) {
  //   return invokeApig({
  //     path: '/regcategories',
  //     method: 'POST',
  //     body: categories
  //   });
  // }

  render() {
    return (
      <div className="categoriesdetailsall">
        <ConfNavbar {...this.props} />
        <div className="CategoriesTitle">

          <div className="buttonsformore">
            <Button
              id="newcategories"
              onClick={this.handleClick2}>
              <span className="glyphicon glyphicon-plus"></span> New Category
            </Button>
            <Button
              id="settings">
              <span className="glyphicon glyphicon-cog"></span> Settings
            </Button>
          </div>

          <div className="categoriesinfo">
            <h2> {this.state.confTitle} </h2>

            <div className="categoriesDetails">
              <h3>Registration Categories</h3>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
