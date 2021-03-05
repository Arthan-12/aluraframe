'use strict';

System.register(['./View', '../helpers/dateHelper', '../controllers/negociacaoController'], function (_export, _context) {
    "use strict";

    var View, DateHelper, currentInstance, _createClass, NegociacoesView;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_View2) {
            View = _View2.View;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_controllersNegociacaoController) {
            currentInstance = _controllersNegociacaoController.currentInstance;
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

            _export('NegociacoesView', NegociacoesView = function (_View) {
                _inherits(NegociacoesView, _View);

                function NegociacoesView(element) {
                    _classCallCheck(this, NegociacoesView);

                    var _this = _possibleConstructorReturn(this, (NegociacoesView.__proto__ || Object.getPrototypeOf(NegociacoesView)).call(this, element));

                    element.addEventListener('click', function (event) {

                        if (event.target.nodeName == 'TH') {
                            currentInstance().ordenaColuna(event.target.textContent.toLowerCase());
                        }
                    });
                    return _this;
                }

                _createClass(NegociacoesView, [{
                    key: '_template',
                    value: function _template(model) {

                        return '\n        <h3 id="tabela-negociacoes" class="text-center">Ordena\xE7\xE3o ' + (model.isAscendente() ? 'Ascendente' : 'Descendente') + ' </h3>\n\n        <table class="table table-hover table-bordered">\n        <thead>\n            <tr>\n                <th>DATA</th>\n                <th>QUANTIDADE</th>\n                <th>VALOR</th>\n                <th>VOLUME</th>    \n            </tr>\n        </thead>\n        \n        <tbody>\n            ' + model.negociacoes.map(function (n) {
                            return '\n                    <tr>\n                        <td>' + DateHelper.dataParaTexto(n.data) + '</td>\n                        <td>' + n.quantidade + '</td>\n                        <td>' + n.valor + '</td>\n                        <td>' + n.volume + '</td>\n                    </tr>\n                ';
                            //O método join junta a template string criada à string da criação de tabela para podermos inserir itens em nosso template.
                        }).join('') + '\n        </tbody>\n        \n        <tfoot>\n            <td colspan="3"></td>\n            <td>' +
                        //Através do métdodo IFFE, autoinvocamos uma função para que possamos utilizálo no template string e possamos capturar seu valor de return
                        //É possível tambem utlizar a função reduce, que retorna um unico valor de um array. É opcional retornarmos tambem o valor inicial do reduce
                        model.negociacoes.reduce(function (total, n) {
                            return total + n.volume;
                        }, 0.0) + '\n        </tfoot>\n    </table>\n        ';
                    }
                }]);

                return NegociacoesView;
            }(View));

            _export('NegociacoesView', NegociacoesView);
        }
    };
});
//# sourceMappingURL=negociacoesView.js.map