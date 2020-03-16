import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import * as apiCalls from './api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      popular: [],
      genreIds: []
    }   
    

  }

  async loadGenreIds() {
    try {
      let genreIds = await apiCalls.getGenre();
      this.setState({ genreIds: genreIds.genres });
    } catch (err) {
      console.error(err);
    }
  }

  async loadPopular() {
    try {
      let popular =  await apiCalls.getPopular();      
      this.setState({ popular });
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount()  {
    this.loadPopular();
    this.loadGenreIds();
  }
  
  render() {
    return (
      <div className="App">
       <Header />
       <Content
        popular={this.state.popular}
        genreIds={this.state.genreIds}/>
       <Footer />
      </div>
    );
  }
  
}

export default App;
