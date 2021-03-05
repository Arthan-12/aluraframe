export class HttpService {

    _handleErrors(res) {
        if(!res.ok) throw new Error(res.statusText);
        return res
    }

    //Lembre-se, todas as requisições HTTP são feitas por Promises!
    //Lembre-se, nem todos navegadores possuem suporte para Fetch API, é importante possuir um Polyfill para que haja sua compatibilidade 
    getNegociacoes(url) {

        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    postNegociacoes(url, data) {

        //Uma requisição http do tipo post precisa ser composta de header, method, body com o conteudo parseado pro formato correto, além da tratativa da response
        return fetch(url, {
            headers: {'Content-type':'application/json'},
            method: 'post',
            body: JSON.stringify(data)
        })
        .then(res => this._handleErrors(res));
    }

}