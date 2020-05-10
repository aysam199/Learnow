import React from 'react';
import './Header.css';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from '../../react-auth0-spa';

function Header() {
  const [searchTerm, setSearchTerm] = React.useState(null);
  const history = useHistory();
  const {
    isAuthenticated,
    loginWithRedirect,
    loginWithPopup,
    logout,
    loading,
    user,
  } = useAuth0();

  const handleLink = () => {
    if (!searchTerm || !searchTerm.trim()) {
      return;
    }
    return `/search/${searchTerm.trim()}/1`;
  };
  return (
    <section className='header'>
      <div style={{ display: 'flex' }}>
        <Link className='img-link' to={'/'}>
          <img alt='logo' className='webLogo' src='/res/logo-1.png'></img>
        </Link>

        <div className='searchBar'>
          <input
            onChange={e => setSearchTerm(e.target.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                history.push(handleLink());
              }
            }}
            className='searchInput'
            type='text'
            placeholder='Search for a course'
            name='search'
          />

          <Link to={handleLink}>
            <button className='searchButton' type='submit'>
              <i className='fa fa-search'></i>
            </button>
          </Link>
        </div>
      </div>
      <div>
        {!isAuthenticated && (
          <span className='loginButton' onClick={() => loginWithPopup()}>
            Log in
          </span>
        )}

        {isAuthenticated && (
          <span
            className='loginButton'
            onClick={() =>
              logout({
                returnTo: window.location.origin.includes('localhost')
                  ? 'http://localhost:3000/'
                  : 'https://learnow.netlify.com/',
              })
            }
          >
            Log out
          </span>
        )}

        {!isAuthenticated && (
          <span className='joinNowButton' onClick={() => loginWithPopup({})}>
            Join now
          </span>
        )}
      </div>
    </section>
  );
}

export default Header;
