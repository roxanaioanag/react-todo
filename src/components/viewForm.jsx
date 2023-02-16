import React from 'react';
import { useState } from 'react';
import Joi from "joi";
import useForm from './common/useForm';
import { getTodo } from '../services/todoService';
import { useEffect } from 'react';

function ViewForm(props) {

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
        data,
        setData,
        error,
        setError,
        handleClick : props.onClick
       
    };

    const getData = async () => {
        const todo = await getTodo(props.data.id);
        setData(todo);
    }
    useEffect(() => {
        getData();
      }, []);
    

    const { renderInput} = useForm(rule);

    return (
        <div>
            <form >
                {renderInput({ label: 'Created', name: 'created', read: props.read })}
                {renderInput({ label: 'Updated', name: 'updated', read: props.read})}
                {renderInput({ label: 'Title', name: 'title', read: props.read})}
                {renderInput({ label: 'Description', name: 'description', read: props.read})}
                {renderInput({ label: 'DueBy', name: 'dueBy', read: props.read})}
                {renderInput({ label: 'Completed', name: 'completed', read: props.read})}
            </form>
        </div>
    );
}

export default ViewForm;