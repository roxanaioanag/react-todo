import React, { FC, MouseEventHandler } from 'react';
import { useState, ReactElement } from 'react';
import Joi from "joi";
import useForm from './common/useForm';
import { createTodo } from '../services/todoService';
import type { Rule } from '../datastructure';

type Props = {
    onClick: MouseEventHandler<Element>,
    onSubmit: Function 
}

const AddForm : FC<Props> = ({ onClick, onSubmit}) : ReactElement => {
   
    const [todo, setTodo] = useState({
        title: "",
        description: ""
    });

    const [error, setError] = useState({});


    const rule : Rule = {
        schema: Joi.object({
            title: Joi.string().min(1).required().label('Title'),
            description: Joi.string().label('Description')
        }),
        doSubmit: async () => {
            await createTodo(todo);
           
            onSubmit();
          },
        todo,
        setTodo,
        error,
        setError,
        handleClick : onClick
       
    };

    const { renderInput, renderButton, handleSubmit } = useForm(rule);
   
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {renderInput({ label: 'Title', name: 'title' })}
                {renderInput({ label: 'Description', name: 'description'})}
                {renderButton("Create")}
            </form>
        </div>
    );
}

export default AddForm;