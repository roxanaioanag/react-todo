import React, { FormEventHandler } from 'react';
import Joi from "joi";
import Input from './input';
import type { Rule, ErrorType } from '../../datastructure';
import { InputProps } from '../../datastructure';


function useForm ({ schema, doSubmit, todo, setTodo, error, setError, handleClick } : Rule)  {
    
    const validation = () : ErrorType | null => {
        const options = { abortEarly: false };
        const { error } = schema?.validate(todo, options);
        if (!error) return null;
    

        const errors : ErrorType = {};
         for (let item of error?.details) {
           errors[item?.path[0]] = item?.message;
         }

        return errors;
    }

    const validateProperty = ({ name , value } : { name:string, value:string}) : string | null => {
        const rule = schema?.extract(name);
        const propertySchema = Joi.object({
          [name]: rule
        });
        const valueObject = { [name]: value };
        const { error } = propertySchema?.validate(valueObject);
      
        return error ? error?.details[0]?.message : null;

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : FormEventHandler<HTMLFormElement> | undefined=> {
        e.preventDefault();

        setError(validation() || {});
        if (Object.keys(error).length) return;

        doSubmit();
    }

    const handleChange = ({ currentTarget: input } : { currentTarget: HTMLInputElement }): void => {
        const errors = { ...error };
        const errorMessage = validateProperty(input);
                
        if (errorMessage) errors[input.name] = errorMessage;
        else
            delete errors[input.name];
        
        setError(errors);
     
        setTodo({ ...todo, [input.name]: input.value });
      
    };

    const renderButton = (label : string) : JSX.Element => {
        
        return (
            <button disabled={validation() === null ? false : true} className="btn btn-primary mt-4 w-100" type='submit' onClick={handleClick}>{label}</button>
        );
    };

    const renderInput = ({ label, name, type = 'text', read = false }: InputProps): JSX.Element => {  
  
        return (
            <Input
                type={type}
                name={name}
                value={todo[name as keyof object] ? todo[name as keyof object] : '' }
                label={label}
                onChange={handleChange}
                error={error[name as keyof object]}
                readOnly={read ? true : false}
            />
        );
    };


    return {
        renderInput,
        renderButton,
        handleSubmit
         
    };
}

export default useForm;