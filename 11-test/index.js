const { obterPessoas } = require('./service');

console.log(obterPessoas('r2-d2'));

async function main() {
  try {
    const { results } = await obterPessoas('r2-d2');
    console.log(results);
  } catch (error) {
    console.error(error);
  }
}

main();
