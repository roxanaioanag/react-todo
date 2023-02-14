import React from 'react';
import { useState, useEffect } from 'react';
import { getTodoList, createTodo, deleteTodo } from '../services/todoService';
import ToDoTable from './toDoTable';
import ModalDelete from './common/modalDelete';
import ModalDialog from './common/modalDialog';



function ToDo(props) {

  const [todo, setTodo] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [data, setData] = useState({});
  const [to, setTo] = useState({});

  const dataFetch = async () => {
   
    const data = await getTodoList();
    setTodo(data);
   
  }; 
  
  const handleChange = (input) => {

    if (input.name === 'title')
      data.title = input.value;
    else if (input.name === 'description')
      data.description = input.value;
    
    setData(data);

  }

  const handleSubmit =  async (e) => {
    e.preventDefault();
    await createTodo(data);
    dataFetch(); 
  }
  const handleShowDel = todo => {
    setShowDel(true);
    setTo(todo);
   }

  const handleDelete = async () => {
       
    try {
        await deleteTodo(to.todo.id);
    }
    catch (ex)
    {
        if (ex.response && ex.response.status === 404)
            console.log('This todo has already been deleted');
    }
    dataFetch();
    setShowDel(false);
};

 

  useEffect(() => {
    dataFetch();
  }, []);

    return (
      <div className="container">
        <ToDoTable
          todo={todo}
          onShow={handleShowDel}
        />
        <button type="button" className='btn btn-primary' onClick={() => setShowAdd(true)}> Add Todo</button>
        <ModalDialog
          show={showAdd}
          onHide={() => setShowAdd(false)}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <ModalDelete
          show={showDel}
          onHide={() => setShowDel(false)}
          onDelete={handleDelete}
        
        />
        
   
      </div>
       
    );
}

export default ToDo;