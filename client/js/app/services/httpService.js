class HttpService {
//Lembre-se, todas as requisições HTTP são feitas por Promises!
    getNegociacoes(url) {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            //como o endereço é local, apenas colocamos o caminho que está nossa API
            xhr.open('GET', url);
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
                    view, precisamos converter para JSON
                    */
                    resolve(JSON.parse(xhr.responseText)
                        // .map(obj =>
                        //     new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
                        );
                } else {
                    console.log(xhr.responseText);
                    reject(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });
    }

    postNegociacoes(url, data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            //É fundamental que toda Request do tipo POST tenha um Header, informando o que estamos enviando ao servidor
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            // Usamos JSON.stringify() para converter objeto em uma string no formato JSON, realizando
            // caminho inverso de nossa requisição do tipo GET
            xhr.send(JSON.stringify(data));
        });
    }

}