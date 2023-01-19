const axios = require('axios');
const URL = 'https://swapi.dev/api/people';

async function obterPessoas(nome) {
  const url = `${URL}/?search=${nome}&format=json`;
  const response = await axios.get(url);
  return response.data;
}

// obterPessoas('r2')
//   .then(function (resultado) {
//     console.log(resultado);
//   })
//   .catch(function (err) {
//     console.error(err);
//   });

module.exports = {
  obterPessoas,
};
