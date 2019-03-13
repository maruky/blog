import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.scss';

class App extends React.Component {
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
            
            </div>
        </div>
         
        )
    }
}

export default App;
