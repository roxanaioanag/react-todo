import React from 'react';
import _ from 'lodash';

function TableBody(props) {

    const renderCell = (item, column) => {   
        if (column.content) return column.content(item);
        
            return typeof (_.get(item, column.path)) === 'boolean' ? _.get(item, column.path).toString() : _.get(item, column.path);
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