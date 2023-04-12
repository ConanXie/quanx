/*
version     v0.0.4
updatetime  2023-04-12
tgchannel   https://t.me/ddgksf2021
function    懒饭app会员
author      jj


[rewrite_local]
^https?:\/\/napi.ithome.com\/api\/news\/index url script-response-body https://codeberg.org/ddgksf2013/Cuttlefish/raw/branch/master/Script/coolapk.js

[mitm]
hostname = lanfanapp.com

*/

if (/\/api\/v\d\/(user|account|daily_menus|homepage|recipe)/.test($request.url)) {
  var body = JSON.parse($response.body);
  var url = $request.url;
  if (url.indexOf('/user/page_detail.json') > -1 || url.indexOf('/account/login_via_phone.json') > -1) {
    body.content.user.is_prime = true;
  } else if (url.indexOf('/user/prime.json') > -1) {
    body.content.user.is_prime = true;
    body.content.user.prime.is_prime = true;
    body.content.user.user_homepage_prime_banner = {
      "button_text": "🐔",
      "text": "宇宙无敌超级VIP"
    };
  } else if (url.indexOf('/daily_menus/paged.json') > -1) {
    body.content.daily_menus.forEach((item) => {
      item.unlocked = true;
      item.watch_type = 1;
    });
  } else if (url.indexOf('/homepage/feed.json') > -1) {
    body.content.feeds.forEach((item) => {
      if (item.data && item.data.unlocked !== undefined) {
        item.data.unlocked = true;
        item.data.watch_type = 1;
      }
      if (item.data && Array.isArray(item.data.recipes)) {
        item.data.recipes.forEach((e) => {
          if (e.unlocked !== undefined) {
            e.unlocked = true;
            e.watch_type = 1;
          }
        })
      }
      if (item.data && Array.isArray(item.data.stories)) {
        item.data.stories.forEach((e) => {
          if (e.watch_type !== undefined) {
            e.watch_type = 1;
          }
        })
      }
    });
  } else if (url.indexOf('/recipe/page_detail.json') > -1) {
    body.content.note_data.image_notes.forEach((item) => {
      item.user.is_prime = true;
    });
    body.content.hot_recipe_recommend_data.recipes.forEach((item) => {
      item.unlocked = true;
      item.watch_type = 1;
    });
    body.content.recipe.unlocked = true;
  }
  $done({
      body: JSON.stringify(body),
  });
} else {
  $done($response);
}
