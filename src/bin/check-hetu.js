#!/usr/bin/env node

/* eslint-disable no-console */

import moment from 'moment';
import { parse } from '../hetu';

process.argv.slice(2).forEach(value => {
  const parsed = parse(value);
  const d = parsed.date();
  if (parsed.check()) {
    console.log(`${value}: born ${moment(d).format('YYYY-MM-DD')}, ${parsed.sex()}`);
  } else {
    console.log(`${value}: Failed to parse hetu`);
  }
});
