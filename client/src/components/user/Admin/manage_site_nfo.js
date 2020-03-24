import React, { Component } from 'react'
import { update, generateData, isFormValid,populateFields } from '../../utils/Form/formActions';
import { connect } from 'react-redux';
import FormField from '../../utils/Form/formfield';
import  {getSiteData,updateSiteData} from '../../../actions/site_actions'

export class UpdateSiteNfo extends Component {
    state = {
        formError: false,
        formSuccess:false,
        formdata:{
            address: {
                element: 'input',
                value: '',
                config:{
                    label: 'Address',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter your the site address'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel:true
            },
            hours: {
                element: 'input',
                value: '',
                config:{
                    label: 'working hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'Enter your the site working hours'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel:true
            },
            phone: {
                element: 'input',
                value: '',
                config:{
                    label: 'Phone number',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter your the phone number'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel:true
            },
            email: {
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    label: 'Enter the email',
                    type: 'text',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel:true
            }
        }
    }

    updateForm = (element) => {
        console.log(element)
        const newFormdata = update(element,this.state.formdata,'site_info');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm= (event) =>{
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'site_info');
        let formIsValid = isFormValid(this.state.formdata,'site_info')

        if(formIsValid){
            console.log(dataToSubmit)
            this.props.dispatch(updateSiteData(dataToSubmit)).then(()=>{
                this.setState({ 
                    formSuccess: true
                },()=>{
                    setTimeout(()=>{
                        this.setState({
                            formSuccess: false
                        })
                    },2000)
                })
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }

    componentDidMount(){
        this.props.dispatch(getSiteData()).then(()=>{
            console.log(this.props.site.siteData[0])

            const newFormData = populateFields(this.state.formdata,this.props.site.siteData[0])
            this.setState({
                formdata: newFormData
            })
        })
    }
    render() {
        return (
          <div>
            <form onSubmit={event => this.submitForm(event)}>
                <h1>Site info</h1>
              <FormField
                id={"address"}
                formdata={this.state.formdata.address}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"phone"}
                formdata={this.state.formdata.phone}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"hours"}
                formdata={this.state.formdata.hours}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"email"}
                formdata={this.state.formdata.email}
                change={element => this.updateForm(element)}
              />

              <div>

                  {
                      this.state.formSuccess ? 
                        <div className='form_success'>
                            Update Successfull
                        </div>
                      :null
                  }
                    {this.state.formError ? (
                    <div className="error_label">Please check your data</div>
                    ) : null}
                    <button onClick={event => this.submitForm(event)}>
                     Update
                    </button>
              </div>
            </form>
          </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}
export default connect(mapStateToProps) (UpdateSiteNfo)
