/*
* Finnish Identity Number Library
* https://github.com/sendanor/node-fin-id
*/

/*
* Copyright (C) 2014 by Sendanor <info@sendanor.fi> (http://www.sendanor.fi),
*               2011-2014 by Jaakko-Heikki Heusala <jheusala@iki.fi> (http://www.jhh.me),
*               2009 by Mux F-Production <contact@mux.fi> (http://mux.fi/)
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of
* this software and associated documentation files (the "Software"), to deal in
* the Software without restriction, including without limitation the rights to
* use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
* of the Software, and to permit persons to whom the Software is furnished to do
* so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

"use strict";

var moment = require('moment');

/** Parse finnish IBAN as 16 numbers
* Example: 'FI21 1234 5600 0007 85', more examples: http://www.rbs.co.uk/corporate/international/g0/guide-to-international-business/regulatory-information/iban/iban-example.ashx
* @returns {string} The result as 16 numeric characters.
*/
function parse_fi_iban(iban) {
  iban = ('' + iban).trim().toLowerCase();
  iban = iban.replace(/^[^0-9]+/, "").replace(/ +/g, "");
  return iban;
}

/** */
function pad_zeros(num, l) {
  num = '' + num;
  var ll = num.length;
  if(ll >= l) {
    return num;
  }
  return new Array((l-ll)+1).join('0') + num;
}

/** Parse finnish reference numbers and pad it
* @returns {string} The reference number as 20 long string padded with zeros.
*/
function parse_refnum(num) {
  num = (''+num).trim().replace(/[^0-9]/g, "");
  if(num.length !== 20) {
    return pad_zeros(num, 20);
  }
  return num;
}

/** Parse cents and pad it. If the amount is wrong, use all zeros (8 characters).
* @returns {string} The reference number as 20 long string padded with zeros.
*/
function parse_cents(opts) {
  opts = opts || {};

  var euros = pad_zeros(opts.euros||'', 6);
  var cents = pad_zeros(opts.cents||'', 2);

  if(euros.length !== 6) {
    return '00000000';
  }

  var res;
  if( (!opts.hasOwnProperty('euros')) && (cents.length > 2) ) {
    euros = '';
    res = pad_zeros('' + euros + cents, 8);
  } else {
    if(cents.length !== 2) {
      return '00000000';
    }
    res = pad_zeros('' + euros + cents, 8);
  }
  if(!(res && (res.length === 8))) {
    return '00000000';
  }
  return res;
}

/** Parse dates as a string in format "YYMMDD"
* @returns {string} The date as a string
*/
function parse_duedate(date) {
  if(!date) {
    return '000000';
  }
  var str = moment(date).format("YYMMDD");
  return str;
}

/** */
function viivakoodi_create(opts) {
  opts = opts || {};
  if(!opts.hasOwnProperty('iban')) { throw new TypeError("opts.iban missing"); }
  var iban = parse_fi_iban(opts.iban);
  var cents = parse_cents(opts);
  var refnum = parse_refnum(opts.refnum);
  var duedate = parse_duedate(opts.duedate);
  var viite = '4' + iban + cents + "000" + refnum + duedate;
  return viite;
}

/** */
function viivakoodi_check(code) {
  if(!is.string(code)) { return false; }
  if(code[0] !== '4') { return false; }
  if(code.length !== 54) { return false; }
  if(!is.integer(code)) { return false; }
  return true;
}

// Exports
module.exports = {
  "create": viivakoodi_create,
  "check": viivakoodi_check
};

/* EOF */
