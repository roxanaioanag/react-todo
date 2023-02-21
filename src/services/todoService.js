import config from '../config.json';


export async function getTodoList() {
    return await (
        await fetch(config.apiTodo + 'list')
      ).json();
}

export async function getTodo(todo) {
    return await (
        await fetch(config.apiTodo + `get/${todo}`)
      ).json();
}

export async function createTodo(todo) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'host' : '',
            'accept': '*/*',
            'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    }; 

    return await fetch(config.apiTodo + 'create', requestOptions);

}

export async function editTodo(todo) {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'host' : '',
            'accept': '*/*',
            'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    }; 
    return await fetch(config.apiTodo + `update/${todo.id}`, requestOptions);

}


export async function completeTodo(todo) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'accept': '*/*',
            },
        body:''
    }; 

    return await fetch(config.apiTodo + `complete/${todo}`, requestOptions);



}



export async function deleteTodo(todo) {

    return await fetch(config.apiTodo + `delete/${todo}`, {  method: "DELETE"});


}