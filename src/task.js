'use strict';

import fs from "fs";
import readline from "readline";
import {stdout} from "process";


const log = console.log;
const dataFile = './access.log';
const logFileName = '_requests.log';
const IP = {
  1: '89.123.1.41',
  2: '34.48.240.111'
};
const IP1Log = fs.createWriteStream(IP[1] + logFileName);
const IP2Log = fs.createWriteStream(IP[2] + logFileName);
const stream = fs.createReadStream(dataFile, 'utf-8');
const rl = readline.createInterface({input: stream});


rl.on("line", (line) => {

  if (line.includes(IP[1])) {
    IP1Log.write(line + "\n");
  }
  if (line.includes(IP[2])) {
    IP2Log.write(line + "\n");
  }

  stdout.cursorTo(0);
  stdout.write('Processing... ');

});


rl.on('close', () => {
  stdout.cursorTo(0);
  log('Processing done');
});

