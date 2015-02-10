#!/usr/bin/env node
//Configure vagrant interface
var vagrant = require('vagrant');
var utils = require('./lib/utils');
var manage = require('./lib/manage');
var colors = require('colors');

vagrant.start = utils.howstDir;

//CLI Routing
var program = require('commander');

//Libraries
var help = require('./lib/help');

program
  .version('0.0.3')

//Custom help text
program
  .on('--help', function(){
    console.log(help.text);
});

//CREATE
program
  .command('create <hostname>')
  .description("Create a new Howst machine")
  .action(function(hostname, options) {
    manage.newMachine(hostname)
});

//CONFIG
program
  .command('config <hostname>')
  .description("Reconfigure an existing Howst machine")
  .action(function(hostname) {
    manage.editMachine(hostname)
});

//REMOVE
program
  .command('remove <hostname>')
  .description("stops and deletes all traces of the Howst machine")
  .action(function(hostname) {
    manage.destroyMachine(hostname)
});

//LIST
program
  .command('list')
  .description("Lists all known Howst machines")
  .option('-s, --status', 'Show status')
  .action(function(options) {
    manage.listMachines(options);
});

//Set the remote password
program
  .command('remote-password <password>')
  .description("Sets password for syncing remote databases")
  .action(function(password) {
    process.env['HOWST_REMOTE_PASSWORD'] = password;
});



/* TODO - find a way to have optional arguments with commander so we can use defaults
//SET DEFAULT
program
  .command('default <hostname>')
  .description("Sets the default Howst machine")
  .action(function(machine) {
    utils.setDefault(machine);
});
*/

//We'll just pass anything else through to vagrant
program
  .command('*')
  .description("Vagrant passthrough.  See below.")
  .action(function () {
    var parsedArgs = [];
    for (var i = 0; i < arguments.length - 1; i++){
      parsedArgs.push(arguments[i]);
    }
    var command = parsedArgs[0];
    parsedArgs.shift();
    parsedArgs.push(function(){});
    vagrant[command].apply(this, parsedArgs);
});

program.parse(process.argv);
  

 

/*
//From a dir with a Vagrantfile, this will ssh into the VM 
var empty = function(){};
vagrant['box']("list", empty)
*/