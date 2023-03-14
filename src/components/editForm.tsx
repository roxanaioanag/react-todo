import React, { FC, MouseEventHandler, ReactElement, useState, useEffect  } from 'react';
import Joi from "joi";
import useForm from './common/useForm';
import { editTodo } from '../services/todoService';
import { Rule, Todo } from '../datastructure';

type Props = {
    data: Todo,
    onSubmit: Function,
    onClick: MouseEventHandler<Element>
}

const EditForm : FC<Props> = ({data, onSubmit, onClick}) : ReactElement => {

    const [todo, setTodo] = useState<Todo>(
        {
        id: '',
        created: '',
        updated: '',
        title: '',
        description: '',
        dueBy: '',
        completed: false
        });
    

    const [error, setError] = useState({});

    const rule : Rule = {
        schema: Joi.object({
            id: Joi.string().allow("").label('Id'),
            created: Joi.string().allow("").label('Created'),
            updated: Joi.string().allow("").label('Updated'),
            title: Joi.string().min(1).label('Title'),
            description: Joi.string().label('Description'),
            dueBy: Joi.date().allow(null).label('DueBy'),
            completed: Joi.boolean().optional().label('Completed')
        }),
        doSubmit: async () => {
            await editTodo(todo);
           
            onSubmit();
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
    

    const { renderInput, renderButton, handleSubmit } = useForm(rule);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                
                {renderInput({ label: 'Title', name: 'title'})}
                {renderInput({ label: 'Description', name: 'description' })}
                {renderInput({ label: 'DueBy', name: 'dueBy' , type:'datetime-local'})}
                {renderButton("Save")}
            </form>
        </div>
    );
}

export default EditForm;