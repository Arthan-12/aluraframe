'use strict';

System.register(['../models/negociacao'], function (_export, _context) {
    "use strict";

    var Negociacao, _createClass, NegociacaoDAO;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
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

            _export('NegociacaoDAO', NegociacaoDAO = function () {
                function NegociacaoDAO(connection) {
                    _classCallCheck(this, NegociacaoDAO);

                    this._connection = connection;
                    this._store = 'negociacoes';
                }

                _createClass(NegociacaoDAO, [{
                    key: 'adicionaNegociacaoDAO',
                    value: function adicionaNegociacaoDAO(negociacao) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            //MUITO CUIDADO COM EVENTOS ASSÍNCRONOS EM SEU BANCO, POIS MUITAS VEZES PARTES FUNDAMENTAIS DE SEU CÓDIGO PODEM NÃO TER SIDO CHAMADAS
                            var request = _this._connection.transaction([_this._store], 'readwrite')
                            //Através da store podemos utilizar a persistencia de dados
                            .objectStore(_this._store).add(negociacao);

                            request.onsuccess = function (e) {
                                resolve();
                            };
                            request.onerror = function (e) {
                                console.log(e.target.error);
                                reject('Não foi possível adicionar a negociação');
                            };
                        });
                    }
                }, {
                    key: 'listaNegociacoesDAO',
                    value: function listaNegociacoesDAO() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store)
                            //Criamos um cursor para poder navegar em nossa store
                            .openCursor();

                            var negociacoes = [];

                            cursor.onsuccess = function (e) {
                                var atual = e.target.result;

                                if (atual) {
                                    var data = atual.value;
                                    negociacoes.push(new Negociacao(data._data, data._quantidade, data._valor));
                                    atual.continue();
                                } else {
                                    resolve(negociacoes);
                                }
                            };
                            cursor.onerror = function (e) {
                                console.log(e.target.error.name);
                                reject('Não foi possível listar as negociações');
                            };
                        });
                    }
                }, {
                    key: 'apagaTodasNegociacoes',
                    value: function apagaTodasNegociacoes() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store)
                            //Criamos um cursor para poder navegar em nossa store
                            .clear();

                            request.onsuccess = function (e) {
                                return resolve('Negociações apagadas com sucesso!');
                            };

                            request.onerror = function (e) {
                                console.log(e.target.error);
                                reject('Não foi possível remover as negociações');
                            };
                        });
                    }
                }]);

                return NegociacaoDAO;
            }());

            _export('NegociacaoDAO', NegociacaoDAO);
        }
    };
});
//# sourceMappingURL=negociacaoDAO.js.map