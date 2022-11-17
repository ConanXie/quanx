/*
version     v0.0.1
updatetime  2022-11-17
tgchannel   https://t.me/ddgksf2021
function    ithome 去广告
author      jj


[rewrite_local]
^https?:\/\/napi.ithome.com\/api\/news\/index url script-response-body https://codeberg.org/ddgksf2013/Cuttlefish/raw/branch/master/Script/coolapk.js

[mitm]
hostname = napi.ithome.com

*/

if ($request.url.indexOf("news/index") != -1) {
  var bodyObj = JSON.parse($response.body);
  bodyObj.data.list = Object.values(bodyObj.data.list).filter((item) => item.feedContent.flag != 2);
  $done({
      body: JSON.stringify(bodyObj),
  });
} else {
  $done($response);
}
