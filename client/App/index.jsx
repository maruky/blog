import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.scss';
import Nav from './nav.jsx';
const request = require('superagent');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            articals: [{}]
        }
    }
    componentDidMount() {
        request
            .get('/api/articals')
            .end((err, res) => {
                this.setState({
                    articals: res.body.data
                })
            })
    }
    render() {
        const {articals} = this.state;
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
                    {
                        articals.map((data, key) => (
                            <div className="post" key>
                                <h3 className="post-title ">{data.title}</h3>
                                <div className="post-sumary">{data.summary}</div>
                                <div className="post-footer">
                                    <p>{data.date}</p>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </div>
         
        )
    }
}

export default App;
