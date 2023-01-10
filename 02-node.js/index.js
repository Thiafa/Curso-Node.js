/*
1- Obter o número de telefone do usuário a partir do seu Id.
2- Obter o endereço do usuário pelo Id.
*/

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: 'Thiago',
      dataNascimento: new Date(),
    });
  }, 1000);
}

function obterTelefone(idUsuario, callback) {
  setTimeout(function () {
    return callback(null, {
      telefone: '9999887755',
      ddd: 11,
    });
  }, 2000);
}
function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'Rua dos bobos',
      numero: 0,
    });
  }, 3000);
}

function resolverUsuario() {
  console.log('Usuário', usuario);
}

obterUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.error('Erro em usuário', error);
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error('Erro em telefone', error1);
      return;
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.error('Erro em telefone', error2);
        return;
      }
      console.log(`
      Nome: ${usuario.nome},
      Endereco: ${endereco.rua} n°${endereco.numero}.
      Telefone: (${telefone.ddd}), ${telefone.telefone}.
      `);
    });
  });
});

// const telefone = obterTelefone(usuario.id);

// console.log('usuario', usuario);
// console.log('usuario', telefone);

// setTimeout(): define um cronômetro que executa uma função ou um trecho de código especificado assim que o cronômetro expira.

// null || "" || 0 === false no js
