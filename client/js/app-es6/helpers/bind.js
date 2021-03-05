import {ProxyFactory} from '../services/proxyFactory';

export class Bind {

    //O REST operator, assim como o spread, são os '...' e são os últimos parametros a serem declarados no constructor
    //para que possamos declarar n parametros sem a necessidade do array[]
    constructor(model, view, ...props) {

        let proxy = ProxyFactory.create(model, props, (model) => 
            view.update(model)
        );
        view.update(model);

        return proxy
    }
}