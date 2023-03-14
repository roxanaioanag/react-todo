import React, { FC,  useState, useEffect } from 'react';
import ToDoTable from './toDoTable';
import AddForm from './addForm';
import ViewForm from './viewForm';
import EditForm from './editForm';
import ModalDialog from './common/modalDialog';
import { getTodoList, deleteTodo, completeTodo, getTodo } from '../services/todoService';
import { formatDate } from './common/formatDate';
import { TodoList, Todo } from '../datastructure';


const ToDo : FC = () => {

  const [todo, setTodo] = useState<TodoList[]>([
    {
    id: '',
    title: '',
    updated: '',
    dueBy: '',
    completed: false
    }]);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showDel, setShowDel] = useState<boolean>(false);
  const [showView, setShowView] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [data, setData] = useState<Todo>(
    {
    id: '',
    created: '',
    updated: '',
    title: '',
    description: '',
    dueBy: '',
      completed: false
    });

 
 
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
  
  const handleView = async({ todo } : {todo: Todo} ) => {
    const todo_id = await getTodo(todo.id);
    
    const newTodo = { ...todo_id };

    newTodo.updated = formatDate(newTodo.updated);
    newTodo.created = formatDate(newTodo.created);
    if (newTodo.dueBy)
       newTodo.dueBy = formatDate(newTodo.dueBy);
    setData(newTodo);
    setShowView(true);

  }

  const handleEdit = async ({ todo } : {todo: Todo}) => {
    const todo_id = await getTodo(todo.id);
    const newTodo = { ...todo_id };
    setData(newTodo);
    setShowEdit(true);

   }

  const handleComplete = async ({ todo } : {todo: Todo}) => {
    
    try {
      if (!todo.completed)
        await completeTodo(todo.id);
      
    }
    catch (error)
    {
            console.log(error);
    }
    dataFetch();
  
  }
  
  const handleShowDel = ({ todo } : {todo: Todo}) => {
    setShowDel(true);
    setData(todo);
   }

  const handleSubmit =  async () => {
    dataFetch(); 
  }
  const handleDelete = async () => {
       
    try {
        await deleteTodo(data.id);
    }
    catch (error)
    {
            console.log(error);
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