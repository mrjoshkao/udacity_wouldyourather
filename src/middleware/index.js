/**
 * adapted from github.com/udacity/reactnd-chirper-app
 */

import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  thunk,
  logger,
)