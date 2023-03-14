import React, { FC, ReactElement } from 'react';
import _ from "lodash";
import type { TodoList, ColumnElement } from './../../datastructure';


type Props = {
    data: TodoList[],
    columns: ColumnElement[]
}

const TableBody : FC<Props> = ({ data, columns }) : ReactElement => { 

    const renderCell = (item: TodoList, column: ColumnElement) => {   
   
        if (column.content) return column.content(item);
       
       if(column.path)
        return typeof (_.get(item, column.path)) === 'boolean' ? _.get(item, column.path).toString() : _.get(item, column.path);
    }

    const  createKey = (item: TodoList, column: ColumnElement) => {
     
        return item.id + (column.label || column.key);
    }

   
    return (
        <tbody>
            {data.map(item =>
                <tr key={item.id}>
                    {columns.map(column =>
                        <td key={createKey(item, column)}>
                            {renderCell(item, column)}
                        </td>)} 
                </tr>  )}
                
            </tbody>
    );
}

export default TableBody;