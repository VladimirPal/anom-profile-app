import Backbone from 'backbone';
import Reflux from 'reflux';
import Actions from './actions';
import BackboneMixin from '../../../common/backbone-model-mixin';

export default Reflux.createStore({
  mixins: [BackboneMixin],
  listenables: Actions,

  init() {
    this.stateName = 'profile';
  },

  getInitialState() {
    if (this[this.stateName] === undefined) {
      let initObj = this.initBackboneState();
      this.changeUrl('/api-user-me/');
      return initObj;
    } else {
      let returnObj = {};
      returnObj[this.stateName] = this[this.stateName];
      return returnObj;
    }
  },

  onSet(data) {
    this[this.stateName].item.set(data);
    this.update();
  },

  getProfile() {
    return this.profile.item.attributes;
  },

  getProfileModel() {
    return this.profile.item;
  },

  onLoad() {
    this.fetch();
  },

  onLoadFailed(response) {
    this.failed(response);
    this.update();
  },

  onLoadCompleted(model, response) {
    this.completed(response);
    this.update();
  }
});
