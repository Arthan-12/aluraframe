import { ListaNegociacoes } from '../models/listaNegociacoes';
import { Mensagem } from '../models/mensagem';
import { Negociacao } from '../models/negociacao';
import { NegociacoesView } from '../views/negociacoesView';
import { MensagemView } from '../views/mensagemView';
import { NegociacaoService } from '../services/negociacaoService';
import { DateHelper } from '../helpers/dateHelper';
import { Bind } from '../helpers/bind';


class NegociacaoController {

    constructor() {
        //A função bind() mantém o escopo de querySelector ao document. Sem ela, ele atrela o método ao $ e perde o efeito de 'this'
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';
        //Para poder reutilizar a função de update na listaNegociacoes e ela nao ficar presa ao escopo 'this', passamos a instancia com dois parametros, como exemplificado abaixo

        this._listaNegociacoes = new Bind(
            //model
            new ListaNegociacoes(),
            //view
            new NegociacoesView($('#negociacoesView')),
            //condição (com REST operator no Bind() torna desnecessario o uso do array)
            'adicionaNegociacao', 'esvaziaLista', 'ordenaColuna', 'inverteOrdem')
        //Se utilizarmos a abordagem de arrow function, o código irá funcionar tambem, pelo fato do escopo dela ser léxico, amarrado ao contexto, diferente da function, que é dinamico
         
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
        
        this._ordemAtual = '';

        this._negociacaoService = new NegociacaoService();

        this._init();
    }

    _init() {

        this._negociacaoService
            .listaNegociacoes()
            .then(negociacoes => negociacoes
                .forEach(negociacao =>
                    this._listaNegociacoes.adicionaNegociacao(negociacao)))
                .catch(err => 
                    this._mensagem.texto = err
                );
    }

    //Método de integração entre a DAO e a Controller
    adicionaNegociacao(event) {
        //preventDefault é utilizado para não recarregar o formulário
        event.preventDefault();
       
        let negociacao = this._criaNegociacao();

        this._negociacaoService
            .cadastraNegociacao(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adicionaNegociacao(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(err => this._mensagem.texto = err)
    }

    importaTodasNegociacoes() {
        let negociacaoService = new NegociacaoService();

        Promise.all([
            negociacaoService.importaNegociacoesDaSemana(),
            negociacaoService.importaNegociacoesDaSemanaAnterior(),
            negociacaoService.importaNegociacoesDaSemanaRetrasada()])
            //O método filter vai varrer o array de negociacoes inteiro usando o parametro definido pelo usuário e filtrar os elementos que atendem a ele, num novo array
            .then(negociacoes => negociacoes
                .filter(negociacao =>
                !this._listaNegociacoes.negociacoes
                //O método some vai varrer o array em busca do elemento definido no parametro, no caso a string de uma negociacao existente (nao compare elementos diretamente em js!)
                //e realizar o break assim que encontrar o elemento que atender a exigencia
                .some(negociacaoExistente =>
                    JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
                    )
                .then(negociacoes => {
                //Precisamos converter a lista de arrays que as negociações retornam, para uma única lista, usando reduce, para importarmos corretamente nossas negociações
                negociacoes
                    .reduce((newArray, array) => newArray.concat(array), [])
                    //Vamos adicionar cada instancia gerada em nossa lista de negociacoes
                    .forEach(negociacao => this._listaNegociacoes.adicionaNegociacao(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso';

            })
            .catch(err => this._mensagem.texto = err);
    }

    importaNegociacoes() {

        this._negociacaoService
            .importaNegociacoesDaSemana(this._listaNegociacoes)
            .then(negociacoes => {
                negociacoes.filter(negociacao =>
                    !this._listaNegociacoes.negociacoes
                    .some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
                    .forEach(negociacao =>
                        this._listaNegociacoes.adicionaNegociacao(negociacao));
                        this._mensagem.texto = 'Negociações importadas com sucesso';
                    })
                    .catch(err => this._mensagem.texto = err);

    }

    apagaNegociacao() {

        this._negociacaoService
            .apagaNegociacao()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvaziaLista();
            })
            .catch(err => this._mensagem.texto = erro);
    }


    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

    }

    //Usamos _ antes de um método para dizer que ele é reservado para própria classe e não deve ser chamado por alguem de fora do mesmo
    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    ordenaColuna(coluna) {
        //quando colocamos um atributo em colchetes ao objeto, objeto[attr], significa que queremos acessar dinamicamente esse attr e não deixa-lo pre-definido
        if(this._ordemAtual == coluna) {
            // inverte a ordem da lista!
        } else {
            this._listaNegociacoes.ordenaColuna((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

}

let negociacaoController = new NegociacaoController();

export function currentInstance() {

    return negociacaoController;
}