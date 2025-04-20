const twitterImage  =  require("assets/img/png/twitter.png");
const instagramImage  =  require("assets/img/png/instagram.png");
const linkedinImage  =  require("assets/img/png/linkedin.png");
const facebookImage  =  require("assets/img/png/facebook.png");
const globalImage  =  require("assets/img/png/globe-grid.png");

export  function getSocialIcon(item){
  let socialIcon = ''
  if (item.sourceName.toLowerCase() === 'facebook'){
    socialIcon = facebookImage
  } else if (item.sourceName.toLowerCase() === 'instagram'){
    socialIcon = instagramImage
  } else if (item.sourceName.toLowerCase() === 'linkedin'){
    socialIcon = linkedinImage
  } else if (item.sourceName.toLowerCase() === 'twitter'){
    socialIcon = twitterImage
  }else{
    socialIcon = globalImage
  }
  return socialIcon
}

export function finalAlert(message = 'Are you sure to delete this!'){
  return confirm(message);
}

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function randomString(length) {
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
