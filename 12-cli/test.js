const { deepEqual, ok } = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1,
};

describe('Suíte de manipulação de Herois', () => {
  // beforeEach(async () => await database.cadastrarHeroi(DEFAULT_ITEM_CADASTRAR));
  it('deve pesquisar um heroi, usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = await database.listar(expected.id);

    deepEqual(resultado, expected);
  });
  it('deve cadastrar um heroi, usando arquivos', async () => {
    const expected = {
      DEFAULT_ITEM_CADASTRAR,
    };
    const resultado = await database.cadastrarHeroi(DEFAULT_ITEM_CADASTRAR);
    const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);
    ok(actual, expected);
  });
  it.only('remover um herói por id', async () => {
    const expected = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    deepEqual(resultado, expected);
  });
});
