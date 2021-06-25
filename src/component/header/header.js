/*
 * @Author: your name
 * @Date: 2021-06-23 10:01:03
 * @LastEditTime: 2021-06-25 16:43:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /HarlieBlog/src/component/header/header.js
 */
import React, {Component,Fragment} from "react"
import  {Link}  from "react-router-dom";
import './header.css';

class Index extends Component {
    constructor(props) {
        super(props);  //调用父类的构造函数，固定写法
        this.state = {
            productShow:false
        };
    }
    render () { 
        return (
            <Fragment>
                <div className="banner"> 
                    <div className="top">
                        <strong className='name'>
                            <Link to="/front/articlelist">Harlie-Front-End</Link>
                        </strong>
                        <span className='name-title'>开发技术分享</span>
                        <span className='name-title'>新技术讨论</span>
                    </div>
                    <footer className="footer">
                        <div className="inner">
                            <ul className="icons">
                                <li>
                                    <Link target="blank" to="https://github.com/HarlieYang" alt="" className="icon fa-github" title="GitHub">
                                        <img src="/assets/images/github-fill.png" alt=""></img>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/front/articlelist" id="translateBtn" className="icon fa-language" title="簡繁轉換" >
                                        <img src="/assets/images/mark.png" alt=""></img>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="copyright">
                            <span>© 2009 ~ 2021 </span> 
                            <Link to="/front/articlelist"> Harlie-Front-End </Link>
                        </div>
                    </footer>
                </div>
            </Fragment>
        )
    }
}

export default Index;