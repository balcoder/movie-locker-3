import React from 'react';
import './scss/Footer.scss'

function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg" alt="The Movie Database (TMDb)" width="81" height="72"/>
        <div className="tmdb-copyright">
        This product uses the TMDb API but is not endorsed or certified by TMDb
        </div>
      </div>
     
      <div class="copyright">
        Created by Des Barrett &copy;2020. All Rights Reserved.
      </div>   
    </div>
  );
}

export default Footer;