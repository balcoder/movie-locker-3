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
      currentViewList: [],
      currentView: [],
      genreIds: [],
      currentPage: 1,
      numPages: 1
    }
    // initial state setup
    this.loadPopular();
    this.loadGenreIds();

    this.handleClickPage = this.handleClickPage.bind(this);
    this.handleUpdateView = this.handleUpdateView.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }
  async loadPopular() {
    try {
      let currentViewList =  await apiCalls.getPopular();
      let numPages = currentViewList.length;
      let currentView= getPage(this.state.currentPage, currentViewList);           
      this.setState({ currentView, currentViewList , numPages});
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
      let numPages = genreList.length;     
      let currentView = getPage(this.state.currentPage, genreList); 
      //console.log('loadGenresWithIds', id, currentView);

      this.setState({currentView, currentViewList: genreList, numPages})
    } catch (err) {
      console.error(err);
    }
  }

  async loadSearchResults(phrase) {
    try {
      let searchResults = await apiCalls.getSearch(phrase);
      let numPages = searchResults.length;
      let page1 = searchResults[0].results
      
      this.setState({
        currentViewList: searchResults,
        currentView: page1,
        numPages})
    } catch (err) {
      console.error(err);
    }
  }

  handleClickPage(e) {
      let pageNum = e.target.id        
      let nextView = getPage(pageNum, this.state.currentViewList);      
      this.setState({currentPage: pageNum, currentView: nextView});
    }
    
    handleUpdateView(id) {
      this.loadGenresWithIds(id);      
    }

    handleSearch(phrase) {
      this.loadSearchResults(phrase);    
      
    }

  

  componentDidMount()  {
    
  }
  
  render() {
    return (
      <div className="App">
       <Header
       handleSearch={this.handleSearch}
       />
       <Content       
        popular={this.state.currentViewList}
        currentView={this.state.currentView}
        genreIds={this.state.genreIds}
        numPages={this.state.numPages}
        currentPage={this.state.currentPage}
        handleClickPage={this.handleClickPage}
        handleUpdateView={this.handleUpdateView}
        />        
       <Footer />
      </div>
    );
  }
  
}

export default App;
