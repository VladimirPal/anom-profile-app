import marked from 'marked';

import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import comp from './profile-components';

let ModalTrigger = require('react-bootstrap/lib/ModalTrigger');
let OverlayMixin = require('react-bootstrap/lib/OverlayMixin');

import BaseComponent from '../base/component';
import SpinnerComponent from '../base/spinner/component';
import ErrorComponent from '../base/errors/component';
import EmptyComponent from '../base/empty/component';

import Store from './store';
import Actions from './actions';


const HeaderComponent = React.createClass({
  mixins: [OverlayMixin],

  getInitialState() {
    return {
      isModalOpen: false
    };
  },

  handleToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <span/>;
    }

    return (<comp.ProfileFormModal onRequestHide={this.handleToggle} profileItem={Store.getNewItem()}/>);
  },

  render() {
    return (
      <div className="navbar-header">
        <a onClick={this.handleToggle}
          className="navbar-minimalize minimalize-styl-2 btn btn-primary "
          href="#"> Add Profile
        </a>
      </div>
    );
  }
});


const PageComponent = React.createClass({
  mixins: [Reflux.connect(Store)],

  getInitialState() {
    return {
      status: [],
      status_all: true
    };
  },

  componentWillMount() {
    Actions.load();
  },

  componentWillUnmount() {
    Actions.clear();
  },

  componentWillReceiveProps(nextProps) {
    Actions.load(true);
  },

  sendReq() {
    Actions.load(
      false,
      {
        status: this.state.status
      }
    );
  },

  handleChange(event) {
    let value = parseInt(event.target.value);
    let name = event.target.name;
    let isChecked = event.target.checked;
    let filterData = this.state[name];
    let stateObj = {};

    if (isChecked) {
      if (value) {
        filterData.push(value);
        stateObj[`${name}_all`] = false;
      } else {
        filterData = [];
        stateObj[`${name}_all`] = true;
      }
    } else {
      if (value) {
        filterData.pop(value);
      } else {
        filterData = [];
        stateObj[`${name}_all`] = false;
      }
    }
    console.log(filterData);

    stateObj[name] = filterData;

    this.setState(stateObj);
    this.sendReq();
  },

  render() {
    let profiles = this.state.profiles;

    return (
      <div className="wrapper wrapper-content">
        <div className="row">
          <div className="col-lg-3">
            <div className="ibox float-e-margins">
              <div className="ibox-content mailbox-content">
                <div className="file-manager">
                  <div className="space-25"></div>
                  <h5>Status</h5>
                  <div className="col-sm-10">
                    <div className="checkbox">
                      <label> <input value="0" name="status" checked={this.state.status_all} defaultChecked={true} onChange={this.handleChange} type="checkbox"></input>All</label>
                    </div>
                    <div className="checkbox">
                      <label> <input value="1" name="status" checked={this.state.status.indexOf(1) !== -1} onChange={this.handleChange} type="checkbox"></input>Activity looking</label>
                    </div>
                    <div className="checkbox">
                      <label> <input value="2" name="status" checked={this.state.status.indexOf(2) !== -1} onChange={this.handleChange} type="checkbox"></input>Open to Opportunites</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <SpinnerComponent isShow={!profiles.isLoaded}/>
            <ErrorComponent msg={profiles.errorMsg} isShow={profiles.isLoaded && !profiles.isSuccess} cls={"middle-box"}/>
            <EmptyComponent msg={"No profiles found"} isShow={profiles.isLoaded && profiles.isSuccess && !profiles.items.length}/>
            {
              profiles.isSuccess && profiles.items.map( (item, key) => {
                return (
                <ProfileItem
                  key={key}
                  profileItem={item}
                />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
});


const ProfileItem = React.createClass({
  render() {
    let profile = this.props.profileItem.attributes;

    let rawMarkdown = marked(profile.description || '', {sanitize: true});

    return (
      <div className="col-lg-12">
        <div className="contact-box">
          <p>{profile.current_title} | {profile.location_name}</p>
          <p>{profile.status_name}</p>
          <div className="col-sm-8">
            <span dangerouslySetInnerHTML={{__html: rawMarkdown}} />
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
});


export default (active) => {
  let header = () => {
    return (<HeaderComponent/>);
  };

  return (
    <BaseComponent header={header()} active={active}>
      <PageComponent/>
    </BaseComponent>
  );
};
