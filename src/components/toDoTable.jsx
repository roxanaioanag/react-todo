import React from 'react';
import Table from './common/table';

function ToDoTable({todo, onComplete, onView, onEdit, onDelete}) {

   const columns = [
        { path: 'title', label: 'Title' },
        { path: 'updated', label: 'Updated' },
        { path: 'dueBy', label: 'DueBy' },
        { path: 'completed', label: 'Completed'},
       {
           label: 'Complete',
           key: 'complete', content: todo => 
               <i onClick={() => { onComplete({ todo }) }} className={todo.completed ? 'bi bi-check-circle-fill' : 'bi bi-check-circle'}></i>
       },
       {   label: 'View',
           key: 'view',
           content: todo => <i onClick={() => { onView({ todo }) }} className='bi bi-card-list'></i>
       },
       {   label: 'Edit',
           key: 'edit',
           content: todo => <i onClick={() => onEdit({ todo })} className='bi bi-pencil-square'></i>
       },
       {   label: 'Delete',
           key: 'delete',
           content: todo => <i onClick={() => onDelete({ todo })} className="bi bi-trash"></i>
       }
       
    ];

    return (
        <Table columns={columns} data={todo}/>
    );
}

export default ToDoTable;