import config from '../config.json';


export async function getTodoList() {
    return await (
        await fetch(config.apiTodo)
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

    return await fetch('https://dolphin-app-nwlk3.ondigitalocean.app/api/Todo/create', requestOptions);

}

export async function deleteTodo(todo) {

    return await fetch(`https://dolphin-app-nwlk3.ondigitalocean.app/api/Todo/delete/${todo}`, {  method: "DELETE"});


}