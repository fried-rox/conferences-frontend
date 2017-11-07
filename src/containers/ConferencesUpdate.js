import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import DayPicker from "react-day-picker";

import { invokeApig, s3Upload } from "../libs/awsLib";
import LoaderButton from "../components/LoaderButton";
import config from "../config";

import "./ConferencesUpdate.css";

export default class ConferencesUpdate extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      isDeleting: null,
      conference: null,
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
      notes: ""
    };
  }
  async componentDidMount() {
    try {
      const results = await this.getConference();
      this.setState({
        conference: results,
        confTitle: results.confTitle,
        confAbbr: results.confAbbr,
        projectManager: results.projectManager,
        accountClient: results.accountClient,
        confVenue: results.confVenue,
        confStartDate: results.confStartDate,
        confEndDate: results.confEndDate,
        regAccess: results.regAccess,
        regEarlyStart: results.regEarlyStart,
        regNormalStart: results.regNormalStart,
        regNormalEnd: results.regNormalEnd,
        confLanguage: results.confLanguage,
        confCurrency: results.confCurrency,
        confExRate: results.confExRate,
        notes: results.notes
      });
    } catch (e) {
      alert(e);
    }
  }

  getConference() {
    return invokeApig({ path: `/conferences/${this.props.match.params.id}` });
  }

  validateForm() {
    return this.state.confTitle.length > 0;
  }

  formatFilename(str) {
    return str.length < 50
      ? str
      : str.substr(0, 20) + "..." + str.substr(str.length - 20, str.length);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  saveConference(conference) {
    return invokeApig({
      path: `/conferences/${this.props.match.params.id}`,
      method: "PUT",
      body: conference
    });
  }

  handleSubmit = async event => {
    let uploadedFilename;

    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a file smaller than 5MB");
      return;
    }

    this.setState({ isLoading: true });

    try {
      if (this.file) {
        uploadedFilename = (await s3Upload(this.file))
          .Location;
      }

      await this.saveConference({
        ...this.state.conference,
        confTitle: this.state.confTitle,
        confAbbr: this.state.confAbbr,
        projectManager: this.state.projectManager,
        accountClient: this.state.accountClient,
        confVenue: this.state.confVenue,
        confStartDate: this.state.confStartDate,
        confEndDate: this.state.confEndDate,
        regAccess: this.state.regAccess,
        regEarlyStart: this.state.regEarlyStart,
        regNormalStart: this.state.regNormalStart,
        regNormalEnd: this.state.regNormalEnd,
        confLanguage: this.state.confLanguage,
        confCurrency: this.state.confCurrency,
        confExRate: this.state.confExRate,
        notes: this.state.notes,
        confGraphic: uploadedFilename || this.state.conference.confGraphic
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  deleteConference() {
    return invokeApig({
      path: `/conferences/${this.props.match.params.id}`,
      method: "DELETE"
    });
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteConference();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    return (
      <div className="ConferencesUpdate">
        {this.state.conference &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="confTitle">
              <ControlLabel>Conference Title</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.confTitle}
                type="text"/>
            </FormGroup>
            <FormGroup controlId="confAbbr">
              <ControlLabel>Conference Abbreviated Name</ControlLabel>
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
              <DayPicker
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
            {this.state.conference.confGraphic &&
              <FormGroup >
                <ControlLabel>Conference Banner</ControlLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.conference.confGraphic}
                  >
                    {this.formatFilename(this.state.conference.confGraphic)}
                  </a>
                </FormControl.Static>
              </FormGroup>}
            <FormGroup controlId="file">
              {!this.state.conference.confGraphic &&
                <ControlLabel>Conference Banner</ControlLabel>}
              <FormControl onChange={this.handleFileChange} type="file" />
            </FormGroup>
            <div className="button-panel">
              <LoaderButton
                className="save-button"

                bsStyle="primary"
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Save"
                loadingText="Saving…"
              />
              <LoaderButton
                className="delete-button"
                bsStyle="danger"
                bsSize="large"
                isLoading={this.state.isDeleting}
                onClick={this.handleDelete}
                text="Delete"
                loadingText="Deleting…"
              />
            </div>
          </form>}
      </div>
    );
  }
}
