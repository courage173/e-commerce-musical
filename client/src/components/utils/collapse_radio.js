import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp'

import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControllabel from '@material-ui/core/FormControllabel'


class CollapesRadio extends Component {

    state = {
        open: true,
        value: '0'
    }
    componentDidMount(){
        console.log(this.props.iniState)
        if(this.props.iniState){
            this.setState({open: this.props.iniState })
        }
    }

    handleClick =() => { 
        this.setState({open: !this.state.open})
    }

    handleAngle= () => (
        this.state.open ? 
        <FontAwesomeIcon
            icon={faAngleUp}
            className='icon'
        />
        :
        <FontAwesomeIcon
        icon={faAngleDown}
        className='icon'
    />
    )

    handleChange = (event) => {
        this.props.handleFilters(event.target.value)
        this.setState({value: event.target.value})
    }

    renderList = () => (
        this.props.list ?
            this.props.list.map((value)=> (
                <FormControllabel
                    key={value._id}
                    value={`${value._id}`}
                    control={<Radio />}
                    label={value.name}

                />
            )) : null
    )

    render() {
        return (
            <div>
                <List style={{borderBottom: '1px solid #dbdbdb'}}>
                    <ListItem onClick={this.handleClick} style={{padding: '10px 23px 10px 0'}}>
                        <ListItemText 
                            primary={this.props.title}
                            className='collapse_title'
                        />
                        {this.handleAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout='auto' unmountOnExit> 
                        <List component='div' disablePadding>
                            <RadioGroup aria-label='prices'
                             name='prices'
                             value={this.state.value}
                             onChange={this.handleChange}
                             >
                                 {this.renderList()}
                            </RadioGroup>
                        </List>
                    </Collapse>
                </List> 
            </div>
        )
    }
}

export default CollapesRadio
