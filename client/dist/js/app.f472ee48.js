(function(){"use strict";var e={243:function(e,t,n){var o=n(751),a=n(641);const r={class:"main-container"};function s(e,t,n,o,s,l){const i=(0,a.g2)("Navbar"),c=(0,a.g2)("Background"),u=(0,a.g2)("router-view"),d=(0,a.g2)("Footer");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bF)(i,{currentRoute:s.currentRoute},null,8,["currentRoute"]),(0,a.bF)(c),(0,a.Lk)("div",r,[(0,a.bF)(u,{onUpdateRoute:l.updateRoute},null,8,["onUpdateRoute"])]),(0,a.bF)(d)],64)}var l=n(33);const i=(0,a.Lk)("a",{href:"/"},"Hall",-1),c=[i],u=(0,a.Lk)("a",{href:"/projects"},"Projects",-1),d=[u],h=(0,a.Lk)("a",{href:"/contact"},"Contact",-1),m=[h];function p(e,t,n,o,r,s){return(0,a.uX)(),(0,a.CE)("nav",{onMouseleave:t[1]||(t[1]=(...e)=>s.closeMenu&&s.closeMenu(...e)),class:"navbar"},[(0,a.Lk)("ul",{class:(0,l.C4)(["navbar-btn-container",{show:r.showMenu}])},[(0,a.Lk)("li",{class:(0,l.C4)({"active-tab":"/"===n.currentRoute})},c,2),(0,a.Lk)("li",{class:(0,l.C4)({"active-tab":"/projects"===n.currentRoute})},d,2),(0,a.Lk)("li",{class:(0,l.C4)({"active-tab":"/contact"===n.currentRoute})},m,2)],2),(0,a.Lk)("a",{onMouseover:t[0]||(t[0]=(...e)=>s.openMenu&&s.openMenu(...e)),class:"menu-icon"},"☰",32)],32)}var f={name:"NavbarComponent",props:{currentRoute:String},data(){return{showMenu:!1,tabActive:""}},methods:{openMenu(){this.showMenu=!0},closeMenu(){this.showMenu=!1}}},k=n(262);const v=(0,k.A)(f,[["render",p]]);var b=v;const g={class:"bg"},L=(0,a.Lk)("img",{class:"waves",src:"data/waves_bg.svg",alt:"waves_bg"},null,-1),w=[L];function y(e,t,n,o,r,s){return(0,a.uX)(),(0,a.CE)("div",g,w)}var C={name:"BackgroundComponent"};const S=(0,k.A)(C,[["render",y]]);var j=S;const x={class:"footer"},E=(0,a.Lk)("img",{src:"data/waves_bot.svg",alt:"waves_bot",class:"footer-waves"},null,-1),M={class:"footer-bar"},I=(0,a.Lk)("a",{class:"icon",href:"https://github.com/hnezado",target:"_blank",title:"My GitHub"},[(0,a.Lk)("svg",{width:"30px",height:"30px",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[(0,a.Lk)("path",{d:"M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm3.163 21.783h-.093a.513.513 0 0 1-.382-.14.513.513 0 0 1-.14-.372v-1.406c.006-.467.01-.94.01-1.416a3.693 3.693 0 0 0-.151-1.028 1.832 1.832 0 0 0-.542-.875 8.014 8.014 0 0 0 2.038-.471 4.051 4.051 0 0 0 1.466-.964c.407-.427.71-.943.885-1.506a6.77 6.77 0 0 0 .3-2.13 4.138 4.138 0 0 0-.26-1.476 3.892 3.892 0 0 0-.795-1.284 2.81 2.81 0 0 0 .162-.582c.033-.2.05-.402.05-.604 0-.26-.03-.52-.09-.773a5.309 5.309 0 0 0-.221-.763.293.293 0 0 0-.111-.02h-.11c-.23.002-.456.04-.674.111a5.34 5.34 0 0 0-.703.26 6.503 6.503 0 0 0-.661.343c-.215.127-.405.249-.573.362a9.578 9.578 0 0 0-5.143 0 13.507 13.507 0 0 0-.572-.362 6.022 6.022 0 0 0-.672-.342 4.516 4.516 0 0 0-.705-.261 2.203 2.203 0 0 0-.662-.111h-.11a.29.29 0 0 0-.11.02 5.844 5.844 0 0 0-.23.763c-.054.254-.08.513-.081.773 0 .202.017.404.051.604.033.199.086.394.16.582A3.888 3.888 0 0 0 5.702 10a4.142 4.142 0 0 0-.263 1.476 6.871 6.871 0 0 0 .292 2.12c.181.563.483 1.08.884 1.516.415.422.915.75 1.466.964.653.25 1.337.41 2.033.476a1.828 1.828 0 0 0-.452.633 2.99 2.99 0 0 0-.2.744 2.754 2.754 0 0 1-1.175.27 1.788 1.788 0 0 1-1.065-.3 2.904 2.904 0 0 1-.752-.824 3.1 3.1 0 0 0-.292-.382 2.693 2.693 0 0 0-.372-.343 1.841 1.841 0 0 0-.432-.24 1.2 1.2 0 0 0-.481-.101c-.04.001-.08.005-.12.01a.649.649 0 0 0-.162.02.408.408 0 0 0-.13.06.116.116 0 0 0-.06.1.33.33 0 0 0 .14.242c.093.074.17.131.232.171l.03.021c.133.103.261.214.382.333.112.098.213.209.3.33.09.119.168.246.231.381.073.134.15.288.231.463.188.474.522.875.954 1.145.453.243.961.364 1.476.351.174 0 .349-.01.522-.03.172-.028.343-.057.515-.091v1.743a.5.5 0 0 1-.533.521h-.062a10.286 10.286 0 1 1 6.324 0v.005z"})])],-1),_=(0,a.Lk)("span",null,"Made by",-1),z=(0,a.Lk)("span",null,"Hector Martinez",-1),D=[_,z],R=(0,a.Fv)('<a href="https://www.linkedin.com/in/hector-md" target="_blank" title="My LinkedIn" class="icon"><svg height="30px" width="30px" version="1.1" viewBox="0 0 310 310"><g><path d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73\r\n        C77.16,101.969,74.922,99.73,72.16,99.73z"></path><path d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4\r\n        c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"></path><path d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599\r\n        c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319\r\n        c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995\r\n        C310,145.43,300.549,94.761,230.454,94.761z"></path></g></svg></a>',1);function O(e,t,n,o,r,s){return(0,a.uX)(),(0,a.CE)("footer",x,[E,(0,a.Lk)("div",M,[I,(0,a.Lk)("p",{class:(0,l.C4)({"tiny-screen":r.tinyScreen})},D,2),R])])}var $={name:"FooterComponent",data(){return{tinyScreen:!1}},mounted(){this.updateScreenSize(),window.addEventListener("resize",this.updateScreenSize)},beforeUnmount(){window.removeEventListener("resize",this.updateScreenSize)},methods:{updateScreenSize(){this.tinyScreen=window.innerWidth<=350}}};const A=(0,k.A)($,[["render",O]]);var P=A,F={name:"App",components:{Navbar:b,Background:j,Footer:P},data(){return{currentRoute:""}},methods:{updateRoute(e){this.currentRoute=e}}};const V=(0,k.A)(F,[["render",s]]);var T=V,U=n(220),X=JSON.parse('{"serverUrl":"http://localhost:3000"}');const W={id:"hall"},B={id:"welcome"},H={class:"welcome-content"},N=(0,a.Lk)("h1",{class:"welcome-title"},"Welcome to my creative hub",-1),J=(0,a.Lk)("div",{class:"name-text"},[(0,a.Lk)("p",null,"My name is"),(0,a.Lk)("div",{class:"anim-name"},[(0,a.Lk)("span",null,"Hector"),(0,a.Lk)("span",null,"Martinez")])],-1),q={class:"welcome-description"},K=(0,a.Lk)("p",null," Software developer and creative thinker. I specialize in both coding and design, offering a personalized touch to your website projects. ",-1),Y=(0,a.Lk)("div",{class:"welcome_waves"},[(0,a.Lk)("img",{src:"data/waves_mid.svg",alt:"waves_welcome"}),(0,a.Lk)("a",{href:"#about",class:"arrow"},"↓")],-1),G={id:"about"},Q=(0,a.Lk)("div",{class:"about-bg"},null,-1),Z={class:"about-content"},ee=(0,a.Lk)("h2",null,"About me",-1),te={class:"profile-container"},ne={class:"profile"},oe=(0,a.Lk)("img",{class:"profile-img",src:"data/profile_photo.webp",alt:"profile_photo"},null,-1),ae={class:"profile-details"},re=(0,a.Lk)("br",null,null,-1),se=(0,a.Lk)("br",null,null,-1),le=(0,a.Lk)("a",{class:"link-light",target:"_blank",href:"data/cv_hector_martinez.pdf"},"CV",-1),ie=(0,a.Lk)("a",{class:"link-light",href:"data/cv_hector_martinez.pdf",download:""},"download",-1),ce={class:"profile-contact",ref:"profileContactTitle"},ue={class:"skills-container"},de=(0,a.Lk)("h3",null,"My Skills",-1),he={class:"carousel-container"},me={class:"carousel",ref:"carousel"},pe=["src","alt"];function fe(e,t,n,o,r,s){const i=(0,a.g2)("router-link");return(0,a.uX)(),(0,a.CE)("div",W,[(0,a.Lk)("section",B,[(0,a.Lk)("div",H,[N,J,(0,a.Lk)("div",q,[K,(0,a.bF)(i,{to:"/projects",class:"button"},{default:(0,a.k6)((()=>[(0,a.eW)(" Portfolio")])),_:1})])]),Y]),(0,a.Lk)("section",G,[Q,(0,a.Lk)("div",Z,[ee,(0,a.Lk)("div",te,[(0,a.Lk)("div",ne,[oe,(0,a.Lk)("div",ae,[(0,a.Lk)("p",{class:(0,l.C4)({"text-animation":r.animStart.profileDetails}),ref:"profileDetails"},[(0,a.eW)(" Crafting with logical thinking, I bring attention to detail and loads of patience to the team. I don't hesitate to bring proactive solutions to the table for our digital projects. "),re,se,(0,a.eW)("If you wish to know more, I invite you to check out my "),le,(0,a.eW)(" ("),ie,(0,a.eW)("). ")],2),(0,a.Lk)("div",ce,[(0,a.Lk)("h4",{class:(0,l.C4)({"text-animation":r.animStart.profileContactTitle})}," Let's connect! ",2),(0,a.bF)(i,{to:"/contact",class:"button about-contact-btn"},{default:(0,a.k6)((()=>[(0,a.eW)("Contact me")])),_:1})],512)])])]),(0,a.Lk)("div",ue,[de,(0,a.Lk)("div",he,[(0,a.Lk)("div",{class:"carousel-btn",onClick:t[0]||(t[0]=(...e)=>s.prevSkills&&s.prevSkills(...e)),style:(0,l.Tr)(s.getCarouselBtnStyle("prev"))}," < ",4),(0,a.Lk)("div",me,[(0,a.Lk)("ul",{class:(0,l.C4)(["skills",{"skills-anim":r.animStart.carousel}]),style:(0,l.Tr)({left:s.getCarouselSpeed()})},[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(r.skills,((e,t)=>((0,a.uX)(),(0,a.CE)("li",{key:t},[(0,a.Lk)("img",{src:`data/logos/${e.name}.svg`,alt:`logo_${e.name}`},null,8,pe),(0,a.Lk)("span",null,(0,l.v_)(e.fullName),1)])))),128))],6)],512),(0,a.Lk)("div",{class:"carousel-btn",onClick:t[1]||(t[1]=(...e)=>s.nextSkills&&s.nextSkills(...e)),style:(0,l.Tr)(s.getCarouselBtnStyle("next"))}," > ",4)])])])])])}var ke={methods:{updateRoute(e){this.$emit("updateRoute",e)},observeElement(e,t=1){const n=new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting&&(this.animStart[e]=!0,n.unobserve(t.target))}))}),{threshold:t}),o=this.$refs[e];n.observe(o)}}},ve={name:"HallComponent",data(){return{smallScreen:!1,skills:[],elementsToObserve:[["profileDetails",.1],["profileContactTitle",.1],["carousel"]],animStart:{},skillsPerView:5,carouselIndex:0}},mixins:[ke],mounted(){this.updateRoute(this.$route.path),this.fetchSkills(),this.elementsToObserve.forEach((e=>this.observeElement(...e)))},methods:{async fetchSkills(){try{const e=await fetch(`${this.$config.serverUrl}/skills`),t=await e.json();Array.isArray(t)&&t.length>0&&(this.skills=t)}catch(e){console.error("Error fetching skills",e)}},getCarouselSpeed(){const e=window.innerWidth;let t;return t=e<=350?40:e<=600?50:100,this.carouselIndex*-t+"px"},nextSkills(){this.carouselIndex=this.carouselIndex+this.skillsPerView,this.carouselIndex>this.skills.length-this.skillsPerView&&(this.carouselIndex=this.skills.length-this.skillsPerView)},prevSkills(){this.carouselIndex=this.carouselIndex-this.skillsPerView,this.carouselIndex<0&&(this.carouselIndex=0)},getCarouselBtnStyle(e){const t={};return"prev"===e&&0===this.carouselIndex||"next"===e&&this.carouselIndex>=this.skills.length-this.skillsPerView?(t.cursor="auto",t.opacity=.3,t.animation="none"):t.animation=`anim-carousel-${e}-btn 2s infinite`,t}}};const be=(0,k.A)(ve,[["render",fe]]);var ge=be;const Le={id:"projects"},we=(0,a.Lk)("h1",null,"My Projects",-1),ye={class:"projects-list"},Ce=["href"];function Se(e,t,n,o,r,s){return(0,a.uX)(),(0,a.CE)("div",Le,[we,(0,a.Lk)("ul",ye,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(r.projects,((e,t)=>((0,a.uX)(),(0,a.CE)("li",{key:t},[(0,a.Lk)("a",{href:e.url,target:"_blank",class:"link"},(0,l.v_)(e.fullName),9,Ce)])))),128))])])}var je={name:"ProjectsComponent",data(){return{projects:[]}},mixins:[ke],mounted(){this.updateRoute(this.$route.path),this.fetchProjects()},methods:{async fetchProjects(){try{const e=await fetch(`${this.$config.serverUrl}/projects`),t=await e.json();Array.isArray(t)&&t.length>0&&(this.projects=t),console.log("projects:",this.projects)}catch(e){console.error("Error fetching projects",e)}}}};const xe=(0,k.A)(je,[["render",Se]]);var Ee=xe;const Me={id:"contact"},Ie=(0,a.Lk)("h1",null,"Contact me",-1),_e=(0,a.Lk)("p",null,[(0,a.Lk)("em",null,"Let's create something amazing together!")],-1),ze=(0,a.Lk)("label",{for:"name"},"Your name:",-1),De=(0,a.Lk)("label",{for:"email"},"Your email:",-1),Re=(0,a.Lk)("label",{for:"subject"},"Subject:",-1),Oe=(0,a.Lk)("label",{for:"message"},"Message:",-1),$e=(0,a.Lk)("button",{class:"button",type:"submit"},"Send message",-1),Ae=(0,a.Lk)("br",null,null,-1),Pe=["href"];function Fe(e,t,n,r,s,l){return(0,a.uX)(),(0,a.CE)("div",Me,[Ie,_e,(0,a.Lk)("form",{onSubmit:t[4]||(t[4]=(0,o.D$)(((...e)=>l.sendEmail&&l.sendEmail(...e)),["prevent"])),class:"contact-form"},[ze,(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>s.formData.name=e),type:"text",id:"name",required:""},null,512),[[o.Jo,s.formData.name]]),De,(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>s.formData.email=e),type:"text",id:"email",required:""},null,512),[[o.Jo,s.formData.email]]),Re,(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":t[2]||(t[2]=e=>s.formData.subject=e),type:"text",id:"subject",required:""},null,512),[[o.Jo,s.formData.subject]]),Oe,(0,a.bo)((0,a.Lk)("textarea",{"onUpdate:modelValue":t[3]||(t[3]=e=>s.formData.message=e),id:"message",required:""},null,512),[[o.Jo,s.formData.message]]),$e],32),(0,a.Lk)("span",null,[(0,a.eW)(" Or if you prefer you can send me an email directly to "),Ae,(0,a.Lk)("a",{href:`mailto:hnezado@gmail.com?subject=<From%20${s.formData.name}>${encodeURIComponent(s.formData.subject)}&body=${encodeURIComponent(s.formData.message)}`,class:"link"},"hnezado@gmail.com",8,Pe)])])}var Ve=n(250),Te={name:"ContactComponent",data(){return{formData:{name:"",email:"",subject:"",message:""}}},mixins:[ke],mounted(){this.updateRoute(this.$route.path)},methods:{async sendEmail(){console.log("formData:",this.formData);try{const e=await Ve.A.post(`${this.$config.serverUrl}/send-email`,this.formData,{headers:{"Content-Type":"application/json"}});Object.keys(this.formData).forEach((e=>{this.formData[e]=""}));const t=e.data;console.log("res:",t)}catch(e){console.error("Error posting email data",e)}}}};const Ue=(0,k.A)(Te,[["render",Fe]]);var Xe=Ue;const We=(0,U.aE)({history:(0,U.LA)(),routes:[{path:"/",component:ge},{path:"/projects",component:Ee},{path:"/contact",component:Xe}]}),Be=(0,o.Ef)(T);Be.config.globalProperties.$config=X,Be.use(We).mount("#app")}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(t,o,a,r){if(!o){var s=1/0;for(u=0;u<e.length;u++){o=e[u][0],a=e[u][1],r=e[u][2];for(var l=!0,i=0;i<o.length;i++)(!1&r||s>=r)&&Object.keys(n.O).every((function(e){return n.O[e](o[i])}))?o.splice(i--,1):(l=!1,r<s&&(s=r));if(l){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[o,a,r]}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,r,s=o[0],l=o[1],i=o[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(a in l)n.o(l,a)&&(n.m[a]=l[a]);if(i)var u=i(n)}for(t&&t(o);c<s.length;c++)r=s[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(u)},o=self["webpackChunkclient"]=self["webpackChunkclient"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(243)}));o=n.O(o)})();
//# sourceMappingURL=app.f472ee48.js.map