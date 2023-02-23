import React from 'react';

function TableHeader(props) {
    return (
        <thead className="table-light">
            <tr>
                {props.columns.map(column => (
                    <th key={column.path || column.key}>
                        {column.label}
                    </th>
                ))}
            </tr>
         </thead>
    );
}

export default TableHeader;