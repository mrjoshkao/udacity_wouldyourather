/**
 *  https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
 */

import { imgs } from './_DATA.js'

export function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *  https://jack72828383883.medium.com/how-to-preload-images-into-cache-in-react-js-ff1642708240
 */

function getImages() {
  return(imgs.map(src=>{
    return new Promise((res,rej)=>{
      const img = new Image();
      img.src=src;
      img.onload=res(img);
      img.onerror=rej();
    })
  }))
}

export async function cacheImages() {
  const promises = await getImages();
  await Promise.all(promises);
}