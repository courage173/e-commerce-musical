import React, { Component } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'

export class Paypal extends Component {
    
    render() {
        const onSuccess = (payment) => {
            this.props.onSuccess(payment)
        }


        const onCancel = (data) => {
            console.log(JSON.stringify(data))
        }

        const onError = (er) => {
            console.log(JSON.stringify(er))
        }
        let env = 'sandbox'
        let currency = 'USD'
        let total = this.props.toPay

        const client = {
            sandbox: 'Aa5FTUNOcMX6deBdHc6ydV-QgUMBXk_WzVLTcEIR1HWoJKUCt3RTBsFxqzaO-sKmb16RrhCSw0HG09me',
            production: ''
        }


        return (
            <div>
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size: 'large',
                        color: 'blue',
                        shape: 'rect',
                        label: 'checkout'
                    }}
                />
            </div>
        )
    }
}

export default Paypal
