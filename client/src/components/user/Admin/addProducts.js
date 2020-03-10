import React, { Component } from 'react'
import UserLayout from '../../../hoc/userLayout'
import {connect} from 'react-redux'

import FormField from '../../utils/form/formField'
import {update, generateData,isFormValid} from '../../utils/formActions'

import {getBrands,getWoods} from '../../../actions/product_action'


export class AddProduct extends Component {



    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'name_imput',
                    type: 'text',
                    placeholder: "Enter the Product name"
                },
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product description',
                    name: 'description_imput',
                    type: 'text',
                    placeholder: "Enter your description"
                },
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product price',
                    name: 'price_imput',
                    type: 'number',
                    placeholder: "Enter your price"
                },
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Brand',
                    name: 'brands',
                    optiions: []
                },
                validation: { 
                    required: true,
                    
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shipping',
                    name: 'shipping_input',
                    optiions: [
                        {key: true, value:'Yes'},
                        {key: false, value:'No'}
                    ]
                },
                validation: { 
                    required: true,
                    
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Available, in stock',
                    name: 'available_input',
                    optiions: [
                        {key: true, value:'Yes'},
                        {key: false, value:'No'}
                    ]
                },
                validation: { 
                    required: true,
                    
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            wood: {
                element: 'select',
                value: '',
                config: {
                    label: 'Wood',
                    name: 'wood_input',
                    optiions: []
                    
                },
                validation: { 
                    required: true,
                    
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            frets: {
                element: 'select',
                value: '',
                config: {
                    label: 'Frets',
                    name: 'frets_input',
                    optiions: [
                        {key: 20, value:20},
                        {key: 21, value:21},
                        {key: 22, value:22},
                        {key: 24, value:24}
                    ]
                    
                },
                validation: { 
                    required: true,
                    
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Public',
                    name: 'public_input',
                    optiions: [
                        {key: true, value:'Public'},
                        {key: false, value:'Hidden'}
                    ]
                },
                validation: { 
                    required: true,
                    
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            }
            
        }
    }
    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add Product</h1>
                    <form onSubmit={(event)=> this.submitForm()}>
                             <FormField
                                    id={'name'}
                                    formdata={this.state.formData.name}
                                    change={(element)=>this.updateForm(element)}
                            />
                    </form>
                </div>
            </UserLayout>
            
        )
    }
}


const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps) (AddProduct)
