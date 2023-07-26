/*
version     v0.0.1
updatetime  2023-07-15
tgchannel   https://t.me/ddgksf2021
function    dicts.cn vips
author      jj


[rewrite_local]
^https?:\/\/.*dicts\.cn\/dict\/service\/UserCenter\/Login\.au url script-response-body https://codeberg.org/ddgksf2013/Cuttlefish/raw/branch/master/Script/coolapk.js

[mitm]
hostname = dicts.cn

*/

if (/\/dict\/service\/UserCenter\/(Login|GetUserInfo)\.au/.test($request.url)) {
  var body = JSON.parse($response.body);

  if (body.UserInfo) {
    body.UserInfo.gu_type = 1;
    body.UserInfo.gu_money = 100;
  }
  
  $done({
      body: JSON.stringify(body),
  });
} else {
  $done($response);
}
