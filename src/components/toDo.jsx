import React from 'react';
import { useState, useEffect } from 'react';
import ToDoTable from './toDoTable';


function ToDo(props) {

    const [todo, setTodo] = useState([]);

    
  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch('https://dolphin-app-nwlk3.ondigitalocean.app/api/Todo/list', {
                headers: {
                    'Accept': 'aplication/json',
                }
        })
      ).json();

          setTodo(data);
    };

    dataFetch();
  }, []);

    return (
        <div className="container">
            <ToDoTable
                todo={todo} />
        </div>
       
    );
}

export default ToDo;