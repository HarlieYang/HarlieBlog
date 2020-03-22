import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router,Route, Redirect} from "react-router-dom"

import './index.css';

// 前台路由
import JS from './javascript/javascript';
import Frame from './frame/frame';
import Header from './component/header/header';
import Content from './component/content/content';

// 后台路由
import Admin from './admin/index/index'
import sortList from './admin/sort/sortList/sortList'
import sortAdd from './admin/sort/sortAdd/sortAdd'
import sortConList from './admin/sortCon/sortConList/sortConList'
import sortConAdd from './admin/sortCon/sortConAdd/sortConAdd.js'


// 跨域访问


ReactDom.render(
  <Router>
    <section>
      {/* todo 判断前后台逻辑 */}
      {/* <Redirect path="/" exact={true} to="/index/js" /> */}
      <Route  path='/index' >
        <Header></Header>
        <Route  path='/index/js' component={JS}/>
        <Route path='/index/content/:type' component={Content}/>
      </Route>
      <Route path='/frame' component={Frame}/>
      <Route path = '/admin' render={({history,location,match}) => (
          <Admin history={history} location={location} match={location}>
            <Route path='/admin/sortList' component={sortList}/>
            <Route path='/admin/sortAdd' component={sortAdd}/>
            <Route path='/admin/sortConList' component={sortConList}/>
            <Route path='/admin/sortConAdd' component={sortConAdd}/>
          </Admin>
      )} />
    </section>
  </Router>,
  document.getElementById('root')
)