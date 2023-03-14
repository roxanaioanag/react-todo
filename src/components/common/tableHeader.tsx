import React, { FC, ReactElement } from 'react';
import type { ColumnElement } from './../../datastructure';

type Props = {
      columns: ColumnElement[]
}

const TableHeader : FC<Props> = ({ columns }) : ReactElement => {
 
    return (
        <thead className="table-light">
            <tr>
                {columns.map(column => (
                    <th key={column.label || column.key}>
                        {column.label}
                    </th>
                ))}
            </tr>
         </thead>
    );
}

export default TableHeader;