import React from 'react';
import { useState } from 'react';
import Joi from "joi";
import useForm from './common/useForm';
import { createTodo } from '../services/todoService';

function AddForm(props) {
   
    const [data, setData] = useState({
        title: "",
        description: ""
    });

    const [error, setError] = useState({});


    const rule = {
        schema: Joi.object({
            title: Joi.string().min(1).required().label('Title'),
            description: Joi.string().label('Description')
        }),
        doSubmit: async () => {
            await createTodo(data);
            props.onSubmit();
          },
        data,
        setData,
        error,
        setError,
        handleClick : props.onClick
       
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