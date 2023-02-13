import { Modal } from 'bootstrap';
import ModalDialog from './common/modalDialog';
import React from 'react';
import { useState, useEffect } from 'react';
import { getTodoList, createTodo } from '../services/todoService';
import ToDoTable from './toDoTable';



function ToDo(props) {

  const [todo, setTodo] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  const dataFetch = async () => {
   
    const data = await getTodoList();
    setTodo(data);
   
  };


  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);
  
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
 

  useEffect(() => {
    dataFetch();
  }, []);

    return (
      <div className="container">
             <ToDoTable
                   todo={todo} />
        <button type="button" className='btn btn-primary' onClick={handleShow}> Add Todo</button>
        <ModalDialog
          show={show}
          onHide={handleClose}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
   
      </div>
       
    );
}

export default ToDo;