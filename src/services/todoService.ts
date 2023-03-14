import config from '../config.json';
import type { Todo } from '../datastructure';
import { TodoList } from './../datastructure';


export async function getTodoList() : Promise<TodoList[]> {
    return await (
        await fetch(config.apiTodo + 'list')
      ).json();
}

export async function getTodo(todo:string) : Promise<Todo>{
    return await (
        await fetch(config.apiTodo + `get/${todo}`)
      ).json();
}

export async function createTodo(todo:object) : Promise<void> {
    const requestOptions = {
        method: 'POST',
        headers: {
            'host' : '',
            'accept': '*/*',
            'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    }; 
    console.log('todo service create todo');
    await fetch(config.apiTodo + 'create', requestOptions);

}

export async function editTodo(todo: Todo): Promise<void> {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'host' : '',
            'accept': '*/*',
            'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    }; 
    await fetch(config.apiTodo + `update/${todo.id}`, requestOptions);

}


export async function completeTodo(todo:string) : Promise<void> {

    const requestOptions = {
        method: 'POST',
        headers: {
            'accept': '*/*',
            },
        body:''
    }; 

    await fetch(config.apiTodo + `complete/${todo}`, requestOptions);

}

export async function deleteTodo(todo:string) : Promise<void> {

    await fetch(config.apiTodo + `delete/${todo}`, {  method: "DELETE"});


}