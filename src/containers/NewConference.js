import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Checkbox, PageHeader, Radio  } from "react-bootstrap";

import CalendarPick from "../components/CalendarPick";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { invokeApig, s3Upload } from "../libs/awsLib";

import "react-day-picker/lib/style.css";
import "./NewConference.css";

export default class NewConference extends Component {
  constructor(props, context) {
    super(props, context);

    this.file = null;

    this.state = {
      isLoading: false,
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
      confLanguage: "English",
      confCurrency: "",
      confExRate: "",
      notes: "",
      value: null,
      selectedDay: new Date(),
    };
  }

  validateForm() {
    return this.state.confTitle.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a file smaller than 5MB");
      return;
    }

    this.setState({ isLoading: true });

    try {
      const uploadedFilename = this.file
        ? (await s3Upload(this.file)).Location
        : null;

        const createConferenceObject = {
          confTitle: this.state.confTitle,
          confAbbr: this.state.confAbbr === "" ? undefined : this.state.confAbbr,
          projectManager: this.state.projectManager === "" ? undefined : this.state.projectManager,
          accountClient: this.state.accountClient === "" ? undefined : this.state.accountClient,
          confVenue: this.state.confVenue === "" ? undefined : this.state.confVenue,
          confStartDate: this.state.confStartDate === "" ? undefined : this.state.confStartDate,
          confEndDate: this.state.confEndDate === "" ? undefined : this.state.confEndDate,
          regAccess: this.state.regAccess === "" ? undefined : this.state.regAccess,
          regEarlyStart: this.state.regEarlyStart === "" ? undefined : this.state.regEarlyStart,
          regNormalStart: this.state.regNormalStart === "" ? undefined : this.state.regNormalStart,
          regNormalEnd: this.state.regNormalEnd === "" ? undefined : this.state.regNormalEnd,
          confLanguage: this.state.confLanguage === "" ? undefined : this.state.confLanguage,
          confCurrency: this.state.confCurrency === "" ? undefined : this.state.confCurrency,
          confExRate: this.state.confExRate === "" ? undefined : this.state.confExRate,
          notes: this.state.notes === "" ? undefined : this.state.notes,
          confGraphic: uploadedFilename
        }

        console.log(createConferenceObject);

      await this.createConference(createConferenceObject);
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createConference(conference) {
    return invokeApig({
      path: "/conferences",
      method: "POST",
      body: conference
    });
  }

  handleDayClick = day => {
    this.setState({
      selectedDay: day,
    });
  }

  render() {
    return (
      <div className="NewConf">
        <PageHeader>
          <FormGroup>
            <Radio name="newconforgroup" inline>New Conference</Radio>
            <Radio name="newconforgroup" inline>New Group</Radio>
          </FormGroup>
        </PageHeader>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="confTitle">
            <ControlLabel>Conference Title</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.confTitle}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="confAbbr">
            <ControlLabel>Conference Abreviated Name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.confAbbr}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="projectManager">
            <ControlLabel>Project Manager</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.projectManager}
              componentClass="select">
                <option value="John Smith">John Smith</option>
                <option value="Mary Murphy">Mary Murphy</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="accountClient">
            <ControlLabel>Account Client</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.accountClient}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="confVenue">
            <ControlLabel>Conference Venue</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.confVenue}
              type="text"/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Conference dates</ControlLabel>
            <br />
            <CalendarPick
              onDayClick={this.handleDayClick}
              selectedDays={this.state.selectedDay} />
          </FormGroup>
          <FormGroup controlId="regAccess">
            <Checkbox>Allow Registration</Checkbox>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Registration Early Bird Dates</ControlLabel>
            <br />
            <ControlLabel>Registration Normal Dates</ControlLabel>
            <br />
          </FormGroup>
          <FormGroup controlId="confLanguage">
            <ControlLabel>Language</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.confLanguage}
              componentClass="select">
                <option value="English">English</option>
                <option value="Hebrew">Hebrew</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="confCurrency">
            <ControlLabel>Currency</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.confCurrency}
              componentClass="select">
                <option value="dollar">Dollar</option>
                <option value="shekel">Shekel</option>
                <option value="euro">Euro</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="confExRate">
            <ControlLabel>Exchange Rate</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.confExRate}
              type="text" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Mailing</ControlLabel>
          </FormGroup>
          <FormGroup controlId="notes">
            <ControlLabel>Notes</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.notes}
              componentClass="textarea" />
          </FormGroup>
          <FormGroup controlId="confGraphic">
            <ControlLabel>Conference Banner</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
