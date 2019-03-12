import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.scss';

class App extends React.Component {
    render() {
        return (
        <div className="main entry">
            <div className="info-content">
                <Link to='/home'><div >Maruky's Blog</div></Link>
            </div>
            
         </div>
         
        )
    }
}

export default App;
