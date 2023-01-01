(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ce6001ac"],{"02c1":function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t._self._c;return e("section",{staticClass:"container ready"},[t.loading?e("LoadingSpinner"):[e("h1",{class:t.title.css},[t._v(t._s(t.title.text))]),t.orderListCount>0?e("OrderList",{staticClass:"content",attrs:{items:t.orderList}}):t._e()]],2)},s=[],n=r("4bae"),l=r("f5f2"),a={components:{LoadingSpinner:n["a"],OrderList:l["a"]},async mounted(){await this.$store.dispatch("fetchOrderList","ready"),this.title=this.orderListCount>0?{text:`배송 준비 중인 주문이 ${this.orderListCount}건 있습니다! 📦`,css:"highlighter highlighter__yellow"}:{text:"배송 준비 중인 주문이 없습니다 🥲 ",css:"highlighter highlighter__grey"}},data(){return{title:[]}},computed:{loading(){return this.$store.state.order.loading},orderList(){return this.$store.state.order.orderList},orderListCount(){return this.orderList.length}}},o=a,c=r("2877"),d=Object(c["a"])(o,i,s,!1,null,"404d7ce4",null);e["default"]=d.exports},"11cf":function(t,e,r){},1619:function(t,e,r){"use strict";r.d(e,"a",(function(){return i})),r.d(e,"b",(function(){return s}));const i=t=>String(t).replace(/\B(?=(\d{3})+(?!\d))/g,","),s=t=>{const e=0==t.length?"":t.length>9?t.slice(0,5)+"*****":t.length>6?t.slice(0,3)+"*****":t.slice(0,2)+"****";return e}},"4bae":function(t,e,r){"use strict";var i=function(){var t=this;t._self._c;return t._m(0)},s=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"loading"},[e("div",{staticClass:"loading__inner"},[e("div",{staticClass:"loading__content"},[e("span",{staticClass:"spinner"})])])])}],n={},l=n,a=(r("d17a"),r("2877")),o=Object(a["a"])(l,i,s,!1,null,"3da7921f",null);e["a"]=o.exports},"4fdb":function(t,e,r){"use strict";var i=function(){var t=this,e=t._self._c;return e("tr",[t._l(t.titles,(function(r,i){return e("td",{key:i,class:[t.clickField==r.key?"filter-tab":"","itemRequireMemo"==r.key||"requireMemo"==r.key?"memo":""],attrs:{"data-title":r.value}},["orderDate"==r.key||"createdAt"==r.key?e("span",[t._v(" "+t._s(t._f("timeFormat")(t.item[r.key]))+" ")]):"ordererId"==r.key?e("span",[t._v(" "+t._s(t._f("emptyValue")(t.secretUserId))+" ")]):"itemId"==r.key?e("span",[t._v(" "+t._s(t._f("itemName")(t.item[r.key]))+" ")]):e("span",[t._v(" "+t._s(t._f("emptyValue")(t.item[r.key]))+" ")])])})),"/ready"==t.$route.path?e("td",{attrs:{"data-title":"발송상태"}},[e("TableBtn",{staticClass:"btn-send",attrs:{result:t.sendResult},on:{click:t.sendMailAndPostOrder}})],1):t._e(),"/ready"==t.$route.path?e("td",{attrs:{"data-title":"송장등록"}},[e("TableBtn",{staticClass:"btn-post btn-outline",attrs:{result:t.postResult},on:{click:function(e){return t.postOrder("onlyPost")}},scopedSlots:t._u([{key:"success",fn:function(){return[t._v("등록성공")]},proxy:!0},{key:"error",fn:function(){return[t._v("등록실패")]},proxy:!0},{key:"default",fn:function(){return[t._v("송장만 등록")]},proxy:!0}],null,!1,134527393)})],1):t._e()],2)},s=[],n=r("f8b7"),l=r("1619"),a=function(){var t=this,e=t._self._c;return e("button",{class:t.result,attrs:{disabled:""!==t.result||t.loading},on:{click:t.clickBtn}},[t.loading?e("span",{staticClass:"spinner"}):e("span",["success"==t.result?t._t("success",(function(){return[t._v("발송성공")]})):"error"==t.result?t._t("error",(function(){return[t._v("발송실패")]})):t._t("default",(function(){return[t._v("발송하기")]}))],2)])},o=[],c={props:{result:{type:String,default:""}},data(){return{loading:!1}},watch:{result(t){""!==t&&(this.loading=!1)}},methods:{clickBtn(){this.loading=!0,this.$emit("click")}}},d=c,u=(r("6480"),r("2877")),h=Object(u["a"])(d,a,o,!1,null,"ba600ede",null),m=h.exports,p={components:{TableBtn:m},props:{titles:{type:Array},item:{type:Object},clickField:{type:String},sendAll:{type:Boolean}},data(){return{sendResult:"",postResult:""}},watch:{sendAll(t){1==t&&this.sendMailAndPostOrder()}},computed:{secretUserId(){const t=this.item.ordererId;return Object(l["b"])(t)},validateEmail(){const t=/.+@.+\..+/;return t.test(this.item.itemRequireMemo)},mailData(){const t=/\S+@+\S+\.+[a-zA-Z]{2,3}/;let e=this.validateEmail?this.item.itemRequireMemo.match(t)[0]:this.item.ordererEmail;return{store:"텐바이텐/영로그",items:[{itemId:this.item.itemId,itemOption:this.item.itemOption}],toEmail:e}},dispatchData(){return{orderSerial:this.item.orderSerial,detailIdx:this.item.detailIdx,details:{ordererId:this.item.ordererId,detailIdx:this.item.detailIdx,ordererName:this.item.ordererName,toEmail:this.mailData.toEmail,itemId:this.item.itemId,itemOption:this.item.itemOption,requireMemo:this.item.itemRequireMemo,ordererPhone:this.item.ordererCellPhone,ordererEmail:this.item.ordererEmail,orderDate:this.item.orderDate,price:this.item.price}}}},methods:{async postOrder(t){const{data:e}=await Object(n["b"])(this.dispatchData);"SUCCESS"==e.code?"onlyPost"==t?this.postResult="success":this.sendResult="success":this.postResult="error"},async sendMailAndPostOrder(){try{const{status:t}=await Object(n["h"])(this.mailData);200==t&&this.postOrder()}catch(t){this.sendResult="error"}}}},y=p,f=Object(u["a"])(y,i,s,!1,null,null,null);e["a"]=f.exports},6480:function(t,e,r){"use strict";r("88d7")},"88d7":function(t,e,r){},a2b2:function(t,e,r){"use strict";var i=function(){var t=this,e=t._self._c;return e("tr",[t._l(t.titles,(function(r,i){return e("th",{key:i,class:[t.clickField==r.key?"filter-tab":"",r.key]},[t._v(" "+t._s(r.value)+" "),"itemOption"!==r.key?e("BtnAngle",{attrs:{toggle:"desc"!=t.orderBy},nativeOn:{click:function(e){return t.$emit("sort-list",r.key)}}}):t._e()],1)})),"/ready"==t.$route.path?e("th",[t._v("발송상태")]):t._e(),"/ready"==t.$route.path?e("th",[t._v("송장등록")]):t._e()],2)},s=[],n=r("b264"),l={components:{BtnAngle:n["a"]},props:{titles:{type:Array},orderBy:{type:String},clickField:{type:String}}},a=l,o=r("2877"),c=Object(o["a"])(a,i,s,!1,null,null,null);e["a"]=c.exports},b264:function(t,e,r){"use strict";var i=function(){var t=this,e=t._self._c;return e("span",{staticClass:"btn-angle"},[t.toggle?e("i",{staticClass:"uil uil-angle-up"}):e("i",{staticClass:"uil uil-angle-down"})])},s=[],n={props:{toggle:{type:Boolean,default:!1}}},l=n,a=r("2877"),o=Object(a["a"])(l,i,s,!1,null,null,null);e["a"]=o.exports},d17a:function(t,e,r){"use strict";r("11cf")},f5f2:function(t,e,r){"use strict";var i=function(){var t=this,e=t._self._c;return e("div",["/ready"==t.$route.path?e("button",{staticClass:"btn-send-all",on:{click:t.clickSendAll}},[t._v(" 모두 메일 발송하기 💌 ")]):t._e(),e("div",{staticClass:"table-container",attrs:{id:"no-more-tables"}},[e("table",[e("thead",[e("TableTitle",{attrs:{titles:t.tableTitles,"click-field":t.clickField,"order-by":t.orderBy},on:{"sort-list":t.sortList}})],1),e("tbody",t._l(t.orderList,(function(r,i){return e("OrderItem",{key:i,attrs:{item:r,titles:t.tableTitles,clickField:t.clickField,"send-all":t.sendAll}})})),1)])])])},s=[],n=r("a2b2"),l=r("4fdb"),a=r("9b65"),o={components:{TableTitle:n["a"],OrderItem:l["a"]},props:{items:{type:Array}},data(){return{sendAll:!1,tableTitles:[{key:"orderDate",value:"주문일"},{key:"ordererId",value:"아이디"},{key:"ordererName",value:"이름"},{key:"ordererCellPhone",value:"휴대폰"},{key:"ordererEmail",value:"이메일"},{key:"itemId",value:"상품명"},{key:"itemOption",value:"옵션"},{key:"itemRequireMemo",value:"주문메모"}],orderBy:"desc",clickField:""}},computed:{orderList:{get(){return this.items},set(){}}},methods:{clickSendAll(){console.log("sendAll"),this.sendAll=!0},sortList(t){this.clickField=t,this.orderBy="desc"==this.orderBy?"asc":"desc",this.orderList=Object(a["b"])(this.orderList,t,this.orderBy)}}},c=o,d=r("2877"),u=Object(d["a"])(c,i,s,!1,null,null,null);e["a"]=u.exports}}]);
//# sourceMappingURL=chunk-ce6001ac.0f0cb440.js.map