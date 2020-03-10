import React, { Component } from 'react'
import {connect} from 'react-redux'

import FormField from '../utils/form/formField'
import {update, generateData,isFormValid} from '../utils/formActions'
import {loginUser} from '../../actions/user_actions'
import {withRouter} from 'react-router-dom'


 class login extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_imput',
                    type: 'email',
                    placeholder: "Enter your email "
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_imput',
                    type: 'password',
                    placeholder: "Enter your password "
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formData,'login')
        this.setState({
            formError: false
,           formData: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formData,'login');

        let formIsValid = isFormValid(this.state.formData,'login')
        if(formIsValid){
            this.props.loginUser(dataToSubmit).then((res)=>{
               if(res.payload.loginSuccess){
                   console.log(res)
                   this.props.history.push('/user/dashboard')
               }else{
                   this.setState({formError: true})
               }
            }) 
        }else{
            this.setState({formError: true})
        }

    }
    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event)=> this.submitForm(event)}>
                    <FormField
                    id={'email'}
                     formdata={this.state.formData.email}
                     change={(element)=>this.updateForm(element)}
                    />
                    <FormField
                    id={'password'}
                     formdata={this.state.formData.password}
                     change={(element)=>this.updateForm(element)}
                    />
                    {
                        this.state.formError ? 
                        <div className="error_label">
                            Please check your data
                        </div>
                        : null
                    }
                    <button onClick={(event)=> this.submitForm(event)}>Log in</button>
                </form>
                
            </div>
        )
    }
}

export default connect( null,{loginUser}) (withRouter(login))
