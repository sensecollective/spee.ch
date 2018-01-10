module.exports = {
  getCookie (cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  },
  setCookie (key, value) {
    document.cookie = `${key}=${value}`;
  },
  setUserCookies (channelName, channelClaimId, shortChannelId) {
    module.exports.setCookie('channel_name', channelName)
    module.exports.setCookie('channel_claim_id', channelClaimId);
    module.exports.setCookie('short_channel_id', shortChannelId);
  },
}
