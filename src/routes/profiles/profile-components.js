import $ from 'jquery';
import marked from 'marked';
import React from 'react';
import Reflux from 'reflux';
import moment from 'moment';
require('cropper');

let config = require('../../config');

import ValidateMixin from '../../common/validate-mixin';

let Button = require('react-bootstrap/lib/Button');
let Modal = require('react-bootstrap/lib/Modal');
let ModalTrigger = require('react-bootstrap/lib/ModalTrigger');

let DateRangePicker = require('react-bootstrap-daterangepicker');

import ErrorComponent from '../base/errors/component';

import Store from './store';
import Actions from './actions';

import ProfileStore from '../base/profile/store';

const ProfileFormModal = React.createClass({
  mixins: [ValidateMixin, Reflux.listenTo(Store, "onFinishedSave")],

  getInitialState() {
    let markdown = this.props.profileItem.get('description');
    if (!markdown) {
      markdown = '';
    }
    return {
      formError: null,
      markdown: marked(markdown, {sanitize: true}),
      errors: {},
      fields: {
        status: {converter: this.converters.int, validators: this.validators.required},
        current_title: this.validators.required,
        location: {converter: this.converters.int, validators: this.validators.required},
        years_in_media: {converter: this.converters.int, validators: [this.validators.required, this.validators.num]},
        years_selling: {converter: this.converters.int, validators: [this.validators.required, this.validate.num]},
        description: this.validators.required
      }
    };
  },

  onFinishedSave(data) {
    let model = this.props.profileItem;
    if (model.errorMsg) {
      this.setState({formError: model.errorMsg});
    } else {
      this.props.onRequestHide();
    }
  },

  handleChange(event) {
    let validateObj = {};
    let fieldName = event.target.name;

    validateObj[fieldName] = this.state.fields[fieldName];
    let res = this.validate('change', validateObj);
    this.setState({errors: res.errors});
  },

  handleSubmit(event) {
    event.preventDefault();
    let res = this.validate('submit');

    if (Object.keys(res.errors).length !== 0) {
      this.setState({errors: res.errors});
    } else {
      Actions.save(this.props.profileItem, res.data);
    }
  },

  transitMarkup(event) {
    let fieldName = event.target.name;
    let fieldValue = React.findDOMNode(this.refs[fieldName]).value;
    this.setState({markdown: marked(fieldValue, {sanitize: true})});
  },

  render() {
    let errors = this.state.errors;
    let item = this.props.profileItem;
    let rawMarkdown = this.state.markdown;

    return (
      <Modal {...this.props} className='inmodal' animation={true} onRequestHide={this.props.onRequestHide}>
        <form onSubmit={this.handleSubmit} role="form">
          <div className='modal-body'>

            <div className={errors.status ? "form-group has-error": "form-group"}>
              <label>What is your status?</label>
              <label className="error">{errors.status}</label>
              <select defaultValue={item.get('status')} onChange={this.handleChange} ref="status" name="status" className="form-control">
                <option value="1">Activity looking</option>
                <option value="2">Open to opportunites</option>
              </select>
            </div>

            <div className={errors.current_title ? "form-group has-error": "form-group"}>
              <label>What is your current title?</label>
              <label className="error">{errors.current_title}</label>
              <input ref="current_title" name="current_title" type="text" placeholder="Current title"
                onChange={this.handleChange} defaultValue={item.get('current_title')} className="form-control"/>
            </div>

            <div className={errors.location ? "form-group has-error": "form-group"}>
              <label>What is your current location?</label>
              <label className="error">{errors.location}</label>
              <select defaultValue={item.get('location')} onChange={this.handleChange} ref="location" name="location" className="form-control">
                <option value="1">Chicago</option>
                <option value="2">Detroit</option>
                <option value="3">New York</option>
              </select>
            </div>

            <div className={errors.years_in_media ? "form-group has-error": "form-group"}>
              <label>How many years have you been working in Media?</label>
              <label className="error">{errors.years_in_media}</label>
              <div className="input-group m-b col-md-2">
                <span className="input-group-addon">yrs</span>
                <input ref="years_in_media" name="years_in_media" onChange={this.handleChange} type="text" className="form-control"></input>
              </div>
            </div>

            <div className={errors.years_selling ? "form-group has-error": "form-group"}>
              <label>How many years have you been selling?</label>
              <label className="error">{errors.years_selling}</label>
              <div className="input-group m-b col-md-2">
                <span className="input-group-addon">yrs</span>
                <input ref="years_selling" name="years_selling" onChange={this.handleChange} type="text" className="form-control"></input>
              </div>
            </div>

            <span dangerouslySetInnerHTML={{__html: rawMarkdown}} />
            <div className="form-group">
              <label>
                What is your expertise in terms of products/clients? What are you looking for?
                <a target="_blank" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">(markdown)</a>
              </label>
              <textarea rows="6" ref="description" name="description" className="form-control"
               onChange={this.transitMarkup} defaultValue={item.get('additional_info')}>
              </textarea>
            </div>

            <ErrorComponent msg={item.errorMsg} isShow={item.errorMsg}/>
          </div>
          <div className='modal-footer'>
            <Button bsStyle='success' type="submit">Save</Button>
            <Button onClick={this.props.onRequestHide}>Close</Button>
          </div>
        </form>
      </Modal>
    );
  }
});

module.exports = {
  ProfileFormModal: ProfileFormModal
};
