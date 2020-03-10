import React from 'react'
import {Link } from 'react-router-dom'
import { connect} from 'react-redux'


const links = [
    {
        name: 'My account',
        linkTo: '/user/dashboard'
    },
    {
        name: 'User information',
        linkTo: '/user/user_profile'
    },
    {
        name: 'My Cart',
        linkTo: '/user/cart'
    }
]

const admin = [
    {
        name: 'Site info',
        linkTo: '/user/site_info'
    },
    {
        name: 'Add Product',
        linkTo: '/user/add_product'
    },{
        name: 'Manage Categories',
        linkTo: '/user/manage_categories'
    },
]
const UserLayout = (props) => {


    const generateLinks = (links)=> (
        links.map((items,i)=> (
            <Link to={items.linkTo} key={i}>
                {items.name}
            </Link>
        ))
    )
    return (
        <div className='container'>
            <div className='user_container'>
                <div className='user_left_nav'>
                    <h2>My account</h2>
                    <div className='links'>
                        { generateLinks(links)}
                    </div>
                    {
                        props.user.userData.isAdmin ? 
                        <div>
                            <h2>Admin</h2>
                            <div className='links'>
                                {generateLinks(admin)}
                            </div>
                        </div>
                        : null
                    }
                </div>
                <div className="user_right">
                    {props.children}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps) (UserLayout)
