#!/usr/bin/env node

const style = require('ansi-styles');
const autoRestarter = require('../');

const syntax = `${style.red.open}${style.bold.open}Syntax:${style.bold.close} auto-restarter <file> [msBeforeRestart]${style.red.close}`;
if (process.argv.length < 3)
	return console.log(syntax);

const args = process.argv.slice(2);

if (args.length > 1) {
	if (isNaN(parseInt(args[1])))
		return console.log(syntax);
	autoRestarter(args[0], parseInt(args[1]))
}
else
	autoRestarter(args[0]);
