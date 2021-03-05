export class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
        this._ascendente = true;
    }

    adicionaNegociacao(negociacao) {
        this._negociacoes.push(negociacao);
        //A classe reflect aplica o comportamento que queremos, através do método apply, passando os parametros e no array o contexto que queremos
        // Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    get negociacoes() {
        //Em programação defensiva, o concat() vai gerar uma cópia na nossa lista de negociacoes, para que a original não sofra alterações e interferências externas.
        //O método concat() permite numero infinitos de parametros, seja arrays ou nao.
        return [].concat(this._negociacoes);
    }

    esvaziaLista() {
        this._negociacoes = [];
    }

    ordenaColuna(criterio) {
        this._negociacoes.sort(criterio);        
    }

    inverteOrdem() {
        this._ascendente = ! this._ascendente;
        this._negociacoes.reverse();
    }

    isAscendente() {
        return this._ascendente;
    }
}