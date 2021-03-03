class NegociacaoController {

    constructor() {
        //A função bind() mantém o escopo de querySelector ao document. Sem ela, ele atrela o método ao $ e perde o efeito de 'this'
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        //Para poder reutilizar a função de update na listaNegociacoes e ela nao ficar presa ao escopo 'this', passamos a instancia com dois parametros, como exemplificado abaixo

        this._listaNegociacoes = new Bind(
            //model
            new ListaNegociacoes(),
            //view
            new NegociacoesView($('#negociacoesView')),
            //condição (com REST operator no Bind() torna desnecessario o uso do array)
            'adicionaNegociacao', 'esvaziaLista')
        //Se utilizarmos a abordagem de arrow function, o código irá funcionar tambem, pelo fato do escopo dela ser léxico, amarrado ao contexto, diferente da function, que é dinamico
         

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

    }
    
    adicionaNegociacao(event) {

        event.preventDefault();

        this._listaNegociacoes.adicionaNegociacao(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com exito!';
        this._limpaFormulario();
    }

    apagaNegociacao() {

        this._listaNegociacoes.esvaziaLista();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    importaNegociacoes() {
        let xhr = new XMLHttpRequest();
        //como o endereço é local, apenas colocamos o caminho que está nossa API
        xhr.open('GET', 'negociacoes/semana');
        //Uma vez que iniciamos a requisição AJAX com o open(), usamos o método abaixo
        //para prepará-la para o envio
        xhr.onreadystatechange = () => {
            /*
            Estados possíveis de um Request: 

            0: request ainda não iniciada
            1: conexão com o servidor estabelecida
            2: requisição recebida
            3: processando request
            4: requisição concluída e a response está pronta
            */
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    /*O método nos retorna a API em formato texto. Para utlizarmos em nossa
                    view, precisamos converter para JSON e em seguida mapear esses objetos em
                    instancias de Negociacao, passando seus atributos.
                    */
                    JSON.parse(xhr.responseText)
                        .map(obj =>
                            new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
                        //Agora vamos adicionar cada instancia gerada em nossa lista de negociacoes
                        .forEach(negociacao => this._listaNegociacoes.adicionaNegociacao(negociacao));
                        this._mensagem.texto = 'Negociações importadas com sucesso!'
                    console.log(xhr.responseText);
                } else {
                    console.log('Não foi possível efetuar a request!');
                    console.log(xhr.responseText);
                    this._mensagem.texto = 'Não foi possível obter a negociação!'
                }
            }
        };
        xhr.send();
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );

    }

    //Usamos _ antes de um método para dizer que ele é reservado para própria classe e não deve ser chamado por alguem de fora do mesmo
    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

}