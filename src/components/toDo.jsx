import React from 'react';
import { useState, useEffect } from 'react';
import { getTodoList, deleteTodo, editTodo, getTodo } from '../services/todoService';
import ToDoTable from './toDoTable';
import ModalDialog from './common/modalDialog';
import AddForm from './addForm';
import ViewForm from './viewForm';
import EditForm from './editForm';


function ToDo(props) {

  const [todo, setTodo] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [showView, setShowView] = useState(false); 
  const [showEdit, setShowEdit] = useState(false);
  const [data, setData] = useState({});
 
  const dataFetch = async () => {
   
    const data = await getTodoList();
    setTodo(data);
   
  }; 
  
  const handleView = async (todo) => {
    const todo_id = await getTodo(todo.todo.id);
    setData(todo_id);
    setShowView(true);

  }

  const handleEdit = async (todo) => {
    const todo_id = await getTodo(todo.todo.id);
    setData(todo_id);
    setShowEdit(true);

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
        if (ex.response && ex.response.status === 404)
            console.log('This todo has already been deleted');
    }
    dataFetch();
    setShowDel(false);
  };
  
  const handleSave = async () => {
    
  dataFetch();
 // setShowEdit(false);


    
  }

 

  useEffect(() => {
    dataFetch();
  }, []);

    return (
      <div className="container">
        <ToDoTable
          todo={todo}
          onView={handleView}
          onDelete={handleShowDel}
          onEdit={handleEdit}
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
        
   
      </div>
       
    );
}

export default ToDo;