import Backbone from 'backbone';

export default {
  initBackboneState(url=false) {
    this[this.stateName] = {
      isLoaded: false,
      items: new Backbone.Collection()
    };
    if (url) {
      this[this.stateName].items.url = url;
    }
    let returnObj = {};
    returnObj[this.stateName] = this[this.stateName];

    return returnObj;

  },

  reset() {
    this[this.stateName].isLoaded = false;
    this[this.stateName].items.reset();
  },

  changeUrl(url) {
    this[this.stateName].items.url = url;
  },

  fetch(data) {
    if (this.loadCount === undefined) {
      this.loadCount = 0;
    }
    this.loadCount += 1;
    this[this.stateName].items.fetch(
      {
        data: data,
        success: (collection, response) => {
          if (this.loadCount === 1) {
            this.listenables.load.completed(collection, response);
          }
          this.loadCount -= 1;
        },
        error: (collection, response) => {
          if (this.loadCount === 1) {
            this.listenables.load.failure(response);
          }
          this.loadCount -= 1;
        }
      }
    );
  },

  failureLoad(response) {
    let responseJSON = response.responseJSON;

    this[this.stateName].isSuccess = false;
    this[this.stateName].isLoaded = true;
    if (responseJSON && responseJSON.error) {
      this[this.stateName].errorMsg = responseJSON.error;
    } else {
      this[this.stateName].errorMsg = "Unknown error";
    }
  },

  completedLoad(collection, response) {
    this[this.stateName].isSuccess = true;
    this[this.stateName].isLoaded = true;
  },

  delete(model, backendDelete) {
    if (backendDelete) {
      model.destroy(
        {
          wait: true,
          success: (m, response) => {
            this.listenables.delete.completed(m, response);
          },
          error: (m, response) => {
            this.listenables.delete.failure(m, response);
          }
        }
      );
    } else {
      this[this.stateName].items.remove(model);
      this.listenables.delete.completed();
    }
  },

  failureDelete(model, response) {
    let responseJSON = response.responseJSON;

    model.hasError = true;
    if (responseJSON && responseJSON.error) {
      model.errorMsg = responseJSON.error;
    } else {
      model.errorMsg = "Unknown error";
    }
  },

  save(model, data) {
    model.set(data);
    if (model.isNew()) {
      model.urlRoot = this[this.stateName].items.url;
    }
    model.save(
      null,
      {
        wait: true,
        success: (m, response) => {
          this.listenables.save.completed(m, response);
        },
        error: (m, response) => {
          this.listenables.save.failure(m, response);
        }
      }
    );
  },

  completedSave(model, response) {
    model.hasError = false;
    model.errorMsg = null;
    if (!this[this.stateName].items.contains(model)) {
      this[this.stateName].items.unshift(model);
    }
  },

  failureSave(model, response) {
    let responseJSON = response.responseJSON;

    model.hasError = true;
    if (responseJSON && responseJSON.error) {
      model.errorMsg = responseJSON.error;
    } else {
      model.errorMsg = "Unknown error";
    }
  },

  getNewItem() {
    let model = new Backbone.Model();
    return model;
  },

 update(action=false, extendData={}, data=this[this.stateName]) {
    let response = {action: action};
    Object.assign(response, extendData);
    response[this.stateName] = data;
    this.trigger(response);
  }
};
