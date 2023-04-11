/*
version     v0.0.1
updatetime  2023-04-11
tgchannel   https://t.me/ddgksf2021
function    懒饭app会员
author      jj


[rewrite_local]
^https?:\/\/napi.ithome.com\/api\/news\/index url script-response-body https://codeberg.org/ddgksf2013/Cuttlefish/raw/branch/master/Script/coolapk.js

[mitm]
hostname = lanfanapp.com

*/

if ($request.url.indexOf("user/page_detail.json") != -1) {
  var bodyObj = JSON.parse($response.body);
  bodyObj.content.user.is_prime = true;
  $done({
      body: JSON.stringify(bodyObj),
  });
} else {
  $done($response);
}
