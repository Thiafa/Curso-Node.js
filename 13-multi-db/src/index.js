const ContextStrategy = require('./db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb');
const Postgre = require('./db/strategies/postgres');

const contextMongo = new ContextStrategy(new MongoDB());
const contextPostgres = new ContextStrategy(new Postgre());

contextMongo.create();
contextPostgres.create({
  nome: 'João',
  sobrenome: 'Almeida',
});
