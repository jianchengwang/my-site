(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{238:function(t,e,r){var content=r(259);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(25).default)("0b492673",content,!0,{sourceMap:!1})},258:function(t,e,r){"use strict";r(238)},259:function(t,e,r){(e=r(24)(!1)).push([t.i,'.album-list[data-v-f0c07eda]{display:flex;justify-content:center;flex-wrap:wrap}.album-list figure[data-v-f0c07eda]{position:relative;width:15rem;margin:2rem}.album-list-item[data-v-f0c07eda]{display:inline-flex}.album-list-item figure[data-v-f0c07eda]{position:relative;width:15rem;margin:2rem}.album-list-item figure img[data-v-f0c07eda]{vertical-align:bottom;display:inline-flex;border:.25rem solid #fff;box-shadow:0 8px 10px rgba(0,0,0,.3);padding:0;transform:rotate(2deg);width:100%;height:10rem;-o-object-fit:cover;object-fit:cover;background-color:#eee}.album-list-item figure figcaption[data-v-f0c07eda]{position:absolute;bottom:-2.5rem;display:block;text-align:center;width:100%}.album-list-item figure[data-v-f0c07eda]:before{content:"";position:absolute;top:1%;left:.5%;width:100%;height:96%;border:.25rem solid #fff;background-color:#666;box-shadow:0 5px 10px rgba(0,0,0,.3);transform:rotate(-3deg)}',""]),t.exports=e},297:function(t,e,r){"use strict";r.r(e);r(26);var n=r(5),o={name:"Albums",asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$content,t.params,n=t.error,e.next=3,r("albums","index").fetch().catch((function(t){n({statusCode:404,message:"Page not found",err:t})}));case 3:return o=e.sent,e.abrupt("return",{albums:o.albums});case 5:case"end":return e.stop()}}),e)})))()}},l=(r(258),r(9)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"main"},[r("h1",{staticClass:"main-title"},[t._v("Albums")]),t._v(" "),r("div",{staticClass:"page-subtitle"},[t._v(t._s(t.albums.length)+" albums in total")]),t._v(" "),r("div",{staticClass:"album-list"},t._l(t.albums,(function(e){return r("a",{key:e.caption,staticClass:"album-list-item",attrs:{href:e.url}},[r("figure",{attrs:{title:e.desc}},[r("img",{staticClass:"album-list-cover",attrs:{src:e.cover,loading:"lazy",alt:e.caption,"οnlοad":"this.src=CONFIG.anonymous_image"}}),t._v(" "),r("figcaption",[t._v("「"+t._s(e.caption)+"」")])])])})),0)])}),[],!1,null,"f0c07eda",null);e.default=component.exports}}]);