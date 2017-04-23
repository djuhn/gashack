!function($,e,t,n){"use strict";$.fn.state=function(e){var a=$(this),i=a.selector||"",o="ontouchstart"in t.documentElement,s=(new Date).getTime(),c=[],r=arguments[0],l="string"==typeof r,u=[].slice.call(arguments,1),d;return a.each(function(){var t=$.isPlainObject(e)?$.extend(!0,{},$.fn.state.settings,e):$.extend({},$.fn.state.settings),o=t.error,f=t.metadata,v=t.className,g=t.namespace,b=t.states,x=t.text,m="."+g,p=g+"-module",h=$(this),T=this,y=h.data(p),w;w={initialize:function(){w.verbose("Initializing module"),t.automatic&&w.add.defaults(),t.context&&""!==i?$(t.context).on(i,"mouseenter"+m,w.change.text).on(i,"mouseleave"+m,w.reset.text).on(i,"click"+m,w.toggle.state):h.on("mouseenter"+m,w.change.text).on("mouseleave"+m,w.reset.text).on("click"+m,w.toggle.state),w.instantiate()},instantiate:function(){w.verbose("Storing instance of module",w),y=w,h.data(p,w)},destroy:function(){w.verbose("Destroying previous module",y),h.off(m).removeData(p)},refresh:function(){w.verbose("Refreshing selector cache"),h=$(T)},add:{defaults:function(){var a=e&&$.isPlainObject(e.states)?e.states:{};$.each(t.defaults,function(e,i){w.is[e]!==n&&w.is[e]()&&(w.verbose("Adding default states",e,T),$.extend(t.states,i,a))})}},is:{active:function(){return h.hasClass(v.active)},loading:function(){return h.hasClass(v.loading)},inactive:function(){return!h.hasClass(v.active)},state:function(e){return v[e]===n?!1:h.hasClass(v[e])},enabled:function(){return!h.is(t.filter.active)},disabled:function(){return h.is(t.filter.active)},textEnabled:function(){return!h.is(t.filter.text)},button:function(){return h.is(".button:not(a, .submit)")},input:function(){return h.is("input")},progress:function(){return h.is(".ui.progress")}},allow:function(e){w.debug("Now allowing state",e),b[e]=!0},disallow:function(e){w.debug("No longer allowing",e),b[e]=!1},allows:function(e){return b[e]||!1},enable:function(){h.removeClass(v.disabled)},disable:function(){h.addClass(v.disabled)},setState:function(e){w.allows(e)&&h.addClass(v[e])},removeState:function(e){w.allows(e)&&h.removeClass(v[e])},toggle:{state:function(){var e,a;if(w.allows("active")&&w.is.enabled()){if(w.refresh(),$.fn.api!==n)if(e=h.api("get request"),a=h.api("was cancelled"))w.debug("API Request cancelled by beforesend"),t.activateTest=function(){return!1},t.deactivateTest=function(){return!1};else if(e)return void w.listenTo(e);w.change.state()}}},listenTo:function(e){w.debug("API request detected, waiting for state signal",e),e&&(x.loading&&w.update.text(x.loading),$.when(e).then(function(){"resolved"==e.state()?(w.debug("API request succeeded"),t.activateTest=function(){return!0},t.deactivateTest=function(){return!0}):(w.debug("API request failed"),t.activateTest=function(){return!1},t.deactivateTest=function(){return!1}),w.change.state()}))},change:{state:function(){w.debug("Determining state change direction"),w.is.inactive()?w.activate():w.deactivate(),t.sync&&w.sync(),t.onChange.call(T)},text:function(){w.is.textEnabled()&&(w.is.disabled()?(w.verbose("Changing text to disabled text",x.hover),w.update.text(x.disabled)):w.is.active()?x.hover?(w.verbose("Changing text to hover text",x.hover),w.update.text(x.hover)):x.deactivate&&(w.verbose("Changing text to deactivating text",x.deactivate),w.update.text(x.deactivate)):x.hover?(w.verbose("Changing text to hover text",x.hover),w.update.text(x.hover)):x.activate&&(w.verbose("Changing text to activating text",x.activate),w.update.text(x.activate)))}},activate:function(){t.activateTest.call(T)&&(w.debug("Setting state to active"),h.addClass(v.active),w.update.text(x.active),t.onActivate.call(T))},deactivate:function(){t.deactivateTest.call(T)&&(w.debug("Setting state to inactive"),h.removeClass(v.active),w.update.text(x.inactive),t.onDeactivate.call(T))},sync:function(){w.verbose("Syncing other buttons to current state"),w.is.active()?a.not(h).state("activate"):a.not(h).state("deactivate")},get:{text:function(){return t.selector.text?h.find(t.selector.text).text():h.html()},textFor:function(e){return x[e]||!1}},flash:{text:function(e,n,a){var i=w.get.text();w.debug("Flashing text message",e,n),e=e||t.text.flash,n=n||t.flashDuration,a=a||function(){},w.update.text(e),setTimeout(function(){w.update.text(i),a.call(T)},n)}},reset:{text:function(){var e=x.active||h.data(f.storedText),t=x.inactive||h.data(f.storedText);w.is.textEnabled()&&(w.is.active()&&e?(w.verbose("Resetting active text",e),w.update.text(e)):t&&(w.verbose("Resetting inactive text",e),w.update.text(t)))}},update:{text:function(e){var n=w.get.text();e&&e!==n?(w.debug("Updating text",e),t.selector.text?h.data(f.storedText,e).find(t.selector.text).text(e):h.data(f.storedText,e).html(e)):w.debug("Text is already set, ignoring update",e)}},setting:function(e,a){if(w.debug("Changing setting",e,a),$.isPlainObject(e))$.extend(!0,t,e);else{if(a===n)return t[e];t[e]=a}},internal:function(e,t){if($.isPlainObject(e))$.extend(!0,w,e);else{if(t===n)return w[e];w[e]=t}},debug:function(){t.debug&&(t.performance?w.performance.log(arguments):(w.debug=Function.prototype.bind.call(console.info,console,t.name+":"),w.debug.apply(console,arguments)))},verbose:function(){t.verbose&&t.debug&&(t.performance?w.performance.log(arguments):(w.verbose=Function.prototype.bind.call(console.info,console,t.name+":"),w.verbose.apply(console,arguments)))},error:function(){w.error=Function.prototype.bind.call(console.error,console,t.name+":"),w.error.apply(console,arguments)},performance:{log:function(e){var n,a,i;t.performance&&(n=(new Date).getTime(),i=s||n,a=n-i,s=n,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":a})),clearTimeout(w.performance.timer),w.performance.timer=setTimeout(w.performance.display,500)},display:function(){var e=t.name+":",a=0;s=!1,clearTimeout(w.performance.timer),$.each(c,function(e,t){a+=t["Execution Time"]}),e+=" "+a+"ms",i&&(e+=" '"+i+"'"),(console.group!==n||console.table!==n)&&c.length>0&&(console.groupCollapsed(e),console.table?console.table(c):$.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(e,t,a){var i=y,s,c,r;return t=t||u,a=T||a,"string"==typeof e&&i!==n&&(e=e.split(/[\. ]/),s=e.length-1,$.each(e,function(t,a){var r=t!=s?a+e[t+1].charAt(0).toUpperCase()+e[t+1].slice(1):e;if($.isPlainObject(i[r])&&t!=s)i=i[r];else{if(i[r]!==n)return c=i[r],!1;if(!$.isPlainObject(i[a])||t==s)return i[a]!==n?(c=i[a],!1):(w.error(o.method,e),!1);i=i[a]}})),$.isFunction(c)?r=c.apply(a,t):c!==n&&(r=c),$.isArray(d)?d.push(r):d!==n?d=[d,r]:r!==n&&(d=r),c}},l?(y===n&&w.initialize(),w.invoke(r)):(y!==n&&y.invoke("destroy"),w.initialize())}),d!==n?d:this},$.fn.state.settings={name:"State",debug:!1,verbose:!1,namespace:"state",performance:!0,onActivate:function(){},onDeactivate:function(){},onChange:function(){},activateTest:function(){return!0},deactivateTest:function(){return!0},automatic:!0,sync:!1,flashDuration:1e3,filter:{text:".loading, .disabled",active:".disabled"},context:!1,error:{beforeSend:"The before send function has cancelled state change",method:"The method you called is not defined."},metadata:{promise:"promise",storedText:"stored-text"},className:{active:"active",disabled:"disabled",error:"error",loading:"loading",success:"success",warning:"warning"},selector:{text:!1},defaults:{input:{disabled:!0,loading:!0,active:!0},button:{disabled:!0,loading:!0,active:!0},progress:{active:!0,success:!0,warning:!0,error:!0}},states:{active:!0,disabled:!0,error:!0,loading:!0,success:!0,warning:!0},text:{disabled:!1,flash:!1,hover:!1,active:!1,inactive:!1,activate:!1,deactivate:!1}}}(jQuery,window,document);