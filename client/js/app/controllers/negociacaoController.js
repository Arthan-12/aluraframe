class NegociacaoController {

    constructor() {
        //A função bind() mantém o escopo de querySelector ao document. Sem ela, ele atrela o método ao $ e perde o efeito de 'this'
        let $ = document.querySelector.bind(document);

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
            'adicionaNegociacao', 'esvaziaLista', 'ordenaColuna', 'inverteOrdem')
        //Se utilizarmos a abordagem de arrow function, o código irá funcionar tambem, pelo fato do escopo dela ser léxico, amarrado ao contexto, diferente da function, que é dinamico
         

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        ConnectionFactory
            .getConnection()
            .then(connection => {
                new NegociacaoDAO(connection)
                    .listaNegociacoesDAO()
                    .then(negociacoes => {

                        negociacoes.forEach(negociacao => {
                            this._listaNegociacoes.adicionaNegociacao(negociacao)
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        this._mensagem.texto = 'Não foi possível listar as negociações!'
                    });
            })
    }

    //Método de integração entre a DAO e a Controller
    adicionaNegociacao(event) {
        //preventDefault é utilizado para não recarregar o formulário
        event.preventDefault();
        ConnectionFactory
            .getConnection()
            .then(connection => {

                let negociacao = this._criaNegociacao();
                //Uma vez que conseguimos a conexão, instanciamos o DAO para gravar no db
                new NegociacaoDAO(connection)
                    .adicionaNegociacaoDAO(negociacao)
                    .then(() => {
                        //Uma vez que conseguimos gravar no db, podemos gravar a negociação na model
                        this._listaNegociacoes.adicionaNegociacao(negociacao);
                        this._mensagem.texto = 'Negociação adicionada com sucesso';
                        this._limpaFormulario();
                        })
                    })
                    .catch(err => this._mensagem.texto = err);
    }

    importaNegociacoes() {
        let negociacaoService = new NegociacaoService();

        Promise.all([
            negociacaoService.importaNegociacoesDaSemana(),
            negociacaoService.importaNegociacoesDaSemanaAnterior(),
            negociacaoService.importaNegociacoesDaSemanaRetrasada()])
            .then(negociacoes => {
                //Precisamos converter a lista de arrays que as negociações retornam, para uma única lista, usando reduce, para importarmos corretamente nossas negociações
                console.log(negociacoes);
                negociacoes
                    .reduce((newArray, array) => newArray.concat(array), [])
                    //Vamos adicionar cada instancia gerada em nossa lista de negociacoes
                    .forEach(negociacao => this._listaNegociacoes.adicionaNegociacao(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso';

            })
            .catch(err => this._mensagem.texto = err);
    }

    apagaNegociacao() {

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagaTodasNegociacoes())
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvaziaLista();
            })
    }


    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

    }

    //Usamos _ antes de um método para dizer que ele é reservado para própria classe e não deve ser chamado por alguem de fora do mesmo
    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    ordenaColuna(coluna) {
        //quando colocamos um atributo em colchetes ao objeto, objeto[attr], significa que queremos acessar dinamicamente esse attr e não deixa-lo pre-definido
        if(this._ordemAtual == coluna) {
            // inverte a ordem da lista!
        } else {
            this._listaNegociacoes.ordenaColuna((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

}