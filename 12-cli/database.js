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
  async escreverArquivo(dados) {
    const arquivo = await writeFileAsync(
      this.NOME_ARQUIVO,
      JSON.stringify(dados),
    );
    return true;
  }
  async cadastrarHeroi(heroi) {
    const dados = await this.obterDadosArquivos();
    const id = heroi.id <= 2 ? heroi.id : Date.now();
    const heroiComId = {
      ...heroi,
      id,
    };
    const dadosFinal = [...dados, heroiComId];
    const resultado = await this.escreverArquivo(dadosFinal);
    return resultado;
  }
  async listar(id) {
    const dados = await this.obterDadosArquivos();
    const dadosFitlrados = dados.filter((item) => (id ? item.id === id : true));
    return dadosFitlrados;
  }
  async remover(id) {
    if (!id) {
      await this.escreverArquivo([]);
      return true;
    }
    const dados = await this.obterDadosArquivos();
    console.log(id);
    const indice = dados.findIndex((item) => item.id === parseInt(id));
    if (indice === -1) {
      throw Error('O usuário informado não existe');
    }
    const atual = dados[indice];
    dados.splice(indice, 1);
    return await this.escreverArquivo(dados);
  }
}

module.exports = new Database();
