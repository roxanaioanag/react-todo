import React from 'react';
import { useState, useEffect } from 'react';
import { getTodoList, deleteTodo } from '../services/todoService';
import ToDoTable from './toDoTable';
import ModalDialog from './common/modalDialog';
import AddForm from './addForm';


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

  const handleSubmit =  async () => {
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
          title='Create Todo'
          children={<AddForm onSubmit={handleSubmit} onClick={() => setShowAdd(false)} />}
          btnVisible={false}
        />
        <ModalDialog
          show={showDel}
          onHide={() => setShowDel(false)}
          onDelete={handleDelete}
          title='Delete Todo'
          children = 'Are you sure you want to delete Todo?'
          btnVisible={true}
        />
        
   
      </div>
       
    );
}

export default ToDo;