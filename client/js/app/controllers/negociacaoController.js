'use strict';

System.register(['../models/listaNegociacoes', '../models/mensagem', '../models/negociacao', '../views/negociacoesView', '../views/mensagemView', '../services/negociacaoService', '../helpers/dateHelper', '../helpers/bind'], function (_export, _context) {
    "use strict";

    var ListaNegociacoes, Mensagem, Negociacao, NegociacoesView, MensagemView, NegociacaoService, DateHelper, Bind, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
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

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    //A função bind() mantém o escopo de querySelector ao document. Sem ela, ele atrela o método ao $ e perde o efeito de 'this'
                    var $ = document.querySelector.bind(document);

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
                    'adicionaNegociacao', 'esvaziaLista', 'ordenaColuna', 'inverteOrdem');
                    //Se utilizarmos a abordagem de arrow function, o código irá funcionar tambem, pelo fato do escopo dela ser léxico, amarrado ao contexto, diferente da function, que é dinamico

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

                    this._ordemAtual = '';

                    this._negociacaoService = new NegociacaoService();

                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        this._negociacaoService.listaNegociacoes().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacoes.adicionaNegociacao(negociacao);
                            });
                        }).catch(function (err) {
                            return _this._mensagem.texto = err;
                        });
                    }
                }, {
                    key: 'adicionaNegociacao',
                    value: function adicionaNegociacao(event) {
                        var _this2 = this;

                        //preventDefault é utilizado para não recarregar o formulário
                        event.preventDefault();

                        var negociacao = this._criaNegociacao();

                        this._negociacaoService.cadastraNegociacao(negociacao).then(function (mensagem) {
                            _this2._listaNegociacoes.adicionaNegociacao(negociacao);
                            _this2._mensagem.texto = mensagem;
                            _this2._limpaFormulario();
                        }).catch(function (err) {
                            return _this2._mensagem.texto = err;
                        });
                    }
                }, {
                    key: 'importaTodasNegociacoes',
                    value: function importaTodasNegociacoes() {
                        var _this3 = this;

                        var negociacaoService = new NegociacaoService();

                        Promise.all([negociacaoService.importaNegociacoesDaSemana(), negociacaoService.importaNegociacoesDaSemanaAnterior(), negociacaoService.importaNegociacoesDaSemanaRetrasada()])
                        //O método filter vai varrer o array de negociacoes inteiro usando o parametro definido pelo usuário e filtrar os elementos que atendem a ele, num novo array
                        .then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !_this3._listaNegociacoes.negociacoes
                                //O método some vai varrer o array em busca do elemento definido no parametro, no caso a string de uma negociacao existente (nao compare elementos diretamente em js!)
                                //e realizar o break assim que encontrar o elemento que atender a exigencia
                                .some(function (negociacaoExistente) {
                                    return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                                });
                            });
                        }).then(function (negociacoes) {
                            //Precisamos converter a lista de arrays que as negociações retornam, para uma única lista, usando reduce, para importarmos corretamente nossas negociações
                            negociacoes.reduce(function (newArray, array) {
                                return newArray.concat(array);
                            }, [])
                            //Vamos adicionar cada instancia gerada em nossa lista de negociacoes
                            .forEach(function (negociacao) {
                                return _this3._listaNegociacoes.adicionaNegociacao(negociacao);
                            });
                            _this3._mensagem.texto = 'Negociações importadas com sucesso';
                        }).catch(function (err) {
                            return _this3._mensagem.texto = err;
                        });
                    }
                }, {
                    key: 'importaNegociacoes',
                    value: function importaNegociacoes() {
                        var _this4 = this;

                        this._negociacaoService.importaNegociacoesDaSemana(this._listaNegociacoes).then(function (negociacoes) {
                            negociacoes.filter(function (negociacao) {
                                return !_this4._listaNegociacoes.negociacoes.some(function (negociacaoExistente) {
                                    return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                                });
                            }).forEach(function (negociacao) {
                                return _this4._listaNegociacoes.adicionaNegociacao(negociacao);
                            });
                            _this4._mensagem.texto = 'Negociações importadas com sucesso';
                        }).catch(function (err) {
                            return _this4._mensagem.texto = err;
                        });
                    }
                }, {
                    key: 'apagaNegociacao',
                    value: function apagaNegociacao() {
                        var _this5 = this;

                        this._negociacaoService.apagaNegociacao().then(function (mensagem) {
                            _this5._mensagem.texto = mensagem;
                            _this5._listaNegociacoes.esvaziaLista();
                        }).catch(function (err) {
                            return _this5._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {

                        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: '_limpaFormulario',
                    value: function _limpaFormulario() {

                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;

                        this._inputData.focus();
                    }
                }, {
                    key: 'ordenaColuna',
                    value: function ordenaColuna(coluna) {
                        //quando colocamos um atributo em colchetes ao objeto, objeto[attr], significa que queremos acessar dinamicamente esse attr e não deixa-lo pre-definido
                        if (this._ordemAtual == coluna) {
                            // inverte a ordem da lista!
                        } else {
                            this._listaNegociacoes.ordenaColuna(function (a, b) {
                                return a[coluna] - b[coluna];
                            });
                        }
                        this._ordemAtual = coluna;
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
            function currentInstance() {

                return negociacaoController;
            }

            _export('currentInstance', currentInstance);
        }
    };
});
//# sourceMappingURL=negociacaoController.js.map