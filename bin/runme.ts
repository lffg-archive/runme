#! /usr/bin/env node

import start from '../src/main';

start().catch((error: Error) => {
  console.log('Whoops! Error:');
  console.error(error);
});
