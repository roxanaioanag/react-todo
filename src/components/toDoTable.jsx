import React from 'react';
import Table from './common/table';

function ToDoTable(props) {

   const columns = [
        { path: 'title', label: 'Title' },
        { path: 'updated', label: 'Updated' },
        { path: 'dueBy', label: 'DueBy' },
        { path: 'completed', label: 'Completed'},
       {
           label: 'Complete',
           key: 'complete', content: todo => <button className='btn'
               onClick={() => { props.onComplete({ todo }) }}><i className={todo.completed ? 'bi bi-check-circle-fill' : 'bi bi-check-circle'}></i></button>
       },
       {   label: 'View',
           key: 'view', content: todo => <button className='btn'
               onClick={() => { props.onView({ todo }) }}><i className='bi bi-card-list'></i></button>
       },
       {   label: 'Edit',
           key: 'edit', content: todo => <button className='btn'
           onClick={() => props.onEdit({todo})}><i className='bi bi-pencil-square'></i></button>
       },
       {   label: 'Delete',
           key: 'delete', content: todo => <button className='btn'
           onClick={() => props.onDelete({todo})}><i className="bi bi-trash"></i></button>
       }
       
    ];

    return (
        <Table columns={columns} data={props.todo}/>
    );
}

export default ToDoTable;