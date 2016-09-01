function parse_int_10(n) {
  return parseInt(n, 10);
}

/** Generate Finnish business IDs
* @param id {string} The business ID with or without checksum
* @returns {string} The business ID with checksum
*/
function _with_sum(id_) {
  var numbers = [7, 9, 10, 5, 8, 4, 2];
  var parts = (''+id_).split("-");
  var id = parts.shift();
  if(!id) { throw new TypeError("id not valid: " + id_); }
  if(id.length === 6) {
    id = '0' + id;
  }
  if(id.length !== 7) { throw new TypeError("id length not valid: " + id_); }

  var id_array = id.split('').map(parse_int_10);

  if(id_array.length > 7) {
    throw new TypeError("id array too long (" + id_array.length + ") for " + id_);
  }

  var sum = id_array.reduce(function(sum, n, i) {
    var x = numbers[i];
    if(typeof n !== "number") { throw new TypeError("id["+i+"] not valid number in " + id_); }
    return sum + n * x;
  }, 0);

  sum = (sum % 11);
  if(! ((sum === 0) || ((sum >= 2) && (sum <= 10))) ) { throw new TypeError("Illegal checksum for " + id_); }
  sum = (sum === 0) ? 0 : 11 - sum;

  var sum_ = parts.join('-');
  if(sum_ && (''+sum !== sum_)) { throw new TypeError("Illegal checksum in " + id_); }

  return id + "-" + sum;
}

/** Check existance of checksum
* @param id {string} Finnish business ID
* @returns {boolean} `true` if `id` has a checksum
*/
function _has_sum(id) {
  return (''+id).match("-") !== null;
}

/** Parse Finnish business ID
* @param id {string} ID with or without checksum
* @returns {string} ID with checksum
*/
function _parse(id_) {
  return _with_sum(id_);
}

/** Non-throwing version of _parse()
* @param id {string} The ID to parse
* @param defvalue {string} Optional value to use if errors, defaults to `undefined`.
* @returns {string|defvalue} ID with checksum otherwise `defvalue`
*/
function _parse_nothrow(id, defvalue) {
  defvalue = (arguments.length === 1) ? undefined : defvalue;
  try {
    return _parse(id);
  } catch(err) {
    return defvalue;
  }
}

/** Compare two business IDs
* @param a {string} First business ID
* @param b {string} Second business ID
* @returns {boolean} `true` if both ids are identical
*/
function _compare(a, b) {
  return _parse_nothrow(a) === _parse_nothrow(b);
}

/** Check Finnish business ID validity. This function might throw an exception! See _check_nothrow().
* @param id {string} The ID to check
* @returns {boolean} `true` if ID was valid
*/
function _check(id) {
  id = '' + id;
  return _has_sum(id) ? _compare(id, _with_sum(id)) : false;
}

/** Non-throwing version of _check()
* @param id {string} The ID to check
* @returns {boolean} `true` if ID was valid
*/
function _check_nothrow(id) {
  try {
    return _check(id);
  } catch(err) {
    return false;
  }
}

export default {
  _with_sum,
  _has_sum,
  compare: _compare,
  parse: _parse_nothrow,
  check: _check_nothrow,
};
