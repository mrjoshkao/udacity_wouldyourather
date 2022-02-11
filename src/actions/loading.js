export const SET_TRUE = 'loading/SET_TRUE'
export const SET_FALSE = 'loading/SET_FALSE'

export function setLoadingTrue() {
  return { type: SET_TRUE }
}

export function setLoadingFalse() {
  return { type: SET_FALSE } 
}