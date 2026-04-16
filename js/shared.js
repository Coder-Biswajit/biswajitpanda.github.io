/* ============ CURSOR ============ */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
if (dot && ring) {
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; });
  (function loop(){
    rx+=(mx-rx)*.13; ry+=(my-ry)*.13;
    dot.style.left=mx+'px'; dot.style.top=my+'px';
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.proj-card,.skill-category,.highlight-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ ring.style.width='50px'; ring.style.height='50px'; ring.style.borderColor='rgba(14,165,233,.65)'; });
    el.addEventListener('mouseleave',()=>{ ring.style.width='34px'; ring.style.height='34px'; ring.style.borderColor='rgba(56,189,248,.45)'; });
  });
}

/* ============ SCROLL PROGRESS & NAV ============ */
window.addEventListener('scroll',()=>{
  const sb = document.getElementById('scroll-bar');
  if(sb){ const p=window.scrollY/(document.body.scrollHeight-window.innerHeight)*100; sb.style.width=p+'%'; }
  const nav = document.getElementById('navbar');
  if(nav) nav.classList.toggle('scrolled',window.scrollY>50);
});

/* ============ SCROLL REVEAL ============ */
const revObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

/* ============ SKILL BARS ============ */
const skillObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-bar-fill[data-pct]').forEach((b,i)=>{
        setTimeout(()=>{ b.style.width=b.dataset.pct+'%'; },i*75);
      });
      e.target.querySelectorAll('.progress-mini-fill[data-pct]').forEach((b,i)=>{
        setTimeout(()=>{ b.style.width=b.dataset.pct+'%'; },i*85+100);
      });
    }
  });
},{threshold:.12});
document.querySelectorAll('.skill-category,.learning-panel').forEach(el=>skillObs.observe(el));

/* ============ SMOOTH SCROLL ============ */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

/* ============ COUNTER ============ */
function animateCounter(el){
  const target=+el.dataset.target; let cur=0; const step=target/55;
  const t=setInterval(()=>{
    cur=Math.min(cur+step,target);
    el.textContent=Math.floor(cur);
    if(cur>=target){ el.textContent=target+'+'; clearInterval(t); }
  },22);
}
const cntObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.querySelectorAll('.counter').forEach(animateCounter); cntObs.unobserve(e.target); } });
},{threshold:.3});
document.querySelectorAll('.hero-stats').forEach(el=>cntObs.observe(el));