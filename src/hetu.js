function parse_hetu_string (hetu) {

  // Tarkista henkilötunnus hetu (merkkijono muotoa PPKKVVXNNNT).
  // dd = 01..31 (päivä)
  // mm = 01..12 (kuukausi)
  // yy = 00..99 (vuosi)
  // x = "+" tarkoittaa 1800-lukua, "-" 1900-lukua ja "A" 2000-lukua
  // n = 3-numeroinen yksilönumero (miehillä pariton, naisilla parillinen)
  // t = tarkistemerkki (jokin seuraavista: 0123456789ABCDEFHJKLMNPRSTUVWXY)

  // vaaditaan 11 merkin pituus
  if (hetu.length !== 11) {
    return;
  }

  const dd = parseInt(hetu.substr(0, 2).replace('/^0+/', '').replace('/^$/', ''), 10);
  const mm = parseInt(hetu.substr(2, 2).replace('/^0+/', '').replace('/^$/', ''), 10);
  const yy = parseInt(hetu.substr(4, 2).replace('/^0+/', '').replace('/^$/', ''), 10);
  const century = hetu[6].toUpperCase();
  const id = parseInt(hetu.substr(7, 3).replace('/^0+/', '').replace('/^$/', ''), 10);
  const checksum = hetu[10].toUpperCase();

  if ((dd < 1) || (dd > 31)) {
    return;
  }

  if ((mm < 1) || (mm > 12)) {
    return;
  }
  if (isNaN(yy) || (yy < 0)) { return; }
  if ((century !=='+') && (century !== '-') && (century !== 'A')) {
    return;
  }

  if (isNaN(id) || (id < 0)) {
    return;
  }

  return {
    x: century,
    dd,
    mm,
    yy,
    n: id,
    t: checksum,
  };
}

/** Check hetu from a string */
function check_parsed_hetu (id) {

  /** Calculate check sum for finnish hetu ID object */
  function hetu_checksum(id) {
    // luodaan iso luku äsken luetuista numeroista ja samalla lasketaan tarkiste
    const n = (id.n + id.yy*1000 + id.mm*100000 + id.dd*10000000)%31;
    const s = '0123456789ABCDEFHJKLMNPRSTUVWXY';
    return s[n];
  }

  if( (!id) || (id && (!id.t)) ) { return false; }
  return hetu_checksum(id) === id.t;
}

/** Parse date from hetu object */
function parse_hetu_date(id) {
  function parse_century(x) {
    switch(x) {
      case '+': return 1800;
      case '-': return 1900;
      case 'A': return 2000;
    }
  }
  const century = parse_century(id.x);
  if(century && id.mm && id.dd) { return new Date(century+id.yy, id.mm-1, id.dd, 12); }
}

/** Parse sex */
function parse_sex(parsed_hetu) {
  let n = parsed_hetu.n;
  if((n === undefined) || (typeof n !== "number")) { return; }

  n = n & 1;
  /* jshint bitwise: true */
  /* jslint bitwise: true */
  switch(n) {
    case 0: return "female";
    case 1: return "male";
  }
}

export function parse(originalHetu) {
  let hetu = "" + originalHetu;
  let parsed_hetu = parse_hetu_string(hetu);

  return {
    'change': function(h) { hetu= "" + h; parsed_hetu = parse_hetu_string(hetu); },
    'check': function() { return check_parsed_hetu(parsed_hetu); },
    'date': function() { return parse_hetu_date(parsed_hetu); },
    'sex': function() { return parse_sex(parsed_hetu); }
  };
}

export function check(hetu) {
  return parse(hetu).check();
}

export default {
  parse,
  check,
};
