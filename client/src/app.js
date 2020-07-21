import React, { Component } from "react";
import axios from 'axios'

class App extends Component {

  handleRandomNumber = async() => {
    try{
      const getRandomNumberResult = await axios.get('/number');
      alert( getRandomNumberResult.data )
    }
    catch(error) {
      alert('Error: ',error)
    }
  }
  render() {
    return ( <>
      <button onClick={this.handleRandomNumber}>Get a random number</button>   
      </>
    );
  }
}

export default App;
