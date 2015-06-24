import Backbone from 'backbone';
import Reflux from 'reflux';
import Actions from './actions';
import BackboneMixin from '../../common/backbone-collection-mixin';

import ProfileStore from '../base/profile/store';
import ProfileActions from '../base/profile/actions';

export default Reflux.createStore({
  mixins: [BackboneMixin],
  listenables: Actions,

  init() {
    this.stateName = 'profiles';
  },

  getInitialState() {
    let initialState = this.initBackboneState('/profiles/list/');
    return initialState;
  },

  onSet(item, data) {
    item.set(data);
    this.updateList();
  },

  onInternalFilter(key, value) {
    this[this.stateName][key] = value;
    this.updateList();
  },

  onClear() {
    this.reset();
    this.updateList();
  },

  onClearError(item) {
    item.hasError = false;
    this.updateList();
  },


  onLoad(needClear=false, data={}) {
    if (needClear) {
      Actions.clear();
    }
    this.fetch(data);
  },

  onLoadFailure(response) {
    this.failureLoad(response);
    this.updateList();
  },

  onLoadCompleted(collection, response) {
    this.completedLoad(response);
    this.updateList();
  },

  onSave(model, data) {
    this.save(model, data);
  },

  onSaveFailure(model, response) {
    this.failureSave(model, response);
    this.updateList();
  },

  onSaveCompleted(model, response) {
    this.completedSave(model, response);
    let raw_password = model.get('raw_password');
    if (raw_password) {
      let msg = `
        UserName: ${model.get('email')}
        Password: ${raw_password}
      `;
      model.set('raw_password', null);
    }
    this.updateList();

    if (ProfileStore.getProfile().id === model.id) {
      ProfileActions.set(model.attributes);
    }
  },

  onDelete(model, backendDelete=false) {
    this.delete(model, backendDelete);
  },

  onDeleteCompleted(model, reponse) {
    this.updateList();
  },

  onDeleteFailure(model, response) {
    this.failureDelete(model, response);
    this.updateList();
  },

  updateList(data=this[this.stateName]) {
    this.trigger({profiles: data});
  }
});
