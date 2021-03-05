export class Negociacao {

    constructor(data, quantidade, valor) {

        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        //O método freeze é um shallow protection para atributos da própria classe. Mas ele não protege de métodos de outros objetos da classe, como Date
        Object.freeze(this);
    }

    //O método getter do js, através dessa sintaxe permite o acesso direto do atributo apenas referenciando o objeto.atributo, além de ser apenas leitura
    get volume() {
        return this._quantidade * this._valor;
    }

    get data() {
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }
}