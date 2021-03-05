'use strict';

System.register(['./controllers/negociacaoController', './polyfill/fetch'], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negociacaoController = currentInstance();


      document.querySelector('.form').onsubmit = negociacaoController.adicionaNegociacao.bind(negociacaoController);
      document.querySelector('#apaga-negociacoes').onclick = negociacaoController.apagaNegociacao.bind(negociacaoController);
      document.querySelector('#importa-negociacoes').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
      //document.querySelector('#tabela-negociacoes').onclick = negociacaoController.ordenaColuna.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map