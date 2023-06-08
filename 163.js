/*
version     v0.0.1
updatetime  2023-06-08
tgchannel   https://t.me/ddgksf2021
function    二百斤屏蔽
author      jj


[rewrite_local]
^https?:\/\/.*(126|163).(net|com)\/nc\/api url script-response-body https://codeberg.org/ddgksf2013/Cuttlefish/raw/branch/master/Script/coolapk.js

[mitm]
hostname = lanfanapp.com

*/

if (/\/feed\/dynamic\/headline-list/.test($request.url)) {
  var body = JSON.parse($response.body);
  var url = $request.url;

  body.data.items = body.data.items.filter((item) => item.unlikeReason)
  
  $done({
      body: JSON.stringify(body),
  });
} else {
  $done($response);
}
