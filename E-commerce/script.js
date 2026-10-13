const P=[
{id:1,n:"Brass diya set",c:"Decor",p:699,e:"🪔",t:"#f6e2b3",d:"Set of four hand-cast brass lamps with a warm antique finish."},
{id:2,n:"Terracotta planter",c:"Decor",p:449,e:"🪴",t:"#f2cdb8",d:"Wheel-thrown clay planter with a drainage hole and saucer."},
{id:3,n:"Kalamkari cushion cover",c:"Textiles",p:549,e:"🛋️",t:"#cfe3f2",d:"Hand-painted cotton cover in natural dyes, fits a 16 inch cushion."},
{id:4,n:"Cotton table runner",c:"Textiles",p:799,e:"🧵",t:"#d9eadb",d:"Handwoven cotton runner with a temple-border pattern, 180 cm long."},
{id:5,n:"Filter coffee tumbler",c:"Kitchen",p:1199,e:"☕",t:"#ead7c6",d:"Stainless steel davara and tumbler set for proper south Indian filter coffee."},
{id:6,n:"Clay cooking pot",c:"Kitchen",p:899,e:"🍲",t:"#f0d3c4",d:"Unglazed manchatti pot for slow-cooked curries and meen kuzhambu."},
{id:7,n:"Cane storage basket",c:"Storage",p:649,e:"🧺",t:"#efe3bd",d:"Woven cane basket with a lid, good for laundry or toys."},
{id:8,n:"Palm-leaf organiser",c:"Storage",p:349,e:"📦",t:"#dfe8c8",d:"Lightweight palm-leaf box set in three sizes."}];
const $=s=>document.querySelector(s);
let cat="All",cart={};
try{cart=JSON.parse(localStorage.getItem("kh-cart")||"{}")}catch(e){}
const save=()=>{try{localStorage.setItem("kh-cart",JSON.stringify(cart))}catch(e){}};
const rs=n=>"₹"+n.toLocaleString("en-IN");
function toast(m){const t=$("#toast");t.textContent=m;t.style.display="block";clearTimeout(t.h);t.h=setTimeout(()=>t.style.display="none",2000)}
function chips(){const cs=["All",...new Set(P.map(p=>p.c))];$("#cats").innerHTML=cs.map(c=>`<button class="chip" aria-pressed="${c==cat}" data-c="${c}">${c}</button>`).join("")}
function list(){
 const q=$("#q").value.trim().toLowerCase(),s=$("#sort").value;
 let a=P.filter(p=>(cat=="All"||p.c==cat)&&(p.n+" "+p.d).toLowerCase().includes(q));
 if(s=="lo")a.sort((x,y)=>x.p-y.p);if(s=="hi")a.sort((x,y)=>y.p-x.p);
 $("#grid").innerHTML=a.length?a.map(p=>`<div class="card"><div class="pic" style="background:${p.t}" data-v="${p.id}" role="button" tabindex="0" aria-label="View ${p.n}">${p.e}</div><div class="info"><span class="cat">${p.c}</span><h3>${p.n}</h3><span class="price">${rs(p.p)}</span><button data-a="${p.id}">Add to cart</button></div></div>`).join(""):`<div class="empty">No products match “${q}”. Try another word or clear the category.</div>`}
function add(id){cart[id]=(cart[id]||0)+1;save();draw();toast("Added to cart")}
function draw(){
 const ids=Object.keys(cart);$("#cnt").textContent=ids.reduce((s,i)=>s+cart[i],0);
 let tot=0;
 $("#items").innerHTML=ids.length?ids.map(i=>{const p=P.find(x=>x.id==i);tot+=p.p*cart[i];return `<div class="row"><span>${p.e}</span><span class="n">${p.n}<br><span class="cat">${rs(p.p)}</span></span><span class="q"><button data-m="${i}" aria-label="Decrease">−</button> ${cart[i]} <button data-p="${i}" aria-label="Increase">+</button></span></div>`}).join(""):`<p class="cat">Your cart is empty. Add something from the shop.</p>`;
 $("#total").textContent=rs(tot);$("#checkout").disabled=!ids.length}
document.addEventListener("click",e=>{
 const t=e.target.closest("button,.pic");if(!t)return;const d=t.dataset;
 if(d.c){cat=d.c;chips();list()}
 if(d.a)add(+d.a);
 if(d.v)openD(+d.v);
 if(d.p){cart[d.p]++;save();draw()}
 if(d.m){if(--cart[d.m]<=0)delete cart[d.m];save();draw()}
});
document.addEventListener("keydown",e=>{if(e.key=="Enter"&&e.target.dataset.v)openD(+e.target.dataset.v)});
let cur=0;
function openD(id){const p=P.find(x=>x.id==id);cur=id;$("#dPic").textContent=p.e;$("#dName").textContent=p.n;$("#dCat").textContent=p.c;$("#dDesc").textContent=p.d;$("#dPrice").textContent=rs(p.p);$("#detail").showModal()}
$("#dAdd").onclick=()=>{add(cur);$("#detail").close()};$("#dClose").onclick=()=>$("#detail").close();
$("#cartBtn").onclick=()=>{draw();$("#cart").showModal()};$("#cClose").onclick=()=>$("#cart").close();
$("#checkout").onclick=()=>{cart={};save();draw();$("#cart").close();toast("Order placed. Thank you!")};
$("#q").oninput=list;$("#sort").onchange=list;
$("#theme").onclick=()=>{const r=document.documentElement,dark=r.dataset.theme?r.dataset.theme=="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=dark?"light":"dark"};
chips();list();draw();