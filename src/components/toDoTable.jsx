import React from 'react';
import Table from './common/table';

function ToDoTable(props) {

   const columns = [
        { path: 'title', label: 'Title' },
        { path: 'updated', label: 'Updated' },
        { path: 'dueBy', label: 'DueBy' },
        { path: 'completed', label: 'Completed' },
       {
           key: 'view', content: todo => <button className='btn btn-secondary btn-sm'
               onClick={() => { props.onView({ todo }) }}>View</button>
       },
       {
           key: 'edit', content: todo => <button className='btn btn-primary btn-sm'
           onClick={() => props.onEdit({todo})}>Edit</button>
       },
       {
           key: 'delete', content: todo => <button className='btn btn-danger btn-sm'
           onClick={() => props.onDelete({todo})}>Delete</button>
       }
       
    ];

    return (
        <Table columns={columns} data={props.todo}/>
    );
}

export default ToDoTable;