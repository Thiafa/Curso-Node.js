const { deepEqual, ok } = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1,
};
const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'Lanterna Verde',
  poder: 'Energia do Anel',
  id: 2,
};

describe('Suíte de manipulação de Herois', () => {
  before(async () => {
    // await database.cadastrarHeroi(DEFAULT_ITEM_CADASTRAR);
    // await database.cadastrarHeroi(DEFAULT_ITEM_ATUALIZAR);
  });
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
  it('deve atualizar um herói pelo id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Dinheiro',
    };
    const novoDado = {
      nome: 'Batman',
      poder: 'Dinheiro',
    };
    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);

    deepEqual(resultado, expected);
  });
  it('remover um herói por id', async () => {
    const expected = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    deepEqual(resultado, expected);
  });
});
