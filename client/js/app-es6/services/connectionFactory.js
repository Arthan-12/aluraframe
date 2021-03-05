
        const stores = ['negociacoes'];
        const version = 5;
        const dbName = 'aluraframe';
        
        let connection = null;
        let close = null;

    export class ConnectionFactory {

        constructor() {
            throw new Error('Não é possível criar instâncias de ConnectionFactory');
        }

        static getConnection() {

            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStore(e.target.result);
                }

                openRequest.onsuccess = e => {

                    if(!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function() {
                            //Para impedir que a conexão seja fechada externamente, realizamos um Monkey Patching, onde reescrevemos o método close() e criamos o
                            // closeConnection dentro da classe;
                            throw new Error('Você não pode fechar diretamentre a conexão')
                        };
                    }
                    resolve(connection);
                }

                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                }
            })
        }

        static _createStore(connection) {
            stores.forEach(store => {

                if(connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, {autoIncrement: true})
            })
        }

        static closeConnection() {
            if(connection) {
                //Além da abordagem bind() para manter o escopo em connection e não em 'this', seria possível utilizar o código comentado abaixo
                close();
                //Reflect.apply(close, connection, []);
                connection = null;
            }
        }
    }

