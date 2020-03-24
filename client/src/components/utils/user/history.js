import React from 'react'
import Moment from 'react-moment'

const UserHistoryBlock = (props) => {

    const renderBlocks = () => (
        props.products ? 
            props.products.map((product,i)=>(
                <tr key={i}>
                    <td><Moment format="DD-MM-YYYY">{product.dateOfPurchase}</Moment> </td>
                    <td> {product.brand} {product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.quantity}</td>
                </tr>
            ))

        :null
    )
    return (
        <div className='history_block'>
            <table>
                <thead>
                    <tr>
                        <th>Date of purchase</th>
                        <th>Product</th>
                        <th>Price paid</th>
                        <th>Quantity</th>

                    </tr>
                </thead>
                <tbody>
                    {renderBlocks()}
                </tbody>
            </table>
        </div>
    )
}

export default UserHistoryBlock
