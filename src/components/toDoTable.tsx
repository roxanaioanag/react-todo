import React, { FC, ReactElement } from 'react';
import { Todo } from '../datastructure';
import Table from './common/table';
import { ColumnElement, TodoList } from './../datastructure';


type Props = {
    todo: TodoList[],
    onComplete: Function,
    onView: Function,
    onEdit: Function,
    onDelete: Function
}

const ToDoTable : FC<Props> = ({todo, onComplete, onView, onEdit, onDelete}): ReactElement =>{

   const columns : ColumnElement[] = [
        { path: 'title', label: 'Title' },
        { path: 'updated', label: 'Updated' },
        { path: 'dueBy', label: 'DueBy' },
        { path: 'completed', label: 'Completed'},
       {
           label: 'Complete',
           key: 'complete', content: (todo: Todo)  => 
               <i onClick={() => { onComplete({ todo }) }} className={todo.completed ? 'bi bi-check-circle-fill' : 'bi bi-check-circle'}></i>
       },
       {   label: 'View',
           key: 'view',
           content: (todo: Todo) => <i onClick={() => { onView({ todo }) }} className='bi bi-card-list'></i>
       },
       {   label: 'Edit',
           key: 'edit',
           content: (todo: Todo) => <i onClick={() => onEdit({ todo })} className='bi bi-pencil-square'></i>
       },
       {   label: 'Delete',
           key: 'delete',
           content: (todo: Todo) => <i onClick={() => onDelete({ todo })} className="bi bi-trash"></i>
       }
       
    ];

    return (
        <Table columns={columns} data={todo}/>
    );
}

export default ToDoTable;