const { Command } = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
  const Commander = new Command();

  Commander.version('v1')
    .option('-n, --nome [value]', 'Nome do Heroi')
    .option('-p, --poder [value]', 'Poder do Heroi')
    .option('-i, --id [value]', 'Id do Heroi')
    .option('-r, --remover ', 'Remover um Heroi pelo id')
    .option('-c, --cadastrar', 'Cadastrar um Heroi')
    .option('-l, --listar', 'Listar um Heroi')
    .option('-a, --atualizar [value]', 'Atualizar um Heroi pelo id');

  Commander.parse(process.argv);

  const options = Commander.opts();
  const heroi = new Heroi(options);

  try {
    if (options.cadastrar) {
      const resultado = await Database.cadastrar(heroi);
      if (!resultado) {
        console.error('Heroi não foi cadastrado!');
        return;
      }
      console.log('Heroi cadastrado com sucesso');
    }
    if (options.listar) {
      const resultado = await Database.listar();
      console.log(resultado);
    }
    if (options.remover) {
      const resultado = await Database.remover(heroi.id);
      if (!resultado) {
        console.error('Heroi não foi excluído!');
        return;
      }
      console.log('Heroi excluído!');
    }
    if (options.atualizar) {
      const idParaAtualizar = parseInt(options.atualizar);
      delete heroi.id;
      // Remover todas as chaves com undefined ou null
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await Database.atualizar(
        idParaAtualizar,
        heroiAtualizar,
      );
      if (!resultado) {
        console.error('Heroi não foi atualizado!');
        return;
      }
      console.log('Heroi atualizado com sucesso!');
    }
  } catch (error) {
    console.log('ERROR!', error);
  }
}

main();
