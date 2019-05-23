import React from 'react';
import { Link } from "react-router-dom";

import './index.scss';

export default  class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            navData: [{
                id: 1,
                value: '主页',
                link: '/'
            },{
                id: 2,
                value: '归档',
            },{
                id: 3,
                value: '标签',
            },{
                id: 4,
                value: '关于',
            }],
            activeId: 1
        }
        this.handleChangeNav = this.handleChangeNav.bind(this);
    }
    handleChangeNav(nav) {
        this.setState({
            activeId: nav.id
        })
    }
    render() {
        const { navData, activeId } = this.state;
        return (
            <div className="nav fix top">
                <ul>
                    {
                        navData.map((nav, key) => 
                            <li 
                                className={(nav.id === activeId) ? 'active' : ''}
                                key={nav.id}
                                onClick={() => {this.handleChangeNav(nav)}}>
                                {nav.link ? <Link to={nav.link}>{nav.value}</Link> : nav.value}
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
    
}