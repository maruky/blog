import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/index.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './home/index.jsx';

class Index extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <App/>
                    <Route path="/" exact component={App} />
                    <Route path="/home/" component={Home} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<Index/>, document.getElementById('root'));

if(module.hot) {
    module.hot.accept();
}
