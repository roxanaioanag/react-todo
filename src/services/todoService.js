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

    console.log('body', requestOptions.body);
    const response = await fetch('https://dolphin-app-nwlk3.ondigitalocean.app/api/Todo/create', requestOptions);
    const data = await response.json();

    return data;
}