import {currentInstance} from './controllers/negociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adicionaNegociacao.bind(negociacaoController);
document.querySelector('#apaga-negociacoes').onclick = negociacaoController.apagaNegociacao.bind(negociacaoController);
document.querySelector('#importa-negociacoes').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
//document.querySelector('#tabela-negociacoes').onclick = negociacaoController.ordenaColuna.bind(negociacaoController);