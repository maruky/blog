import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.scss';
import Nav from './nav.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            articals: [{}]
        }
    }
    render() {
        return (
        <div className="main">
            <div className="side-bar">
                <div className="long-title">
                    <div className="title">
                        <img src={require("../../vendor/logo.png")} style={{width: 127}}/>
                        <h3 className="title"><a href="/">Maruky</a></h3>
                        <div className="description">
                            <p>浩瀚宇宙中 微渺的 像一只 蜉蝣.</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="main-content">
                <Nav/>
                <div className="post-content">
                    <div className="post">
                        <h3 className="post-title ">hello world</h3>
                        <div className="post-sumary">this is maruky's blog</div>
                        <div className="post-footer">
                            <p>2019-03-13</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         
        )
    }
}

export default App;
