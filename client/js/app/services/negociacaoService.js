'use strict';

System.register(['./httpService', './connectionFactory', '../dao/negociacaoDAO', '../models/negociacao'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDAO, Negociacao, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_httpService) {
            HttpService = _httpService.HttpService;
        }, function (_connectionFactory) {
            ConnectionFactory = _connectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDAO) {
            NegociacaoDAO = _daoNegociacaoDAO.NegociacaoDAO;
        }, function (_modelsNegociacao) {
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

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: 'importaNegociacoesDaSemana',
                    value: function importaNegociacoesDaSemana() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this._http.getNegociacoes('negociacoes/semana').then(function (negociacoes) {
                                resolve(negociacoes
                                //mapear esses objetos em instancias de Negociacao, passando seus atributos.
                                .map(function (obj) {
                                    return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                                }));
                            }).catch(function (err) {
                                console.log(err);
                                reject('Não foi possível obter as negociações da semana');
                            });
                        });
                    }
                }, {
                    key: 'importaNegociacoesDaSemanaAnterior',
                    value: function importaNegociacoesDaSemanaAnterior() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2._http.getNegociacoes('negociacoes/anterior').then(function (negociacoes) {
                                resolve(negociacoes
                                //mapear esses objetos em instancias de Negociacao, passando seus atributos.
                                .map(function (obj) {
                                    return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                                }));
                            }).catch(function (err) {
                                console.log(err);
                                reject('Não foi possível obter as negociações da semana');
                            });
                        });
                    }
                }, {
                    key: 'importaNegociacoesDaSemanaRetrasada',
                    value: function importaNegociacoesDaSemanaRetrasada() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            _this3._http.getNegociacoes('negociacoes/retrasada').then(function (negociacoes) {
                                resolve(negociacoes
                                //mapear esses objetos em instancias de Negociacao, passando seus atributos.
                                .map(function (obj) {
                                    return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                                }));
                            }).catch(function (err) {
                                console.log(err);
                                reject('Não foi possível obter as negociações da semana');
                            });
                        });
                    }
                }, {
                    key: 'cadastraNegociacao',
                    value: function cadastraNegociacao(negociacao) {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return (
                                //Uma vez que conseguimos a conexão, instanciamos o DAO para gravar no db
                                new NegociacaoDAO(connection)
                            );
                        }).then(function (dao) {
                            return dao.adicionaNegociacaoDAO(negociacao);
                        }).then(function () {
                            return 'Negociação adicionada com sucesso!';
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível adicionar a negociação');
                        });
                    }
                }, {
                    key: 'listaNegociacoes',
                    value: function listaNegociacoes() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.listaNegociacoesDAO();
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível obter as negociações');
                        });
                    }
                }, {
                    key: 'apagaNegociacao',
                    value: function apagaNegociacao() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.apagaTodasNegociacoes();
                        }).then(function () {
                            return 'Negociacoes apagadas com sucesso!';
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível apagar as negociações');
                        });
                    }
                }, {
                    key: 'importaNegociacao',
                    value: function importaNegociacao(listaAtual) {

                        return this.importaNegociacoesDaSemana().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !listaAtual.some(function (negociacaoExistente) {
                                    return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                                });
                            });
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível buscar negociações para importar');
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=negociacaoService.js.map