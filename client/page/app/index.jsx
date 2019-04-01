import React from "react";
import './index.scss';
import Nav from "../../componts/Nav/index.jsx";
import SideBar from "../../componts/SideBar/index.jsx";

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
            <div className="main-content animated fadeInDown">
                <Nav/>
                <div style={{overflowY: 'scroll', height: '100%'}}>
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
                                        <ul className="post-footer">
                                            <li><span class="iconfont icon-time"></span>{data.date}</li>
                                            <li><span class="iconfont icon-tag"></span>{data.tag}</li>
                                        </ul>
                                        </Link>
                                    </div>
                            
                            ))
                        }
                        
                    </div>
                </div>
            </div>
        </div>
         
        )
    }
}

export default App;
