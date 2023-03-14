import React, { FC, useState, ReactElement, useEffect, MouseEventHandler } from 'react';
import Joi from "joi";
import useForm from './common/useForm';
import { Rule, Todo } from '../datastructure';

type Props = {
    data: Todo,
    read: boolean,
    onClick: MouseEventHandler<Element>
}


const ViewForm : FC<Props> = ({data, read, onClick}) : ReactElement => {

    const [todo, setTodo] = useState<object>({});

    const [error, setError] = useState({});

    const rule : Rule = {
        schema: Joi.object({
            id: Joi.string().label('Id'),
            created: Joi.string().label('Created'),
            updated: Joi.string().label('Updated'),
            title: Joi.string().min(1).label('Title'),
            description: Joi.string().label('Description'),
            dueBy: Joi.date().label('DueBy'),
            completed: Joi.boolean().label('Completed')
        }),
        doSubmit: async () => {
          
          },
        todo,
        setTodo,
        error,
        setError,
        handleClick : onClick
       
    };
   

    useEffect(() => {
        setTodo(data);
    }, [data]);
     

    const { renderInput} = useForm(rule);

    return (
        <div>
            <form >
                {renderInput({ label: 'Created', name: 'created', read: read })}
                {renderInput({ label: 'Updated', name: 'updated', read: read})}
                {renderInput({ label: 'Title', name: 'title', read: read})}
                {renderInput({ label: 'Description', name: 'description', read: read})}
                {renderInput({ label: 'DueBy', name: 'dueBy', read: read})}
                {renderInput({ label: 'Completed', name: 'completed', read: read})}
            </form>
        </div>
    );
}

export default ViewForm;