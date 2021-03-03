class NegociacaoService {

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


}