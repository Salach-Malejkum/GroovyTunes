import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { SearchList } from './searchList';
import { Profile } from './profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import logo from "../img/logo-white.png";

function LogoutButtonLogic(props) {
    const logout = event => {
        event.preventDefault();

        fetch('http://127.0.0.1:8000/api/v1/users/auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                localStorage.clear();
                window.location.replace('http://127.0.0.1:3000/');
        });
    };

    if(props.isLoggedIn) {
        return (
            <Button onClick={logout.bind(this)}>
                Logout
            </Button>
        );
    } else {
        return (
            <Link to='/'>
                <FontAwesomeIcon className="navbar-icon text-link" icon={faSignInAlt} />
            </Link>
        );
    }
}

class Dashboard extends Component {

    state = {
        searchQuery: '',
        userLoggedIn: false,
        loggedUserCreds: {
            email: '',
            username: '',
            first_name: '',
            last_name: ''
        },
        searchResults: []
    };


    sendQuery = event => {
        event.preventDefault();

        fetch(`http://127.0.0.1:8000/search/${this.state.searchQuery.replaceAll(' ', '-')}`)
            .then(response => response.json())
            .then(data => {
                /* 
                First array:
                    -> Artist name
                    -> Artist genius link
                Second array:
                    -> Song title
                    -> Genius link
                    -> Release date
                    -> Featured artists
                    -> Producers
                */
                console.log(data)
                this.setState({ searchResults: data });
                console.log(this.state.searchResults);
            });
    };

    componentDidMount() {
        document.body.style.backgroundColor = "#121212";
        document.body.style.overflowX = "hidden";
        document.body.style.overflowY = "auto";

        fetch('http://127.0.0.1:8000/api/v1/users/auth/user', {
            method: 'GET',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }) 
            .then(res => res.json())
            .then(data => {
                console.log(data);
                
                if(data.email)
                    this.setState(
                        {
                            userLoggedIn: true,
                            loggedUserCreds: {
                                email: data.email,
                                username: data.username,
                                first_name: data.first_name,
                                last_name: data.last_name
                            }
                        }
                    );
            });
    }

    inputChanged = event => {
        this.setState({searchQuery: event.target.value});
    };

    render() {

        return (
            <div>
                <div className="navbar-wrapper">
                    <div className="navbar">
                        <Link to='/main'>
                            <FontAwesomeIcon className="navbar-icon text-link" icon={faHome} />
                        </Link>

                        <Link to='/users/me'>
                            <FontAwesomeIcon className="navbar-icon text-link" icon={faUser} />
                        </Link>

                        <LogoutButtonLogic isLoggedIn={this.state.userLoggedIn} />
                    </div>
                </div>

                <Switch>
                    <Route path="/main">
                        <div className="search-wrapper">
                            <img style={{ width: '24vh', height: '20vh', marginTop: '10px'}} src={logo} alt="Logo" />
                            <form onSubmit={this.sendQuery}>
                                    <input type="text" placeholder="Enter query" 
                                            className="search-input"
                                            name="searchQuery"
                                            value={this.state.searchQuery}
                                            onChange={this.inputChanged}></input>
                            </form>
                        </div>
                        
                        <div className="search-results">
                            
                            <SearchList items={this.state.searchResults} />
                        </div>
                    </Route>
                    <Route path="/users/me">
                        <div style={{ position: 'absolute', left: '10vw', width: '90vw', 
                                    height: '100vh', alignItems:'center', justifyContent: 'flex-start' }}>
                            <Profile profile={this.state.loggedUserCreds} isLoggedIn={this.state.userLoggedIn} />
                        </div>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Dashboard;
