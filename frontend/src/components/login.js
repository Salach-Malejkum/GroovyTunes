import React, { Component } from 'react'

class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: ''
        }
    }

    login = event => {
        console.log(this.state.credentials);
    }

    inputChanged = event => {
        const creds = this.state.credentials;

        creds[event.target.name] = event.target.value;

        this.setState({credentials: creds});
    }

    render() {
        return (
            <div className="App">
                <h1>Login</h1>

                <input type="text" placeholder="Username" name="username" 
                        value={this.state.credentials.username}
                        onChange={this.inputChanged}></input> 
                <br />
                <input type="password" placeholder="Password" name="password"
                        value={this.state.credentials.password}
                        onChange={this.inputChanged}></input>
                <br />
                <button onClick={ this.login }>Login</button>
            </div>
        );
    }
}

export default Login;
