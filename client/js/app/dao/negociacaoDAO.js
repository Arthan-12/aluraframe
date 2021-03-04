class NegociacaoDAO {

    constructor(connection) {

        this._connection = connection;
        this._store = 'negociacoes'
    }

    adicionaNegociacaoDAO(negociacao) {

        return new Promise((resolve, reject) => {
                //MUITO CUIDADO COM EVENTOS ASSÍNCRONOS EM SEU BANCO, POIS MUITAS VEZES PARTES FUNDAMENTAIS DE SEU CÓDIGO PODEM NÃO TER SIDO CHAMADAS
                let request = this._connection
                    .transaction([this._store], 'readwrite')
                //Através da store podemos utilizar a persistencia de dados
                    .objectStore(this._store)
                    .add(negociacao);
    
                    request.onsuccess = e => {
                        resolve();
                    };
                    request.onerror = e => {
                        console.log(e.target.error);
                        reject('Não foi possível adicionar a negociação');
                    }
        });
    }

    listaNegociacoesDAO() {

        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
            //Criamos um cursor para poder navegar em nossa store
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {
                let atual = e.target.result;

                if(atual) {
                    let data = atual.value;
                    negociacoes.push(new Negociacao(data._data, data._quantidade, data._valor));
                    atual.continue();
                } else {
                   resolve(negociacoes)
                }
            };
            cursor.onerror = e => {
                console.log(e.target.error.name);
                reject('Não foi possível listar as negociações')
            };
        })
    }

    apagaTodasNegociacoes() {

        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                //Criamos um cursor para poder navegar em nossa store
                .clear();

            request.onsuccess = e => resolve('Negociações apagadas com sucesso!');

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível remover as negociações')};
        })
    }
}