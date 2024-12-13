(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();var D,fe;class nt extends Error{}nt.prototype.name="InvalidTokenError";function Hs(n){return decodeURIComponent(atob(n).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function zs(n){let t=n.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return Hs(t)}catch{return atob(t)}}function Be(n,t){if(typeof n!="string")throw new nt("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=n.split(".")[e];if(typeof s!="string")throw new nt(`Invalid token specified: missing part #${e+1}`);let i;try{i=zs(s)}catch(r){throw new nt(`Invalid token specified: invalid base64 for part #${e+1} (${r.message})`)}try{return JSON.parse(i)}catch(r){throw new nt(`Invalid token specified: invalid json for part #${e+1} (${r.message})`)}}const Ds="mu:context",Yt=`${Ds}:change`;class Vs{constructor(t,e){this._proxy=Fs(t,e)}get value(){return this._proxy}set value(t){Object.assign(this._proxy,t)}apply(t){this.value=t(this.value)}}class We extends HTMLElement{constructor(t){super(),console.log("Constructing context provider",this),this.context=new Vs(t,this),this.style.display="contents"}attach(t){return this.addEventListener(Yt,t),t}detach(t){this.removeEventListener(Yt,t)}}function Fs(n,t){return new Proxy(n,{get:(s,i,r)=>{if(i==="then")return;const o=Reflect.get(s,i,r);return console.log(`Context['${i}'] => `,o),o},set:(s,i,r,o)=>{const l=n[i];console.log(`Context['${i.toString()}'] <= `,r);const a=Reflect.set(s,i,r,o);if(a){let u=new CustomEvent(Yt,{bubbles:!0,cancelable:!0,composed:!0});Object.assign(u,{property:i,oldValue:l,value:r}),t.dispatchEvent(u)}else console.log(`Context['${i}] was not set to ${r}`);return a}})}function qs(n,t){const e=Ye(t,n);return new Promise((s,i)=>{if(e){const r=e.localName;customElements.whenDefined(r).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function Ye(n,t){const e=`[provides="${n}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return Ye(n,i.host)}class Bs extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function Ke(n="mu:message"){return(t,...e)=>t.dispatchEvent(new Bs(e,n))}class Qt{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function Ws(n){return t=>({...t,...n})}const Kt="mu:auth:jwt",Ge=class Je extends Qt{constructor(t,e){super((s,i)=>this.update(s,i),t,Je.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:s,redirect:i}=t[1];return e(Ks(s)),Dt(i);case"auth/signout":return e(Gs()),Dt(this._redirectForLogin);case"auth/redirect":return Dt(this._redirectForLogin,{next:window.location.href});default:const r=t[0];throw new Error(`Unhandled Auth message "${r}"`)}}};Ge.EVENT_TYPE="auth:message";let Ze=Ge;const Qe=Ke(Ze.EVENT_TYPE);function Dt(n,t={}){if(!n)return;const e=window.location.href,s=new URL(n,e);return Object.entries(t).forEach(([i,r])=>s.searchParams.set(i,r)),()=>{console.log("Redirecting to ",n),window.location.assign(s)}}class Ys extends We{get redirect(){return this.getAttribute("redirect")||void 0}constructor(){const t=W.authenticateFromLocalStorage();super({user:t,token:t.authenticated?t.token:void 0})}connectedCallback(){new Ze(this.context,this.redirect).attach(this)}}class lt{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(Kt),t}}class W extends lt{constructor(t){super();const e=Be(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new W(t);return localStorage.setItem(Kt,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(Kt);return t?W.authenticate(t):new lt}}function Ks(n){return Ws({user:W.authenticate(n),token:n})}function Gs(){return n=>{const t=n.user;return{user:t&&t.authenticated?lt.deauthenticate(t):t,token:""}}}function Js(n){return n.authenticated?{Authorization:`Bearer ${n.token||"NO_TOKEN"}`}:{}}function Zs(n){return n.authenticated?Be(n.token||""):{}}const ct=Object.freeze(Object.defineProperty({__proto__:null,AuthenticatedUser:W,Provider:Ys,User:lt,dispatch:Qe,headers:Js,payload:Zs},Symbol.toStringTag,{value:"Module"}));function wt(n,t,e){const s=n.target,i=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${n.type}:`,i),s.dispatchEvent(i),n.stopPropagation()}function Gt(n,t="*"){return n.composedPath().find(s=>{const i=s;return i.tagName&&i.matches(t)})}const Qs=Object.freeze(Object.defineProperty({__proto__:null,originalTarget:Gt,relay:wt},Symbol.toStringTag,{value:"Module"}));function Xe(n,...t){const e=n.map((i,r)=>r?[t[r-1],i]:[i]).flat().join("");let s=new CSSStyleSheet;return s.replaceSync(e),s}const Xs=new DOMParser;function L(n,...t){const e=t.map(l),s=n.map((a,u)=>{if(u===0)return[a];const f=e[u-1];return f instanceof Node?[`<ins id="mu-html-${u-1}"></ins>`,a]:[f,a]}).flat().join(""),i=Xs.parseFromString(s,"text/html"),r=i.head.childElementCount?i.head.children:i.body.children,o=new DocumentFragment;return o.replaceChildren(...r),e.forEach((a,u)=>{if(a instanceof Node){const f=o.querySelector(`ins#mu-html-${u}`);if(f){const d=f.parentNode;d==null||d.replaceChild(a,f)}else console.log("Missing insertion point:",`ins#mu-html-${u}`)}}),o;function l(a,u){if(a===null)return"";switch(typeof a){case"string":return me(a);case"bigint":case"boolean":case"number":case"symbol":return me(a.toString());case"object":if(a instanceof Node||a instanceof DocumentFragment)return a;if(Array.isArray(a)){const f=new DocumentFragment,d=a.map(l);return f.replaceChildren(...d),f}return new Text(a.toString());default:return new Comment(`[invalid parameter of type "${typeof a}"]`)}}}function me(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ut(n,t={mode:"open"}){const e=n.attachShadow(t),s={template:i,styles:r};return s;function i(o){const l=o.firstElementChild,a=l&&l.tagName==="TEMPLATE"?l:void 0;return a&&e.appendChild(a.content.cloneNode(!0)),s}function r(...o){e.adoptedStyleSheets=o}}D=class extends HTMLElement{constructor(){super(),this._state={},Ut(this).template(D.template).styles(D.styles),this.addEventListener("change",n=>{const t=n.target;if(t){const e=t.name,s=t.value;e&&(this._state[e]=s)}}),this.form&&this.form.addEventListener("submit",n=>{n.preventDefault(),wt(n,"mu-form:submit",this._state)})}set init(n){this._state=n||{},ti(this._state,this)}get form(){var n;return(n=this.shadowRoot)==null?void 0:n.querySelector("form")}},D.template=L`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style></style>
    </template>
  `,D.styles=Xe`
    form {
      display: grid;
      gap: var(--size-spacing-medium);
      grid-column: 1/-1;
      grid-template-columns:
        subgrid
        [start] [label] [input] [col2] [col3] [end];
    }
    ::slotted(label) {
      display: grid;
      grid-column: label / end;
      grid-template-columns: subgrid;
      gap: var(--size-spacing-medium);
    }
    ::slotted(fieldset) {
      display: contents;
    }
    button[type="submit"] {
      grid-column: input;
      justify-self: start;
    }
  `;function ti(n,t){const e=Object.entries(n);for(const[s,i]of e){const r=t.querySelector(`[name="${s}"]`);if(r){const o=r;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;case"date":o.value=i.toISOString().substr(0,10);break;default:o.value=i;break}}}return n}const ts=class es extends Qt{constructor(t){super((e,s)=>this.update(e,s),t,es.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];e(si(s,i));break}case"history/redirect":{const{href:s,state:i}=t[1];e(ii(s,i));break}}}};ts.EVENT_TYPE="history:message";let Xt=ts;class ge extends We{constructor(){super({location:document.location,state:{}}),this.addEventListener("click",t=>{const e=ei(t);if(e){const s=new URL(e.href);s.origin===this.context.value.location.origin&&(console.log("Preventing Click Event on <A>",t),t.preventDefault(),te(e,"history/navigate",{href:s.pathname+s.search}))}}),window.addEventListener("popstate",t=>{console.log("Popstate",t.state),this.context.value={location:document.location,state:t.state}})}connectedCallback(){new Xt(this.context).attach(this)}}function ei(n){const t=n.currentTarget,e=s=>s.tagName=="A"&&s.href;if(n.button===0)if(n.composed){const i=n.composedPath().find(e);return i||void 0}else{for(let s=n.target;s;s===t?null:s.parentElement)if(e(s))return s;return}}function si(n,t={}){return history.pushState(t,"",n),()=>({location:document.location,state:history.state})}function ii(n,t={}){return history.replaceState(t,"",n),()=>({location:document.location,state:history.state})}const te=Ke(Xt.EVENT_TYPE),ni=Object.freeze(Object.defineProperty({__proto__:null,HistoryProvider:ge,Provider:ge,Service:Xt,dispatch:te},Symbol.toStringTag,{value:"Module"}));class Y{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new ve(this._provider,t);this._effects.push(i),e(i)}else qs(this._target,this._contextLabel).then(i=>{const r=new ve(i,t);this._provider=i,this._effects.push(r),i.attach(o=>this._handleChange(o)),e(r)}).catch(i=>console.log(`Observer ${this._contextLabel}: ${i}`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),t.stopPropagation(),this._effects.forEach(e=>e.runEffect())}}class ve{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const ss=class is extends HTMLElement{constructor(){super(),this._state={},this._user=new lt,this._authObserver=new Y(this,"blazing:auth"),Ut(this).template(is.template),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;ri(i,this._state,e,this.authorization).then(r=>tt(r,this)).then(r=>{const o=`mu-rest-form:${s}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:r,url:i}});this.dispatchEvent(l)}).catch(r=>{const o="mu-rest-form:error",l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:r,url:i,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},tt(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&ye(this.src,this.authorization).then(e=>{this._state=e,tt(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&ye(this.src,this.authorization).then(i=>{this._state=i,tt(i,this)});break;case"new":s&&(this._state={},tt({},this));break}}};ss.observedAttributes=["src","new","action"];ss.template=L`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function ye(n,t){return fetch(n,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${n}:`,e))}function tt(n,t){const e=Object.entries(n);for(const[s,i]of e){const r=t.querySelector(`[name="${s}"]`);if(r){const o=r;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;default:o.value=i;break}}}return n}function ri(n,t,e="PUT",s={}){return fetch(n,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()})}const oi=class ns extends Qt{constructor(t,e){super(e,t,ns.EVENT_TYPE,!1)}};oi.EVENT_TYPE="mu:message";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt=globalThis,ee=bt.ShadowRoot&&(bt.ShadyCSS===void 0||bt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol(),_e=new WeakMap;let rs=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ee&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=_e.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&_e.set(e,t))}return t}toString(){return this.cssText}};const ai=n=>new rs(typeof n=="string"?n:n+"",void 0,se),li=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new rs(e,n,se)},ci=(n,t)=>{if(ee)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=bt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},be=ee?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ai(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:hi,defineProperty:di,getOwnPropertyDescriptor:ui,getOwnPropertyNames:pi,getOwnPropertySymbols:fi,getPrototypeOf:mi}=Object,K=globalThis,$e=K.trustedTypes,gi=$e?$e.emptyScript:"",we=K.reactiveElementPolyfillSupport,rt=(n,t)=>n,At={toAttribute(n,t){switch(t){case Boolean:n=n?gi:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ie=(n,t)=>!hi(n,t),Ae={attribute:!0,type:String,converter:At,reflect:!1,hasChanged:ie};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),K.litPropertyMetadata??(K.litPropertyMetadata=new WeakMap);let F=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ae){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&di(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=ui(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const l=i==null?void 0:i.call(this);r.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ae}static _$Ei(){if(this.hasOwnProperty(rt("elementProperties")))return;const t=mi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(rt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(rt("properties"))){const e=this.properties,s=[...pi(e),...fi(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(be(i))}else t!==void 0&&e.push(be(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ci(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:At).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const o=i.getPropertyOptions(r),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:At;this._$Em=r,this[r]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??ie)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,o]of i)o.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],o)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};F.elementStyles=[],F.shadowRootOptions={mode:"open"},F[rt("elementProperties")]=new Map,F[rt("finalized")]=new Map,we==null||we({ReactiveElement:F}),(K.reactiveElementVersions??(K.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Et=globalThis,xt=Et.trustedTypes,Ee=xt?xt.createPolicy("lit-html",{createHTML:n=>n}):void 0,os="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,as="?"+S,vi=`<${as}>`,I=document,ht=()=>I.createComment(""),dt=n=>n===null||typeof n!="object"&&typeof n!="function",ne=Array.isArray,yi=n=>ne(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",Vt=`[ 	
\f\r]`,et=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xe=/-->/g,Se=/>/g,T=RegExp(`>|${Vt}(?:([^\\s"'>=/]+)(${Vt}*=${Vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pe=/'/g,ke=/"/g,ls=/^(?:script|style|textarea|title)$/i,_i=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),st=_i(1),G=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Ce=new WeakMap,N=I.createTreeWalker(I,129);function cs(n,t){if(!ne(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ee!==void 0?Ee.createHTML(t):t}const bi=(n,t)=>{const e=n.length-1,s=[];let i,r=t===2?"<svg>":t===3?"<math>":"",o=et;for(let l=0;l<e;l++){const a=n[l];let u,f,d=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===et?f[1]==="!--"?o=xe:f[1]!==void 0?o=Se:f[2]!==void 0?(ls.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=T):f[3]!==void 0&&(o=T):o===T?f[0]===">"?(o=i??et,d=-1):f[1]===void 0?d=-2:(d=o.lastIndex-f[2].length,u=f[1],o=f[3]===void 0?T:f[3]==='"'?ke:Pe):o===ke||o===Pe?o=T:o===xe||o===Se?o=et:(o=T,i=void 0);const h=o===T&&n[l+1].startsWith("/>")?" ":"";r+=o===et?a+vi:d>=0?(s.push(u),a.slice(0,d)+os+a.slice(d)+S+h):a+S+(d===-2?l:h)}return[cs(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let Jt=class hs{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const l=t.length-1,a=this.parts,[u,f]=bi(t,e);if(this.el=hs.createElement(u,s),N.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=N.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(os)){const c=f[o++],h=i.getAttribute(d).split(S),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:r,name:p[2],strings:h,ctor:p[1]==="."?wi:p[1]==="?"?Ai:p[1]==="@"?Ei:Nt}),i.removeAttribute(d)}else d.startsWith(S)&&(a.push({type:6,index:r}),i.removeAttribute(d));if(ls.test(i.tagName)){const d=i.textContent.split(S),c=d.length-1;if(c>0){i.textContent=xt?xt.emptyScript:"";for(let h=0;h<c;h++)i.append(d[h],ht()),N.nextNode(),a.push({type:2,index:++r});i.append(d[c],ht())}}}else if(i.nodeType===8)if(i.data===as)a.push({type:2,index:r});else{let d=-1;for(;(d=i.data.indexOf(S,d+1))!==-1;)a.push({type:7,index:r}),d+=S.length-1}r++}}static createElement(t,e){const s=I.createElement("template");return s.innerHTML=t,s}};function J(n,t,e=n,s){var i,r;if(t===G)return t;let o=s!==void 0?(i=e.o)==null?void 0:i[s]:e.l;const l=dt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==l&&((r=o==null?void 0:o._$AO)==null||r.call(o,!1),l===void 0?o=void 0:(o=new l(n),o._$AT(n,e,s)),s!==void 0?(e.o??(e.o=[]))[s]=o:e.l=o),o!==void 0&&(t=J(n,o._$AS(n,t.values),o,s)),t}class $i{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??I).importNode(e,!0);N.currentNode=i;let r=N.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new mt(r,r.nextSibling,this,t):a.type===1?u=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(u=new xi(r,this,t)),this._$AV.push(u),a=s[++l]}o!==(a==null?void 0:a.index)&&(r=N.nextNode(),o++)}return N.currentNode=I,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class mt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,s,i){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.v=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),dt(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==G&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):yi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&dt(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Jt.createElement(cs(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===r)this._$AH.p(s);else{const o=new $i(r,this),l=o.u(this.options);o.p(s),this.T(l),this._$AH=o}}_$AC(t){let e=Ce.get(t.strings);return e===void 0&&Ce.set(t.strings,e=new Jt(t)),e}k(t){ne(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new mt(this.O(ht()),this.O(ht()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Nt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(r===void 0)t=J(this,t,e,0),o=!dt(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const l=t;let a,u;for(t=r[0],a=0;a<r.length-1;a++)u=J(this,l[s+a],e,a),u===G&&(u=this._$AH[a]),o||(o=!dt(u)||u!==this._$AH[a]),u===b?t=b:t!==b&&(t+=(u??"")+r[a+1]),this._$AH[a]=u}o&&!i&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class wi extends Nt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class Ai extends Nt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class Ei extends Nt{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??b)===G)return;const s=this._$AH,i=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==b&&(s===b||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class xi{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const Re=Et.litHtmlPolyfillSupport;Re==null||Re(Jt,mt),(Et.litHtmlVersions??(Et.litHtmlVersions=[])).push("3.2.0");const Si=(n,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const r=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new mt(t.insertBefore(ht(),r),r,void 0,e??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let B=class extends F{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=Si(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return G}};B._$litElement$=!0,B.finalized=!0,(fe=globalThis.litElementHydrateSupport)==null||fe.call(globalThis,{LitElement:B});const Oe=globalThis.litElementPolyfillSupport;Oe==null||Oe({LitElement:B});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pi={attribute:!0,type:String,converter:At,reflect:!1,hasChanged:ie},ki=(n=Pi,t,e)=>{const{kind:s,metadata:i}=e;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),r.set(e.name,n),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,n)},init(l){return l!==void 0&&this.P(o,void 0,n),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,n)}}throw Error("Unsupported decorator location: "+s)};function ds(n){return(t,e)=>typeof e=="object"?ki(n,t,e):((s,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function us(n){return ds({...n,state:!0,attribute:!1})}function Ci(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function Ri(n){throw new Error('Could not dynamically require "'+n+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var ps={};(function(n){var t=function(){var e=function(d,c,h,p){for(h=h||{},p=d.length;p--;h[d[p]]=c);return h},s=[1,9],i=[1,10],r=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,p,g,m,v,Lt){var w=v.length-1;switch(m){case 1:return new g.Root({},[v[w-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[v[w-1],v[w]]);break;case 4:case 5:this.$=v[w];break;case 6:this.$=new g.Literal({value:v[w]});break;case 7:this.$=new g.Splat({name:v[w]});break;case 8:this.$=new g.Param({name:v[w]});break;case 9:this.$=new g.Optional({},[v[w-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:r,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:r,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:r,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:r,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let p=function(g,m){this.message=g,this.hash=m};throw p.prototype=Error,new p(c,h)}},parse:function(c){var h=this,p=[0],g=[null],m=[],v=this.table,Lt="",w=0,de=0,Ms=2,ue=1,Ls=m.slice.call(arguments,1),_=Object.create(this.lexer),R={yy:{}};for(var It in this.yy)Object.prototype.hasOwnProperty.call(this.yy,It)&&(R.yy[It]=this.yy[It]);_.setInput(c,R.yy),R.yy.lexer=_,R.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var jt=_.yylloc;m.push(jt);var Is=_.options&&_.options.ranges;typeof R.yy.parseError=="function"?this.parseError=R.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var js=function(){var z;return z=_.lex()||ue,typeof z!="number"&&(z=h.symbols_[z]||z),z},$,O,A,Ht,H={},yt,E,pe,_t;;){if(O=p[p.length-1],this.defaultActions[O]?A=this.defaultActions[O]:(($===null||typeof $>"u")&&($=js()),A=v[O]&&v[O][$]),typeof A>"u"||!A.length||!A[0]){var zt="";_t=[];for(yt in v[O])this.terminals_[yt]&&yt>Ms&&_t.push("'"+this.terminals_[yt]+"'");_.showPosition?zt="Parse error on line "+(w+1)+`:
`+_.showPosition()+`
Expecting `+_t.join(", ")+", got '"+(this.terminals_[$]||$)+"'":zt="Parse error on line "+(w+1)+": Unexpected "+($==ue?"end of input":"'"+(this.terminals_[$]||$)+"'"),this.parseError(zt,{text:_.match,token:this.terminals_[$]||$,line:_.yylineno,loc:jt,expected:_t})}if(A[0]instanceof Array&&A.length>1)throw new Error("Parse Error: multiple actions possible at state: "+O+", token: "+$);switch(A[0]){case 1:p.push($),g.push(_.yytext),m.push(_.yylloc),p.push(A[1]),$=null,de=_.yyleng,Lt=_.yytext,w=_.yylineno,jt=_.yylloc;break;case 2:if(E=this.productions_[A[1]][1],H.$=g[g.length-E],H._$={first_line:m[m.length-(E||1)].first_line,last_line:m[m.length-1].last_line,first_column:m[m.length-(E||1)].first_column,last_column:m[m.length-1].last_column},Is&&(H._$.range=[m[m.length-(E||1)].range[0],m[m.length-1].range[1]]),Ht=this.performAction.apply(H,[Lt,de,w,R.yy,A[1],g,m].concat(Ls)),typeof Ht<"u")return Ht;E&&(p=p.slice(0,-1*E*2),g=g.slice(0,-1*E),m=m.slice(0,-1*E)),p.push(this.productions_[A[1]][0]),g.push(H.$),m.push(H._$),pe=v[p[p.length-2]][p[p.length-1]],p.push(pe);break;case 3:return!0}}return!0}},u=function(){var d={EOF:1,parseError:function(h,p){if(this.yy.parser)this.yy.parser.parseError(h,p);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,p=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),p.length-1&&(this.yylineno-=p.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:p?(p.length===g.length?this.yylloc.first_column:0)+g[g.length-p.length].length-p[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var p,g,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),g=c[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],p=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),p)return p;if(this._backtrack){for(var v in m)this[v]=m[v];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,p,g;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),v=0;v<m.length;v++)if(p=this._input.match(this.rules[m[v]]),p&&(!h||p[0].length>h[0].length)){if(h=p,g=v,this.options.backtrack_lexer){if(c=this.test_match(p,m[v]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,m[g]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,p,g,m){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return d}();a.lexer=u;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f}();typeof Ri<"u"&&(n.parser=t,n.Parser=t.Parser,n.parse=function(){return t.parse.apply(t,arguments)})})(ps);function V(n){return function(t,e){return{displayName:n,props:t,children:e||[]}}}var fs={Root:V("Root"),Concat:V("Concat"),Literal:V("Literal"),Splat:V("Splat"),Param:V("Param"),Optional:V("Optional")},ms=ps.parser;ms.yy=fs;var Oi=ms,Ti=Object.keys(fs);function Ui(n){return Ti.forEach(function(t){if(typeof n[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:n}}var gs=Ui,Ni=gs,Mi=/[\-{}\[\]+?.,\\\^$|#\s]/g;function vs(n){this.captures=n.captures,this.re=n.re}vs.prototype.match=function(n){var t=this.re.exec(n),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var Li=Ni({Concat:function(n){return n.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(n){return{re:n.props.value.replace(Mi,"\\$&"),captures:[]}},Splat:function(n){return{re:"([^?]*?)",captures:[n.props.name]}},Param:function(n){return{re:"([^\\/\\?]+)",captures:[n.props.name]}},Optional:function(n){var t=this.visit(n.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(n){var t=this.visit(n.children[0]);return new vs({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),Ii=Li,ji=gs,Hi=ji({Concat:function(n,t){var e=n.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(n){return decodeURI(n.props.value)},Splat:function(n,t){return t[n.props.name]?t[n.props.name]:!1},Param:function(n,t){return t[n.props.name]?t[n.props.name]:!1},Optional:function(n,t){var e=this.visit(n.children[0],t);return e||""},Root:function(n,t){t=t||{};var e=this.visit(n.children[0],t);return e?encodeURI(e):!1}}),zi=Hi,Di=Oi,Vi=Ii,Fi=zi;gt.prototype=Object.create(null);gt.prototype.match=function(n){var t=Vi.visit(this.ast),e=t.match(n);return e||!1};gt.prototype.reverse=function(n){return Fi.visit(this.ast,n)};function gt(n){var t;if(this?t=this:t=Object.create(gt.prototype),typeof n>"u")throw new Error("A route spec is required");return t.spec=n,t.ast=Di.parse(n),t}var qi=gt,Bi=qi,Wi=Bi;const Yi=Ci(Wi);var Ki=Object.defineProperty,ys=(n,t,e,s)=>{for(var i=void 0,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=o(t,e,i)||i);return i&&Ki(t,e,i),i};const _s=class extends B{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>st` <h1>Not Found</h1> `,this._cases=t.map(i=>({...i,route:new Yi(i.path)})),this._historyObserver=new Y(this,e),this._authObserver=new Y(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),st` <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(Qe(this,"auth/redirect"),st` <h1>Redirecting for Login</h1> `):(console.log("Loading view, ",e.params,e.query),e.view(e.params||{},e.query)):st` <h1>Authenticating</h1> `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),st` <h1>Redirecting to ${s}…</h1> `}}return this._fallback({})})()}</main> `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),r=s+e;for(const o of this._cases){const l=o.route.match(r);if(l)return{...o,path:s,params:l,query:i}}}redirect(t){te(this,"history/redirect",{href:t})}};_s.styles=li`
    :host,
    main {
      display: contents;
    }
  `;let St=_s;ys([us()],St.prototype,"_user");ys([us()],St.prototype,"_match");const Gi=Object.freeze(Object.defineProperty({__proto__:null,Element:St,Switch:St},Symbol.toStringTag,{value:"Module"})),bs=class $s extends HTMLElement{constructor(){if(super(),Ut(this).template($s.template),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};bs.template=L`
    <template>
      <slot name="actuator"><button>Menu</button></slot>
      <div id="panel">
        <slot></slot>
      </div>

      <style>
        :host {
          position: relative;
        }
        #is-shown {
          display: none;
        }
        #panel {
          display: none;

          position: absolute;
          right: 0;
          margin-top: var(--size-spacing-small);
          width: max-content;
          padding: var(--size-spacing-small);
          border-radius: var(--size-radius-small);
          background: var(--color-background-card);
          color: var(--color-text);
          box-shadow: var(--shadow-popover);
        }
        :host([open]) #panel {
          display: block;
        }
      </style>
    </template>
  `;let Ji=bs;const Zi=Object.freeze(Object.defineProperty({__proto__:null,Element:Ji},Symbol.toStringTag,{value:"Module"})),ws=class Zt extends HTMLElement{constructor(){super(),this._array=[],Ut(this).template(Zt.template).styles(Zt.styles),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(As("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,r=e.closest("label");if(r){const o=Array.from(this.children).indexOf(r);this._array[o]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{Gt(t,"button.add")?wt(t,"input-array:add"):Gt(t,"button.remove")&&wt(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],Qi(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};ws.template=L`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style></style>
      </button>
    </template>
  `;ws.styles=Xe`
    :host {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: input / end;
    }
    ul {
      display: contents;
    }
    button.add {
      grid-column: input / input-end;
    }
    ::slotted(label) {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: subgrid;
    }
  `;function Qi(n,t){t.replaceChildren(),n.forEach((e,s)=>t.append(As(e)))}function As(n,t){const e=n===void 0?L`<input />`:L`<input value="${n}" />`;return L`
    <label>
      ${e}
      <button class="remove" type="button">Remove</button>
    </label>
  `}function Es(n){return Object.entries(n).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var Xi=Object.defineProperty,tn=Object.getOwnPropertyDescriptor,en=(n,t,e,s)=>{for(var i=tn(t,e),r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=o(t,e,i)||i);return i&&Xi(t,e,i),i};class sn extends B{constructor(t){super(),this._pending=[],this._observer=new Y(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}en([ds()],sn.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t=globalThis,re=$t.ShadowRoot&&($t.ShadyCSS===void 0||$t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol(),Te=new WeakMap;let xs=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(re&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Te.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Te.set(e,t))}return t}toString(){return this.cssText}};const nn=n=>new xs(typeof n=="string"?n:n+"",void 0,oe),X=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new xs(e,n,oe)},rn=(n,t)=>{if(re)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=$t.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},Ue=re?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return nn(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:on,defineProperty:an,getOwnPropertyDescriptor:ln,getOwnPropertyNames:cn,getOwnPropertySymbols:hn,getPrototypeOf:dn}=Object,k=globalThis,Ne=k.trustedTypes,un=Ne?Ne.emptyScript:"",Ft=k.reactiveElementPolyfillSupport,ot=(n,t)=>n,Pt={toAttribute(n,t){switch(t){case Boolean:n=n?un:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ae=(n,t)=>!on(n,t),Me={attribute:!0,type:String,converter:Pt,reflect:!1,hasChanged:ae};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),k.litPropertyMetadata??(k.litPropertyMetadata=new WeakMap);class q extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Me){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&an(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=ln(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const l=i==null?void 0:i.call(this);r.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Me}static _$Ei(){if(this.hasOwnProperty(ot("elementProperties")))return;const t=dn(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ot("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ot("properties"))){const e=this.properties,s=[...cn(e),...hn(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Ue(i))}else t!==void 0&&e.push(Ue(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return rn(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var r;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:Pt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var r;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=s.getPropertyOptions(i),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((r=o.converter)==null?void 0:r.fromAttribute)!==void 0?o.converter:Pt;this._$Em=i,this[i]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??ae)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,o]of i)o.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}q.elementStyles=[],q.shadowRootOptions={mode:"open"},q[ot("elementProperties")]=new Map,q[ot("finalized")]=new Map,Ft==null||Ft({ReactiveElement:q}),(k.reactiveElementVersions??(k.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at=globalThis,kt=at.trustedTypes,Le=kt?kt.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ss="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,Ps="?"+P,pn=`<${Ps}>`,j=document,ut=()=>j.createComment(""),pt=n=>n===null||typeof n!="object"&&typeof n!="function",le=Array.isArray,fn=n=>le(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",qt=`[ 	
\f\r]`,it=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ie=/-->/g,je=/>/g,U=RegExp(`>|${qt}(?:([^\\s"'>=/]+)(${qt}*=${qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),He=/'/g,ze=/"/g,ks=/^(?:script|style|textarea|title)$/i,mn=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),x=mn(1),Z=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),De=new WeakMap,M=j.createTreeWalker(j,129);function Cs(n,t){if(!le(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Le!==void 0?Le.createHTML(t):t}const gn=(n,t)=>{const e=n.length-1,s=[];let i,r=t===2?"<svg>":t===3?"<math>":"",o=it;for(let l=0;l<e;l++){const a=n[l];let u,f,d=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===it?f[1]==="!--"?o=Ie:f[1]!==void 0?o=je:f[2]!==void 0?(ks.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=U):f[3]!==void 0&&(o=U):o===U?f[0]===">"?(o=i??it,d=-1):f[1]===void 0?d=-2:(d=o.lastIndex-f[2].length,u=f[1],o=f[3]===void 0?U:f[3]==='"'?ze:He):o===ze||o===He?o=U:o===Ie||o===je?o=it:(o=U,i=void 0);const h=o===U&&n[l+1].startsWith("/>")?" ":"";r+=o===it?a+pn:d>=0?(s.push(u),a.slice(0,d)+Ss+a.slice(d)+P+h):a+P+(d===-2?l:h)}return[Cs(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class ft{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const l=t.length-1,a=this.parts,[u,f]=gn(t,e);if(this.el=ft.createElement(u,s),M.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=M.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(Ss)){const c=f[o++],h=i.getAttribute(d).split(P),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:r,name:p[2],strings:h,ctor:p[1]==="."?yn:p[1]==="?"?_n:p[1]==="@"?bn:Mt}),i.removeAttribute(d)}else d.startsWith(P)&&(a.push({type:6,index:r}),i.removeAttribute(d));if(ks.test(i.tagName)){const d=i.textContent.split(P),c=d.length-1;if(c>0){i.textContent=kt?kt.emptyScript:"";for(let h=0;h<c;h++)i.append(d[h],ut()),M.nextNode(),a.push({type:2,index:++r});i.append(d[c],ut())}}}else if(i.nodeType===8)if(i.data===Ps)a.push({type:2,index:r});else{let d=-1;for(;(d=i.data.indexOf(P,d+1))!==-1;)a.push({type:7,index:r}),d+=P.length-1}r++}}static createElement(t,e){const s=j.createElement("template");return s.innerHTML=t,s}}function Q(n,t,e=n,s){var o,l;if(t===Z)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const r=pt(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=Q(n,i._$AS(n,t.values),i,s)),t}class vn{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??j).importNode(e,!0);M.currentNode=i;let r=M.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new vt(r,r.nextSibling,this,t):a.type===1?u=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(u=new $n(r,this,t)),this._$AV.push(u),a=s[++l]}o!==(a==null?void 0:a.index)&&(r=M.nextNode(),o++)}return M.currentNode=j,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class vt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),pt(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==Z&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):fn(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==y&&pt(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ft.createElement(Cs(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(e);else{const o=new vn(i,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=De.get(t.strings);return e===void 0&&De.set(t.strings,e=new ft(t)),e}k(t){le(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new vt(this.O(ut()),this.O(ut()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Mt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=y}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(r===void 0)t=Q(this,t,e,0),o=!pt(t)||t!==this._$AH&&t!==Z,o&&(this._$AH=t);else{const l=t;let a,u;for(t=r[0],a=0;a<r.length-1;a++)u=Q(this,l[s+a],e,a),u===Z&&(u=this._$AH[a]),o||(o=!pt(u)||u!==this._$AH[a]),u===y?t=y:t!==y&&(t+=(u??"")+r[a+1]),this._$AH[a]=u}o&&!i&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class yn extends Mt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}}class _n extends Mt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}}class bn extends Mt{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??y)===Z)return;const s=this._$AH,i=t===y&&s!==y||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==y&&(s===y||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class $n{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const Bt=at.litHtmlPolyfillSupport;Bt==null||Bt(ft,vt),(at.litHtmlVersions??(at.litHtmlVersions=[])).push("3.2.1");const wn=(n,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const r=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new vt(t.insertBefore(ut(),r),r,void 0,e??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let C=class extends q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=wn(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Z}};var qe;C._$litElement$=!0,C.finalized=!0,(qe=globalThis.litElementHydrateSupport)==null||qe.call(globalThis,{LitElement:C});const Wt=globalThis.litElementPolyfillSupport;Wt==null||Wt({LitElement:C});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");function An(n){const e=n.target.checked;Qs.relay(n,"dark-mode",{checked:e})}const Tt=class Tt extends C{render(){return x`
      <header>
        <div id="primary-header">
          <a slot="actuator">
            Hello,
            <span id="userid"></span>
          </a>
          <div class="title">
            <h1>Resident Evil Wiki</h1>
            <svg class="icon">
              <use href="/icons/umbrella-corp.svg#icon-umbrella-corp" />
            </svg>
          </div>
          <drop-down>
            <menu>
              <li>
                <label @change=${An}>
                  <input type="checkbox" autocomplete="off" />
                  Dark mode
                </label>
              </li>
              <li class="when-signed-in">
                <a id="signout">Sign Out</a>
              </li>
              <li class="when-signed-out">
                <a href="/login">Sign In</a>
              </li>
            </menu>
          </drop-down>
          <img class="profile-pic" src="app/public/images/profile-pic.jpg" />
        </div>
        <div id="sub-header">
          <h5><a href="/app/games">Home</a></h5>
          <h5><a href="/games">Games</a></h5>
          <h5><a href="/movies">Movies</a></h5>
          <h5><a href="/characters">Characters</a></h5>
          <h5><a href="/locations">Locations</a></h5>
        </div>
      </header>
    `}static initializeOnce(){function t(e,s){e.classList.toggle("dark-mode",s)}document.body.addEventListener("dark-mode",e=>{var s;return t(e.currentTarget,(s=e.detail)==null?void 0:s.checked)})}};Tt.uses=Es({"drop-down":Zi.Element}),Tt.styles=[X`
      header {
        display: flex;
        flex-direction: column;

        background-color: var(--color-background-header);
        color: var(--color-text);

        font-size: var(--font-style-header);
        font-family: var(--font-family-display);
        font-style: normal;

        text-align: center;
        border-color: currentColor;
        border: 1px solid var(--color-text);
      }

      #primary-header {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-items: baseline;
      }

      #primary-header > .title {
        display: flex;
        flex: 1;
        justify-content: center;
        text-align: center;
        margin-left: 6em;
      }

      #primary-header > .profile-pic {
        height: var(--height-avatar-header);
        width: var(--width-avatar-header);
        border-radius: var(--border-radius-avatar-header);
        margin-right: 2em;
      }

      #sub-header {
        height: 50px;
        display: flex;
        justify-content: center;
      }

      #sub-header h5 {
        padding: var(--padding-sub-header);
        padding-bottom: var(--padding-bottom-sub-header);
      }

      svg.icon {
        height: var(--height-svg);
        width: var(--width-svg);
        fill: currentColor;
      }

      a {
        color: var(--color-link);
      }

      a:visited {
        color: var(--color-link);
      }

      header a {
        color: inherit;
      }

      header a:visited {
        color: inherit;
      }

      nav {
        display: flex;
        flex-direction: column;
        flex-basis: max-content;
        align-items: end;
      }
      a[slot="actuator"] {
        color: var(--color-link-inverted);
        cursor: pointer;
      }
      #userid:empty::before {
        content: "user";
      }
      menu a {
        color: var(--color-link);
        cursor: pointer;
        text-decoration: underline;
      }
      a:has(#userid:empty) ~ menu > .when-signed-in,
      a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
        display: none;
      }
    `];let Ct=Tt;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const En={attribute:!0,type:String,converter:Pt,reflect:!1,hasChanged:ae},xn=(n=En,t,e)=>{const{kind:s,metadata:i}=e;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),r.set(e.name,n),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,n)},init(l){return l!==void 0&&this.P(o,void 0,n),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,n)}}throw Error("Unsupported decorator location: "+s)};function Sn(n){return(t,e)=>typeof e=="object"?xn(n,t,e):((s,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Rs(n){return Sn({...n,state:!0,attribute:!1})}const Pn=X`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
  }
  ul,
  menu {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
`,Os={styles:Pn},kn=X`
  .category-list,
  .list {
    display: flex;
    flex-direction: row;
    flex: 1;
    gap: 8px;
    padding: 16px;

    list-style: none;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;

    /* Hide scrollbar in IE and Edge */
    -ms-overflow-style: none;
  }

  .category-list {
    margin: 2rem;
  }

  /* Hide scrollbar in webkit */
  .list::-webkit-scrollbar {
    display: none;
  }

  .list-wrapper {
    position: relative;
    width: 90%;
    justify-self: center;
  }

  .button {
    position: absolute;
    top: 50%;

    width: 3rem;
    height: 3rem;

    transform: translateY(-50%);
  }

  .button--previous {
    left: 1.5rem;

    transform: rotate(180deg);
  }

  .button--next {
    right: 1.5rem;
  }

  .item {
    flex-shrink: 0;
    width: var(--width-grid-item);
    height: var(--height-grid-item);

    background-color: #fff;

    scroll-snap-align: center;

    border-radius: var(--border-radius-grid-item);
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: sans-serif;
    font-size: 64px;
    font-weight: bold;

    height: inherit;
    width: inherit;

    position: relative;
    border-radius: inherit;
  }

  .content > img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .content > .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    height: var(--height-grid-item-overlay);
    align-items: center;
    justify-content: center;
    opacity: 0;
    background-color: white;
    border-top-left-radius: 0%;
    border-top-right-radius: 0%;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  .overlay > p {
    font-size: 12px;
    font-family: var(--font-family-body);
  }

  .content:hover > .overlay {
    opacity: 1;
    transition: opacity 0.3s;

    width: inherit;
    height: 50%;
  }

  .content:hover > img {
    opacity: var(--opacity-card-hover);
    transition: opacity 0.3s;
  }

  h3 {
    margin: 10px;
    font-family: var(--font-family-display);
    text-decoration: underline;
  }
`,Cn={styles:kn},Rn=X`
  :root {
    --color-background-body: rgb(235, 243, 250);
    --color-background-header: rgb(210, 231, 250);
    --color-text: darkred;
    --color-border: var(--color-text);
    --color-link: purple;

    --height-svg: 2em;
    --width-svg: 2em;

    --font-family-body: "Cardo", serif, system-ui;
    --font-family-display: "Philosopher", sans-serif, system-ui;

    --opacity-h2: 75%;

    --font-weight-normal: 400;
    --font-weight-light: 200;
    --font-weight-bold: 700;

    --font-line-height-body: 1.5;
    --font-line-height-display: 1.125;

    --font-size-header: 24px;

    --height-avatar-header: 2em;
    --width-avatar-header: 2em;

    --border-radius-avatar-header: 45%;

    --padding-sub-header: 10px;
    --padding-bottom-sub-header: 0px;

    --grid-gap-category-page: 10px;
    --margin-bottom-category-page: 50px;

    --margin-top-grid-item: 3em;
    --width-grid-item: 300px;
    --height-grid-item: 250px;
    --border-radius-grid-item: 10%;

    --height-grid-item-overlay: 50%;

    --opacity-card-hover: 0.5;
    --grid-card-overlay-transition: 0.3s;
  }

  body.dark-mode {
    --color-background-body: rgb(4, 41, 99);
    --color-background-header: rgb(4, 24, 56);
    --color-text: rgb(216, 0, 0);
  }
`,Ts={styles:Rn},On=X`
  body {
    display: flex;
    background-color: var(--color-background-body);
    color: var(--color-text);
    font-family: var(--font-family-body);
  }

  header {
    display: flex;
    flex-direction: column;

    background-color: var(--color-background-header);
    color: var(--color-text);

    font-size: var(--font-style-header);
    font-family: var(--font-family-display);
    font-style: normal;

    text-align: center;
    border-color: currentColor;
    border: 1px solid var(--color-text);
  }

  #primary-header {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: baseline;
  }

  #primary-header > .title {
    height: 50px;
    display: flex;
    flex: 1;
    justify-content: center;
    text-align: center;
    margin-left: 6em;
  }

  #primary-header > .profile-pic {
    height: var(--height-avatar-header);
    width: var(--width-avatar-header);
    border-radius: var(--border-radius-avatar-header);
    margin-right: 2em;
  }

  #sub-header {
    display: flex;
    justify-content: center;
  }

  #sub-header h5 {
    padding: var(--padding-sub-header);
    padding-bottom: var(--padding-bottom-sub-header);
  }

  .category {
    color: var(--color-text);
  }

  .category-page {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: var(--grid-gap-category-page);
    margin-bottom: var(--margin-bottom-category-page);
  }

  header a {
    color: inherit;
  }

  header a:visited {
    color: inherit;
  }

  h2 {
    opacity: var(--opacity-h2);
  }

  a {
    color: var(--color-link);
  }

  a:visited {
    color: var(--color-link);
  }

  svg.icon {
    display: inline;
    height: var(--height-svg);
    width: var(--width-svg);
    vertical-align: top;
    fill: currentColor;
  }
`,Us={styles:On};var Ve=Object.freeze,Ns=Object.defineProperty,Tn=(n,t,e,s)=>{for(var i=void 0,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=o(t,e,i)||i);return i&&Ns(t,e,i),i},Un=(n,t)=>Ve(Ns(n,"raw",{value:Ve(n.slice())})),Fe;const ce=class ce extends C{constructor(){super(...arguments),this.src="/api/games",this.gameIndex=new Array,this._authObserver=new Y(this,"resident-evil:auth"),this._user=new ct.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}hydrate(t){fetch(t,{headers:ct.headers(this._user)}).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).then(e=>{e&&(console.log("Games: ",e),this.gameIndex=e,console.log("gameIndex: ",this.gameIndex))}).catch(e=>console.log("Failed to get game data:",e))}render(){return console.log("current gameIndex: ",this.gameIndex),x(Fe||(Fe=Un([`
      <main>
        <h3>Popular games</h3>
        <div class="list-wrapper">
          <ul class="list">
            <li class="item">
              <div class="content">
                <img src="/images/game-covers/re0.jpg" />
                <div class="overlay">
                  <p>Resident Evil 0</p>
                  <p>IGN Rating: 6.5/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/game-covers/re2.webp" />
                <div class="overlay">
                  <p>Resident Evil 2</p>
                  <p>IGN Rating: 9/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/game-covers/re4.jpg" />
                <div class="overlay">
                  <p>Resident Evil 4</p>
                  <p>IGN Rating: 10/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/game-covers/re3.webp" />
                <div class="overlay">
                  <p>Resident Evil 3</p>
                  <p>Fan Rating: 9/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/game-covers/re5.jpg" />
                <div class="overlay">
                  <p>Resident Evil 5</p>
                  <p>Fan Rating: 9.3/5</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/game-covers/re-biohazard.jpg" />
                <div class="overlay">
                  <p>Resident Evil 7 Biohazard</p>
                  <p>Fan Rating: 7.7/10</p>
                </div>
              </div>
            </li>
          </ul>
          <button class="button button--previous" type="button">➜</button>
          <button class="button button--next" type="button">➜</button>
        </div>
        <script type="module" src="scripts/carousel.js"><\/script>
        <!-- Popular Movies -->
        <h3>Popular Movies</h3>
        <div class="list-wrapper">
          <ul class="list">
            <li class="item">
              <div class="content">
                <img src="/images/movie-covers/re.jpg" />
                <div class="overlay">
                  <p>Resident Evil</p>
                  <p>2002</p>
                  <p>IMDb Rating: 6.6/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/movie-covers/re-retribution.jpg" />
                <div class="overlay">
                  <p>Resident Evil: Retribution</p>
                  <p>2012</p>
                  <p>IMDb Rating: 5.3/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/movie-covers/re-apocalypse.jpg" />
                <div class="overlay">
                  <p>Resident Evil: Apocalypse</p>
                  <p>2004</p>
                  <p>Fan Rating: 6.1/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/movie-covers/re-extinction.jpeg" />
                <div class="overlay">
                  <p>Resident Evil: Extinction</p>
                  <p>2007</p>
                  <p>IMDb Rating: 6.2/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/movie-covers/re-vendetta.webp" />
                <div class="overlay">
                  <p>Resident Evil: Vendetta</p>
                  <p>2017</p>
                  <p>IMDb Rating: 6.2/10</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/movie-covers/re-death-island.png" />
                <div class="overlay">
                  <p>Resident Evil: Death Island</p>
                  <p>2023</p>
                  <p>IMDb Rating: 5.7/10</p>
                </div>
              </div>
            </li>
          </ul>
          <button class="button button--previous" type="button">➜</button>
          <button class="button button--next" type="button">➜</button>
        </div>
        <!-- Iconic Characters -->
        <h3>Iconic Characters</h3>
        <div class="list-wrapper">
          <ul class="list">
            <li class="item">
              <div class="content">
                <img src="/images/character-portraits/claire-redfield.webp" />
                <div class="overlay">
                  <p>Claire Redfield</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/character-portraits/chris-redfield.jpg" />
                <div class="overlay">
                  <p>Chris Redfield</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/character-portraits/wesker.jpg" />
                <div class="overlay">
                  <p>Albert Wesker</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/character-portraits/nemesis.webp" />
                <div class="overlay">
                  <p>Nemesis</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/character-portraits/leon-kennedy.webp" />
                <div class="overlay">
                  <p>Leon Kennedy</p>
                </div>
              </div>
            </li>
          </ul>
          <button class="button button--previous" type="button">➜</button>
          <button class="button button--next" type="button">➜</button>
        </div>
        <!-- Memorable Locations -->
        <h3>Memorable Locations</h3>
        <div class="list-wrapper">
          <ul class="list">
            <li class="item">
              <div class="content">
                <img src="/images/locations/rcpd.webp" />
                <div class="overlay">
                  <p>Racoon City Police Department</p>
                  <p>(Resident Evil 2)</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/locations/re3-downtown-rc.webp" />
                <div class="overlay">
                  <p>Downtown Racoon City</p>
                  <p>(Resident Evil 3)</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/locations/re4-village.webp" />
                <div class="overlay">
                  <p>The Village</p>
                  <p>(Resident Evil 4)</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/locations/rockfort-prison.webp" />
                <div class="overlay">
                  <p>Rockfort Prison</p>
                  <p>(Resident Evil Code Veronica)</p>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="content">
                <img src="/images/locations/the-morgue.webp" />
                <div class="overlay">
                  <p>The Morgue</p>
                  <p>(Resident Evil 2)</p>
                </div>
              </div>
            </li>
          </ul>
          <button class="button button--previous" type="button">➜</button>
          <button class="button button--next" type="button">➜</button>
        </div>
      </main>
    `])))}renderItem(t){const{title:e,releaseDate:s,ignRating:i}=t;return x`
      <dt>${e}</dt>
      <dd>${s}</dd>
      <dd>${i}</dd>
    `}};ce.styles=[Os.styles,Us.styles,Cn.styles,Ts.styles];let Rt=ce;Tn([Rs()],Rt.prototype,"gameIndex");const Nn=X`
  :host {
    display: contents;
  }

  :host([mode="edit"]),
  :host([mode="new"]) {
    --display-view-none: none;
  }

  :host([mode="view"]) {
    --display-editor-none: none;
  }

  mu-form.edit {
    display: var(--display-editor-none);
  }

  .card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: var(--width-grid-item);
    height: calc(var(--height-grid-item) * 1.5);
  }

  .view {
    display: var(--display-view-none);
    position: relative;
    margin-top: var(--margin-top-grid-item);
    flex: 1;
    justify-items: center;
    width: var(--width-grid-item);
    height: var(--height-grid-item);
    border-radius: var(--border-radius-grid-item);
    position: relative; /* Add this to position overlay */
    overflow: hidden;
    border: solid 0.5rem blue;
  }

  .view > ::slotted([slot="imgSrc"]) {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    border: inherit;
  }

  .view:hover > ::slotted([slot="imgSrc"]) {
    opacity: var(--opacity-card-hover);
    transition: opacity var(--grid-card-overlay-transition);
  }

  .view > .overlay {
    position: absolute; /* Position overlay over the image */
    bottom: 0; /* Align to the top */
    left: 0; /* Align to the left */
    right: 0; /* Stretch to the right */
    display: flex; /* Center text */
    flex-direction: column;
    height: var(--height-grid-item-overlay);
    align-items: center; /* Vertically center text */
    justify-content: center; /* Horizontally center text */
    opacity: 0; /* Hide overlay initially */
    transition: opacity var(--grid-card-overlay-transition); /* Smooth opacity transition */
    background-color: white;
    border-top-left-radius: 0%;
    border-top-right-radius: 0%;
  }

  .view:hover > .overlay {
    opacity: 1; /* Show overlay on hover */
    transition: var(--grid-card-overlay-transition);
    border-top-left-radius: 0%;
    border-top-right-radius: 0%;
  }
`,Mn={styles:Nn};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ln=n=>n??y;var In=Object.defineProperty,jn=(n,t,e,s)=>{for(var i=void 0,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=o(t,e,i)||i);return i&&In(t,e,i),i};const he=class he extends C{constructor(){super(...arguments),this.src="/api/games",this.gameIndex=new Array,this._authObserver=new Y(this,"resident-evil:auth"),this._user=new ct.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}hydrate(t){fetch(t,{headers:ct.headers(this._user)}).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).then(e=>{e&&(console.log("Games: ",e),this.gameIndex=e)}).catch(e=>console.log("Failed to get game data: ",e))}render(){const t=this.gameIndex.map(this.renderItem);return x` <main class="category-page">${t}</main> `}renderItem(t){const{title:e,releaseDate:s,ignRating:i,img:r}=t;return x`
      <div class="card-container">
        <button id="edit">Edit</button>
        <a class="view" href="/games/resident-evil4.html">
          <slot name="imgSrc">
            <img src=${Ln(r)} />
          </slot>
          <div class="overlay">
            <p><${e}</p>
            <p>${s}</p>
            <p>${i}</p>
          </div>
        </a>
        <mu-form class="edit">
          <label>
            <span>Game Cover</span>
            <input name="imgSrc" type="file" />
          </label>
          <label>
            <span>Title</span>
            <input name="title" />
          </label>
          <label>
            <span>Release Date</span>
            <input name="releaseDate" />
          </label>
          <label>
            <span>Fan Rating</span>
            <input name="ignRating" />
          </label>
        </mu-form>
      </div>
    `}};he.styles=[Os.styles,Us.styles,Mn.styles,Ts.styles];let Ot=he;jn([Rs()],Ot.prototype,"gameIndex");class Hn extends C{render(){return x` <home-view></home-view> `}connectedCallback(){super.connectedCallback(),Ct.initializeOnce()}}const zn=[{path:"/app/games",view:()=>x` <games-view></games-view> `},{path:"/app/movies",view:()=>x` <movies-view></movies-view> `},{path:"/app",view:()=>x` <home-view></home-view> `},{path:"/",redirect:"/app"}];Es({"mu-auth":ct.Provider,"mu-history":ni.Provider,"mu-switch":class extends Gi.Element{constructor(){super(zn,"resident-evil:history","resident-evil:auth")}},"resident-evil-wiki-app":Hn,"resident-evil-header":Ct,"home-view":Rt,"games-view":Ot});
