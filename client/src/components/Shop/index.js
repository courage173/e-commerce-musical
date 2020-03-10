import React, { Component } from 'react'
import {connect} from 'react-redux'
import PageTop from '../utils/page_top'

import {getProductToShop, getBrands, getWoods} from '../../actions/product_action'

import {frets,price} from '../utils/form/fixed_categories'


import CollapseCheckBox from '../utils/CollapseCheckBox'
import CollapseRadio from '../utils/collapse_radio';
import LoadMoreCard from './loadMoreCard'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTh from '@fortawesome/fontawesome-free-solid/faTh'

class Shop extends Component {
    state= {
        grid: '',
        limit: 6,
        skip:0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    }

    componentDidMount(){
        this.props.dispatch(getBrands())
        this.props.dispatch(getWoods())
        this.props.dispatch(getProductToShop(
            
            this.state.skip,
            this.state.limit,
            this.state.filters
            
        ))
    }


    handPrice = (value) => {
        const data = price;
        let arr = []
        for(let key in data){
            if(data[key]._id=== parseInt(value,10)){
                arr = data[key].array
            }
        }
        console.log(arr)
        return arr
    }

    handleFilters =(filters,category) =>{
        const newFilters = {...this.state.filters}
        newFilters[category] = filters;

        if(category === 'price'){
            let priceValues = this.handPrice(filters)
            newFilters[category] = priceValues;
        }
        this.showFilterResult(newFilters)
        this.setState({
            filters: newFilters
        })

        
    }

    showFilterResult = (filters) => {
         this.props.dispatch(getProductToShop(
            0,
            this.state.limit,
            filters
            
        )).then(()=>{
            this.setState({skip: 0})
        })
    }


    
    loadMoreCard = () => {
        let skip = this.state.skip + this.state.limit;

        this.props.dispatch(getProductToShop(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.products.toShop
        )).then(()=>{
            this.setState({
                skip
            })
        })
    }
    handleGrid = () =>{
         this.setState({
            grid: !this.state.grid ? 'grid_bars':''
         })
    }
    render() {
        const products = this.props.products
       
        return (
            <div>
               <PageTop

               title='Browse Products'
               />
               <div className='container'>
                <div className='shop_wrapper'>
                    <div className='left'>
                        <CollapseCheckBox
                            iniState={true}
                            title="Brands"
                            list={products.brands}
                            handleFilters={(filters)=> this.handleFilters(filters,'brand')}
                        />
                        <CollapseCheckBox
                            iniState={false}
                            title="Frets"
                            list={frets}
                            handleFilters={(filters)=> this.handleFilters(filters,'frets')}
                        />
                         <CollapseCheckBox
                            iniState={false}
                            title="Woods"
                            list={products.woods}
                            handleFilters={(filters)=> this.handleFilters(filters,'wood')}
                        />
                          <CollapseRadio
                            iniState={false}
                            title="Price"
                            list={price}
                            handleFilters={(filters)=> this.handleFilters(filters,'price')}
                        />
                    </div>
                    <div className='right'>
                         <div className='shop_options'>
                             <div className='shop_grids clear'>
                                 <div
                                    className={`grid_btn ${this.state.grid?'': 'active'}`}
                                    onClick={()=> this.handleGrid()}
                                 >
                                     <FontAwesomeIcon icon={faTh}/>
                                 </div>
                                 <div
                                    className={`grid_btn ${!this.state.grid?'': 'active'}`}
                                    onClick={()=> this.handleGrid()}
                                 >
                                     <FontAwesomeIcon icon={faBars}/>
                                 </div>
                             </div>
                         </div>
                         <div>
                             <LoadMoreCard
                                grid={this.state.grid}
                                limit={this.state.limit}
                                size={products.toShopSize}
                                products = {products.toShop}
                                loadMore={()=>this.loadMoreCard()}
                                />
                         </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}
export default connect(mapStateToProps) (Shop)
