/*
1- Obter o número de telefone do usuário a partir do seu Id.
2- Obter o endereço do usuário pelo Id.
*/

// Módulo interno de Node que converte funções callback em funções assíncronas
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario(callback) {
  //Se algo inesperado ocorrer é chamado o reject, se tudo ocorrer corretamente é chamado o resolve
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      // return reject(new Error('Erro ao resolver callback'));
      return resolve({
        id: 1,
        nome: 'Thiago',
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario, callback) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '9999887755',
        ddd: 11,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'Rua dos bobos',
      numero: 0,
    });
  }, 3000);
}
main();
// Adicionar async na função, logo retorna uma promise
async function main() {
  try {
    console.time('Medida-promise');
    const usuario = await obterUsuario();
    // Utiliza-se quando não se necessita manipular os dados
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ]);
    const telefone = resultado[0];
    const endereco = resultado[1];
    console.log(`
    Nome: ${usuario.nome},
    Endereço: ${endereco.rua} n°${endereco.numero} 
    Telefone: (${telefone.ddd}) ${telefone.telefone}
    `);
    console.timeEnd('Medida-promise');
  } catch (error) {
    console.error('Error!', error);
  }
}
