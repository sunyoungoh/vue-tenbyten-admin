(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29e30460"],{"0ac0":function(t,e,i){},"13d5":function(t,e,i){"use strict";var r=i("23e7"),s=i("d58f").left,n=i("a640"),o=i("2d00"),l=i("605d"),a=n("reduce"),c=!l&&o>79&&o<83;r({target:"Array",proto:!0,forced:!a||c},{reduce:function(t){var e=arguments.length;return s(this,t,e,e>1?arguments[1]:void 0)}})},1619:function(t,e,i){"use strict";i.d(e,"a",(function(){return r})),i.d(e,"b",(function(){return s}));const r=t=>String(t).replace(/\B(?=(\d{3})+(?!\d))/g,","),s=t=>{const e=0==t.length?"":t.length>9?t.slice(0,5)+"*****":t.length>6?t.slice(0,3)+"*****":t.slice(0,2)+"****";return e}},"249e":function(t,e,i){"use strict";i("0ac0")},"4bae":function(t,e,i){"use strict";var r=function(){var t=this;t._self._c;return t._m(0)},s=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"loading"},[e("div",{staticClass:"loading__inner"},[e("div",{staticClass:"loading__content"},[e("span",{staticClass:"spinner"})])])])}],n={},o=n,l=(i("249e"),i("2877")),a=Object(l["a"])(o,r,s,!1,null,"6f98f3c8",null);e["a"]=a.exports},"605d":function(t,e,i){var r=i("c6b6"),s=i("da84");t.exports="process"==r(s.process)},6895:function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t._self._c;return e("section",{staticClass:"container sales"},[t.loading?e("LoadingSpinner"):[e("TitleMonth"),e("h1",{class:t.highlighter},[t._v(t._s(t.title))]),t.orderListCount>0?e("div",{staticClass:"content"},[e("TopSales"),e("SalesList")],1):t._e()]],2)},s=[],n=(i("13d5"),i("4bae")),o=i("942a"),l=function(){var t=this,e=t._self._c;return e("div",{staticClass:"top3-sales"},t._l(t.topSales,(function(i,r){return e("div",{key:r},[i.products.length?e("div",{staticClass:"sales-item",class:"1"==i.top?"top1":""},[e("div",{staticClass:"pop-num"},[t._v(t._s(i.top))]),e("p",{staticClass:"item-name"},[t._v(t._s(t._f("itemName")(i.products[0])))]),t.topDupli?e("p",{staticClass:"item-name"},[t._v(" "+t._s(t._f("itemName")(i.products[1]))+" ")]):t._e(),e("div",{staticClass:"sales-count"},[t._v(t._s(i.count)+"개")])]):t._e()])})),0)},a=[],c={computed:{orderList(){return this.$store.getters.monthlyOrderList},topDupli(){let t=this.topSales.map(t=>t.products).some(t=>t.length>1);return t},topSales(){let t=this.orderList.map(t=>t.itemId),e={};t.forEach(t=>{e[t]=(e[t]||0)+1});let i=Object.entries(e).sort((t,e)=>e[1]-t[1]),r=[...new Set(i.map(t=>t[1]))],s=[...new Array(3)].map(()=>[]);return s=s.map((t,e)=>({top:e+1,products:i.filter(t=>r[e]==t[1]).map(t=>t[0]),count:r[e]})),s}}},u=c,d=i("2877"),h=Object(d["a"])(u,l,a,!1,null,null,null),m=h.exports,p=function(){var t=this,e=t._self._c;return e("div",{staticClass:"table-container sales"},[e("table",[e("thead",[e("TableTitle",{attrs:{titles:t.tableTitles,"click-field":t.clickField,"order-by":t.orderBy},on:{"sort-list":t.sortList}})],1),e("tbody",t._l(t.orderListByCount,(function(i,r){return e("SalesItem",{key:r,attrs:{item:i,clickField:t.clickField,titles:t.tableTitles}})})),1)])])},f=[],y=i("3965"),_=i("a2b2"),g=function(){var t=this,e=t._self._c;return e("tr",t._l(t.titles,(function(i,r){return e("td",{key:r,class:t.clickField==i.key?"filter-tab":""},["orderDate"==i.key||"createdAt"==i.key?e("span",[t._v(" "+t._s(t._f("timeFormat")(t.item[i.key]))+" ")]):"itemId"==i.key?e("span",[t._v(" "+t._s(t._f("itemName")(t.item[i.key]))+" ")]):e("span",[t._v(" "+t._s(t._f("emptyValue")(t.item[i.key]))+" ")])])})),0)},v=[],b={props:{titles:{type:Array},item:{type:Object},clickField:{type:String}}},k=b,C=Object(d["a"])(k,g,v,!1,null,null,null),L=C.exports,O={components:{TableTitle:_["a"],SalesItem:L},data(){return{tableTitles:[{key:"item",value:"상품명(옵션)"},{key:"count",value:"판매수"}],orderBy:"desc",clickField:""}},watch:{month(){this.clickField=""},search(t){this.clickField=t?"ordererName":""}},computed:{orderList(){return this.$store.getters.monthlyOrderList},month(){return this.$store.state.order.month},orderListByCount:{get(){let t=this.orderList,e={};t.forEach(t=>{let i=t.itemOption?`${Object(y["a"])(t.itemId)} (${t.itemOption})`:""+Object(y["a"])(t.itemId);e[i]=(e[i]||0)+1});let i=Object.entries(e).sort((t,e)=>e[1]-t[1]),r=i.map(t=>({item:t[0],count:t[1]}));return r.sort((t,e)=>t.count>e.count?-1:t.count<e.count?1:t.item<e.item?-1:t.item>e.item?1:void 0),r},set(){}}},methods:{fetchList(){let t=this.orderList,e={};t.forEach(t=>{let i=t.itemOption?`${Object(y["a"])(t.itemId)} (${t.itemOption})`:""+Object(y["a"])(t.itemId);e[i]=(e[i]||0)+1});let i=Object.entries(e).sort((t,e)=>e[1]-t[1]),r=i.map(t=>({item:t[0],count:t[1]}));r.sort((t,e)=>t.count>e.count?-1:t.count<e.count?1:t.item<e.item?-1:t.item>e.item?1:void 0)},sortList(t){this.clickField=t,this.orderBy="desc"==this.orderBy?"asc":"desc","item"==t&&(this.orderListByCount=this.orderListByCount.sort((t,e)=>{if("asc"==this.orderBy){if(t.item<e.item)return-1;if(t.item>e.item)return 1}else{if(t.item<e.item)return 1;if(t.item>e.item)return-1}return t.count>e.count?-1:t.count<e.count?1:void 0})),"count"==t&&(this.orderListByCount=this.orderListByCount.sort((t,e)=>{if("asc"==this.orderBy){if(t.count>e.count)return 1;if(t.count<e.count)return-1}else{if(t.count>e.count)return-1;if(t.count<e.count)return 1}return t.item<e.item?-1:t.item>e.item?1:void 0}))}}},$=O,w=Object(d["a"])($,p,f,!1,null,null,null),x=w.exports,B=i("1619"),T={components:{LoadingSpinner:n["a"],TitleMonth:o["a"],TopSales:m,SalesList:x},async mounted(){await this.$store.dispatch("fetchOrderList","sales")},computed:{loading(){return this.$store.state.order.loading},year(){return this.$store.state.order.year},month(){return this.$store.state.order.month},monthText(){return this.$store.getters.monthText},orderList(){return this.$store.getters.monthlyOrderList},orderListCount(){return this.orderList.length},orderAmount(){let t=this.orderList.map(t=>t.price).reduce((t,e)=>t+e);return t},highlighter(){return this.orderListCount>0?"highlighter highlighter__yellow":"highlighter highlighter__grey"},title(){return this.orderListCount>0?`${this.monthText} 판매금액은 ${Object(B["a"])(this.orderAmount)}원입니다! 💰`:this.monthText+" 판매금액은 0원입니다. 🥲 "}}},j=T,S=Object(d["a"])(j,r,s,!1,null,"48ce91f3",null);e["default"]=S.exports},"942a":function(t,e,i){"use strict";var r=function(){var t=this,e=t._self._c;return e("h1",{staticClass:"month-title"},[e("button",{on:{click:t.prevMonth}},[e("i",{staticClass:"uil uil-angle-left-b"})]),e("span",[t._v(t._s(t.nowDate))]),[t.isTodayMonth?e("button",[e("i",{staticClass:"uil uil-angle-right-b disabled"})]):e("button",{on:{click:t.nextMonth}},[e("i",{staticClass:"uil uil-angle-right-b"})])]],2)},s=[],n={computed:{month(){return this.$store.state.order.month},year(){return this.$store.state.order.year},isTodayMonth(){return this.month==(new Date).getMonth()&&this.year==(new Date).getFullYear()},nowDate(){return`${this.year}.${this.month+1}`}},methods:{prevMonth(){this.$store.commit("setPrevMonth"),this.$emit("fetch-data")},nextMonth(){this.$store.commit("setNextMonth"),this.$emit("fetch-data")}}},o=n,l=i("2877"),a=Object(l["a"])(o,r,s,!1,null,null,null);e["a"]=a.exports},a2b2:function(t,e,i){"use strict";var r=function(){var t=this,e=t._self._c;return e("tr",[t._l(t.titles,(function(i,r){return e("th",{key:r,class:[t.clickField==i.key?"filter-tab":"",i.key],on:{click:function(e){return t.$emit("sort-list",i.key)}}},[t._v(" "+t._s(i.value)+" "),"itemOption"!==i.key?e("BtnAngle",{attrs:{toggle:("desc"!=t.orderBy||t.clickField!=i.key)&&t.clickField===i.key}}):t._e()],1)})),"/ready"==t.$route.path?e("th",[t._v("발송상태")]):t._e(),"/ready"==t.$route.path?e("th",[t._v("송장등록")]):t._e()],2)},s=[],n=i("b264"),o={components:{BtnAngle:n["a"]},props:{titles:{type:Array},orderBy:{type:String},clickField:{type:String}}},l=o,a=i("2877"),c=Object(a["a"])(l,r,s,!1,null,null,null);e["a"]=c.exports},a640:function(t,e,i){"use strict";var r=i("d039");t.exports=function(t,e){var i=[][t];return!!i&&r((function(){i.call(null,e||function(){return 1},1)}))}},b264:function(t,e,i){"use strict";var r=function(){var t=this,e=t._self._c;return e("span",{staticClass:"btn-angle"},[t.toggle?e("i",{staticClass:"uil uil-angle-up"}):e("i",{staticClass:"uil uil-angle-down"})])},s=[],n={props:{toggle:{type:Boolean,default:!1}}},o=n,l=i("2877"),a=Object(l["a"])(o,r,s,!1,null,null,null);e["a"]=a.exports},d58f:function(t,e,i){var r=i("59ed"),s=i("7b0b"),n=i("44ad"),o=i("07fa"),l=TypeError,a=function(t){return function(e,i,a,c){r(i);var u=s(e),d=n(u),h=o(u),m=t?h-1:0,p=t?-1:1;if(a<2)while(1){if(m in d){c=d[m],m+=p;break}if(m+=p,t?m<0:h<=m)throw l("Reduce of empty array with no initial value")}for(;t?m>=0:h>m;m+=p)m in d&&(c=i(c,d[m],m,u));return c}};t.exports={left:a(!1),right:a(!0)}}}]);
//# sourceMappingURL=chunk-29e30460.93c6309c.js.map