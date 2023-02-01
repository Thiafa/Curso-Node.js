const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.NOME_ARQUIVO = 'herois.json';
  }
  async obterDadosArquivos() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf-8');
    return JSON.parse(arquivo.toString());
  }
  async cadastrarHeroi(heroi) {
    const dados = await this.obterDadosArquivos();
    const id = heroi.id <= 2 ? heroi.id : Date.now();
    const heroiComId = {
      id,
      ...heroi,
    };
    const dadosFinal = [...dados, heroiComId];
    const resultado = await this.escreverArquivo(dadosFinal);
    return resultado;
  }
  async escreverArquivo(dados) {
    const arquivo = await writeFileAsync(
      this.NOME_ARQUIVO,
      JSON.stringify(dados),
    );
    return true;
  }
  async listar(id) {
    const dados = await this.obterDadosArquivos();
    const dadosFitlrados = dados.filter((item) => (id ? item.id === id : true));
    return dadosFitlrados;
  }
}

module.exports = new Database();
