import Reflux from 'reflux';

export default Reflux.createActions({
  load: {children: ["completed", "failure"]},
  delete: {children: ["completed", "failure"]},
  save: {children: ["completed", "failure"]},
  set: {},
  internalFilter: {},
  clear: {},
  clearError: {}
});
