import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router,Route, Redirect} from "react-router-dom"

import './index.css';

// 前台路由
import Article from './view/articlelist/articlelist';
import Header from './component/header/header';

// 后台路由
import Admin from './admin/index/index'
import sortList from './admin/sort/sortList/sortList'
import sortAdd from './admin/sort/sortAdd/sortAdd'
import articleList from './admin/article/articleList/articleList'
import articleAdd from './admin/article/articleAdd/articleAdd'


// 跨域访问


ReactDom.render(
  <Router>
    <section>
      {/* todo 判断前后台逻辑 */}
      <Route  path='/front' >
        <Redirect path="/front" exact={true} to="/front/articlelist" />
        <Header></Header>
        <div className="content">
          <Route  path='/front/articlelist' component={Article}/>
        </div>
      </Route>
      <Route path = '/admin' render={({history,location,match}) => (
          <Admin history={history} location={location} match={location}>
            <Route path='/admin/sortList' component={sortList}/>
            <Route path='/admin/sortAdd' component={sortAdd}/>
            <Route path='/admin/articlelist' component={articleList}/>
            <Route path='/admin/articleadd' component={articleAdd}/>
          </Admin>
      )} />
    </section>
  </Router>,
  document.getElementById('root')
)