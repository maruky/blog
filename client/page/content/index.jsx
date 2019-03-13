import React from "react";
import Nav from "../App/nav.jsx";
import SideBar from "../App/side-bar.jsx";

const request = require('superagent');


export default class Content extends React.Component {
    constructor(props) {
        super();
        this.state = {
            content: ''
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        request.get('/api/'+ this.props.match.params.title).end((err, res) => {
            this.setState({
                content: res.body.data.text
            })
        })
    }
    render() {
        return (
            <div className="main">
                <SideBar />
                <div className="main-content">
                    <Nav/>
                    <div className="content" dangerouslySetInnerHTML={{ __html: this.state.content }}>
                    </div>
                </div>
            </div>
            
        )
    }
}