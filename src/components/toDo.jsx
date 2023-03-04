import React from 'react';
import { useState, useEffect } from 'react';
import ToDoTable from './toDoTable';
import ModalDialog from './common/modalDialog';
import AddForm from './addForm';
import ViewForm from './viewForm';
import EditForm from './editForm';
import { getTodoList, deleteTodo, completeTodo, getTodo } from '../services/todoService';
import { formatDate } from './common/formatDate';

function ToDo() {

  const [todo, setTodo] = useState([{ id: '', title: '', updated: '', dueBy: '', completed: '' }]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [showView, setShowView] = useState(false); 
  const [showEdit, setShowEdit] = useState(false);
  const [data, setData] = useState({});
 
  const dataFetch = async () => {
   
    const data = await getTodoList();
    const newData = [...data];
    for (let key of newData)
    {     
      key.updated = formatDate(key.updated);
      
      if (key.dueBy)
        key.dueBy = formatDate(key.dueBy);
    }
    setTodo(newData);
  }; 
  
  const handleView = async (todo) => {
    const todo_id = await getTodo(todo.todo.id);
    const newTodo = { ...todo_id };

    newTodo.updated = formatDate(newTodo.updated);
    newTodo.created = formatDate(newTodo.created);
    if (newTodo.dueBy)
       newTodo.dueBy = formatDate(newTodo.dueBy);
    
    setData(newTodo);
    setShowView(true);

  }

  const handleEdit = async (todo) => {
    const todo_id = await getTodo(todo.todo.id);
    setData(todo_id);
    setShowEdit(true);

   }

  const handleComplete = async (todo) => {
    
    try {
      if (!todo.todo.completed)
        await completeTodo(todo.todo.id);
      
    }
    catch (ex)
    {
        if (ex.response && ex.response.status === 400)
            console.log('Todo already completed');
    }
    dataFetch();
  
  }
  
  const handleShowDel = todo => {
    setShowDel(true);
    setData(todo);
   }

  const handleSubmit =  async () => {
    dataFetch(); 
  }
  const handleDelete = async () => {
       
    try {
        await deleteTodo(data.todo.id);
    }
    catch (ex)
    {
        if (ex.response && ex.response.status === 400)
            console.log('Bad request');
    }
    dataFetch();
    setShowDel(false);
  };
  
  const handleSave = async () => {
    dataFetch();
  }

 

  useEffect(() => {
    dataFetch();
  }, []);

    return (
      <section className='showTodo'>
        <section className='showTodoBtn'>
          <button type="button" className='btn btn-primary' onClick={() => setShowAdd(true)}> Add Todo</button>
        </section>
       
        <ToDoTable
          todo={todo}
          onView={handleView}
          onDelete={handleShowDel}
          onEdit={handleEdit}
          onComplete={handleComplete}
        />
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
          onAction={handleDelete}
          title='Delete Todo'
          children = 'Are you sure you want to delete Todo?'
          btnVisible={true}
        />
         <ModalDialog
          show={showView}
          onHide={() => setShowView(false)}
          title='View Todo'
          children={<ViewForm data={data} onClick={() => setShowAdd(false)} read={true} />}
          btnVisible={false}
        />
         <ModalDialog
          show={showEdit}
          onHide={() => setShowEdit(false)}
          title='Edit Todo'
          children={<EditForm onSubmit={handleSave} data={data} onClick={() => setShowEdit(false)} />}
          />
      </section>
       
    );
}

export default ToDo;