'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, DateHelper;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

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

            _export('DateHelper', DateHelper = function () {
                function DateHelper() {
                    _classCallCheck(this, DateHelper);

                    throw new Error('Esta classe não pode ser instanciada');
                }

                //Métodos estáticos permitem seu reuso direto, sem a necessiade de instanciar classes em outras partes do codigo


                _createClass(DateHelper, null, [{
                    key: 'dataParaTexto',
                    value: function dataParaTexto(data) {
                        //O template string, que são as crases, nos ajudam a usar interpolação, facilitando a montagem de nossa string
                        return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
                    }
                }, {
                    key: 'textoParaData',
                    value: function textoParaData(texto) {
                        if (!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error('A data deve estar no formato aaaa-mm-dd');
                        //O spread operator é utlizado geralmente para guardar um array dentro de outro existente
                        return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split('-')
                        //O map é um modificador de objetos/array, onde ele percorre cada (item) e executa a instrução desejada. É aceito o index, como segundo parametro, para alterações pontuais.
                        //Quando há uma unica instrução no bloco, as {} e o return da função são implícitos, sendo opcional o seu uso.
                        .map(function (item, i) {
                            return item - i % 2;
                        })))))();
                    }
                }]);

                return DateHelper;
            }());

            _export('DateHelper', DateHelper);
        }
    };
});
//# sourceMappingURL=dateHelper.js.map