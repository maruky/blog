import React from "react";
import Nav from "../../componts/Nav/index.jsx";
import SideBar from "../../componts/SideBar/index.jsx";
import CodeBlock from './code-block.jsx';
import request from 'superagent';

import ReactMarkdown from 'react-markdown/with-html.js';


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
                    <div className="content markdown-body" >
                        <ReactMarkdown
                            source={ this.state.content}
                            renderers={{code: CodeBlock}}
                        />
                    </div>
                </div>
            </div>
            
        )
    }
}