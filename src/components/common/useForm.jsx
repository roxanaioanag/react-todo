import React from 'react';
import Joi from "joi";
import Input from './input';

function useForm(props) {
    const { schema, doSubmit, data, setData, error, setError, handleClick } = props;

    const validation = () => {
        const options = { abortEarly: false };
        const { error } = schema?.validate(data, options);
        if (!error) return null;
    
        const errors = {};
        for (let item of error?.details) {
          errors[item?.path[0]] = item?.message;
        }
        return errors;
    }

    const validateProperty = ({ name, value }) => {
        const rule = schema?.extract(name);
        const propertySchema = Joi.object({
          [name]: rule
        });
        const valueObject = { [name]: value };
        const { error } = propertySchema?.validate(valueObject);
        return error ? error?.details[0]?.message : null;

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setError(validation() || {});
        if (Object.keys(error).length) return;

        doSubmit();
    }

    const handleChange = ({ currentTarget: input }) => {
        const errors = { ...error };
        const errorMessage = validateProperty(input);
        
        if (errorMessage) errors[input.name] = errorMessage;
        else
            delete errors[input.name];
        
        setError(errors);
     
        setData({ ...data, [input.name]: input.value });
      
    };

    const renderButton = (label) => {
        return (
            <button disabled={validation() === null ? false : true} className="btn btn-primary mt-4 w-100" type='submit' onClick={handleClick}>{label}</button>
        );
    };

    const renderInput = ({ label, name, type = "text" , read='' }) => {
        return (
            <Input
                type={type}
                name={name}
                value={data[name] || ""}
                label={label}
                onChange={handleChange}
                error={error[name]}
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