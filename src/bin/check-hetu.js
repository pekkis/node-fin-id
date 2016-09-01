#!/usr/bin/env node

import minimist from 'minimist';
import { parse } from '../hetu';

const argv = minimist(process.argv.slice(2));

argv._.forEach(value => {
  const parsed = parse(value);
  const d = parsed.date();
  if (parsed.check()) {
    console.log(value + ': born ' + d.getFullYear() + '-' + (d.getMonth()+1) +
      '-' + d.getDate() + ', ' + parsed.sex());
  } else {
    console.log(value + ': Failed to parse hetu');
  }
});
