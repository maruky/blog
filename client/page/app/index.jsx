import React from "react";
import './index.scss';
import Nav from './nav.jsx';
import SideBar from "./side-bar.jsx";

import { Link } from "react-router-dom";

const request = require('superagent');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            articals: [{}],
            title: '',
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        request
            .get('/api/articals')
            .end((err, res) => {
                this.setState({
                    articals: res.body.data
                })
            })
    }
    render() {
        const {articals, isShow, title} = this.state;
        return (
        <div className="main">
           <SideBar/>
            <div className="main-content">
                <Nav/>
                <div className="post-content">
                    {
                        articals.map((data, key) => (
                           
                                <div 
                                    key
                                    className="post" 
                                    
                                >
                                     <Link to={`/content/${data.path}`}>
                                    <h3 className="post-title ">{data.title}</h3>
                                    <div className="post-sumary">{data.summary}</div>
                                    <div className="post-footer">
                                        <p>{data.date}</p>
                                    </div>
                                    </Link>
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
