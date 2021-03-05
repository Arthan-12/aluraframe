import { HttpService } from './httpService';
import { ConnectionFactory }  from './connectionFactory';
import { NegociacaoDAO } from '../dao/negociacaoDAO';
import { Negociacao } from '../models/negociacao';

export class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    importaNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {
            this._http
                .getNegociacoes('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes
                        //mapear esses objetos em instancias de Negociacao, passando seus atributos.
                        .map(obj =>
                            new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
                })
                .catch(err => {
                    console.log(err);
                    reject('Não foi possível obter as negociações da semana')
                })
        });
    }

    importaNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {
            this._http
                .getNegociacoes('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes
                        //mapear esses objetos em instancias de Negociacao, passando seus atributos.
                        .map(obj =>
                            new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
                })
                .catch(err => {
                    console.log(err);
                    reject('Não foi possível obter as negociações da semana')
                })
        });
        
    }

    importaNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {
            this._http
                .getNegociacoes('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes
                        //mapear esses objetos em instancias de Negociacao, passando seus atributos.
                        .map(obj =>
                            new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
                })
                .catch(err => {
                    console.log(err);
                    reject('Não foi possível obter as negociações da semana')
                })
        });
        
    }

    cadastraNegociacao(negociacao) {

        return ConnectionFactory
        .getConnection()
        .then(connection =>
            //Uma vez que conseguimos a conexão, instanciamos o DAO para gravar no db
            new NegociacaoDAO(connection))
                .then(dao => dao.adicionaNegociacaoDAO(negociacao))
                .then(() => 'Negociação adicionada com sucesso!')
                .catch(err => {
                    console.log(err)
                    throw new Error('Não foi possível adicionar a negociação')
                });
    }

    listaNegociacoes() {

        return ConnectionFactory
        .getConnection()
        .then(connection =>
            new NegociacaoDAO(connection))
                .then(dao => dao.listaNegociacoesDAO())
                .catch(err => {
                    console.log(err)
                    throw new Error('Não foi possível obter as negociações')
                });
    }

    apagaNegociacao() {

        return ConnectionFactory
        .getConnection()
        .then(connection =>
            new NegociacaoDAO(connection))
                .then(dao => dao.apagaTodasNegociacoes())
                .then(() => 'Negociacoes apagadas com sucesso!')
                .catch(err => {
                    console.log(err)
                    throw new Error('Não foi possível apagar as negociações')
                });
    }

    importaNegociacao(listaAtual) {
        
        return this.importaNegociacoesDaSemana()
        .then(negociacoes => negociacoes
            .filter(negociacao =>
                !listaAtual
                    .some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
                        )
                        .catch(err => {
                            console.log(err)
                            throw new Error('Não foi possível buscar negociações para importar')
                        })
    }
}