/**
 *  https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
 */

import { imgs } from './_DATA.js'

export function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getImages = () => {
  imgs.map(src=>{
    return new Promise((res,rej)=>{
      const img = new Image();
      img.src=src;
      img.onload=res();
      img.onerror=rej();
    })
  })
}

export function cacheImages() {
  return (
    async () => {
      const promises = await getImages();
      await Promise.all(promises);
  })
}