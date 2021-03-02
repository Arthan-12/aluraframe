class ListaNegociacoes {

    constructor() {
        this._negociacoes = []
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        //Em programação defensiva, o concat() vai gerar uma cópia na nossa lista de negociacoes, para que a original não sofra alterações e interferências externas.
        //O método concat() permite numero infinitos de parametros, seja arrays ou nao.
        return [].concat(this._negociacoes);
    }
}