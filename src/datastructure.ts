import { MouseEventHandler, Key } from "react";
import { PropertyPath } from "lodash";
import Joi from "joi";

export interface ColumnElement
 {
    path?: PropertyPath,
    label: string,
    key?: Key,
    content?: Function
}

export interface Todo {
    id: string,
    created: string,
    updated: string,
    title: string,
    description: string,
    dueBy: string,
    completed: boolean
}

export interface TodoList {
    id: string,
    title: string,
    updated: string,
    dueBy: string,
    completed: boolean
}

export interface ErrorType {  
    [key: string]: string;
} 
  
export interface Months {  
    [key: number]: string;
  } 

  export interface Rule  {
    schema: Joi.ObjectSchema,
    doSubmit: Function,
    todo: object,
    setTodo: Function, 
    error: ErrorType,
    setError: Function,
    handleClick: MouseEventHandler
}
  
export interface InputProps {
    type?: string,
    label: string,
    name: string,
    read?: boolean 
}