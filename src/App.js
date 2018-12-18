import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    state = {
        clickCount: 0,
        username: ''
    }

    componentDidMount() {
        this.getCount();
        this.getUsername();
    }

    handleClick = () => {
        axios.post('/add-click')
            .then(() => this.getCount())
            .catch(error => {
                console.log('error making add click post', error);
            });
    }

    getCount = () => {
        axios.get('/get-clicks')
            .then(response => {
                this.setState({
                    clickCount: response.data.totalClicks,
                });
            })
            .catch(error => {
                console.log('error making add click post', error);
            });
    }

    editUsername = () => {
        this.setState({
            usernameIsEditable: true,
        });
    }

    saveUsername = () => {
        console.log(this.state.username);
        
        this.setState({
            usernameIsEditable: false,
        });
        axios.post('/add-username', {username: this.state.username
        }).then( res => {
            this.getUsername();
        }).catch( err => {
            console.log('error saving username:', err);
        })
    }

    getUsername = () => {
        axios.get('/get-username')
        .then( res => {
            this.setState({
                username: res.data.username,
            });
        }).catch( err => {
            console.log('error in get username:', err);
            
        })
    }

    handleChange = ({ target }) => {
        this.setState({
            username: target.value
        })
    }

    render() {
        return (
            <div>
                <center>
                    <h1>Click the Cookie!!</h1>
                    <p>
                        {/* Username should go here */}
                        {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
                        {this.state.usernameIsEditable ?
                            <div>
                                <input value={this.state.username} onChange={this.handleChange} />
                                <button onClick={this.saveUsername}>Save Username</button>
                            </div>
                            :
                            <div>
                                {this.state.username}
                                <button onClick={this.editUsername}>Edit Username</button>
                            </div>
                        }
                    </p>
                    <p>{this.state.clickCount}</p>
                    <span
                        role="img"
                        aria-label="cookie"
                        style={{ fontSize: '100px', cursor: 'pointer' }}
                        onClick={this.handleClick}
                    >
                        🍪
          </span>
                </center>
            </div>
        );
    }
}

export default App;
