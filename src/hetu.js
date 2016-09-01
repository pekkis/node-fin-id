function parseHetuString(hetu) {
  // Tarkista henkilötunnus hetu (merkkijono muotoa PPKKVVXNNNT).
  // dd = 01..31 (päivä)
  // mm = 01..12 (kuukausi)
  // yy = 00..99 (vuosi)
  // x = "+" tarkoittaa 1800-lukua, "-" 1900-lukua ja "A" 2000-lukua
  // n = 3-numeroinen yksilönumero (miehillä pariton, naisilla parillinen)
  // t = tarkistemerkki (jokin seuraavista: 0123456789ABCDEFHJKLMNPRSTUVWXY)

  // vaaditaan 11 merkin pituus
  if (hetu.length !== 11) {
    return false;
  }

  const dd = parseInt(hetu.substr(0, 2).replace('/^0+/', '').replace('/^$/', ''), 10);
  const mm = parseInt(hetu.substr(2, 2).replace('/^0+/', '').replace('/^$/', ''), 10);
  const yy = parseInt(hetu.substr(4, 2).replace('/^0+/', '').replace('/^$/', ''), 10);
  const century = hetu[6].toUpperCase();
  const id = parseInt(hetu.substr(7, 3).replace('/^0+/', '').replace('/^$/', ''), 10);
  const checksum = hetu[10].toUpperCase();

  if ((dd < 1) || (dd > 31)) {
    return false;
  }

  if ((mm < 1) || (mm > 12)) {
    return false;
  }
  if (isNaN(yy) || (yy < 0)) {
    return false;
  }
  if ((century !== '+') && (century !== '-') && (century !== 'A')) {
    return false;
  }

  if (isNaN(id) || (id < 0)) {
    return false;
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

/** Calculate check sum for finnish hetu ID object */
function hetuChecksum(id) {
  // luodaan iso luku äsken luetuista numeroista ja samalla lasketaan tarkiste
  const n = (id.n + (id.yy * 1000) + (id.mm * 100000) + (id.dd * 10000000)) % 31;
  const s = '0123456789ABCDEFHJKLMNPRSTUVWXY';
  return s[n];
}

/** Check hetu from a string */
function checkParsedHetu(id) {
  if ((!id) || (id && (!id.t))) {
    return false;
  }
  return hetuChecksum(id) === id.t;
}

function parseCentury(x) {
  switch (x) {
    case '+':
      return 1800;
    case '-':
      return 1900;
    case 'A':
      return 2000;
    default:
      throw new Error('error in century parsing');
  }
}

/** Parse date from hetu object */
function parseHetuDate(id) {
  const century = parseCentury(id.x);
  if (century && id.mm && id.dd) {
    return new Date(century + id.yy, id.mm - 1, id.dd, 12);
  }

  throw new Error('Error in parsing hetu');
}

/** Parse sex */
function parseSex(parsedHetu) {
  let n = parsedHetu.n;
  if ((n === undefined) || (typeof n !== 'number')) {
    return false;
  }

  n &= 1;
  switch (n) {
    case 0:
      return 'female';
    case 1:
      return 'male';
    default:
      throw new Error('Invalid gender');
  }
}

export function parse(originalHetu) {
  let hetu = originalHetu;
  let parsedHetu = parseHetuString(hetu);

  return {
    change: function change(h) { hetu = h; parsedHetu = parseHetuString(hetu); },
    check: function checkk() { return checkParsedHetu(parsedHetu); },
    date: function date() { return parseHetuDate(parsedHetu); },
    sex: function sex() { return parseSex(parsedHetu); },
  };
}

export function check(hetu) {
  return parse(hetu).check();
}

export default {
  parse,
  check,
};
