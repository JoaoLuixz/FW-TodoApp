#! /usr/bin/env node

console.log('Teste gravacao de dados no banco remoto');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async')
var Tarefa = require('./models/tarefa')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function grava50Registros(){
  var contador = 0
  while (contador < 50){
    (new Tarefa ({descricao: "Registro " + (contador+1),statusRealizada: false})).save();
    contador++;
  }
  
}

grava50Registros();

