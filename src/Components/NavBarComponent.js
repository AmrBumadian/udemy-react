import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faGlobe, faShoppingCart, faBars} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

class SearchBar extends React.Component {

	render() {
		return (
			<form action="/search">
				<button type="submit">
					<FontAwesomeIcon icon={faSearch}/>
				</button>
				<input id="search-bar" name="query" type="text" placeholder="Search for anything"/>
			</form>
		)
	}
}

class NavBarComponent extends React.Component {

	render() {
		return (
			<nav id={this.props.id}>
				<button id="hidden-menu">
					<FontAwesomeIcon icon={faBars}/>
				</button>
				<Link to="/" className="logo"><img src={`${process.env.PUBLIC_URL}/assets/images/udemy-logo.svg`}
				                                   alt="Udemy Logo"/></Link>
				<button>Categories</button>
				<SearchBar/>
				<button id="udemy-business">Udemy Business</button>
				<button id="udemy-teach">Teach on Udemy</button>
				<button>
					<FontAwesomeIcon icon={faShoppingCart}/>
				</button>
				<button id="login">Log in</button>
				<button id="signup">Sign up</button>
				<button id="language">
					<FontAwesomeIcon icon={faGlobe}/>
				</button>
				<span id="hidden-icons">
		            <button>
		                <FontAwesomeIcon icon={faSearch}/>
		            </button>
		            <button>
		                <FontAwesomeIcon icon={faShoppingCart}/>
		            </button>
                </span>
			</nav>
		)
	}
}

export {
	NavBarComponent
}