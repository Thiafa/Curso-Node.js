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

const usuarioPromise = obterUsuario();
usuarioPromise
  .then((usuario) => {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id,
        },
        telefone: result,
      };
    });
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: {
          nome: resultado.usuario.nome,
        },
        telefone: resultado.telefone,
        endereco: result,
      };
    });
  })
  .then((resultado) => {
    console.log(`
    Nome: ${resultado.usuario.nome},
    Endereço: ${resultado.endereco.rua} n°${resultado.endereco.numero} 
    Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `);
  })
  .catch((erro) => {
    console.error('ERRO!', erro);
  });
// Para manipular com sucesso usa-se a função .then, para erros usa-se .catch;

//  Pipe:
