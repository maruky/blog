import React from 'react';
import ReactDOM from 'react-dom';
import App from './page/app/index.jsx';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import About from './page/about/index.jsx';
import Content from './page/content/index.jsx';

import '../styles/common.css';

class Index extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/about/" component={About} />
                    <Route path="/content/:title" component={Content} />
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<Index/>, document.getElementById('root'));

if(module.hot) {
    module.hot.accept();
}
