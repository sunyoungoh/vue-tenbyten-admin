(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-561b82e4"],{"020b":function(t,e,s){"use strict";var r=function(){var t=this,e=t._self._c;return e("tr",[t._l(t.titles,(function(s,r){return e("th",{key:r,class:[t.clickField==s.key?"filter-tab":"",s.key]},[t._v(" "+t._s(s.value)+" "),"itemOption"!==s.key?e("BtnAngle",{attrs:{toggle:"desc"!=t.orderBy},nativeOn:{click:function(e){return t.$emit("sort-list",s.key)}}}):t._e()],1)})),"/ready"==t.$route.path?e("th",[t._v("발송상태")]):t._e()],2)},i=[],a=s("6280"),n={components:{BtnAngle:a["a"]},props:{titles:{type:Array},orderBy:{type:String},clickField:{type:String}}},l=n,o=s("2877"),c=Object(o["a"])(l,r,i,!1,null,null,null);e["a"]=c.exports},"0586":function(t,e,s){"use strict";s("cf63")},1619:function(t,e,s){"use strict";s.d(e,"a",(function(){return r})),s.d(e,"b",(function(){return i}));const r=t=>String(t).replace(/\B(?=(\d{3})+(?!\d))/g,","),i=t=>{const e=0==t.length?"":t.length>9?t.slice(0,5)+"*****":t.length>6?t.slice(0,3)+"*****":t.slice(0,2)+"****";return e}},"164b":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t._self._c;return e("section",{staticClass:"container order"},[t.loading?e("LoadingSpinner"):[e("h1",{class:t.title.css},[t._v(t._s(t.title.text))]),t.orderListCount>0?e("OrderList",{staticClass:"content",attrs:{items:t.orderList}}):t._e()]],2)},i=[],a=s("d76c"),n=s("b059"),l={components:{LoadingSpinner:a["a"],OrderList:n["a"]},async mounted(){await this.$store.dispatch("fetchOrderList","order"),this.title=this.orderListCount>0?{text:`신규 주문이 ${this.orderListCount}건 있습니다! 🥳`,css:"highlighter highlighter__yellow"}:{text:"신규 주문이 없습니다 🥲 ",css:"highlighter highlighter__grey"}},data(){return{title:[]}},computed:{loading(){return this.$store.state.order.loading},orderList(){return this.$store.state.order.orderList},orderListCount(){return this.orderList.length}}},o=l,c=s("2877"),d=Object(c["a"])(o,r,i,!1,null,"3ed08af4",null);e["default"]=d.exports},3965:function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));const r=t=>{switch("string"==typeof t&&(t=Number(t)),t){case 5033569:return"2023 심플 플래너";case 5033568:return"2023 모던 플래너";case 5033567:return"2023 타임라인 플래너";case 5033566:return"2023 먼슬리&데일리 플래너";case 5033565:return"31DAYS 플래너";case 5033562:return"3년 5년 다이어리";case 5033564:return"세로형 인덱스 노트";case 5033563:return"가로형 인덱스 노트";case 5033560:return"독서노트";case 5033558:return"드라마노트";case 5033557:return"먼슬리 트래커북";case 5033561:return"180 베이직 노트";case 5033559:return"180 체커보드 노트";case 5068583:return"레시피북";default:return""}}},6280:function(t,e,s){"use strict";var r=function(){var t=this,e=t._self._c;return e("span",{staticClass:"btn-angle"},[t.toggle?e("i",{staticClass:"uil uil-angle-up"}):e("i",{staticClass:"uil uil-angle-down"})])},i=[],a={props:{toggle:{type:Boolean,default:!1}}},n=a,l=s("2877"),o=Object(l["a"])(n,r,i,!1,null,null,null);e["a"]=o.exports},"9b65":function(t,e,s){"use strict";s.d(e,"a",(function(){return i})),s.d(e,"b",(function(){return l}));var r=s("3965");const i=(t,e,s)=>"asc"==s?t.sort((t,s)=>new Date(t[e])-new Date(s[e])):t.sort((t,s)=>new Date(s[e])-new Date(t[e])),a=(t,e,s)=>"asc"==s?t.sort((t,s)=>t[e]<s[e]?-1:1):t.sort((t,s)=>t[e]>s[e]?-1:1),n=(t,e,s)=>"asc"==s?t.sort((t,s)=>Object(r["a"])(t[e])<Object(r["a"])(s[e])?-1:1):t.sort((t,s)=>Object(r["a"])(t[e])>Object(r["a"])(s[e])?-1:1),l=(t,e,s)=>{let r;return"orderDate"==e||"createdAt"==e?i(t,e,s):"itemId"==e?n(t,e,s):a(t,e,s),r}},"9d57":function(t,e,s){"use strict";var r=function(){var t=this,e=t._self._c;return e("tr",[t._l(t.titles,(function(s,r){return e("td",{key:r,class:t.clickField==s.key?"filter-tab":"",attrs:{"data-title":s.value}},["orderDate"==s.key||"createdAt"==s.key?e("span",[t._v(" "+t._s(t._f("timeFormat")(t.item[s.key]))+" ")]):"ordererId"==s.key?e("span",[t._v(" "+t._s(t._f("emptyValue")(t.secretUserId))+" ")]):"itemId"==s.key?e("span",[t._v(" "+t._s(t._f("itemName")(t.item[s.key]))+" ")]):e("span",[t._v(" "+t._s(t._f("emptyValue")(t.item[s.key]))+" ")])])})),"/ready"==t.$route.path?e("td",{attrs:{"data-title":"발송상태"}},[e("button",{staticClass:"btn-post",class:t.postResult.css,attrs:{disabled:""!==t.postResult.status||t.loading},on:{click:t.sendMailAndPostOrder}},[t.loading?e("span",{staticClass:"spinner"}):e("span",[t._v(" "+t._s(t.postResult.text)+" ")])])]):t._e()],2)},i=[],a=s("f8b7"),n=s("1619"),l={props:{titles:{type:Array},item:{type:Object},clickField:{type:String},sendAll:{type:Boolean}},data(){return{postResult:{status:"",text:"발송하기",css:""},loading:!1}},watch:{sendAll(t){1==t&&this.sendMailAndPostOrder()}},computed:{secretUserId(){const t=this.item.ordererId;return Object(n["b"])(t)},validateEmail(){const t=/.+@.+\..+/;return t.test(this.item.itemRequireMemo)},mailData(){const t=/\S+@+\S+\.+\S{3}/;let e=this.validateEmail?this.item.itemRequireMemo.match(t)[0]:this.item.ordererEmail;return{store:"텐바이텐/영로그",items:[{itemId:this.item.itemId,itemOption:this.item.itemOption}],toEmail:e}},dispatchData(){return{orderSerial:this.item.orderSerial,detailIdx:this.item.detailIdx,details:{ordererId:this.item.ordererId,ordererName:this.item.ordererName,toEmail:this.mailData.toEmail,itemId:this.item.itemId,itemOption:this.item.itemOption,requireMemo:this.item.itemRequireMemo,ordererPhone:this.item.ordererCellPhone,ordererEmail:this.item.ordererEmail,orderDate:this.item.orderDate,price:this.item.price}}}},methods:{async postOrder(){const{data:t}=await Object(a["b"])(this.dispatchData);console.log(t),"SUCCESS"==t.code?(this.loading=!1,this.postResult={status:"success",text:"발송완료",css:"btn_post-success"}):this.postResult={status:"fail",text:"발송실패",css:"btn_post-fail"}},async sendMailAndPostOrder(){var t;let e={};this.loading=!0;try{e=await Object(a["h"])(this.mailData),console.log("메일 전송 완료")}catch(s){console.log(s),this.loading=!1,400==s.response.status&&(this.postResult={status:"fail",text:"발송실패",css:"btn_post-fail"})}200==(null===(t=e)||void 0===t?void 0:t.status)&&this.postOrder()}}},o=l,c=(s("0586"),s("2877")),d=Object(c["a"])(o,r,i,!1,null,null,null);e["a"]=d.exports},b059:function(t,e,s){"use strict";var r=function(){var t=this,e=t._self._c;return e("div",["/ready"==t.$route.path?e("button",{staticClass:"btn-send-all",on:{click:t.clickSendAll}},[t._v(" 모두 메일 발송하기 💌 ")]):t._e(),e("div",{staticClass:"table-container",attrs:{id:"no-more-tables"}},[e("table",[e("thead",[e("TableTitle",{attrs:{titles:t.tableTitles,"click-field":t.clickField,"order-by":t.orderBy},on:{"sort-list":t.sortList}})],1),e("tbody",t._l(t.orderList,(function(s,r){return e("OrderItem",{key:r,attrs:{item:s,titles:t.tableTitles,clickField:t.clickField,"send-all":t.sendAll}})})),1)])])])},i=[],a=s("020b"),n=s("9d57"),l=s("9b65"),o={components:{TableTitle:a["a"],OrderItem:n["a"]},props:{items:{type:Array}},data(){return{sendAll:!1,tableTitles:[{key:"orderDate",value:"주문일"},{key:"ordererId",value:"아이디"},{key:"ordererName",value:"이름"},{key:"ordererCellPhone",value:"휴대폰"},{key:"ordererEmail",value:"이메일"},{key:"itemId",value:"상품명"},{key:"itemOption",value:"옵션"},{key:"itemRequireMemo",value:"주문메모"}],orderBy:"desc",clickField:""}},computed:{orderList:{get(){return this.items},set(){}}},methods:{clickSendAll(){console.log("sendAll"),this.sendAll=!0},sortList(t){this.clickField=t,this.orderBy="desc"==this.orderBy?"asc":"desc",this.orderList=Object(l["b"])(this.orderList,t,this.orderBy)}}},c=o,d=s("2877"),u=Object(d["a"])(c,r,i,!1,null,null,null);e["a"]=u.exports},bd23:function(t,e,s){},cf63:function(t,e,s){},d76c:function(t,e,s){"use strict";var r=function(){var t=this;t._self._c;return t._m(0)},i=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"loading"},[e("div",{staticClass:"loading__inner"},[e("div",{staticClass:"loading__content"},[e("span",{staticClass:"spinner"})])])])}],a={},n=a,l=(s("e294"),s("2877")),o=Object(l["a"])(n,r,i,!1,null,"2af1ac9b",null);e["a"]=o.exports},e294:function(t,e,s){"use strict";s("bd23")}}]);
//# sourceMappingURL=chunk-561b82e4.b834a0e1.js.map