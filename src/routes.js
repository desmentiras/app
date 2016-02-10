import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Layout from './containers/Layout'
import Home from './containers/Home'
// import Civilization from './containers/Civilization'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
  </Route>
)

// <Route path="civilization" component={Civilization} />
