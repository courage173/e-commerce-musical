import React from 'react'
import MyButton from '../utils/button';
import Login from './login'


const RegisterLogin= () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className='register_login_container'>
                    <div className='left'>
                        <h1>new Customer</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                        <MyButton
                         type="default"
                         title="create an account"
                         linkTo='/register'
                         addSstyles={{
                             margin: "10px, 0 ,0, 0"
                         }}
                        />
                    </div>
                    <div className='right'>
                           <h2>Registered customers</h2>
                           <p>if you have an account please log in.</p>
                           <Login />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterLogin
