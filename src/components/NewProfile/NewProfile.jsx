import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  HelpBlock,
  Button,
  ControlLabel
} from 'react-bootstrap';
import ErrorMessage from '../Widgets/ErrorMessage';
import ModalWidget from '../Widgets/Modal';
import noPic from "../../images/no-profile.svg";
import resumeIcon from "../../images/resume-icon.svg";
import resumeMissingIcon from "../../images/resume-missing-icon.svg";
import './NewProfile.css';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}
      bsClass="form-group grad-form-group">
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class NewProfile extends Component {
  state = {
    isNew: true,
    isAdmin: true,
    hasError: false,
    isActive: 1,
    profileData: {
      firstName: '',
      lastName: '',
      yearOfGrad: null,
      skills: [],
      story: '',
      phone: '',
      email: '',
      linkedin: '',
      github: '',
      website: '',
      image: '',
      resume: '',
      isActive: 1
    },
    submitForm: false,
    storyHeight: 4
  };

  onChangeInput = e => {
    this.setState({
      ...this.state,
      profileData: {
        ...this.state.profileData,
        [e.target.name]: e.target.value ? e.target.value : ''
      }
    });
  };

  onChangeSkills = e => {
    let skillsArray = e.target.value.split(',');
    for (let i = 0; i < skillsArray.length; i++) {
      skillsArray[i] = skillsArray[i].trim();
    }
    this.setState({
      ...this.state,
      profileData: {
        ...this.state.profileData,
        skills: skillsArray
      }
    });
  };

  handleNewProfile = e => {
    e.preventDefault();
    const response = this.props.profileNew(this.state.profileData);
    this.setState({
      submitForm: true,
      graduateId: response.graduateId
    });
  };

  uploadFile = e => {
    e.preventDefault();
    let name = e.target.name;
    console.log('uploadFile: ', e.target.files[0]);
    if (name === 'image')
      this.props.uploadImageFile(e.target.files[0]).then(response =>
        this.setState({
          ...this.state,
          profileData: {
            ...this.state.profileData,
            [name]: response.value.url.replace(/\s/g, '')
          }
        })
      );
    else if (name === 'resume')
      this.props.uploadResumeFile(e.target.files[0]).then(response =>
        this.setState({
          ...this.state,
          profileData: {
            ...this.state.profileData,
            [name]: response.value.url.replace(/\s/g, '')
          }
        })
      );
  };

  closeModal = () => {
    this.setState({
      submitForm: false
    });
  };

  addDefaultSrc(e) {
    e.target.src = noPic;
  }

  render() {
    return (
      <div>
      {/* New Profile Header */}
        <div className="header-wrap container-fluid">
          <header className="container grad-header">
            <h1>New Graduate Profile</h1>
          </header>
        </div>

        <main className="container grad-form">

          {/* OnSubmit Message */}
          <ModalWidget
            show={this.state.submitForm}
            message={'Graduate Added Successfully!'}
            title={'New Graduate Profile'}
            closeModal={this.closeModal}
          />

          {/* Profile Image */}
          <div className="profile-thumbnail form-thumbnail">
            {this.state.profileData.image ? (
              <img
                width={100}
                src={this.state.profileData.image}
                alt="profile"
                onError={this.addDefaultSrc}
              />
            ) : (
              <img
                width={100}
                src={noPic}
                alt="profile missing"
              />
            )}
            <div className="choose-button">
              <h3>{this.state.profileData.image ? "Update" : "Add"}<br /> Image</h3>
            </div>
            <FieldGroup
              id="image"
              type="file"
              onChange={e => this.setState({ image: e.target.value })}
            />
          </div>

          {/* Profile Resume */}
          <div className="form-resume">
            <img
              src={this.state.profileData.resume ? resumeIcon : resumeMissingIcon}
              width={100}
              height={100}
              alt="Resume icon"
            />
            <div className="choose-button">
              <h3>{this.state.profileData.resume ? "Update" : "Add"} Resume</h3>
            </div>
            <FieldGroup
              id="resume"
              type="file"
              onChange={e => this.setState({ resume: e.target.value })}
            />
          </div>
          <div className="clearfix"></div>

          {/* Profile Form */}
          <form onSubmit={this.handleNewProfile}>
            <FormGroup controlId="first-name">
              <ControlLabel>First Name<span className="helper helper-asterisk">*</span></ControlLabel>
              <FormControl
                type="text"
                placeholder="First Name"
                name="firstName"
                value={this.state.profileData.firstName}
                onChange={this.onChangeInput} />
            </FormGroup>
            <FormGroup controlId="last-name">
              <ControlLabel>Last Name<span className="helper helper-asterisk">*</span></ControlLabel>
              <FormControl
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={this.state.profileData.lastName}
                onChange={this.onChangeInput} />
            </FormGroup>
            <FormGroup controlId="year-of-grad">
              <ControlLabel>Year of Graduation<span className="helper helper-asterisk">*</span></ControlLabel>
              <FormControl
                type="text"
                placeholder="Year of Graduation"
                value={this.state.profileData.yearOfGrad}
                name="yearOfGrad"
                onChange={this.onChangeInput} />
            </FormGroup>
            <FormGroup controlId="skills">
              <ControlLabel>Skills<span className="helper">(Comma delimited)</span></ControlLabel>
              <FormControl
                type="text"
                placeholder="Skills"
                value={this.state.profileData.skills}
                name="skills"
                onChange={this.onChangeSkills} />
            </FormGroup>
            <FormGroup controlId="story">
              <ControlLabel>Story<span className="helper">(Max 800 characters)</span></ControlLabel>
              <FormControl
                componentClass="textarea"
                type="textarea"
                placeholder="Story"
                rows={this.state.storyHeight}
                data-min-rows="4"
                maxLength="800"
                name="story"
                onChange={this.onChangeInput} />
            </FormGroup>
            <FormGroup controlId="phone">
              <ControlLabel>Phone Number</ControlLabel>
              <FormControl
                type="text"
                placeholder="Phone Number"
                value={this.state.profileData.phone}
                name="phone"
                onChange={this.onChangeInput} />
            </FormGroup>
            <FormGroup controlId="email">
              <ControlLabel>Email<span className="helper helper-asterisk">*</span></ControlLabel>
              <FormControl
                type="text"
                placeholder="Email"
                value={this.state.profileData.email}
                name="email"
                onChange={this.onChangeInput} />
              </FormGroup>
            <FormGroup controlId="linkedin">
              <ControlLabel>LinkedIn</ControlLabel>
              <FormControl
                type="text"
                placeholder="LinkedIn"
                value={this.state.profileData.linkedin}
                name="linkedin"
                onChange={this.onChangeInput} />
            </FormGroup>
            <FormGroup controlId="github">
              <ControlLabel>GitHub</ControlLabel>
              <FormControl
                type="text"
                placeholder="GitHub"
                value={this.state.profileData.github}
                name="github"
                onChange={this.onChangeInput} />
            </FormGroup>
            <FormGroup controlId="website">
              <ControlLabel>Website</ControlLabel>
              <FormControl
                type="text"
                placeholder="Website"
                name="website"
                onChange={this.onChangeInput} />
            </FormGroup>
            <Button
              type="submit"
              className="btn grad-btn grad-btn-secondary"
              disabled={this.props.isLoading === true}
            >
              {this.props.isLoading ? 'LOADING...' : 'ADD'}
            </Button>
            {this.props.hasError && (
              <ErrorMessage>
                Sorry! The Graduate Portal is temporarily down. Our engineers are
                aware of the problem and are hard at work trying to fix it. Please
                come back later.
              </ErrorMessage>
            )}
          </form>
        </main>
      </div>
    );
  }
}

export default NewProfile;
