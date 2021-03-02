class DateHelper {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    //Métodos estáticos permitem seu reuso direto, sem a necessiade de instanciar classes em outras partes do codigo
    static dataParaTexto(data) {
        //O template string, que são as crases, nos ajudam a usar interpolação, facilitando a montagem de nossa string
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    }

    static textoParaData(texto) {
        if(!/\d{4}-\d{2}-\d{2}/.test(texto))
         throw new Error('A data deve estar no formato aaaa-mm-dd');
         //O spread operator é utlizado geralmente para guardar um array dentro de outro existente
        return new Date(...texto.split('-')
        //O map é um modificador de objetos/array, onde ele percorre cada (item) e executa a instrução desejada. É aceito o index, como segundo parametro, para alterações pontuais.
        //Quando há uma unica instrução no bloco, as {} e o return da função são implícitos, sendo opcional o seu uso.
        .map((item, i) => item - i % 2))
    }

}