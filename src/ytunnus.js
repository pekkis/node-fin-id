function parseInt10(n) {
  return parseInt(n, 10);
}

/** Generate Finnish business IDs
* @param id {string} The business ID with or without checksum
* @returns {string} The business ID with checksum
*/
function withSum(id_) {
  const numbers = [7, 9, 10, 5, 8, 4, 2];
  const parts = (id_).split('-');
  let id = parts.shift();
  if (!id) {
    throw new TypeError(`id not valid: ${id_}`);
  }
  if (id.length === 6) {
    id = `0${id}`;
  }
  if (id.length !== 7) { throw new TypeError(`id length not valid: ${id_}`); }

  const idArray = id.split('').map(parseInt10);

  if (idArray.length > 7) {
    throw new TypeError(`id array too long (${idArray.length}) for ${id_}`);
  }

  let sum = idArray.reduce((r, n, i) => {
    const x = numbers[i];
    if (typeof n !== 'number') {
      throw new TypeError(`id[${i}] not valid number in ${id_}`);
    }
    return r + (n * x);
  }, 0);

  sum %= 11;
  if (!((sum === 0) || ((sum >= 2) && (sum <= 10)))) {
    throw new TypeError(`Illegal checksum for ${id_}`);
  }
  sum = (sum === 0) ? 0 : 11 - sum;

  const sum2 = parts.join('-');
  if (sum2 && (`${sum}` !== sum2)) {
    throw new TypeError(`Illegal checksum in ${id_}`);
  }

  return `${id}-${sum}`;
}

/** Check existance of checksum
* @param id {string} Finnish business ID
* @returns {boolean} `true` if `id` has a checksum
*/
function hasSum(id) {
  return id.match('-') !== null;
}

/** Parse Finnish business ID
* @param id {string} ID with or without checksum
* @returns {string} ID with checksum
*/
function parse(id_) {
  return withSum(id_);
}

/** Non-throwing version of parse()
* @param id {string} The ID to parse
* @param defvalue {string} Optional value to use if errors, defaults to `undefined`.
* @returns {string|defvalue} ID with checksum otherwise `defvalue`
*/
function parseNothrow(id, origDefvalue) {
  const defvalue = (arguments.length === 1) ? undefined : origDefvalue;
  try {
    return parse(id);
  } catch (err) {
    return defvalue;
  }
}

/** Compare two business IDs
* @param a {string} First business ID
* @param b {string} Second business ID
* @returns {boolean} `true` if both ids are identical
*/
function compare(a, b) {
  return parseNothrow(a) === parseNothrow(b);
}

/** Check Finnish business ID validity. This function might throw an exception! See checkNoThrow().
* @param id {string} The ID to check
* @returns {boolean} `true` if ID was valid
*/
function check(id) {
  return hasSum(id) ? compare(id, withSum(id)) : false;
}

/** Non-throwing version of check()
* @param id {string} The ID to check
* @returns {boolean} `true` if ID was valid
*/
function checkNoThrow(id) {
  try {
    return check(id);
  } catch (err) {
    return false;
  }
}

export default {
  withSum,
  hasSum,
  compare,
  parse: parseNothrow,
  check: checkNoThrow,
};
