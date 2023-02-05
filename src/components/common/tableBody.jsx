import React from 'react';
import _ from 'lodash';

function TableBody(props) {

   const renderCell = (item, column) => {   
             return _.get(item, column.path);
    }

    const  createKey = (item, column) => {
     
        return item.id + (column.path || column.key);
    }

    const { data, columns } = props;
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