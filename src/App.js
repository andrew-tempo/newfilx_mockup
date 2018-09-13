/**
 * ------------------  New Updates  ------------------ 
 * 1. Use "min-height" instead of "height" in css file to solve the background issue.
 * 
 * 2. Modify Reducer with type = REMOVE_ITEM. Now when item is deleted, it goes back to recommendations.
 * 
 * 3. Use onMouseOver instead of onMouseEnter Synthetic Event for better user experience.
 * 
 * 4. Create a server to get mockup data from backend. (An alternate way to is to place 
 *    movie.json file in public folder and fetch the data)
 * 
 * 5. Split MovieCell Component and Buttom Component and Create Cell Component and make them work together.
 * 
 * 6. Apply and modify new/previous styles inside the Cell, MovieCell and Button components
 * 
 * ------------------  Notes  ------------------ 
 * Please run the following command to start the code:
 * 
 * npm install
 * 
 * npm run server
 * 
 * npm start
 * 
 * If it appears 'no movie' initially on the screen, please refresh the page.
 */



import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Cell from './component/Cell/Cell';
import PropTypes from 'prop-types';
import {INITIALIZE_DATA} from './reducers/actionType';
import axios from 'axios';


class App extends Component {

  componentDidMount(){
    // server listen at port 5000
    axios.get('http://localhost:5000/api/data')
    .then(res => this.props.initializeData(res.data))
    .catch(err => console.log(err));
  }

  render() {

    return (
      <div data-test='App' className="App">

        <div data-test='logo'>
          <img style={{width:'200px',marginLeft:'4%'}} alt='logo' src='https://imgix.bustle.com/uploads/image/2017/8/29/c8c8077a-10fc-44d5-93f0-da4e592a299e-netflix-logo-print_pms.jpg?w=970&h=582&fit=crop&crop=faces&auto=format&q=70'/>
        </div>
        {this.props.lists.length === 0 && this.props.recommendations.length === 0 ? 
        <h2 data-test='no-movie' >No Movies</h2> : null
        }

        {this.props.lists.length !== 0 ? <h2>My List</h2> : null}

        <ul className="item-list">
          {this.props.lists.map(list => (
            <li key={list.id}>
              <Cell catlog='mylist' id={list.id} imgUrl={list.img} title={list.title} />
            </li>
          ))}        
        </ul>

        {this.props.recommendations.length !== 0 ? <h2>Recommendations</h2> : null}

        <ul className="item-list">
          {this.props.recommendations.map(list => (
            <li key={list.id}>
              <Cell data-test='cell' catlog='recom' id={list.id} imgUrl={list.img} title={list.title} />
            </li>
          ))}        
        </ul>
        
        {this.props.lists.length !== 0 ? 
            <h2 className='watchlist'>You are now watching: {this.props.lists.map(list =>list.title).join(', ')}</h2>
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.mylist,
    recommendations: state.recommendations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeData: (res) => dispatch({type:INITIALIZE_DATA,mylist: res.mylist, recommendations:res.recommendations})
  }
}

App.propTypes = {
  lists:PropTypes.array.isRequired,
  recommendations:PropTypes.array.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
