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

*/

if ($request.url.indexOf("topstory/recommend") != -1) {
  var bodyObj = JSON.parse($response.body);
  bodyObj.data.data = Object.values(bodyObj.data.data).filter((item) => !item.ad);
  $done({
      body: JSON.stringify(bodyObj),
  });
} else {
  $done($response);
}
