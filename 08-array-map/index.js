const service = require('./service');

Array.prototype.meuMap = function (callback) {
  const novoArrayMap = [];
  for (let i = 0; i <= this.length - 1; i++) {
    const resultado = callback(this[i], i);
    novoArrayMap.push(resultado);
  }
  return novoArrayMap;
};

async function main() {
  try {
    const result = await service.obterPessoas('a');
    // const names = [];
    // result.results.forEach((item) => {
    //   names.push(item.name);
    // });
    // const names = result.results.map((pessoa) => pessoa.name);
    // console.log(names);
    const names = result.results.meuMap(function (pessoa, indice) {
      return `[${indice}] ${pessoa.name}`;
    });
    console.log(names);
  } catch (err) {
    console.error('ERRO INTERNO', err);
  }
}

main();
