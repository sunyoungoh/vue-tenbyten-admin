(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c0a45e48"],{"00ee":function(t,e,n){var s=n("b622"),i=s("toStringTag"),r={};r[i]="z",t.exports="[object z]"===String(r)},"0cb2":function(t,e,n){var s=n("e330"),i=n("7b0b"),r=Math.floor,a=s("".charAt),l=s("".replace),o=s("".slice),c=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,u=/\$([$&'`]|\d{1,2})/g;t.exports=function(t,e,n,s,d,p){var g=n+t.length,h=s.length,f=u;return void 0!==d&&(d=i(d),f=c),l(p,f,(function(i,l){var c;switch(a(l,0)){case"$":return"$";case"&":return t;case"`":return o(e,0,n);case"'":return o(e,g);case"<":c=d[o(l,1,-1)];break;default:var u=+l;if(0===u)return i;if(u>h){var p=r(u/10);return 0===p?i:p<=h?void 0===s[p-1]?a(l,1):s[p-1]+a(l,1):i}c=s[u-1]}return void 0===c?"":c}))}},"1ac6":function(t,e,n){},"44e7":function(t,e,n){var s=n("861d"),i=n("c6b6"),r=n("b622"),a=r("match");t.exports=function(t){var e;return s(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==i(t))}},"577e":function(t,e,n){var s=n("f5df"),i=String;t.exports=function(t){if("Symbol"===s(t))throw TypeError("Cannot convert a Symbol value to a string");return i(t)}},"5b81":function(t,e,n){"use strict";var s=n("23e7"),i=n("c65b"),r=n("e330"),a=n("1d80"),l=n("1626"),o=n("7234"),c=n("44e7"),u=n("577e"),d=n("dc4a"),p=n("90d8"),g=n("0cb2"),h=n("b622"),f=n("c430"),v=h("replace"),m=TypeError,_=r("".indexOf),b=r("".replace),w=r("".slice),y=Math.max,C=function(t,e,n){return n>t.length?-1:""===e?n:_(t,e,n)};s({target:"String",proto:!0},{replaceAll:function(t,e){var n,s,r,h,A,x,q,L,O,j=a(this),I=0,R=0,k="";if(!o(t)){if(n=c(t),n&&(s=u(a(p(t))),!~_(s,"g")))throw m("`.replaceAll` does not allow non-global regexes");if(r=d(t,v),r)return i(r,t,j,e);if(f&&n)return b(u(j),t,e)}h=u(j),A=u(t),x=l(e),x||(e=u(e)),q=A.length,L=y(1,q),I=C(h,A,0);while(-1!==I)O=x?u(e(A,I,h)):g(A,h,I,[],void 0,e),k+=w(h,R,I)+O,R=I+q,I=C(h,A,I+L);return R<h.length&&(k+=w(h,R)),k}})},6280:function(t,e,n){"use strict";var s=function(){var t=this,e=t._self._c;return e("span",{staticClass:"btn-angle"},[t.toggle?e("i",{staticClass:"uil uil-angle-up"}):e("i",{staticClass:"uil uil-angle-down"})])},i=[],r={props:{toggle:{type:Boolean,default:!1}}},a=r,l=n("2877"),o=Object(l["a"])(a,s,i,!1,null,null,null);e["a"]=o.exports},"7d1e":function(t,e,n){"use strict";n("1ac6")},"7d46":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t._self._c;return e("section",{staticClass:"container order"},[t.loading?e("LoadingSpinner"):[e("h1",{class:t.highlighter},[t._v(t._s(t.title))]),t.qnaListCount>0?e("div",{staticClass:"content"},[e("QnaList",{attrs:{items:t.qnaList}})],1):t._e()]],2)},i=[],r=n("f8b7"),a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"qna-list"},t._l(t.items,(function(t,n){return e("QnaItem",{key:n,attrs:{item:t}})})),1)},l=[],o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"qna-item"},[e("div",{staticClass:"qna-item_title"},[t._v(" ["+t._s(t.item.kind)+"] "+t._s(t._f("itemName")(t.item.itemId))+" "),e("QnaLabel",{attrs:{isAnwser:t.isAnwser}})],1),e("div",{staticClass:"question-info"},[t.item.username?e("span",[t._v(" "+t._s(t.item.username)+" | ")]):t._e(),t.secretUserId?e("span",[t._v(" "+t._s(t.secretUserId)+" | ")]):t._e(),e("span",[t._v(" "+t._s(t.item.orderId))]),e("span",[t._v(" "+t._s(t._f("timeFormat")(t.item.qnaDate)))]),e("div",{staticClass:"contents",domProps:{innerHTML:t._s(t.contents)}})]),e("div",[e("button",{staticClass:"btn-anwser",class:t.item.isAnwser?"btn-outline":"",on:{click:function(e){t.toggle=!t.toggle}}},[t.item.isAnwser?e("span",[t._v(" 답변보기 "),e("BtnAngle",{attrs:{toggle:t.toggle}})],1):e("span",[t._v("답변하기")])])]),t.toggle?e("div",{staticClass:"anwser-info"},[e("div",{staticClass:"anwser-top"},[e("div",{staticClass:"anwser-date"},[e("span",{staticClass:"emoji"},[t._v("👩🏻‍💻")]),t._v(" "+t._s(t.replyUser)+" "),t.isAnwser?e("span",[t._v(" | "+t._s(t._f("timeFormat")(t.replyDate)))]):t._e()]),t.item.isAnwser||"success"==t.anwserResult?e("QnaSubmitBtn",{attrs:{loading:t.loading},nativeOn:{click:function(e){return t.clickEdit.apply(null,arguments)}}},[t.edit?e("span",[t._v(" 수정완료 ")]):e("span",[t._v(" 수정하기 ")])]):t._e(),t.item.isAnwser||""!=t.anwserResult?t._e():e("QnaSubmitBtn",{attrs:{loading:t.loading},nativeOn:{click:function(e){return t.anwserQna.apply(null,arguments)}}},[e("span",[t._v("등록하기")])])],1),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.replyContents,expression:"replyContents"}],ref:"textarea",staticClass:"reply-contents",attrs:{rows:"7",disabled:""!==t.item.replyContents&&!t.edit||t.loading||"success"==t.anwserResult&&!t.edit},domProps:{value:t.replyContents},on:{input:[function(e){e.target.composing||(t.replyContents=e.target.value)},function(e){t.inputReplyContents=e.target.value}]}})]):t._e()])},c=[],u=(n("5b81"),function(){var t=this,e=t._self._c;return e("div",{staticClass:"label",class:t.color},[t.isAnwser?e("span",[t._v("답변완료")]):e("span",[t._v("답변대기")])])}),d=[],p={props:{isAnwser:{Boolean:Boolean}},computed:{color(){return this.isAnwser?"label-success":"label-danger"}}},g=p,h=n("2877"),f=Object(h["a"])(g,u,d,!1,null,null,null),v=f.exports,m=n("6280"),_=function(){var t=this,e=t._self._c;return e("button",{staticClass:"btn-outline"},[t.loading?e("span",{staticClass:"spinner"}):[t._t("default",(function(){return[t.edit?e("span",[t._v(" 수정완료 ")]):e("span",[t._v(" 수정하기 ")])]}))]],2)},b=[],w={props:{loading:{type:Boolean,default:!1}}},y=w,C=(n("7d1e"),Object(h["a"])(y,_,b,!1,null,"26e7b247",null)),A=C.exports,x={components:{QnaLabel:v,BtnAngle:m["a"],QnaSubmitBtn:A},props:{item:{type:Object}},data(){return{toggle:!1,edit:!1,loading:!1,anwserResult:"",inputReplyContents:""}},computed:{replyDate:{get(){return""==this.anwserResult?this.item.replyDate:new Date},set(){}},isAnwser:{get(){return""!=this.anwserResult||this.item.isAnwser},set(){}},replyContents:{get(){let t;return""!==this.item.replyContents&&(t=this.item.replyContents),""!==this.inputReplyContents&&(t=this.inputReplyContents),t},set(){}},replyUser(){return this.item.replyUser?this.item.replyUser:this.$store.state.user.brandId},secretUserId(){const t=this.item.userId;let e=0==t.length?"":t.length>9?t.slice(0,5)+"*****":t.length>6?t.slice(0,3)+"*****":t.slice(0,2)+"****";return e},contents(){return this.item.contents.replaceAll("\r\n","<br/>")},anwserData(){return{qnaid:this.item.qnaId,replyeuser:this.replyUser,replyecontent:this.inputReplyContents}}},methods:{clickEdit(){this.edit=!this.edit,this.edit||this.anwserQna()},async anwserQna(){this.loading=!0;try{const{data:t}=await Object(r["a"])(this.anwserData);console.log(t),this.anwserResult="success",this.isAnwser=!0}catch(t){this.anwserResult="error",console.log(t)}this.loading=!1}}},q=x,L=Object(h["a"])(q,o,c,!1,null,null,null),O=L.exports,j={components:{QnaItem:O},props:{items:{type:[Array,Object]}}},I=j,R=Object(h["a"])(I,a,l,!1,null,null,null),k=R.exports,S=n("d76c"),Q={components:{LoadingSpinner:S["a"],QnaList:k},async mounted(){this.loading=!0;const{data:t}=await Object(r["f"])(),e=t.outPutValue.map(t=>{let e=!!t.replycontents;return{qnaId:t.qnaid,qnaDate:t.regdate,userId:t.userid,username:t.고객명,orderId:t.주문번호,kind:t.kind,contents:t.contents,itemId:t.itemid,isAnwser:e,replyDate:t.replydate,replyUser:t.replyuser,replyContents:t.replycontents}});e.length>0&&(this.qnaList=e.reverse()),this.loading=!1},data(){return{loading:!1,qnaList:[]}},computed:{qnaListCount(){return this.qnaList.length},noAnwserList(){return this.qnaList.filter(t=>!t.isAnwser)},title(){let t;return t=0==this.qnaListCount?"최근 일주일간 문의가 없었습니다. 😊 ":this.noAnwserList.length?`미답변 문의가 ${this.noAnwserList.length}건 있습니다! 🤔`:`일주일간 총 ${this.qnaListCount}건의 문의가 있었습니다! 😊`,t},highlighter(){return this.qnaListCount>0?"highlighter highlighter__yellow":"highlighter highlighter__grey"}}},U=Q,B=Object(h["a"])(U,s,i,!1,null,null,null);e["default"]=B.exports},"90d8":function(t,e,n){var s=n("c65b"),i=n("1a2d"),r=n("3a9b"),a=n("ad6d"),l=RegExp.prototype;t.exports=function(t){var e=t.flags;return void 0!==e||"flags"in l||i(t,"flags")||!r(l,t)?e:s(a,t)}},ad6d:function(t,e,n){"use strict";var s=n("825a");t.exports=function(){var t=s(this),e="";return t.hasIndices&&(e+="d"),t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.unicodeSets&&(e+="v"),t.sticky&&(e+="y"),e}},bd23:function(t,e,n){},d76c:function(t,e,n){"use strict";var s=function(){var t=this;t._self._c;return t._m(0)},i=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"loading"},[e("div",{staticClass:"loading__inner"},[e("div",{staticClass:"loading__content"},[e("span",{staticClass:"spinner"})])])])}],r={},a=r,l=(n("e294"),n("2877")),o=Object(l["a"])(a,s,i,!1,null,"2af1ac9b",null);e["a"]=o.exports},e294:function(t,e,n){"use strict";n("bd23")},f5df:function(t,e,n){var s=n("00ee"),i=n("1626"),r=n("c6b6"),a=n("b622"),l=a("toStringTag"),o=Object,c="Arguments"==r(function(){return arguments}()),u=function(t,e){try{return t[e]}catch(n){}};t.exports=s?r:function(t){var e,n,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=u(e=o(t),l))?n:c?r(e):"Object"==(s=r(e))&&i(e.callee)?"Arguments":s}}}]);
//# sourceMappingURL=chunk-c0a45e48.79dbb0e1.js.map