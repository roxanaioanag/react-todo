import React, { ChangeEvent, FC, ReactElement  } from 'react';


type Props = {
    name: string,
    label: string,
    type?: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    error: string,
    readOnly:boolean
}

const Input :FC<Props> = ({ name, label, type, value, error, readOnly, onChange,  ...rest}) : ReactElement => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                {...rest}
                name={name}
                type={type}
                value={value}
                readOnly={readOnly}
                onChange={onChange}
                id={name}              
                className="form-control" />
            { error && <div className='alert alert-danger'>{error}</div>}
    
        </div>
    );
}

export default Input;