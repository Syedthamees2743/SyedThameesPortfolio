(function(){
'use strict';
const $  = (s,c)=> (c||document).querySelector(s);
const $$ = (s,c)=> Array.from((c||document).querySelectorAll(s));
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE    = window.matchMedia('(pointer: fine)').matches;
const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

if(!hasGSAP || REDUCED){
  document.documentElement.classList.add('reduced');
  const i=$('#intro'); if(i) i.remove();
  if(!hasGSAP) return;
}
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ignoreMobileResize:true});
gsap.defaults({ease:'power3.out'});

/* ==========================================================
   DATA — from the resume (no inventions)
========================================================== */
const EXP=[
 {t:'Developed a role-based IT support system', d:'Built with Django, DRF, React and PostgreSQL — a complete support platform with distinct capabilities per role.', tags:['Django','DRF','React','PostgreSQL']},
 {t:'Implemented JWT authentication', d:'Secure token-based sessions across Admin, Employee and Technician roles.', tags:['JWT','Auth']},
 {t:'Built ticket management', d:'Assignment, SLA tracking, status updates, email notifications and feedback.', tags:['SLA','SMTP','Workflow']},
 {t:'Integrated PostgreSQL via Django ORM', d:'Efficient data management across users, tickets, assignments and reports.', tags:['PostgreSQL','ORM']},
 {t:'Connected React with Django REST APIs', d:'Axios-driven data flow into a responsive UI built with Bootstrap/CSS.', tags:['Axios','REST','Bootstrap']},
 {t:'Shipped the support feature set', d:'Email notifications, feedback, FAQ/Knowledge Base, dashboard analytics and PDF reports.', tags:['Analytics','PDF','FAQ']},
 {t:'Tested API endpoints & workflows', d:'Identified and fixed functional issues across the application.', tags:['Postman','Debugging','QA']}
];
const TECH=[
 {id:'python',name:'Python',tier:1,cat:'Language',desc:'Primary language for backend logic — Django applications, business logic and the prediction-model integration.',rel:['django','drf','postgresql','node']},
 {id:'react',name:'React.js',tier:1,cat:'Frontend',desc:'Builds the dashboards, ticket views and stock-market UI — wired to REST APIs through Axios.',rel:['javascript','drf','router','context']},
 {id:'django',name:'Django',tier:1,cat:'Backend',desc:'The core framework of the Smart IT Service Desk — ORM models, JWT-secured views and the application layer.',rel:['python','drf','postgresql']},
 {id:'javascript',name:'JavaScript',tier:2,cat:'Language',desc:'The shared language across the stack — React UIs, dynamic interfaces and browser logic.',rel:['react','node','html5','css3']},
 {id:'drf',name:'Django REST Framework',tier:2,serif:true,cat:'API Layer',desc:'Exposes the service-desk domain as REST endpoints, consumed by the React frontend via Axios.',rel:['django','react','postman','python']},
 {id:'postgresql',name:'PostgreSQL',tier:2,cat:'Database',desc:'Primary relational database of the IT Service Desk, managed through Django ORM.',rel:['django','python','mongodb']},
 {id:'mongodb',name:'MongoDB',tier:2,serif:true,cat:'Database',desc:'NoSQL database experience — modelling and managing document data.',rel:['node','postgresql']},
 {id:'node',name:'Node.js',tier:2,cat:'Runtime',desc:'JavaScript runtime rounding out the backend toolset.',rel:['javascript','mongodb']},
 {id:'tailwind',name:'Tailwind CSS',tier:2,cat:'Style',desc:'Utility-first styling used across frontend builds.',rel:['css3','react','html5']},
 {id:'router',name:'React Router',tier:2,serif:true,cat:'React Tool',desc:'Client-side routing across the React views I build.',rel:['react','context']},
 {id:'context',name:'Context API',tier:3,cat:'React Tool',desc:'Lightweight global state without extra libraries.',rel:['react','router','state']},
 {id:'state',name:'State Management',tier:3,cat:'React Tool',desc:'Predictable app state across components and views.',rel:['context','react']},
 {id:'html5',name:'HTML5',tier:3,cat:'Markup',desc:'Semantic structure for responsive interfaces across every project.',rel:['css3','javascript']},
 {id:'css3',name:'CSS3',tier:3,cat:'Style',desc:'Layout systems, responsive design and interface polish.',rel:['html5','tailwind','javascript']},
 {id:'github',name:'GitHub',tier:3,cat:'Tool',desc:'Version control and collaboration across every project.',rel:['vscode','netlify']},
 {id:'vscode',name:'VS Code',tier:3,cat:'Tool',desc:'Daily editor for Django and React development.',rel:['github','postman']},
 {id:'netlify',name:'Netlify',tier:3,cat:'Platform',desc:'Deployment pipeline for frontend builds.',rel:['github']},
 {id:'postman',name:'Postman',tier:3,cat:'Tool',desc:'API testing and debugging of REST endpoints and application workflows.',rel:['drf','vscode']}
];
const TECH_NY=[-22,14,-10,26,-18,12,-26,18,-14,22,-12,16,-20,12,-24,14,-16,18];
const CERTS=[
 {title:'The Complete Full Stack Web Development Bootcamp',org:'Udemy — Dr. Angela Yu',tag:'Certified Course',note:'End-to-end full stack track covering frontend and backend development.',len:'62 TOTAL HRS',date:'APR 14, 2026',link:'https://ude.my/UC-68ebe94b-cbe4-46db-b958-0f966df5c611'},
 {title:'React.js for Ecommerce',org:'Udemy — Meta Brains',tag:'Certification',note:'React patterns applied to ecommerce interfaces.',len:'3.5 TOTAL HRS',date:'APR 14, 2026',link:'https://ude.my/UC-004f49f6-45a7-4f35-a204-c5034ea3ed75'},
 {title:'Python Django Full Stack Development: Build Modern Web App',org:'Udemy — Sayman Creative Institute',tag:'Certification',note:'Modern full-stack web application development with Django.',len:'5.5 TOTAL HRS',date:'JUL 21, 2026',link:'https://ude.my/UC-11b2ebcd-8575-422f-9176-5a09004120ea'},
 {title:'AI & Machine Learning Internship — Completed',org:'Neural Transformers AI, Chennai',tag:'Internship',note:'Completed an AI & Machine Learning internship program.',len:'COMPLETED',date:'—',link:''}
];

function renderData(){
  $('#expList').innerHTML=EXP.map((e,i)=>`
    <li class="exp-item"><h4><span>E.0${i+1}</span>${e.t}</h4><p>${e.d}</p>
    <div class="exp-tags">${e.tags.map(t=>`<i>${t}</i>`).join('')}</div></li>`).join('');
  $('#techWall').innerHTML=TECH.map((t,i)=>
    `<button type="button" class="tech t${t.tier}${t.serif?' t-serif':''}" role="listitem" data-id="${t.id}" style="--ny:${TECH_NY[i]}px" aria-label="${t.name} — ${t.cat}">${t.name}</button>`).join('');
  $('#certList').innerHTML=CERTS.map((c,i)=>`
    <li class="cert">
      <button type="button" class="cert-head" aria-expanded="false">
        <span class="c-num">C.0${i+1}</span><span class="c-title">${c.title}</span><span class="c-org">${c.org}</span>
        <svg class="c-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
      </button>
      <div class="cert-body"><div><div class="cert-doc">
        <div><p class="cd-tag">${c.tag}</p><h3 class="cd-title">${c.title}</h3><p class="cd-note">${c.note}</p>
        ${c.link?`<a class="cd-verify" href="${c.link}" target="_blank" rel="noopener">Verify credential ↗</a>`:''}</div>
        <div class="cd-meta">ISSUED BY<br><span style="color:var(--ink)">${c.org}</span><br>${c.date}<br>${c.len}</div>
        <span class="cd-seal" aria-hidden="true">CERTIFIED<br>— RECORD —</span>
      </div></div></div>
    </li>`).join('');
}
renderData();

/* ---------- toast ---------- */
let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2600);}

/* ---------- theme (dark/light, circular wipe, remembered) ---------- */
(function(){
  const root=document.documentElement,btn=$('#menuBtn');/*placeholder*/
  const tBtn=document.createElement('button');
  tBtn.className='theme-btn';tBtn.type='button';tBtn.setAttribute('aria-label','Toggle dark / light theme');
  tBtn.innerHTML='<svg class="ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7"/></svg><svg class="ic-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.4 14.2A8.3 8.3 0 0 1 9.8 3.6a8.3 8.3 0 1 0 10.6 10.6Z"/></svg>';
  tBtn.style.cssText='position:relative;z-index:5;margin-right:14px;width:44px;height:44px;display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(236,231,220,.3);border-radius:50%';
  tBtn.querySelectorAll('svg').forEach(s=>s.style.cssText='width:17px;height:17px;position:absolute;transition:opacity .3s,transform .5s cubic-bezier(.65,.05,.2,1)');
  const sun=tBtn.querySelector('.ic-sun'),moon=tBtn.querySelector('.ic-moon');
  function sync(){const d=root.dataset.theme==='dark';moon.style.cssText+=d?';opacity:1;transform:none':';opacity:0;transform:rotate(-90deg) scale(.6)';sun.style.cssText+=d?';opacity:0;transform:rotate(90deg) scale(.6)':';opacity:1;transform:none';}
  sync();
  tBtn.addEventListener('click',e=>{
    const next=root.dataset.theme==='dark'?'light':'dark';
    const apply=()=>{root.dataset.theme=next;try{localStorage.setItem('st-theme',next);}catch(err){} sync();};
    if(document.startViewTransition&&!REDUCED){
      const x=e.clientX||innerWidth-40,y=e.clientY||40;
      const vt=document.startViewTransition(apply);
      vt.ready.then(()=>{
        const r=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
        root.animate({clipPath:['circle(0px at '+x+'px '+y+'px)','circle('+r+'px at '+x+'px '+y+'px)']},
          {duration:650,easing:'cubic-bezier(.65,.05,.2,1)',pseudoElement:'::view-transition-new(root)'});
      }).catch(()=>{});
    }else apply();
    toast(next==='dark'?'DARK MODE —':'LIGHT MODE —');
  });
  $('.header').insertBefore(tBtn,$('#menuBtn'));
})();

/* ---------- IST clock ---------- */
(function(){
  const els=$$('.js-clock');if(!els.length)return;
  const f=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone:'Asia/Kolkata'});
  const tick=()=>{const s=f.format(new Date());els.forEach(e=>e.textContent=s);};
  tick();setInterval(tick,1000);
})();

/* ---------- marquee clone ---------- */
(function(){const t=$('#mqTrack'),g=t&&t.firstElementChild;if(g)for(let i=0;i<3;i++)t.appendChild(g.cloneNode(true));})();

/* ---------- smooth scroll ---------- */
let lenis=null;
if(!REDUCED&&typeof Lenis!=='undefined'&&FINE){
  lenis=new Lenis({duration:1.15,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});
  lenis.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(t=>lenis.raf(t*1000));
  gsap.ticker.lagSmoothing(0);
}
function goTo(target){
  const el=typeof target==='string'?$(target):target;if(!el)return;
  if(lenis)lenis.scrollTo(el,{duration:1.5});
  else el.scrollIntoView({behavior:REDUCED?'auto':'smooth'});
}
 $$('[data-goto]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();goTo(a.dataset.goto);}));
 $('#toTop').addEventListener('click',()=>{if(lenis)lenis.scrollTo(0,{duration:1.6});else window.scrollTo({top:0,behavior:REDUCED?'auto':'smooth'});});

/* ---------- cursor ring — always visible, rAF, no deps ---------- */
(function(){
  if(!FINE)return;
  document.body.classList.add('has-cursor');
  const cursor=$('.cursor'),ring=$('.cursor-ring'),label=$('.cursor-label');
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;},{passive:true});
  (function loop(){
    rx+=(mx-rx)*.18;ry+=(my-ry)*.18;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover',e=>{
    const v=e.target.closest('[data-cursor]');
    const l=e.target.closest('a,button');
    cursor.classList.remove('is-view','is-link');
    if(v){label.textContent=v.dataset.cursor==='view'?'VIEW':(v.dataset.cursor||'').toUpperCase();cursor.classList.add('is-view');}
    else if(l)cursor.classList.add('is-link');
  });
  document.addEventListener('mousedown',()=>cursor.classList.add('is-down'));
  document.addEventListener('mouseup',()=>cursor.classList.remove('is-down'));
})();

/* ---------- menu ---------- */
const menu=$('#menu'),menuBtn=$('#menuBtn'),header=$('#header');
let menuTl=null,menuOpen=false;
if(!REDUCED){
  menuTl=gsap.timeline({paused:true,
    onReverseComplete:()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');}})
    .fromTo(menu,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:.85,ease:'power4.inOut'})
    .from('.menu-item .mi-word > span',{yPercent:130,duration:.9,stagger:.06},'-=0.32')
    .from('.menu-item .mi-num',{opacity:0,x:-16,duration:.5,stagger:.06},'<0.04')
    .from('.menu-item .mi-tag',{opacity:0,duration:.4,stagger:.05},'<0.18')
    .from('.menu-foot > *',{y:14,opacity:0,duration:.5,stagger:.05},'-=0.6');
}
function setMenu(open){
  menuOpen=open;
  menuBtn.setAttribute('aria-expanded',String(open));
  menuBtn.setAttribute('aria-label',open?'Close menu':'Open menu');
  if(REDUCED){menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));if(lenis){open?lenis.stop():lenis.start();}return;}
  if(open){menu.classList.add('open');menu.setAttribute('aria-hidden','false');if(lenis)lenis.stop();menuTl.timeScale(1).play();const f=$('.menu-item');if(f)f.focus({preventScroll:true});}
  else{if(lenis)lenis.start();menuTl.timeScale(1.4).reverse();}
}
menuBtn.addEventListener('click',()=>setMenu(!menuOpen));
addEventListener('keydown',e=>{if(e.key==='Escape'&&menuOpen)setMenu(false);});
 $$('.menu-item').forEach(item=>{
  item.addEventListener('click',e=>{
    e.preventDefault();const h=item.getAttribute('href');
    setMenu(false);setTimeout(()=>goTo(h),REDUCED?0:480);
  });
});

/* ==========================================================
   INTRO — cinematic title sequence
========================================================== */
const heroIntro=REDUCED?null:gsap.timeline({paused:true,defaults:{ease:'power4.out'}})
  .from('.header > *',{y:-18,opacity:0,duration:.7,stagger:.08})
  .from('#hero .hero-kicker',{y:18,opacity:0,duration:.6},'-=0.4')
  .from('.ht-row .mask > span',{yPercent:116,duration:1.15,stagger:.12},'-=0.35')
  .from('.hr-rule',{scaleX:0,duration:.7,ease:'power3.inOut'},'-=0.7')
  .from('.hero-role p, .hero-stack',{y:22,opacity:0,duration:.7,stagger:.1},'-=0.5')
  .fromTo('.portrait',{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)',duration:1.1,ease:'power4.inOut'},0.4)
  .from('#heroImg',{scale:1.18,duration:1.4},0.4)
  .from('.hm-block',{y:16,opacity:0,duration:.6,stagger:.12},'-=0.9')
  .from('.hero-side, .hero-scroll, .hero-index, .mtl',{opacity:0,duration:.8,stagger:.1},'-=0.6');

let introDone=false;
function finishIntro(fast){
  if(introDone)return;introDone=true;
  const intro=$('#intro');if(!intro)return;
  document.body.classList.remove('is-loading');
  if(lenis)lenis.start();
  if(heroIntro)heroIntro.timeScale(fast?2.4:1).play();
  intro.remove();
  ScrollTrigger.refresh();
}
(function initIntro(){
  const skip=$('#intro .intro-skip');
  if(REDUCED){finishIntro(false);return;}
  document.body.classList.add('is-loading');
  if(lenis)lenis.stop();
  if(skip)skip.addEventListener('click',()=>{introTl&&introTl.kill();finishIntro(true);});
  const introTl=gsap.timeline({onComplete:()=>finishIntro(false)});
  introTl.from('.intro-ambient',{opacity:0,scale:.7,duration:1.3,ease:'power2.inOut'})
    .from('.intro-corner',{opacity:0,y:10,duration:.6,stagger:.1},'-=0.9')
    .from('.intro-name .mask > span',{yPercent:118,duration:1.1,stagger:.14},'-=0.4')
    .fromTo('.in-l1',{letterSpacing:'.16em'},{letterSpacing:'.01em',duration:1.2,ease:'power3.out'},'<')
    .fromTo('.in-l2',{letterSpacing:'.16em'},{letterSpacing:'.01em',duration:1.2,ease:'power3.out'},'<')
    .fromTo('.intro-sweep',{xPercent:-110},{xPercent:210,duration:1,ease:'power2.inOut'},'-=0.35')
    .fromTo('.intro-portrait',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:1,ease:'power3.inOut'},'<')
    .to('.intro-portrait',{clipPath:'inset(0 0 0 100%)',duration:.7,ease:'power3.inOut'},'+=0.45')
    .to('.intro-corner',{opacity:0,y:-12,duration:.4,stagger:.05},'-=0.2')
    .to('.intro-name .mask > span',{yPercent:-118,duration:.7,stagger:.08,ease:'power3.in'},'-=0.3')
    .to('.intro-ambient',{opacity:0,duration:.7},'-=0.5')
    .to('#intro',{clipPath:'inset(0 0 100% 0)',duration:1,ease:'power4.inOut'},'-=0.2');
})();

/* ==========================================================
   TECHNOLOGY WALL — constellation + reader
========================================================== */
(function(){
  const wall=$('#techWall'),svg=$('#wallSvg'),NS='http://www.w3.org/2000/svg';
  const centers=new Map();
  function measure(){
    centers.clear();
    const wr=wall.getBoundingClientRect();
    $$('.tech',wall).forEach(el=>{const r=el.getBoundingClientRect();centers.set(el,{x:r.left-wr.left+r.width/2,y:r.top-wr.top+r.height/2});});
  }
  function drawLines(sel){
    svg.innerHTML='';
    const t=TECH.find(x=>x.id===sel.dataset.id);
    const a=centers.get(sel);if(!a)return;
    t.rel.forEach(rid=>{
      const el=wall.querySelector(`[data-id="${rid}"]`);const b=centers.get(el);
      if(!b)return;
      const line=document.createElementNS(NS,'line');
      line.setAttribute('x1',a.x);line.setAttribute('y1',a.y);line.setAttribute('x2',b.x);line.setAttribute('y2',b.y);
      svg.appendChild(line);
      const len=Math.hypot(b.x-a.x,b.y-a.y);
      line.style.strokeDasharray=len;line.style.strokeDashoffset=len;
      requestAnimationFrame(()=>{line.style.transition='stroke-dashoffset .65s cubic-bezier(.6,0,.3,1)';line.style.strokeDashoffset='0';});
    });
  }
  function select(el){
    const t=TECH.find(x=>x.id===el.dataset.id);
    $$('.tech',wall).forEach(s=>{
      const id=s.dataset.id,rel=t.rel.includes(id);
      s.classList.toggle('is-active',s===el);
      s.classList.toggle('is-related',rel&&s!==el);
      s.classList.toggle('is-dim',s!==el&&!rel);
    });
    drawLines(el);
    $('#wrCat').textContent=t.cat;$('#wrName').textContent=t.name;$('#wrDesc').textContent=t.desc;
    $('#wrRel').innerHTML=t.rel.map(r=>{const rt=TECH.find(x=>x.id===r);return rt?`<button type="button" data-rel="${r}">${rt.name}</button>`:'';}).join('');
  }
  $$('.tech',wall).forEach(el=>{
    el.addEventListener('mouseenter',()=>{measure();select(el);});
    el.addEventListener('focus',()=>{measure();select(el);});
    el.addEventListener('click',()=>{measure();select(el);}); /* mobile tap */
  });
  $('#wrRel').addEventListener('click',e=>{
    const b=e.target.closest('[data-rel]');if(!b)return;
    const el=wall.querySelector(`[data-id="${b.dataset.rel}"]`);measure();if(el)select(el);
  });
  if(FINE&&!REDUCED){
    let raf=0;
    wall.addEventListener('pointermove',e=>{
      if(raf)return;
      raf=requestAnimationFrame(()=>{
        raf=0;const wr=wall.getBoundingClientRect();
        const mx=e.clientX-wr.left,my=e.clientY-wr.top;
        centers.forEach((c,el)=>{
          const dx=c.x-mx,dy=c.y-my,d=Math.hypot(dx,dy)||1;
          const f=Math.max(0,1-d/380);
          el.style.setProperty('--px',(dx/d*f*11)+'px');
          el.style.setProperty('--py',(dy/d*f*9)+'px');
        });
      });
    });
    wall.addEventListener('pointerleave',()=>$$('.tech',wall).forEach(el=>{el.style.setProperty('--px','0px');el.style.setProperty('--py','0px');}));
  }
  addEventListener('resize',measure);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
})();

/* ---------- certifications accordion ---------- */
 $('#certList').addEventListener('click',e=>{
  const head=e.target.closest('.cert-head');if(!head)return;
  const li=head.parentElement,isOpen=li.classList.contains('open');
  $$('#certList .cert.open').forEach(c=>{c.classList.remove('open');$('.cert-head',c).setAttribute('aria-expanded','false');});
  if(!isOpen){
    li.classList.add('open');head.setAttribute('aria-expanded','true');
    if(!REDUCED)gsap.from($('.cert-doc',li),{y:26,rotate:.4,opacity:0,duration:.7});
  }
});

/* ==========================================================
   TOUCH — glow + hero dots (mobile cinema)
========================================================== */
(function(){
  if(FINE)return;
  const glow=$('.touch-glow'),hero=$('#hero');
  let fade;
  hero.addEventListener('touchmove',e=>{
    const t=e.touches[0];
    glow.style.left=t.clientX+'px';glow.style.top=t.clientY+'px';
    glow.style.opacity='1';
    clearTimeout(fade);fade=setTimeout(()=>glow.style.opacity='0',420);
  },{passive:true});
  hero.addEventListener('touchend',()=>{fade=setTimeout(()=>glow.style.opacity='0',300);});
  const dots=$$('.mtl i');
  ScrollTrigger.create({trigger:'#hero',start:'top top',end:'bottom top',scrub:true,
    onUpdate:s=>{const i=Math.min(2,Math.floor(s.progress*3));dots.forEach((d,j)=>d.classList.toggle('on',j<=i));}});
})();

/* ==========================================================
   DESKTOP — hero parallax depth layers
========================================================== */
if(FINE&&!REDUCED){
  const layers=$$('#hero [data-depth]').map(el=>({
    d:parseFloat(el.dataset.depth),
    x:gsap.quickTo(el,'x',{duration:1,ease:'power3'}),
    y:gsap.quickTo(el,'y',{duration:1,ease:'power3'})
  }));
  const gx=gsap.quickTo('#heroGlow','x',{duration:1.4,ease:'power3'});
  const gy=gsap.quickTo('#heroGlow','y',{duration:1.4,ease:'power3'});
  const grx=gsap.quickTo('#heroGrid','x',{duration:1.2,ease:'power3'});
  const gry=gsap.quickTo('#heroGrid','y',{duration:1.2,ease:'power3'});
  $('#hero').addEventListener('mousemove',e=>{
    const nx=e.clientX/innerWidth-.5,ny=e.clientY/innerHeight-.5;
    layers.forEach(l=>{l.x(nx*320*l.d);l.y(ny*240*l.d);});
    gx(nx*160);gy(ny*120);grx(nx*-14);gry(ny*-10);
  });
  $$('.magnetic').forEach(el=>{
    const qx=gsap.quickTo(el,'x',{duration:.4,ease:'power3'}),qy=gsap.quickTo(el,'y',{duration:.4,ease:'power3'});
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();qx((e.clientX-r.left-r.width/2)*.28);qy((e.clientY-r.top-r.height/2)*.34);});
    el.addEventListener('mouseleave',()=>{gsap.to(el,{x:0,y:0,duration:.7,ease:'elastic.out(1,.45)'});});
  });
}

/* ==========================================================
   SCROLL FX — desktop + mobile (case study pinned on BOTH)
========================================================== */
const mm=gsap.matchMedia();
mm.add({desktop:'(min-width: 900px)',mobile:'(max-width: 899.98px)'},(ctx)=>{
  const desktop=ctx.conditions.desktop;

  /* progress */
  gsap.to('.rail-fill',{scaleY:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3,onUpdate:s=>{$('.rail-num').textContent=Math.round(s.progress*100)+'%';}}});
  gsap.to('.mbar i',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});

  /* section headers */
  $$('.sec-head').forEach(h=>gsap.from(h.children,{y:22,opacity:0,duration:.8,stagger:.08,scrollTrigger:{trigger:h,start:'top 86%'}}));

  /* hero exit */
  gsap.timeline({scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}})
    .to('.hero-type',{yPercent:desktop?-16:-9,ease:'none'},0)
    .to('.hero-photo',{yPercent:desktop?9:14,scale:.95,ease:'none'},0)
    .to('.hero-meta, .hero-side, .hero-scroll, .hero-index, .mtl',{opacity:0,ease:'none'},0)
    .to('.hero-glow',{opacity:0,ease:'none'},0);

  /* about */
  gsap.from('.as-line:nth-child(1) .w',{x:-70,opacity:0,stagger:.08,duration:1,scrollTrigger:{trigger:'.about-statement',start:'top 78%'}});
  gsap.from('.as-line:nth-child(2) .w',{x:110,opacity:0,duration:1.1,scrollTrigger:{trigger:'.about-statement',start:'top 72%'}});
  gsap.from('.as-line:nth-child(3) .w',{x:-40,opacity:0,duration:1,scrollTrigger:{trigger:'.about-statement',start:'top 66%'}});
  gsap.from('.about-fig, .about-copy, .about-strengths',{y:44,opacity:0,duration:1,stagger:.14,scrollTrigger:{trigger:'.about-grid',start:'top 82%'}});
  gsap.from('.about-stats',{y:36,opacity:0,duration:.9,scrollTrigger:{trigger:'.about-stats',start:'top 88%'}});
  $$('[data-count]').forEach(el=>{
    const target=+el.dataset.count,o={v:0};
    gsap.to(o,{v:target,duration:1.6,ease:'power2.out',snap:{v:1},onUpdate:()=>{el.textContent=String(Math.round(o.v)).padStart(2,'0');},
      scrollTrigger:{trigger:el,start:'top 88%'}});
  });

  /* experience */
  gsap.from('.exp-sticky > *',{y:30,opacity:0,stagger:.1,duration:.9,scrollTrigger:{trigger:'.exp-grid',start:'top 75%'}});
  gsap.fromTo('.et-fill',{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:'.exp-tl',start:'top 72%',end:'bottom 62%',scrub:true}});
  $$('.exp-item').forEach(it=>{
    gsap.from(it,{y:34,opacity:0,duration:.8,scrollTrigger:{trigger:it,start:'top 84%',onEnter:()=>it.classList.add('is-pass')}});
  });
  gsap.from('.exp-impact',{y:30,opacity:0,duration:.9,scrollTrigger:{trigger:'.exp-impact',start:'top 85%'}});

  /* technology wall entrance */
  gsap.from('.tech',{y:26,opacity:0,duration:.7,stagger:.035,scrollTrigger:{trigger:'.wall',start:'top 85%'}});
  gsap.from('.wall-reader > *',{y:20,opacity:0,duration:.8,stagger:.1,scrollTrigger:{trigger:'.wall-reader',start:'top 88%'}});

  /* ============ HORIZONTAL CASE STUDY — pinned on desktop AND mobile ============ */
  const track=$('#caseTrack');
  const dist=()=>track.scrollWidth-innerWidth;
  const horiz=gsap.to(track,{x:()=>-dist(),ease:'none',scrollTrigger:{
    trigger:'#casePin',start:'top top',end:()=>'+='+dist(),
    pin:true,scrub:1,anticipatePin:1,invalidateOnRefresh:true,
    onUpdate:s=>{
      gsap.set('#caseFill',{scaleX:s.progress});
      $('#caseIdx').textContent=String(1+Math.round(s.progress*7)).padStart(2,'0');
    }
  }});
  $$('.case-track .rv').forEach(el=>{
    gsap.from(el,{y:desktop?38:28,opacity:0,duration:.85,
      scrollTrigger:{trigger:el,containerAnimation:horiz,start:'left 85%',once:true}});
  });
  /* architecture draw */
  $$('.arch .edge:not(.flow)').forEach(p=>{const l=p.getTotalLength();gsap.set(p,{strokeDasharray:l,strokeDashoffset:l});});
  gsap.to('.arch .edge:not(.flow)',{strokeDashoffset:0,stagger:.1,ease:'none',
    scrollTrigger:{trigger:'.p-arch',containerAnimation:horiz,start:'left 70%',end:'left 15%',scrub:true}});
  gsap.from('.arch-node',{opacity:0,y:12,stagger:.09,duration:.6,
    scrollTrigger:{trigger:'.p-arch',containerAnimation:horiz,start:'left 60%',once:true}});
  /* workflow — fills as the panel crosses the screen */
  const wfItems=$$('#wf li'),wfFill=$('#wfFill');
  ScrollTrigger.create({trigger:'.p-workflow',containerAnimation:horiz,start:'left 65%',end:'right 35%',scrub:true,
    onUpdate:s=>{
      gsap.set(wfFill,{scaleY:s.progress});
      wfItems.forEach((li,i)=>li.classList.toggle('is-on',s.progress>=(i+.6)/8));
    }});
  /* admin console bars */
  gsap.from('#mockChart i',{scaleY:.15,transformOrigin:'bottom',stagger:.05,duration:.7,
    scrollTrigger:{trigger:'.mock',containerAnimation:horiz,start:'left 70%',once:true}});

  /* railway */
  gsap.from('#projRailway h3',{y:40,opacity:0,duration:1,scrollTrigger:{trigger:'#projRailway',start:'top 80%'}});
  gsap.fromTo('.pr-media',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',ease:'none',
    scrollTrigger:{trigger:'#projRailway',start:desktop?'top 70%':'top 85%',end:desktop?'top 15%':'top 35%',scrub:true}});
  gsap.fromTo('#railImg',{scale:1.22,xPercent:-4},{scale:1.04,xPercent:0,ease:'none',
    scrollTrigger:{trigger:'#projRailway',start:'top 85%',end:'bottom 30%',scrub:true}});
  gsap.from('#projRailway .pr-info',{y:36,opacity:0,duration:.9,scrollTrigger:{trigger:'#projRailway .pr-body',start:'top 78%'}});

  /* stock viz */
  gsap.from('.viz',{y:44,opacity:0,duration:1,scrollTrigger:{trigger:'#projStocks .ps-body',start:'top 78%'}});
  $$('.viz-draw').forEach(p=>{
    const len=p.getTotalLength();
    gsap.set(p,{strokeDasharray:len,strokeDashoffset:len});
    gsap.to(p,{strokeDashoffset:0,ease:'none',stagger:.2,scrollTrigger:{trigger:'.viz',start:'top 75%',end:'top 30%',scrub:true}});
  });
  gsap.from('#projStocks .pr-info',{y:36,opacity:0,duration:.9,scrollTrigger:{trigger:'#projStocks .ps-body',start:'top 78%'}});

  /* education / certs / contact */
  gsap.from('.edu > *',{y:30,opacity:0,duration:.9,stagger:.12,scrollTrigger:{trigger:'.edu',start:'top 80%'}});
  gsap.from('.cert',{y:26,opacity:0,duration:.7,stagger:.09,scrollTrigger:{trigger:'.cert-list',start:'top 85%'}});
  gsap.from('.contact-title .ct-l > span',{yPercent:118,duration:1.1,stagger:.12,scrollTrigger:{trigger:'#contact',start:'top 70%'}});
  gsap.from('.contact-sub',{y:24,opacity:0,duration:.9,scrollTrigger:{trigger:'.contact-sub',start:'top 88%'}});
  gsap.from('.contact-ctas .btn',{y:26,opacity:0,stagger:.1,duration:.8,scrollTrigger:{trigger:'.contact-ctas',start:'top 88%'}});
  gsap.from('.contact-meta',{opacity:0,y:20,duration:.8,scrollTrigger:{trigger:'.contact-meta',start:'top 92%'}});

  /* finale — pinned credits (both) */
  gsap.timeline({scrollTrigger:{trigger:'#finale',start:'top top',end:'+=130%',pin:true,scrub:true,anticipatePin:1}})
    .to('.bar-top',{scaleY:1,duration:.3,ease:'power2.inOut'},0)
    .to('.bar-bottom',{scaleY:1,duration:.3,ease:'power2.inOut'},0)
    .fromTo('.finale-portrait',{clipPath:'inset(38% 22% 38% 22%)'},{clipPath:'inset(4% 4% 4% 4%)',duration:.5,ease:'power3.inOut'},.1)
    .fromTo('#finaleImg',{scale:1.3},{scale:1.02,duration:.9,ease:'none'},0)
    .from('.ft-thanks',{opacity:0,y:16,duration:.3},.35)
    .from('.ft-name',{opacity:0,y:30,duration:.4},.42)
    .from('.ft-role',{opacity:0,y:16,duration:.3},.5)
    .from('.finale-social a',{opacity:0,y:14,duration:.3,stagger:.06},.58)
    .from('.footer',{opacity:0,duration:.3},.7);

  /* header scene indicator + menu sync */
  const siNum=$('.si-num'),siName=$('.si-name');
  function setIndicator(num,name){
    if(siName.textContent===name)return;
    siNum.textContent=num;siName.textContent=name;
    gsap.fromTo([siNum,siName],{y:10,opacity:0},{y:0,opacity:1,duration:.45,stagger:.05});
  }
  [['hero',null,null],['about','01','ABOUT'],['experience','02','EXPERIENCE'],['technology','03','TECHNOLOGY'],
   ['work','04','WORK'],['education','05','EDUCATION'],['certifications','06','CREDENTIALS'],['contact','07','CONTACT']]
  .forEach(([id,num,name])=>{
    ScrollTrigger.create({trigger:'#'+id,start:'top 55%',end:'bottom 55%',
      onToggle:s=>{if(s.isActive){
        header.classList.toggle('is-dim',id==='hero');
        if(num)setIndicator(num,name);
        $$('.menu-item').forEach(mi=>mi.classList.toggle('is-active',mi.dataset.sec===id));
      }}});
  });
  ScrollTrigger.create({trigger:'#finale',start:'top 60%',
    onEnter:()=>header.classList.add('is-hidden'),onLeaveBack:()=>header.classList.remove('is-hidden')});
});

addEventListener('load',()=>ScrollTrigger.refresh());
})();