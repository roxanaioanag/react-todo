import React, { Component } from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';


const Table = ({ columns, data }) => {
    return ( 
        <table className="table">
            <TableHeader
                columns={columns}
               />
            <TableBody
                columns={columns}
                data={data}
            />
        </table>
     );
}
 
export default Table;