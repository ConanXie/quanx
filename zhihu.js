/*
version     v0.0.1
updatetime  2022-11-17
tgchannel   https://t.me/ddgksf2021
function    zhihu 去广告
author      jj


[rewrite_local]
^https?:\/\/103.41.167.235\/topstory\/recommend url script-response-body https://codeberg.org/ddgksf2013/Cuttlefish/raw/branch/master/Script/coolapk.js

[mitm]
hostname = 103.41.167.235
hostname = 113.105.165.124

*/

if ($request.url.indexOf("topstory/recommend") != -1) {
  var bodyObj = JSON.parse($response.body);
  bodyObj.data = Object.values(bodyObj.data).filter((item) => !item.ad);
  $done({
      body: JSON.stringify(bodyObj),
  });
} else if (/\/api\/v\d\/articles\/\d+\/recommendation/.test($request.url)) {
  var bodyObj = JSON.parse($response.body);
  bodyObj.ad_info = null;
  $done({
    body: JSON.stringify(bodyObj),
});
} else {
  $done($response);
}
