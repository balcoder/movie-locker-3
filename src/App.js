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
      numPages: 1,
      selected: null
    }
    // initial state setup
    this.loadPopular();
    this.loadGenreIds();
    this.handleClickPage = this.handleClickPage.bind(this);
    this.handleUpdateView = this.handleUpdateView.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

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
      this.setState({ genreIds: genreIds.genres});
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

      this.setState({currentView, currentViewList: genreList, numPages})
    } catch (err) {
      console.error(err);
    }
  }

  async loadSearchResults(phrase) {
    try {
      let searchResults = await apiCalls.getSearch(phrase);
      let numPages = searchResults.length;
      let page1 = searchResults[0].results;
     
      this.setState({
        currentViewList: searchResults,
        currentView: page1,
        numPages})
    } catch (err) {
      console.error(err);
    }
  }

  async loadSelected(term) {
    let selectedResults  = await apiCalls.getSelected(term);    
    let numPages = selectedResults.length;
    let page1 = selectedResults[0].results;
    this.setState({
      currentViewList: selectedResults,
      currentView: page1,
      numPages
    })
  }

  handleClickPage(e) {
      let pageNum = e.target.id;            
      let nextView = getPage(pageNum, this.state.currentViewList);      
      this.setState({currentPage: pageNum, currentView: nextView});
    }
    
    handleUpdateView(id) {
      this.loadGenresWithIds(id);      
    }

    handleSearch(phrase) {
      this.loadSearchResults(phrase);    
      
    }

    handleSelect(term) {
      this.loadSelected(term);
    }

  

  componentDidMount()  {
    
  }
  
  render() {
    return (
      <div className="App">
       <Header
       handleSearch={this.handleSearch}
       handleSelect={this.handleSelect}
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
