import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

export default function Message() {
    return (
       
             <ToastContainer duration={ 3000 }  > 
                    <h4> You've successfully signed up. Now you can login! </h4>
             </ToastContainer> 
        
    )
}
