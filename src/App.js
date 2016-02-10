import React from 'react'
import {render} from 'react-dom'

import Root from './containers/Root'
import Store from './store/Store'

import 'styles/base.css'

const STORE = Store()

window.desmentiras = {
  start: element => render(<Root store={STORE} />, element)
}
