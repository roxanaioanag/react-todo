import React from 'react';
import Table from './common/table';

function ToDoTable(props) {

   const columns = [
        { path: 'title', label: 'Title' },
        { path: 'updated', label: 'Updated' },
        { path: 'dueBy', label: 'DueBy' },
        { path: 'completed', label: 'Completed' }
    ];


    console.log(props);
    return (
        <Table columns={columns} data={props.todo}/>
    );
}

export default ToDoTable;