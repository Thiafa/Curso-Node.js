const service = require('./service');

async function main() {
  try {
    const result = await service.obterPessoas('a');
    let names = [];

    console.time('for');
    for (let i = 0; i <= result.results.length - 1; i++) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.timeEnd('for');

    console.time('for-in');
    for (let key in result.results) {
      const pessoa = result.results[key];
      names.push(pessoa.name);
    }
    console.timeEnd('for-in');

    console.time('for-of');
    for (let pessoa of result.results) {
      names.push(pessoa.name);
    }
    console.timeEnd('for-of');

    console.log(names);
  } catch (error) {
    console.error('Error interno', error);
  }
}

main();
