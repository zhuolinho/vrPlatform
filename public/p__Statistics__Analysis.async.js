(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{GuOy:function(a,t,e){a.exports={iconGroup:"antd-pro-pages-statistics-analysis-iconGroup",rankingList:"antd-pro-pages-statistics-analysis-rankingList",rankingItemNumber:"antd-pro-pages-statistics-analysis-rankingItemNumber",active:"antd-pro-pages-statistics-analysis-active",rankingItemTitle:"antd-pro-pages-statistics-analysis-rankingItemTitle",salesExtra:"antd-pro-pages-statistics-analysis-salesExtra",currentDate:"antd-pro-pages-statistics-analysis-currentDate",salesCard:"antd-pro-pages-statistics-analysis-salesCard",salesBar:"antd-pro-pages-statistics-analysis-salesBar",salesRank:"antd-pro-pages-statistics-analysis-salesRank",salesCardExtra:"antd-pro-pages-statistics-analysis-salesCardExtra",salesTypeRadio:"antd-pro-pages-statistics-analysis-salesTypeRadio",offlineCard:"antd-pro-pages-statistics-analysis-offlineCard",twoColLayout:"antd-pro-pages-statistics-analysis-twoColLayout",trendText:"antd-pro-pages-statistics-analysis-trendText",rankingTitle:"antd-pro-pages-statistics-analysis-rankingTitle",salesExtraWrap:"antd-pro-pages-statistics-analysis-salesExtraWrap"}},hPyv:function(a,t,e){"use strict";e.r(t);var n,s,i,r=e("2Taf"),c=e.n(r),l=e("vZ4D"),o=e.n(l),p=e("l4Ni"),u=e.n(p),d=e("ujKo"),h=e.n(d),g=e("MhPg"),y=e.n(g),f=e("q1tI"),m=e.n(f),k=e("MuoO"),v=e("lh+i"),b=e.n(v),w=function(a){function t(){return c()(this,t),u()(this,h()(t).apply(this,arguments))}return y()(t,a),o()(t,[{key:"render",value:function(){var a=this.props,t=a.contentWidth,e=a.children,n="".concat(b.a.main);return"Fixed"===t&&(n="".concat(b.a.main," ").concat(b.a.wide)),m.a.createElement("div",{className:n},e)}}]),t}(f["PureComponent"]),D=Object(k["connect"])(function(a){var t=a.setting;return{contentWidth:t.contentWidth}})(w),P=e("+n12"),C=e("GuOy"),E=e.n(C),x=e("xqX8"),T=m.a.lazy(function(){return Promise.all([e.e(0),e.e(16)]).then(e.bind(null,"OVfm"))}),O=m.a.lazy(function(){return Promise.all([e.e(0),e.e(17)]).then(e.bind(null,"6KMz"))}),R=(n=Object(k["connect"])(function(a){var t=a.chart,e=a.loading;return{chart:t,loading:e.effects["chart/fetch"]}}),n((i=function(a){function t(){var a,e;c()(this,t);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return e=u()(this,(a=h()(t)).call.apply(a,[this].concat(s))),e.state={rangePickerValue:Object(P["b"])("year")},e.handleRangePickerChange=function(a){var t=e.props.dispatch;e.setState({rangePickerValue:a}),t({type:"chart/fetchSalesData"})},e.selectDate=function(a){var t=e.props.dispatch;e.setState({rangePickerValue:Object(P["b"])(a)}),t({type:"chart/fetchSalesData"})},e.isActive=function(a){var t=e.state.rangePickerValue,n=Object(P["b"])(a);return t[0]&&t[1]&&t[0].isSame(n[0],"day")&&t[1].isSame(n[1],"day")?E.a.currentDate:""},e}return y()(t,a),o()(t,[{key:"componentDidMount",value:function(){var a=this.props.dispatch;this.reqRef=requestAnimationFrame(function(){a({type:"chart/fetch"})})}},{key:"componentWillUnmount",value:function(){var a=this.props.dispatch;a({type:"chart/clear"}),cancelAnimationFrame(this.reqRef),clearTimeout(this.timeoutId)}},{key:"render",value:function(){var a=this.state.rangePickerValue,t=this.props,e=t.loading,n=t.chart,s=n.visitData,i=n.salesData;return m.a.createElement(D,null,m.a.createElement(f["Suspense"],{fallback:m.a.createElement(x["default"],null)},m.a.createElement(T,{loading:e,visitData:s})),m.a.createElement(f["Suspense"],{fallback:null},m.a.createElement(O,{rangePickerValue:a,salesData:i,isActive:this.isActive,handleRangePickerChange:this.handleRangePickerChange,loading:e,selectDate:this.selectDate})))}}]),t}(f["Component"]),s=i))||s);t["default"]=R},"lh+i":function(a,t,e){a.exports={main:"antd-pro-components-page-header-wrapper-grid-content-main",wide:"antd-pro-components-page-header-wrapper-grid-content-wide"}}}]);