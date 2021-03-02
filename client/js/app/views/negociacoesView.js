class NegociacoesView extends View {

    constructor(element) {
        super (element);
    }

    _template(model) {

        return `
        <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>
        
        <tbody>
            ${model.negociacoes.map((n)=> {
                return `
                    <tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                `
                //O método join junta a template string criada à string da criação de tabela para podermos inserir itens em nosso template.
            }).join('')}
        </tbody>
        
        <tfoot>
            <td colspan="3"></td>
            <td>${
                //Através do métdodo IFFE, autoinvocamos uma função para que possamos utilizálo no template string e possamos capturar seu valor de return
                //É possível tambem utlizar a função reduce, que retorna um unico valor de um array. É opcional retornarmos tambem o valor inicial do reduce
                model.negociacoes.reduce((total, n) => total + n.volume, 0.0)
            }
        </tfoot>
    </table>
        `;
    }
}