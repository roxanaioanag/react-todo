import React, { FC, ReactElement } from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';
import type { TodoList, ColumnElement } from './../../datastructure';

type Props = {
    columns: ColumnElement[],
    data: TodoList[]

}

const Table : FC <Props> = ({ columns, data }) : ReactElement => {
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