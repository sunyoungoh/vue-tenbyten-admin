(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3a8f5034"],{"02c1":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t._self._c;return e("section",{staticClass:"container"},[t.loading?e("LoadingSpinner"):t._e(),e("div",{staticClass:"order-list-container"},[e("h1",{class:t.title.css},[t._v(t._s(t.title.text))]),t.orderListCount>0?e("OrderList",{attrs:{items:t.orderList}}):t._e()],1)],1)},a=[],r=i("b059"),l=i("d76c"),o=i("f8b7"),n={components:{OrderList:r["a"],LoadingSpinner:l["a"]},async mounted(){const{data:t}=await Object(o["e"])();this.loading=!1,this.orderList=t.outPutValue,this.title=this.orderListCount>0?{text:`배송 준비 중인 주문이 ${this.orderListCount}건 있습니다! 📦`,css:"highlighter highlighter__yellow"}:{text:"배송 준비 중인 주문이 없습니다 🥲 ",css:"highlighter highlighter__grey"}},data(){return{loading:!0,orderList:[],title:[]}},computed:{orderListCount(){return this.orderList.length}}},d=n,m=i("2877"),c=Object(m["a"])(d,s,a,!1,null,"7c4480d3",null);e["default"]=c.exports},b059:function(t,e,i){"use strict";var s=function(){var t=this,e=t._self._c;return e("div",[e("button",{staticClass:"btn-send-all",on:{click:t.clickSendAll}},[t._v(" 모두 메일 발송하기 💌 ")]),e("div",{staticClass:"table-container",attrs:{id:"no-more-tables"}},[e("table",[e("thead",[e("tr",[e("th",[t._v("주문일")]),e("th",[t._v("아이디")]),e("th",[t._v("이름")]),e("th",[t._v("휴대폰")]),e("th",[t._v("이메일")]),e("th",{staticClass:"item-name"},[t._v("상품명")]),e("th",{staticClass:"item-option"},[t._v("옵션")]),e("th",[t._v("주문메모")]),"/ready"==t.$route.path?e("th",[t._v("발송상태")]):t._e()])]),e("tbody",t._l(t.items,(function(i,s){return e("OrderItem",{key:s,attrs:{item:i,"send-all":t.sendAll}})})),1)])])])},a=[],r=function(){var t=this,e=t._self._c;return e("tr",[e("td",{staticClass:"order-date",attrs:{"data-title":"주문일"}},[t._v(t._s(t.orderDate))]),e("td",{attrs:{"data-title":"아이디"}},[t._v(t._s(t._f("emptyValue")(t.item["UserId"])))]),e("td",{attrs:{"data-title":"이름"}},[t._v(t._s(t.item.ordererName))]),e("td",{attrs:{"data-title":"휴대폰"}},[t._v(t._s(t.item.ordererCellPhone))]),e("td",{attrs:{"data-title":"이메일"}},[t._v(t._s(t.item.ordererEmail))]),e("td",{staticClass:"item-name",attrs:{"data-title":"상품명"}},[t._v(" "+t._s(t._f("itemName")(this.item["details"][0]["itemId"]))+" ")]),e("td",{staticClass:"item-option",attrs:{"data-title":"옵션"}},[t._v(" "+t._s(t._f("emptyValue")(t.itemOptionName))+" ")]),e("td",{attrs:{"data-title":"주문메모"}},[t._v(t._s(t._f("emptyValue")(t.itemRequireMemo)))]),"/ready"==t.$route.path?e("td",{staticClass:"btns_post",attrs:{"data-title":"발송상태"}},[["none"==t.postResult&&0==t.loading?e("button",{staticClass:"btn_post-default",on:{click:t.sendMailAndPostOrder}},[t._v(" 발송하기 ")]):t._e(),1==t.loading?e("button",{staticClass:"btn_post-loading"},[t._v(" 발송 중.. ")]):["complete"==t.postResult?e("button",{staticClass:"btn_post-complete"},[t._v(" 발송완료 ")]):"fail"==t.postResult?e("button",{staticClass:"btn_post-fail"},[t._v(" 발송실패 ")]):t._e()]]],2):t._e()])},l=[],o=i("f8b7"),n={props:{item:{type:Object},sendAll:{type:Boolean}},data(){return{postResult:"none",loading:!1}},watch:{sendAll(t){1==t&&this.sendMailAndPostOrder()}},computed:{validateEmail(){const t=/.+@.+\..+/;return t.test(this.item["details"][0]["RequireMemo"])},orderDate(){let t=this.item["orderDate"].split("-");return t[0].substr(2)+"/"+t[1]+"/"+t[2]},itemOptionName(){let t=this.item["details"][0]["itemOptionName"];if(""!==t){let e=this.item["details"][0]["itemOptionName"].indexOf("꼭");-1!==e&&(t=this.item["details"][0]["itemOptionName"].substring(0,e-1))}return t},itemRequireMemo(){return this.item["details"][0]["RequireMemo"].trim()},mailData(){let t=this.validateEmail?this.item["details"][0]["RequireMemo"]:this.item.ordererEmail;return{store:"텐바이텐/영로그",items:[{itemId:this.item["details"][0]["itemId"],itemOptionName:this.itemOptionName}],toEmail:t}},dispatchData(){return{orderSerial:this.item["OrderSerial"],detailIdx:this.item["details"][0]["DetailIdx"],details:{ordererId:this.item["UserId"],ordererName:this.item.ordererName,toEmail:this.mailData.toEmail,itemId:this.item["details"][0]["itemId"],itemOption:this.itemOptionName,requireMemo:this.itemRequireMemo,ordererPhone:this.item.ordererCellPhone,ordererEmail:this.item.ordererEmail,orderDate:new Date(this.item["orderDate"]),price:Number(this.item["details"][0]["NotCouponPrice"])}}}},methods:{async postOrder(){const{data:t}=await Object(o["a"])(this.dispatchData);"SUCCESS"==t.code?(this.loading=!1,this.postResult="complete"):this.postResult="fail"},async sendMailAndPostOrder(){var t;let e={};this.loading=!0;try{e=await Object(o["f"])(this.mailData),console.log("메일 전송 완료")}catch(i){console.log(i),this.loading=!1,400==i.response.status&&(this.postResult="fail")}200==(null===(t=e)||void 0===t?void 0:t.status)&&this.postOrder()}}},d=n,m=i("2877"),c=Object(m["a"])(d,r,l,!1,null,null,null),u=c.exports,h={components:{OrderItem:u},props:{items:{type:Array}},data(){return{sendAll:!1}},methods:{clickSendAll(){console.log("sendAll"),this.sendAll=!0}}},_=h,p=Object(m["a"])(_,s,a,!1,null,null,null);e["a"]=p.exports},bd23:function(t,e,i){},d76c:function(t,e,i){"use strict";var s=function(){var t=this;t._self._c;return t._m(0)},a=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"loading"},[e("div",{staticClass:"loading__inner"},[e("div",{staticClass:"loading__content"},[e("span",{staticClass:"spinner"})])])])}],r={},l=r,o=(i("e294"),i("2877")),n=Object(o["a"])(l,s,a,!1,null,"2af1ac9b",null);e["a"]=n.exports},e294:function(t,e,i){"use strict";i("bd23")}}]);
//# sourceMappingURL=chunk-3a8f5034.eef9f43a.js.map