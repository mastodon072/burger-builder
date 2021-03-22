import React from 'react';

import Burger from '../../Burger/Burger'
import styles from './CheckoutSummary.module.css'
import Button from '../../UI/Button/Button'

const checkoutSummmary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well!!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>  
            </div> 
            <Button 
                btnType="Danger"
                clicked>Cancel</Button> 
            <Button 
                btnType="Success"
                clicked>Continue</Button> 
        </div>
    )
}

export default checkoutSummmary;