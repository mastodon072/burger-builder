import React from 'react';

import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let validationError = null;

    if(props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }
    switch(props.elementType) {
        case('text'):
            inputElement =  <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} onChange={props.changed}/>;
            break;
        case('textarea'): 
            inputElement =  <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} onChange={props.changed}/>;
            break;
        case('select'): 
            inputElement =  (<select 
                className={inputClasses.join(' ')} 
                value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (<option value={option.value}>{option.displayValue}</option>)
                    )}
                </select>);
            break;
        default:
            inputElement =  <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} onChange={props.changed}/>;
    }
    
    return (
        <div className={classes.Input} key={props.keyy}>
            <label className={classes.Label}>{props.label}</label>  
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;