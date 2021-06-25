/*
 * @Author: your name
 * @Date: 2021-06-25 13:39:50
 * @LastEditTime: 2021-06-25 16:23:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /HarlieBlog/src/view/app.js
 */
import React, { Component,Fragment } from "react";
import { BrowserRouter as Router, Route, withRouter,Switch} from "react-router-dom";
import { connect } from "react-redux";
import { setCurPageInfo } from '@/store/actions'
import { routerConfig } from "@/router/config";
import Header from '@/component/header/header';
import Admin from '@/view/admin/index/index'

const frontRoute = ['/front/articlelist','/front/articledetail']
// 公共头部组件
class App extends Component {
  constructor(props){
      super(props);
      console.log('props',props)
      this.state = {
        curPageInfo: props.curPageInfo
      }
  }
  // 为什么触发两次render ????
  pushBefore(route) {
    this.props.setCurPageInfo(route)
  }

  render() {
    return (
      <Router>
        <div className="blog">
          {/* switch 加上后路由不显示 */}
          {
            frontRoute.includes(this.props.curPageInfo.path) ? (<Header></Header>) : (<Admin></Admin>)
          }
          
          <div className={ frontRoute.includes(this.props.curPageInfo.path) ? 'container font': 'container' }>
            {routerConfig.map((item, index) => {
              return (
                  <Fragment key={index}>
                    <Switch>
                      <Route
                      key={index}
                      path={item.path}
                      exact
                      render={(props) =>
                        {
                          this.pushBefore(item)
                          return (
                            
                            <Fragment>
                              <item.component {...props} />
                            </Fragment>
                          )
                        }
                      }
                    />
                    </Switch>
                </Fragment>
              );
            })}
          </div>
        </div>
      </Router>
    );
  }
}

// redux拿到token并挂载到App的props上面
const mapStateToProps = (state, ownProps) => {
  return { 
    curPageInfo: state.curPageInfo,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurPageInfo: (info =>  dispatch(setCurPageInfo(info)))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
