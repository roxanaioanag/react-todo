import React, { useCallback } from 'react';
import { useState } from 'react';
import Joi from "joi";
import useForm from './common/useForm';
import { editTodo, getTodo } from '../services/todoService';
import { useEffect } from 'react';


function EditForm(props) {

    const [data, setData] = useState({
        id: "",
        created: "",
        updated: "",
        title: "",
        description: "",
        dueBy: "",
        completed: ""
    });

    const [error, setError] = useState({});

    const rule = {
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
            await editTodo(data);
            props.onSubmit();
          },
        data,
        setData,
        error,
        setError,
        handleClick : props.onClick
       
    };

    const getData = useCallback(async () => {
        const todo = await getTodo(props.data.id);
        setData(todo);
    }, [props.data.id]);

    useEffect(() => {
        getData();
      }, [getData]);
    

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