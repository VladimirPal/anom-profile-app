import React from 'react';
import Reflux from 'reflux';
import moment from 'moment';
import SidebarComponent from './sidebar/component';
import ContentComponent from './content/component';
import SpinnerComponent from '../base/spinner/component';
import ErrorComponent from '../base/errors/component';
import SidebarActions from '../base/sidebar/actions';

import Store from './profile/store';
import Actions from './profile/actions';

export default React.createClass({
  mixins: [Reflux.connect(Store)],

  getInitialState() {
    Actions.load();
  },

  render() {
    let profile = this.state.profile;

    if (profile.isSuccess) {
      if (this.props.active) {
        SidebarActions.setActive(this.props.active);
      }
      return (
        <div id="wrapper">
          <SidebarComponent/>
          <ContentComponent
            header={this.props.header}
            mainPage={this.props.children}/>
        </div>
      );
    } else {
      if (profile.isLoaded) {
        return (
          <ErrorComponent msg={"Unknown error"} isShow={true} cls={"middle-box"}/>
        );
      } else {
        return (
          <SpinnerComponent isShow={true}/>
        );
      }
    }
  }
});
