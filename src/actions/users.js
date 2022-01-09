/**
 * adapted from github.com/udacity/reactnd-chirper-app
 */

export const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}