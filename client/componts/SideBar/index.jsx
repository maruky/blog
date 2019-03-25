import React from "react";
import './index.scss';


export default class SideBar extends React.Component {
    render() {
        return (
            <div className="side-bar">
                <div className="long-title">
                    <div className="title">
                        <img src={require("../../../vendor/logo.png")} style={{width: 127}}/>
                        <h3 className="title"><a href="/">Maruky</a></h3>
                        <div className="description">
                            <p>浩瀚宇宙中 微渺的 像一只 蜉蝣.</p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}