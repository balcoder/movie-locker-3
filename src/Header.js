import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './scss/Header.scss';
import searchIcon from './magnifying-glass.svg';

function Header(props) {

  const [selected, setSelected] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [toHome, setToHome] = useState(false);

  const history = useHistory();
    
  
  function onChangeSelect(event) {
    setSelected(event.target.value);   
    props.handleSelect( event.target.value);
    setToHome(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.handleSearch(searchTerm);
    setToHome(true);
  }

  function onSearch(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);   
    
  }
  useEffect(() => {    
    return () => {      
      setToHome(false);
    };
  });
  // Redirect to Home component if movie search or selected drop down is performed  
  if(toHome) {
    return <Redirect to='/' />
  }
 
  return (
    <div className="header">
      <div className="logo"><a href="/">Movie<span>Locker</span></a></div>      
      <form
        onSubmit={handleSubmit}
        className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Search..."
          value={searchTerm}
          onChange={onSearch}/>
        <button 
          type="submit"
          className="search__button"
          >
          <img src={searchIcon} className="search__icon" alt=""/>
          {/* <svg className="search__icon">
            <use href="magnifying-glass"></use>
          </svg> */}
          </button>
      </form>
        <form className="select-form">         
          <select className="select-view" defaultValue={selected} onChange={onChangeSelect}>            
            <option value="In Cinema Now">In Cinema Now</option>
            <option value="Top Rated">Top Rated</option>             
            <option value="Upcoming">Upcoming</option>
          </select>         
      </form>
    </div>
  );
}
  




export default Header;


// class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selected: '',
//       searchTerm: ''
//     }

//     this.onChangeSelect = this.onChangeSelect.bind(this);
//     this.onSearch = this.onSearch.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);   
    
//   }
//   onChangeSelect(event) {
//     this.setState({selected: event.target.value});   
//     this.props.handleSelect( event.target.value);
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     this.props.handleSearch(this.state.searchTerm);
//   }

//   onSearch(event) {
//     event.preventDefault();
//     this.setState({searchTerm: event.target.value});
    
   
    
//   }

  
//   render() {
//     return (
//       <div className="header">
//         <div className="logo"><a href="/">Movie<span>Locker</span></a>
          
//         </div>
//         <form
//           onSubmit={this.handleSubmit}
//           className="search">
//           <input
//            type="text"
//            className="search__input"
//            placeholder="Search..."
//            value={this.state.searchTerm}
//            onChange={this.onSearch}/>
//           <button 
//            type="submit"
//            className="search__button"
//            >
//            <img src={searchIcon} className="search__icon" alt=""/>
//            {/* <svg className="search__icon">
//               <use href="magnifying-glass"></use>
//            </svg> */}
//            </button>
//         </form>
//          <form className="select-form" onSubmit={this.handleSubmit}>         
//             <select className="select-view" value={this.state.value} onChange={this.onChangeSelect}>            
//               <option value="In Cinema Now">In Cinema Now</option>
//               <option value="Top Rated">Top Rated</option>             
//               <option value="Upcoming">Upcoming</option>
//             </select>         
//         </form>
//       </div>
//     );
//   }
  
// }



// export default Header;