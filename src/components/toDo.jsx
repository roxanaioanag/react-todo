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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleChange = (input) => {

    
    console.log('to do data', input.value);
    if (input.name === 'title')
      data.title = input.value;
    else if (input.name === 'description')
      data.description = input.value;
    
    setData(data);

    /*

    setTodo(todo => ({
         ...todo,
         ...updatedValue
    }));*/
    console.log('data',data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('handle Submit data', data);
    await createTodo(data);
  }


  useEffect(() => {
    
    const dataFetch = async () => {
      const data = await getTodoList();
      setTodo(data);
    };

    dataFetch();
  }, []);

    return (
      <div className="container">
             <ToDoTable
          todo={todo} />
         <button type="button" className='btn btn-primary' onClick={handleShow}> show Modal </button>
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