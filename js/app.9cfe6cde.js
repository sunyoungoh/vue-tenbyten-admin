(function(t){function e(e){for(var s,a,o=e[0],d=e[1],l=e[2],u=0,p=[];u<o.length;u++)a=o[u],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&p.push(i[a][0]),i[a]=0;for(s in d)Object.prototype.hasOwnProperty.call(d,s)&&(t[s]=d[s]);c&&c(e);while(p.length)p.shift()();return n.push.apply(n,l||[]),r()}function r(){for(var t,e=0;e<n.length;e++){for(var r=n[e],s=!0,o=1;o<r.length;o++){var d=r[o];0!==i[d]&&(s=!1)}s&&(n.splice(e--,1),t=a(a.s=r[0]))}return t}var s={},i={app:0},n=[];function a(e){if(s[e])return s[e].exports;var r=s[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=s,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)a.d(r,s,function(e){return t[e]}.bind(null,s));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/vue-tenbyten-admin/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],d=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var c=d;n.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"56d7":function(t,e,r){"use strict";r.r(e);var s=r("2b0e"),i=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},n=[],a=(r("7998"),r("2877")),o={},d=Object(a["a"])(o,i,n,!1,null,null,null),l=d.exports,c=r("8c4f"),u=function(){var t=this,e=t._self._c;return e("section",{staticClass:"home"},[t._m(0),e("h2",[t._v("텐바이텐 어드민 주문관리")]),e("LoginForm"),e("OrderList")],1)},p=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"logo"},[e("img",{attrs:{src:r("cf05")}})])}],m=function(){var t=this,e=t._self._c;return e("div",{staticClass:"login-container"},[e("div",{staticClass:"input-item"},[e("label",{attrs:{for:"brandId"}},[t._v("brandId")]),e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.brandId,expression:"brandId"}],attrs:{type:"text"},domProps:{value:t.brandId},on:{input:function(e){e.target.composing||(t.brandId=e.target.value)}}}),e("p",{staticClass:"error"},[t._v(t._s(t.brandIdError))])])]),e("div",{staticClass:"input-item"},[e("label",{attrs:{for:"apiKey"}},[t._v("apiKey")]),e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.apiKey,expression:"apiKey"}],attrs:{type:"password"},domProps:{value:t.apiKey},on:{input:function(e){e.target.composing||(t.apiKey=e.target.value)}}}),e("p",{staticClass:"error"},[t._v(t._s(t.apiKeyError))])])]),e("div",{staticClass:"btns_order"},[e("button",{staticClass:"btn-new-orders",on:{click:function(e){return t.getOrdersData("new-orders")}}},[t._v(" 신규 주문 조회 ")]),e("button",{staticClass:"btn-outline",on:{click:function(e){return t.getOrdersData("ready")}}},[t._v(" 배송 준비 중 조회 ")])])])},h=[],f=r("cee4");const v=f["a"].create({withCredentials:!0});function b(t,e){return v.get("/v2/orders",{headers:{Authorization:"bearer "+t},params:{brandId:e,startdate:g(),enddate:O()}})}function _(t,e){return v.get("/v2/orders/orderhistory",{headers:{Authorization:"bearer "+t},params:{brandId:e,startdate:g(),enddate:O()}})}function y(t,e,r){return v.post("/v2/orders/orderconfirm",{orderSerial:e,detailIdx:r,songjangDiv:"97",songjangNo:"0"},{headers:{Authorization:"bearer "+t}})}const g=()=>{let t=new Date,e=t.getFullYear(),r=("0"+(1+t.getMonth())).slice(-2),s=("0"+t.getDate()).slice(-2)-3;return e+"-"+r+"-"+s},O=()=>{let t=new Date,e=t.getFullYear(),r=("0"+(1+t.getMonth())).slice(-2),s=("0"+t.getDate()).slice(-2);return e+"-"+r+"-"+s};var I={data(){return{apiKey:this.$store.state.apiKey,brandId:this.$store.state.brandId,apiKeyError:"",brandIdError:"",resultMsg:""}},methods:{async getOrdersData(t){if(this.apiKey?this.apiKeyError="":this.apiKeyError="apiKey를 입력해주세요.",this.brandId?this.brandIdError="":this.brandIdError="brandId를 입력해주세요.",""!==this.apiKey&&""!==this.brandId){this.$store.commit("setApiKey",this.apiKey),this.$store.commit("setBrandId",this.brandId),this.$store.commit("setClickedBtn",t);let r=[];try{"new-orders"==this.$store.state.clickedBtn&&(console.log("신규 주문 목록을 조회합니다."),r=await b(this.apiKey,this.brandId)),"ready"==this.$store.state.clickedBtn&&(console.log("배송 준비 중 목록을 조회합니다."),r=await _(this.apiKey,this.brandId)),this.$store.commit("setOrderList",r.data.outPutValue)}catch(e){this.$store.commit("clearOrderList"),console.log(e)}}}}},w=I,K=Object(a["a"])(w,m,h,!1,null,null,null),x=K.exports,j=function(){var t=this,e=t._self._c;return e("div",{staticClass:"order-list-container"},[0!==t.orderList.length?e("table",[e("tr",[e("th",[t._v("주문일")]),e("th",[t._v("주문자")]),e("th",[t._v("상품명")]),e("th",[t._v("옵션")]),e("th",[t._v("주문메모")]),"ready"==this.$store.state.clickedBtn?e("th",[t._v("발송상태")]):t._e()]),t._l(t.orderList,(function(t,r){return e("OrderItem",{key:r,attrs:{item:t}})}))],2):t._e(),e("p",[t._v(t._s(t.resultMsg))])])},k=[],C=function(){var t=this,e=t._self._c;return e("tr",[e("td",[t._v(t._s(t.orderDate))]),e("td",[t._v(t._s(t.item["ordererName"]))]),e("td",[t._v(t._s(t.itemName))]),e("td",[t._v(t._s(t.itemOptionName))]),e("td",[t._v(t._s(t.item["details"][0]["RequireMemo"]))]),"ready"==this.$store.state.clickedBtn?e("td",{staticClass:"btns_post"},["none"==t.postResult?e("button",{on:{click:t.postOrder}},[t._v("발송하기")]):"complete"==t.postResult?e("button",{staticClass:"btn_post-complete"},[t._v(" 발송완료 ")]):"fail"==t.postResult?e("button",{staticClass:"btn_post-fail"},[t._v(" 발송실패 ")]):t._e()]):t._e()])},L=[],$={props:{item:{type:Object}},data(){return{postResult:"none"}},computed:{orderDate(){let t=this.item["orderDate"].split("-");return t[0].substr(2)+"/"+t[1]+"/"+t[2]},itemName(){let t=this.item["details"][0]["itemName"].indexOf("]"),e=this.item["details"][0]["itemName"].indexOf("굿");return this.item["details"][0]["itemName"].substring(t+2,e-1)},itemOptionName(){let t=this.item["details"][0]["itemOptionName"].indexOf("꼭");return this.item["details"][0]["itemOptionName"].substring(0,t-1)}},methods:{async postOrder(){try{await y(this.$store.state.apiKey,this.item["OrderSerial"],this.item["details"][0]["DetailIdx"]),this.postResult="complete"}catch(t){console.log(t.response.data.message),this.postResult="fail"}}}},N=$,B=Object(a["a"])(N,C,L,!1,null,null,null),D=B.exports,M={components:{OrderItem:D},data(){return{orderList:this.$store.state.orderList}},computed:{resultMsg(){let t="";return""==this.orderList&&("new-orders"==this.$store.state.clickedBtn&&(t="신규 주문이 없습니다."),"ready"==this.$store.state.clickedBtn&&(t="배송 준비 중인 주문이 없습니다.")),t}}},P=M,E=Object(a["a"])(P,j,k,!1,null,null,null),S=E.exports,R={components:{LoginForm:x,OrderList:S}},A=R,F=Object(a["a"])(A,u,p,!1,null,null,null),z=F.exports;s["a"].use(c["a"]);const T=[{path:"/",name:"Home",component:z}],J=new c["a"]({mode:"history",base:"/vue-tenbyten-admin/",routes:T});var Y=J,q=r("2f62"),H=r("0e44");s["a"].use(q["a"]);var V=new q["a"].Store({plugins:[Object(H["a"])()],state:{apiKey:"",brandId:"",clickedBtn:"",orderList:[]},mutations:{setApiKey(t,e){t.apiKey=e},setBrandId(t,e){t.brandId=e},setClickedBtn(t,e){t.clickedBtn=e},setOrderList(t,e){t.orderList=e},clearOrderList(t){t.orderList=[]}},actions:{}});s["a"].config.productionTip=!1,new s["a"]({router:Y,store:V,render:t=>t(l)}).$mount("#app")},7998:function(t,e,r){"use strict";r("7d13")},"7d13":function(t,e,r){},cf05:function(t,e,r){t.exports=r.p+"img/logo.f40ed32d.png"}});
//# sourceMappingURL=app.9cfe6cde.js.map