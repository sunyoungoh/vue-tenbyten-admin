(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5620271e"],{"020b":function(t,e,s){"use strict";var r=function(){var t=this,e=t._self._c;return e("tr",[t._l(t.titles,(function(s,r){return e("th",{key:r,class:[t.clickField==s.key?"filter-tab":"",s.key]},[t._v(" "+t._s(s.value)+" "),"itemOption"!==s.key?e("BtnAngle",{attrs:{toggle:"desc"!=t.orderBy},nativeOn:{click:function(e){return t.$emit("sort-list",s.key)}}}):t._e()],1)})),"/ready"==t.$route.path?e("th",[t._v("발송상태")]):t._e()],2)},i=[],a=s("6280"),n={components:{BtnAngle:a["a"]},props:{titles:{type:Array},orderBy:{type:String},clickField:{type:String}}},o=n,l=s("2877"),c=Object(l["a"])(o,r,i,!1,null,null,null);e["a"]=c.exports},3965:function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));const r=t=>{switch("string"==typeof t&&(t=Number(t)),t){case 5033569:return"2023 심플 플래너";case 5033568:return"2023 모던 플래너";case 5033567:return"2023 타임라인 플래너";case 5033566:return"2023 먼슬리&데일리 플래너";case 5033565:return"31DAYS 플래너";case 5033562:return"3년 5년 다이어리";case 5033564:return"세로형 인덱스 노트";case 5033563:return"가로형 인덱스 노트";case 5033560:return"독서노트";case 5033558:return"드라마노트";case 5033557:return"먼슬리 트래커북";case 5033561:return"180 베이직 노트";case 5033559:return"180 체커보드 노트";case 5068583:return"레시피북";default:return""}}},"4ee4":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t._self._c;return e("section",{staticClass:"container"},[t.loading?e("LoadingSpinner"):[e("TitleMonth",{on:{"fetch-data":t.fetchData}}),e("h1",{class:t.highlighter},[t._v(t._s(t.title))]),t.orderListCount>0?e("div",{staticClass:"content"},[e("div",{staticClass:"input-wrap search-wrap"},[e("i",{staticClass:"uil uil-search search-icon"}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchInput,expression:"searchInput"}],attrs:{type:"text",placeholder:"이름을 입력하세요"},domProps:{value:t.searchInput},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchList.apply(null,arguments)},input:function(e){e.target.composing||(t.searchInput=e.target.value)}}}),e("button",{staticClass:"btn-search",on:{click:t.searchList}},[t._v("검색하기")])]),e("DeliveryList",{attrs:{items:t.orderList,search:t.search}})],1):t._e()]],2)},i=[],a=s("d76c"),n=s("e07b"),o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"table-container",attrs:{id:"no-more-tables"}},[e("table",[e("thead",[e("TableTitle",{attrs:{titles:t.tableTitles,"click-field":t.clickField,"order-by":t.orderBy},on:{"sort-list":t.sortList}})],1),e("tbody",t._l(t.orderList,(function(s,r){return e("OrderItem",{key:r,attrs:{item:s,titles:t.tableTitles,clickField:t.clickField}})})),1)])])},l=[],c=s("020b"),h=s("9d57"),u=s("9b65"),d={components:{TableTitle:c["a"],OrderItem:h["a"]},props:{items:{type:Array},search:{type:Boolean}},data(){return{tableTitles:[{key:"orderDate",value:"주문일"},{key:"createdAt",value:"발송일"},{key:"ordererId",value:"아이디"},{key:"ordererName",value:"이름"},{key:"toEmail",value:" 수신 이메일"},{key:"itemId",value:"상품명"},{key:"itemOption",value:"옵션"},{key:"requireMemo",value:"주문메모"}],orderBy:"desc",clickField:""}},watch:{month(){this.clickField=""},search(t){this.clickField=t?"ordererName":""}},computed:{month(){return this.$store.state.order.month},orderList:{get(){return this.items},set(){}}},methods:{sortList(t){this.clickField=t,this.orderBy="desc"==this.orderBy?"asc":"desc",this.orderList=Object(u["a"])(this.orderList,t,this.orderBy)}}},m=d,p=s("2877"),f=Object(p["a"])(m,o,l,!1,null,null,null),y=f.exports,g={components:{LoadingSpinner:a["a"],TitleMonth:n["a"],DeliveryList:y},async mounted(){await this.$store.dispatch("fetchOrderList","delivery"),this.fetchData()},data(){return{searchInput:"",search:!1,title:"",orderList:[]}},computed:{loading(){return this.$store.state.order.loading},year(){return this.$store.state.order.year},month(){return this.$store.state.order.month},monthText(){return this.$store.getters.monthText},originOrderList(){return this.$store.getters.monthlyOrderList},orderListCount(){return this.orderList.length},highlighter(){return this.orderList.length>0?"highlighter highlighter__yellow":"highlighter highlighter__grey"}},methods:{fetchData(){this.fetchOrderList(),this.fetchTitle()},fetchOrderList(){this.orderList=this.originOrderList},fetchTitle(){this.title=this.orderListCount>0?`${this.monthText}엔 ${this.orderListCount}건의 메일을 전송했습니다! 💌`:this.monthText+"엔 전송한 메일이 없습니다 🥲 "},searchList(){this.fetchOrderList(),this.orderList=this.orderList.filter(t=>t.ordererName.includes(this.searchInput)),this.searchInput?(this.search=!0,this.title=this.orderListCount>0?`${this.searchInput}님께 ${this.orderList.length}건의 메일을 전송했습니다! 💌`:this.searchInput+"님께 전송한 메일이 없습니다. 🥲"):(this.search=!1,this.fetchTitle())}}},b=g,_=Object(p["a"])(b,r,i,!1,null,"304caaf3",null);e["default"]=_.exports},6280:function(t,e,s){"use strict";var r=function(){var t=this,e=t._self._c;return e("span",{staticClass:"btn-angle"},[t.toggle?e("i",{staticClass:"uil uil-angle-up"}):e("i",{staticClass:"uil uil-angle-down"})])},i=[],a={props:{toggle:{type:Boolean,default:!1}}},n=a,o=s("2877"),l=Object(o["a"])(n,r,i,!1,null,null,null);e["a"]=l.exports},"7f8b":function(t,e,s){},8992:function(t,e,s){"use strict";s("7f8b")},"9b65":function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));var r=s("3965");const i=(t,e,s)=>"asc"==s?t.sort((t,s)=>new Date(t[e])-new Date(s[e])):t.sort((t,s)=>new Date(s[e])-new Date(t[e])),a=(t,e,s)=>"asc"==s?t.sort((t,s)=>t[e]<s[e]?-1:1):t.sort((t,s)=>t[e]>s[e]?-1:1),n=(t,e,s)=>"asc"==s?t.sort((t,s)=>Object(r["a"])(t[e])<Object(r["a"])(s[e])?-1:1):t.sort((t,s)=>Object(r["a"])(t[e])>Object(r["a"])(s[e])?-1:1),o=(t,e,s)=>{let r;return"orderDate"==e||"createdAt"==e?i(t,e,s):"itemId"==e?n(t,e,s):a(t,e,s),r}},"9d57":function(t,e,s){"use strict";var r=function(){var t=this,e=t._self._c;return e("tr",[t._l(t.titles,(function(s,r){return e("td",{key:r,class:t.clickField==s.key?"filter-tab":"",attrs:{"data-title":s.value}},["orderDate"==s.key||"createdAt"==s.key?e("span",[t._v(" "+t._s(t._f("timeFormat")(t.item[s.key]))+" ")]):"ordererId"==s.key?e("span",[t._v(" "+t._s(t._f("emptyValue")(t.secretUserId))+" ")]):"itemId"==s.key?e("span",[t._v(" "+t._s(t._f("itemName")(t.item[s.key]))+" ")]):e("span",[t._v(" "+t._s(t._f("emptyValue")(t.item[s.key]))+" ")])])})),"/ready"==t.$route.path?e("td",{attrs:{"data-title":"발송상태"}},[e("button",{staticClass:"btn-post",class:t.postResult.css,attrs:{disabled:""!==t.postResult.status||t.loading},on:{click:t.sendMailAndPostOrder}},[t.loading?e("span",{staticClass:"spinner"}):e("span",[t._v(" "+t._s(t.postResult.text)+" ")])])]):t._e()],2)},i=[],a=s("f8b7"),n={props:{titles:{type:Array},item:{type:Object},clickField:{type:String},sendAll:{type:Boolean}},data(){return{postResult:{status:"",text:"발송하기",css:""},loading:!1}},watch:{sendAll(t){1==t&&this.sendMailAndPostOrder()}},computed:{secretUserId(){const t=this.item.ordererId;let e=0==t.length?"":t.length>9?t.slice(0,5)+"*****":t.length>6?t.slice(0,3)+"*****":t.slice(0,2)+"****";return e},validateEmail(){const t=/.+@.+\..+/;return t.test(this.item.itemRequireMemo)},mailData(){const t=/\S+@+\S+\.+\S+/;let e=this.validateEmail?this.item.itemRequireMemo.match(t)[0]:this.item.ordererEmail;return{store:"텐바이텐/영로그",items:[{itemId:this.item.itemId,itemOption:this.item.itemOption}],toEmail:e}},dispatchData(){return{orderSerial:this.item.orderSerial,detailIdx:this.item.detailIdx,details:{ordererId:this.item.ordererId,ordererName:this.item.ordererName,toEmail:this.mailData.toEmail,itemId:this.item.itemId,itemOption:this.item.itemOption,requireMemo:this.item.itemRequireMemo,ordererPhone:this.item.ordererCellPhone,ordererEmail:this.item.ordererEmail,orderDate:this.item.orderDate,price:this.item.price}}}},methods:{async postOrder(){const{data:t}=await Object(a["a"])(this.dispatchData);console.log(t),"SUCCESS"==t.code?(this.loading=!1,this.postResult={status:"success",text:"발송완료",css:"btn_post-success"}):this.postResult={status:"fail",text:"발송실패",css:"btn_post-fail"}},async sendMailAndPostOrder(){var t;let e={};this.loading=!0;try{e=await Object(a["g"])(this.mailData),console.log("메일 전송 완료")}catch(s){console.log(s),this.loading=!1,400==s.response.status&&(this.postResult={status:"fail",text:"발송실패",css:"btn_post-fail"})}200==(null===(t=e)||void 0===t?void 0:t.status)&&this.postOrder()}}},o=n,l=(s("8992"),s("2877")),c=Object(l["a"])(o,r,i,!1,null,null,null);e["a"]=c.exports},bd23:function(t,e,s){},d76c:function(t,e,s){"use strict";var r=function(){var t=this;t._self._c;return t._m(0)},i=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"loading"},[e("div",{staticClass:"loading__inner"},[e("div",{staticClass:"loading__content"},[e("span",{staticClass:"spinner"})])])])}],a={},n=a,o=(s("e294"),s("2877")),l=Object(o["a"])(n,r,i,!1,null,"2af1ac9b",null);e["a"]=l.exports},e07b:function(t,e,s){"use strict";var r=function(){var t=this,e=t._self._c;return e("h1",{staticClass:"month-title"},[e("button",{on:{click:t.beforeMonth}},[e("i",{staticClass:"uil uil-angle-left-b"})]),e("span",[t._v(t._s(t.nowDate))]),[t.isTodayMonth?e("button",[e("i",{staticClass:"uil uil-angle-right-b disabled"})]):e("button",{on:{click:t.afterMonth}},[e("i",{staticClass:"uil uil-angle-right-b"})])]],2)},i=[],a={computed:{month(){return this.$store.state.order.month},year(){return this.$store.state.order.year},isTodayMonth(){return this.month==(new Date).getMonth()&&this.year==(new Date).getFullYear()},nowDate(){return`${this.year}.${this.month+1}`}},methods:{beforeMonth(){0==this.month?(this.$store.commit("prevYear"),this.$store.commit("setMonth",11)):this.$store.commit("prevMonth"),this.$emit("fetch-data")},afterMonth(){11==this.month?(this.$store.commit("nextYear"),this.$store.commit("setMonth",0)):this.$store.commit("nextMonth"),this.$emit("fetch-data")}}},n=a,o=s("2877"),l=Object(o["a"])(n,r,i,!1,null,null,null);e["a"]=l.exports},e294:function(t,e,s){"use strict";s("bd23")}}]);
//# sourceMappingURL=chunk-5620271e.6fd49499.js.map