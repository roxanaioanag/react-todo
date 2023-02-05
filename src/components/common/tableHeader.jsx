import React from 'react';

function TableHeader(props) {
    return (
        <thead>
            <tr>
                {props.columns.map(column => (
                    <th key={column.path}>
                        {column.label}
                    </th>
                ))}
            </tr>
         </thead>
    );
}

export default TableHeader;