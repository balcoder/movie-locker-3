import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import getPage from './helper';
import * as apiCalls from './api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      popular: [],
      currentView: [],
      genreIds: [],
      currentPage: 1
    }
    
    this.loadPopular();
    this.loadGenreIds();
    this.handleClickPage = this.handleClickPage.bind(this);
    this.handleUpdateView = this.handleUpdateView.bind(this);

  }
  async loadPopular() {
    try {
      let popular =  await apiCalls.getPopular(10);
      let currentView= getPage(this.state.currentPage, popular);           
      this.setState({ currentView, popular });
    } catch (err) {
      console.error(err);
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
  
    // get a list of movies with a genre id
  async loadGenresWithIds(id) {
    try {      
      let genreList =  await apiCalls.getGenres(id);     
      let currentView = getPage(this.state.currentPage, genreList); 
      //console.log('loadGenresWithIds', id, currentView);

      this.setState({currentView})
    } catch (err) {
      console.error(err);
    }
  }

  handleClickPage(e) {
      let pageNum = e.target.id        
      let nextView = getPage(pageNum, this.state.popular);      
      this.setState({currentPage: pageNum, currentView: nextView});
    }
    
    handleUpdateView(id) {
      this.loadGenresWithIds(id);      
    }

  

  componentDidMount()  {
    
  }
  
  render() {
    return (
      <div className="App">
       <Header />
       <Content       
        popular={this.state.popular}
        currentView={this.state.currentView}
        genreIds={this.state.genreIds}
        currentPage={this.state.currentPage}
        handleClickPage={this.handleClickPage}
        handleUpdateView={this.handleUpdateView}/>        
       <Footer />
      </div>
    );
  }
  
}

export default App;
