import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor() {
        super();
        this.state = { someInput: '', list: [] };

        this.handleChange = event => {
            this.setState({ someInput: event.target.value });
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const { someInput, list } = this.state;

        const error = validatePassword(someInput);

        return (
            <form onSubmit={this.handleSubmit}>
                <div>You typed: {someInput.length} chars</div>
                <input
                    name="some-input"
                    className="my-input"
                    value={someInput}
                    onChange={this.handleChange}
                />
                {error && <span style={{ color: 'red' }}>{error}</span>}
                <button disabled={error !== null}>Submit</button>
                <ul>
                    {list.map(value => <li>{value}</li>)}
                </ul>
            </form>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState(state => ({ someInput: '', list: state.list.concat([state.someInput]) }));
    }
}

function validatePassword(password) {
    if (password.length < 4) {
        return 'Password must be at least 4 chars';
    }

    if (!/\d/.test(password)) {
        return 'Password must have at least a digit';
    }

    if (!/[a-z]/.test(password)) {
        return 'Password must have a lower case letter';
    }

    if (!/[A-Z]/.test(password)) {
        return 'Password must have an upper case letter';
    }

    return null;
}

ReactDOM.render(
    <div>
        <App />
    </div>,
    document.getElementById('app-root'),
);
