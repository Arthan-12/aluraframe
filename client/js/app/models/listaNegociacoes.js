"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, ListaNegociacoes;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("ListaNegociacoes", ListaNegociacoes = function () {
                function ListaNegociacoes() {
                    _classCallCheck(this, ListaNegociacoes);

                    this._negociacoes = [];
                    this._ascendente = true;
                }

                _createClass(ListaNegociacoes, [{
                    key: "adicionaNegociacao",
                    value: function adicionaNegociacao(negociacao) {
                        this._negociacoes.push(negociacao);
                        //A classe reflect aplica o comportamento que queremos, através do método apply, passando os parametros e no array o contexto que queremos
                        // Reflect.apply(this._armadilha, this._contexto, [this]);
                    }
                }, {
                    key: "esvaziaLista",
                    value: function esvaziaLista() {
                        this._negociacoes = [];
                    }
                }, {
                    key: "ordenaColuna",
                    value: function ordenaColuna(criterio) {
                        this._negociacoes.sort(criterio);
                    }
                }, {
                    key: "inverteOrdem",
                    value: function inverteOrdem() {
                        this._ascendente = !this._ascendente;
                        this._negociacoes.reverse();
                    }
                }, {
                    key: "isAscendente",
                    value: function isAscendente() {
                        return this._ascendente;
                    }
                }, {
                    key: "negociacoes",
                    get: function get() {
                        //Em programação defensiva, o concat() vai gerar uma cópia na nossa lista de negociacoes, para que a original não sofra alterações e interferências externas.
                        //O método concat() permite numero infinitos de parametros, seja arrays ou nao.
                        return [].concat(this._negociacoes);
                    }
                }]);

                return ListaNegociacoes;
            }());

            _export("ListaNegociacoes", ListaNegociacoes);
        }
    };
});
//# sourceMappingURL=listaNegociacoes.js.map