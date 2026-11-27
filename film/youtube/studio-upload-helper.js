window.__lw={parts:[],N:["who-made-god.mp4", "does-god-exist.mp4", "why-bad-things-happen.mp4", "did-jesus-come-back-to-life.mp4", "science-and-the-bible.mp4", "why-cant-i-see-god.mp4", "god-silent.mp4", "when-we-die.mp4", "never-heard.mp4", "so-many-churches.mp4", "love-when-i-do-wrong.mp4", "temple-destroyed.mp4", "is-the-bible-true.mp4", "life-to-come.mp4", "the-exodus.mp4", "david-and-goliath.mp4", "john-3-16.mp4", "psalm-23.mp4", "romans-8-28.mp4", "holy-spirit.mp4", "god-with-his-people.mp4", "the-king.mp4", "covenant.mp4", "the-lamb.mp4", "why-blood.mp4", "kingdom-of-god.mp4", "apol-copies-of-copies.mp4", "apol-lost-in-translation.mp4", "apol-side-by-side.mp4", "apol-what-the-ground-says.mp4", "apol-who-chose-the-books.mp4", "apol-written-too-late.mp4", "doc-incarnation.mp4", "doc-justification.mp4", "doc-union.mp4", "doc-sanctification.mp4", "doc-return.mp4", "doc-creation.mp4", "doc-attributes.mp4", "doc-regeneration.mp4", "doc-repentance.mp4", "doc-worship.mp4", "hist-the-apostolic-age.mp4", "hist-the-age-of-martyrs.mp4", "hist-the-great-councils.mp4"],S:[59924051, 59036976, 52255490, 59428540, 59669481, 59227082, 57172267, 55013327, 57557355, 63819574, 49637447, 57720391, 54807736, 57952029, 58874898, 54554927, 57242823, 55557422, 56979473, 60164037, 56470150, 59915118, 59983556, 58186587, 59224282, 58096694, 60520539, 47612885, 39412853, 38517082, 43882770, 46119264, 49717359, 51316676, 51204952, 53637588, 51753657, 50896077, 55994534, 51187596, 52150459, 51535001, 50409203, 56543340, 52655728],add(){let i=document.getElementById('lw-part');if(!i){i=document.createElement('input');i.type='file';i.id='lw-part';i.style.cssText='position:fixed;left:0;top:0;z-index:99999;width:120px;height:30px';document.body.appendChild(i);}return 'ok'},p(){const f=document.getElementById('lw-part').files[0];this.parts.push(f);return this.parts.length},send(i){const file=new File(this.parts,this.N[i],{type:'video/mp4'});if(file.size!==this.S[i]){const s=file.size;this.parts=[];return {i,ok:false,size:s}}const yt=document.querySelector('input[type=file][name=Filedata]');const dt=new DataTransfer();dt.items.add(file);yt.files=dt.files;yt.dispatchEvent(new Event('change',{bubbles:true}));this.parts=[];return {i,ok:true,size:file.size}}};__lw.add()

// Then the per-film steps (stored as localStorage.__lwgo and run with eval). The upload dialog's text boxes are set with:
window.__set=(box,text)=>{box.focus();document.execCommand('selectAll');document.execCommand('insertText',false,text);box.dispatchEvent(new Event('input',{bubbles:true}));return box.textContent.length};
window.__w=t=>new Promise(r=>setTimeout(r,t));
window.__vis=s=>[...document.querySelectorAll(s)].filter(e=>e.offsetParent);
// Opens the upload dialog, hands film i to Studio, fills its details. The playlist list is found by its label text;
// on 2026-11-27 the check never ran (the upload limit stopped the second film), so look at a screenshot the first time.
window.__go1=async(i)=>{
  const s=__lw.N[i].replace('.mp4',''); const m=__md[s];
  if(!document.querySelector('input[type=file][name=Filedata]')){ document.querySelector('button[aria-label=Create]').click(); await __w(1000); const it=__vis('tp-yt-paper-item, [role=menuitem]').find(e=>e.textContent.trim()==='Upload videos'); if(!it) throw new Error('no upload item'); it.click(); for(let k=0;k<20&&!document.querySelector('input[type=file][name=Filedata]');k++) await __w(300); }
  const res=__lw.send(i); if(!res.ok) throw new Error('size '+JSON.stringify(res));
  let d; for(let k=0;k<60;k++){ d=document.querySelector('ytcp-uploads-dialog'); if(d&&d.querySelector('#title-textarea #textbox')&&d.querySelector('#title-textarea #textbox').textContent.trim()) break; await __w(500); }
  await __w(2000);
  if(document.body.innerText.includes('Daily upload limit reached')) return {s, err:'daily upload limit'};
  const tb=d.querySelector('#title-textarea #textbox'), db=d.querySelector('#description-textarea #textbox');
  __set(tb,m.t); await __w(300); __set(db,m.d); await __w(300);
  d.querySelector('tp-yt-paper-radio-button[name=VIDEO_MADE_FOR_KIDS_NOT_MFK]').click(); await __w(300);
  const tr=d.querySelector('ytcp-video-metadata-playlists ytcp-dropdown-trigger, ytcp-video-metadata-playlists [role=button]'); tr.scrollIntoView({block:'center'}); tr.click(); await __w(1500);
  const item=__vis('*').filter(e=>e.children.length===0).find(e=>e.textContent.trim()===m.pl);
  if(!item) return {s, err:'playlist not found', pl:m.pl};
  item.click(); await __w(600);
  const done=__vis('ytcp-button, button').find(b=>b.textContent.trim()==='Done'); if(done) done.click(); await __w(800);
  const link=d.querySelector('a[href*="youtu.be"]');
  return {s, title:tb.textContent===m.t, descLen:db.textContent.length, want:m.d.length, kids:d.querySelector('tp-yt-paper-radio-button[name=VIDEO_MADE_FOR_KIDS_NOT_MFK]').getAttribute('aria-checked'), pl:d.querySelector('ytcp-video-metadata-playlists').textContent.trim().replace(/\s+/g,' '), id:link&&link.href.split('/').pop()};
};
window.__go2=async()=>{
  const d=document.querySelector('ytcp-uploads-dialog');
  for(let k=0;k<3;k++){ d.querySelector('#next-button').click(); await __w(1500); }
  const r=d.querySelector('tp-yt-paper-radio-button[name=PUBLIC]'); r.click(); await __w(800);
  if(r.getAttribute('aria-checked')!=='true') throw new Error('public not set');
  d.querySelector('#done-button').click(); await __w(4000);
  const pub=document.body.innerText.includes('Video published');
  const c=__vis('ytcp-button, button').find(b=>b.textContent.trim()==='Close'); if(c) c.click();
  return {pub};
};
