class Underscore 
{
  /**
   * Sort the object's values by a criterion produced by an iteratee.
   * @see https://github.com/jashkenas/underscore/blob/master/underscore.js
   */
  sortBy(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };
}

class Helper
{
  constructor() {
    this._underscore = new Underscore()
  }

  /**
   * @return {Underscore}
   */
  get _u() {
    return this._underscore
  }
}

module.exports = Helper