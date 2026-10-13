const J=[
{id:1,t:"Frontend Developer",co:"Zenpixel",loc:"Chennai",type:"Full-time",min:1,pay:"₹6–9 LPA",sk:["HTML","CSS","JavaScript","React"],d:"Build responsive interfaces for our retail dashboards.",r:["Solid HTML, CSS and JavaScript","Comfort with Git","Eye for layout and detail"]},
{id:2,t:"Web Development Intern",co:"LearnVistix",loc:"Remote",type:"Internship",min:0,pay:"₹10k / month",sk:["HTML","CSS","JavaScript"],d:"Work with mentors on real client pages for three months.",r:["Basics of HTML, CSS and JS","Willingness to learn","Portfolio or GitHub link"]},
{id:3,t:"Backend Engineer",co:"Cloudnest",loc:"Bengaluru",type:"Full-time",min:3,pay:"₹14–20 LPA",sk:["Node.js","SQL","APIs"],d:"Design and maintain REST APIs that serve millions of requests.",r:["3+ years with Node.js or similar","Strong SQL","Experience with testing"]},
{id:4,t:"UI/UX Designer",co:"Pixelhut",loc:"Coimbatore",type:"Full-time",min:1,pay:"₹5–8 LPA",sk:["Figma","Prototyping","Research"],d:"Own design for our mobile apps from wireframe to handoff.",r:["Figma portfolio","Understanding of design systems","Clear communication"]},
{id:5,t:"Data Analyst",co:"Insightly",loc:"Chennai",type:"Full-time",min:0,pay:"₹4–6 LPA",sk:["Excel","SQL","Python"],d:"Turn sales data into weekly reports and dashboards.",r:["SQL and Excel","Python is a plus","Curiosity about numbers"]},
{id:6,t:"Content Writer",co:"Bytebrew",loc:"Remote",type:"Part-time",min:0,pay:"₹15k / month",sk:["Writing","SEO"],d:"Write clear tutorials and blog posts on web development.",r:["Strong written English","Basic SEO","Samples of your work"]},
{id:7,t:"Full Stack Developer",co:"Orbitly",loc:"Bengaluru",type:"Full-time",min:3,pay:"₹16–24 LPA",sk:["React","Node.js","MongoDB"],d:"Ship features end to end for our logistics platform.",r:["3+ years full stack","React and Node.js","Ownership mindset"]},
{id:8,t:"QA Intern",co:"Zenpixel",loc:"Chennai",type:"Internship",min:0,pay:"₹8k / month",sk:["Testing","Attention to detail"],d:"Test new releases on web and mobile and report bugs.",r:["Careful and methodical","Basic web knowledge","Good written reports"]}];
const $=s=>document.querySelector(s);
let sel=null,apps={};
try{apps=JSON.parse(localStorage.getItem("cb-apps")||"{}")}catch(e){}
$("#loc").insertAdjacentHTML("beforeend",[...new Set(J.map(j=>j.loc))].map(l=>`<option>${l}</option>`).join(""));
function match(j){
 const q=$("#q").value.trim().toLowerCase(),t=$("#type").value,l=$("#loc").value,x=$("#exp").value;
 if(q&&!(j.t+" "+j.co+" "+j.sk.join(" ")).toLowerCase().includes(q))return 0;
 if(t&&j.type!=t)return 0;if(l&&j.loc!=l)return 0;
 if(x==="0"&&j.min!=0)return 0;if(x==="1"&&!(j.min>=1&&j.min<3))return 0;if(x==="3"&&j.min<3)return 0;return 1}
function list(){
 const a=J.filter(match);$("#count").textContent=a.length+" of "+J.length+" jobs shown.";
 $("#list").innerHTML=a.length?a.map(j=>`<button class="job" data-id="${j.id}" aria-pressed="${sel==j.id}"><h3>${j.t}</h3><div class="meta">${j.co} · ${j.loc}${apps[j.id]?" · Applied":""}</div><span class="tag">${j.type}</span><span class="tag">${j.pay}</span></button>`).join(""):`<div class="empty">No jobs match these filters. Clear a filter or try a different keyword.</div>`;
 if(sel&&!a.find(j=>j.id==sel)){sel=null;panel()}}
function panel(){
 const j=J.find(x=>x.id==sel);
 if(!j){$("#panel").innerHTML=`<div class="empty">Select a job to see the description and apply.</div>`;return}
 const done=apps[j.id];
 $("#panel").innerHTML=`<h2>${j.t}</h2><div class="meta">${j.co} · ${j.loc} · ${j.type} · ${j.pay}</div>
 <p>${j.d}</p><strong>Requirements</strong><ul>${j.r.map(r=>`<li>${r}</li>`).join("")}</ul>
 <div>${j.sk.map(s=>`<span class="tag">${s}</span>`).join("")}</div><hr style="border:0;border-top:1px solid var(--line);margin:16px 0">
 ${done?`<div class="ok">You applied on ${done.date}. We will contact ${done.email} if shortlisted.</div>`:
 `<h3 style="margin:0">Apply for this job</h3><form id="f" novalidate>
 <label for="n">Full name</label><input id="n" autocomplete="name"><div class="err" id="en"></div>
 <label for="e">Email</label><input id="e" type="email" autocomplete="email"><div class="err" id="ee"></div>
 <label for="p">Phone (10 digits)</label><input id="p" inputmode="numeric" maxlength="10"><div class="err" id="ep"></div>
 <label for="r">Resume link</label><input id="r" type="url" placeholder="https://"><div class="err" id="er"></div>
 <label for="c">Why are you a good fit?</label><textarea id="c" rows="3"></textarea><div class="err" id="ec"></div>
 <button class="primary" type="submit">Submit application</button></form>`}`;
 const f=$("#f");if(f)f.onsubmit=e=>{e.preventDefault();submit(j)}}
function submit(j){
 const v=id=>$("#"+id).value.trim(),E={};
 if(v("n").length<2)E.n="Enter your full name.";
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("e")))E.e="Enter a valid email address.";
 if(!/^\d{10}$/.test(v("p")))E.p="Phone must be exactly 10 digits.";
 if(!/^https?:\/\/\S+\.\S+/.test(v("r")))E.r="Enter a link starting with http:// or https://.";
 if(v("c").length<20)E.c="Write at least 20 characters.";
 ["n","e","p","r","c"].forEach(k=>$("#e"+k).textContent=E[k]||"");
 if(Object.keys(E).length)return;
 apps[j.id]={email:v("e"),date:new Date().toLocaleDateString("en-IN")};
 try{localStorage.setItem("cb-apps",JSON.stringify(apps))}catch(x){}
 panel();list()}
$("#list").onclick=e=>{const b=e.target.closest(".job");if(b){sel=+b.dataset.id;list();panel()}};
["q","type","loc","exp"].forEach(i=>$("#"+i).addEventListener("input",list));
$("#theme").onclick=()=>{const r=document.documentElement,d=r.dataset.theme?r.dataset.theme=="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=d?"light":"dark"};
list();panel();