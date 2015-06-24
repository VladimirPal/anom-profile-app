export default {
  componentWillMount: function() {
    this.intervals = [];
  },
  setTimeout: function() {
    this.intervals.push(setTimeout.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};
