/* =================================================================
   CLOUD SYNC SETUP
   Configured for the trinity-vaults Firebase project.
   Sign in with the same Google account on each device to sync between them.
================================================================= */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBwQWLyqhF-yg0pqq8W-Zcd-glOLpOaTIQ",
  authDomain: "trinity-vaults.firebaseapp.com",
  projectId: "trinity-vaults",
  storageBucket: "trinity-vaults.firebasestorage.app",
  messagingSenderId: "414775864722",
  appId: "1:414775864722:web:27105a3a7b6d278f6c254b"
};

/* Absolute URL: the manifest below is served from a blob: URL, and a
   relative path won't reliably resolve against that as a base. */
const LOGO_IMG = new URL('logo.png', document.baseURI).href;
document.getElementById('header-logo-img').src = LOGO_IMG;
document.getElementById('nav-logo-img').src = LOGO_IMG;

/* Make "Add to Home Screen" behave like a proper app shortcut: its own icon,
   its own name, and (where supported) opens without browser address-bar chrome. */
(function setUpHomeScreenShortcut(){
  try{
    const manifest = {
      name: "Trinity Vaults",
      short_name: "Vaults",
      display: "standalone",
      background_color: "#eef0f4",
      theme_color: "#0a2bea",
      icons: [
        { src: LOGO_IMG, sizes: "512x512", type: "image/png" },
        { src: LOGO_IMG, sizes: "192x192", type: "image/png" }
      ]
    };
    const blob = new Blob([JSON.stringify(manifest)], {type:'application/manifest+json'});
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = URL.createObjectURL(blob);
    document.head.appendChild(manifestLink);

    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = LOGO_IMG;
    document.head.appendChild(appleIcon);
  }catch(e){}
})();

/* ================= ICONS ================= */
function icon(name){
  const p = {
    home:'<path d="M4 11L12 4l8 7"/><path d="M6 10v9h5v-5h2v5h5v-9"/>',
    gauge:'<circle cx="12" cy="13" r="8"/><path d="M12 13l4-4"/><path d="M8 6.5L9 8"/><path d="M16 6.5L15 8"/>',
    person:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/>',
    gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M3 12h2.2M18.8 12H21M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5"/>',
    back:'<path d="M15 5l-7 7 7 7"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    edit:'<path d="M4 20l4-1L19 8l-3-3L5 16z"/>',
    trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    close:'<path d="M6 6l12 12M18 6L6 18"/>',
    check:'<path d="M5 13l4 4 10-10"/>',
    business:'<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    decisions:'<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
    running:'<path d="M4 7h11M4 12h7M4 17h11"/><path d="M18 5v6a3 3 0 0 1-3 3h-1"/>',
    memory:'<path d="M7 4h10v16l-5-4-5 4z"/>',
    questions:'<circle cx="12" cy="12" r="9"/><path d="M9.4 9.3a2.6 2.6 0 1 1 3.7 2.3c-.9.5-1.1 1-1.1 1.7"/><circle cx="12" cy="17" r="0.7" fill="currentColor" stroke="none"/>',
    buildlog:'<path d="M6 21V4"/><path d="M6 5h11l-3 4 3 4H6"/>',
    glossary:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 5.5v15"/>',
    upload:'<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    cloud:'<path d="M7 18a4 4 0 0 1-1-7.9A5 5 0 0 1 16 8a3.5 3.5 0 0 1 1 6.9"/><path d="M8 18h8"/>',
    layers:'<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>'
  };
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(p[name]||'')+'</svg>';
}
/* icon(), sized inline for the rare spot where it isn't nested in a class
   that already gives svg a size (.icon-btn svg, .btn-outline svg, etc). */
function smallIcon(name, px){
  return icon(name).replace('<svg ', '<svg style="width:'+px+'px;height:'+px+'px;flex-shrink:0;vertical-align:-3px;" ');
}

/* ================= CONFIG ================= */
const VAULTS = {
  running:{name:'Running Vault', color:'#ed9f40', desc:"Outstanding tasks and next steps. Comes off the list once it's built and confirmed.", fields:[{key:'task',label:'Task',type:'text'},{key:'notes',label:'Notes',type:'textarea'}]},
  memory:{name:'Memory Vault', color:'#4caf50', desc:"Quick-capture reminders, so nothing gets lost to brain fog.", fields:[{key:'text',label:'Reminder',type:'textarea'}]},
  decisions:{name:'Decision Vault', color:'#0a2bea', desc:"Decisions that have been made, the reasoning behind them, and the evidence that backed them up.", fields:[{key:'decision',label:'The decision',type:'text'},{key:'reasoning',label:'Reasoning',type:'textarea'},{key:'evidence',label:'Supporting evidence',type:'textarea'}]},
  questions:{name:'Questions Vault', color:'#0fbee3', desc:"Open questions, parked here until they're resolved.", fields:[{key:'question',label:'Question',type:'text'},{key:'context',label:'Context',type:'textarea'}]},
  buildlog:{name:'Build Log Vault', color:'#0d47a1', desc:"A dated record of what's actually shipped.", fields:[{key:'item',label:'What shipped',type:'text'},{key:'notes',label:'Notes',type:'textarea'}]},
  glossary:{name:'Glossary Vault', color:'#57636c', desc:"Locked definitions for Trinity's own terms, so nothing drifts.", fields:[{key:'term',label:'Term',type:'text'},{key:'definition',label:'Definition',type:'textarea'}]},
  business:{name:'Business Vault', color:'#e64a19', desc:"Business-level knowledge for Trinity as a company, not app mechanics."}
};
const BUSINESS_SUB = {
  contacts:{name:'Contacts', color:'#0a2bea', fields:[{key:'title',label:'Name / role',type:'text'},{key:'details',label:'Details',type:'textarea'}]},
  agency:{name:'Agency rules & law', color:'#e64a19', fields:[{key:'title',label:'Topic',type:'text'},{key:'details',label:'Details',type:'textarea'}]},
  accommodation:{name:'Accommodation', color:'#0fbee3', fields:[{key:'title',label:'Topic',type:'text'},{key:'details',label:'Details',type:'textarea'}]},
  pricing:{name:'Pricing model', color:'#4caf50', fields:[{key:'title',label:'Item',type:'text'},{key:'details',label:'Details',type:'textarea'}]},
  training:{name:'Route learning & onboarding', color:'#0d47a1', fields:[{key:'title',label:'Topic',type:'text'},{key:'details',label:'Details',type:'textarea'}]},
  monetization:{name:'Monetization', color:'#ed9f40', fields:[{key:'title',label:'Idea',type:'text'},{key:'details',label:'Details',type:'textarea'}]}
};
const HOME_ORDER = [
  {key:'running', size:'lg'},
  {key:'memory', size:'lg'},
  {key:'decisions', size:'sm'},
  {key:'questions', size:'sm'},
  {key:'buildlog', size:'sm'},
  {key:'glossary', size:'sm'}
];
const IMPORT_TARGETS = [
  {type:'simple', key:'running', label:'Running Vault'},
  {type:'simple', key:'memory', label:'Memory Vault'},
  {type:'simple', key:'decisions', label:'Decision Vault'},
  {type:'simple', key:'questions', label:'Questions Vault'},
  {type:'simple', key:'buildlog', label:'Build Log Vault'},
  {type:'simple', key:'glossary', label:'Glossary Vault'},
  {type:'business', key:'contacts', label:'Business Vault \u2192 Contacts'},
  {type:'business', key:'agency', label:'Business Vault \u2192 Agency rules & law'},
  {type:'business', key:'accommodation', label:'Business Vault \u2192 Accommodation'},
  {type:'business', key:'pricing', label:'Business Vault \u2192 Pricing model'},
  {type:'business', key:'training', label:'Business Vault \u2192 Route learning & onboarding'},
  {type:'business', key:'monetization', label:'Business Vault \u2192 Monetization'}
];

/* ================= STATE + STORAGE ================= */
let state = {view:'switcher', vaultKey:null, subKey:null, opCategory:null};
let pendingLink = null;

function defaultDB(){
  return {
    running:[], memory:[], decisions:[], questions:[], buildlog:[], glossary:[],
    business:{contacts:[],agency:[],accommodation:[],pricing:[],training:[],monetization:[]}
  };
}
function loadDB(){
  try{
    const raw = localStorage.getItem('trinityVaultsDB');
    if(raw) return Object.assign(defaultDB(), JSON.parse(raw));
  }catch(e){}
  return defaultDB();
}
let db = loadDB();

function saveDB(){
  try{
    localStorage.setItem('trinityVaultsDB', JSON.stringify(db));
  }catch(e){
    console.log('Local save failed (continuing anyway):', e);
  }
  pushToCloud();
}

function escapeHtml(str){
  return String(str==null?'':str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}
function todayStr(){
  return new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
}
function hapticTap(){
  try{ navigator.vibrate?.(15); }catch(e){}
}
function getCfg(target){ return target.type==='simple' ? VAULTS[target.key] : BUSINESS_SUB[target.key]; }
function getList(target){ return target.type==='simple' ? db[target.key] : db.business[target.key]; }
function objValues(obj){ return Object.keys(obj).map(function(k){ return obj[k]; }); }
function businessTotal(){
  return objValues(db.business).reduce(function(s,a){ return s+a.length; }, 0);
}

/* ================= OPERATIONAL VAULT: STATE + STORAGE =================
   Stored one document per entry, separate from the single `db` document
   above, so the library isn't capped by Firestore's 1 MiB document limit:
   trinityVaultsUsers/{uid}/operationalEntries/{entryId}
*/
function loadOperationalEntries(){
  try{
    const raw = localStorage.getItem('trinityVaultsOperationalEntries');
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return [];
}
let operationalEntries = loadOperationalEntries();

function saveOperationalEntriesLocal(){
  try{
    localStorage.setItem('trinityVaultsOperationalEntries', JSON.stringify(operationalEntries));
  }catch(e){
    console.log('Local save failed (continuing anyway):', e);
  }
}
function getOperationalEntry(id){
  return operationalEntries.find(function(e){ return e.id===id; });
}
function opTimeValue(ts){
  if(!ts) return 0;
  return typeof ts.toMillis === 'function' ? ts.toMillis() : ts;
}
function formatOpDate(ts){
  const ms = opTimeValue(ts);
  if(!ms) return '';
  return new Date(ms).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
}
function operationalDocRef(id){
  if(!cloudEnabled || !cloudUser) return null;
  return firebase.firestore().collection('trinityVaultsUsers').doc(cloudUser.uid).collection('operationalEntries').doc(id);
}

function addOperationalEntry(data){
  const id = 'e'+Date.now();
  const entry = {
    id: id,
    path: data.path || [],
    content: data.content || '',
    attachment: data.attachment || {type:null, value:''},
    linkedEntryIds: data.linkedEntryIds || [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  operationalEntries.push(entry);
  saveOperationalEntriesLocal();
  const ref = operationalDocRef(id);
  if(ref){
    ref.set({
      path: entry.path,
      content: entry.content,
      attachment: entry.attachment,
      linkedEntryIds: entry.linkedEntryIds,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(e){ console.log('Cloud save failed (continuing anyway):', e); });
  }
  return id;
}
function saveOperationalEntry(id, data){
  const idx = operationalEntries.findIndex(function(e){ return e.id===id; });
  if(idx>-1) Object.assign(operationalEntries[idx], data, {updatedAt:Date.now()});
  saveOperationalEntriesLocal();
  const ref = operationalDocRef(id);
  if(ref){
    ref.set(Object.assign({}, data, {updatedAt: firebase.firestore.FieldValue.serverTimestamp()}), {merge:true})
      .catch(function(e){ console.log('Cloud save failed (continuing anyway):', e); });
  }
}
function deleteOperationalEntry(id){
  operationalEntries = operationalEntries.filter(function(e){ return e.id!==id; });
  saveOperationalEntriesLocal();
  const ref = operationalDocRef(id);
  if(ref) ref.delete().catch(function(e){ console.log('Cloud delete failed (continuing anyway):', e); });
}
function subscribeToOperational(uid){
  const ref = firebase.firestore().collection('trinityVaultsUsers').doc(uid).collection('operationalEntries');
  unsubscribeOperational = ref.onSnapshot(function(snap){
    operationalEntries = snap.docs.map(function(doc){ return Object.assign({id:doc.id}, doc.data()); });
    saveOperationalEntriesLocal();
    if(state.view==='operational-home') render();
  });
}

/* ================= THEME ================= */
function applyTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  try{ localStorage.setItem('trinityVaultsTheme', t); }catch(e){}
  if(state.view==='settings') render();
}
function currentTheme(){ return document.documentElement.getAttribute('data-theme') || 'light'; }

/* ================= NAVIGATION ================= */
function goHome(){ state.view='home'; state.vaultKey=null; state.subKey=null; render(); }
function openVault(key){ state.view='vault'; state.vaultKey=key; state.subKey=null; render(); }
function goBusinessHome(){ state.view='business-home'; state.vaultKey=null; state.subKey=null; render(); }
function openSub(key){ state.view='subvault'; state.subKey=key; render(); }
function goProgress(){ state.view='progress'; render(); }
function goSettings(){ state.view='settings'; render(); }
function goSwitcher(){ state.view='switcher'; state.vaultKey=null; state.subKey=null; render(); }
function openOperationalHome(){ state.view='operational-home'; state.vaultKey=null; state.subKey=null; state.opCategory=null; render(); }
function openOperationalCategory(cat){ state.view='operational-category'; state.opCategory=cat; render(); }
function goImportExportHub(){ state.view='import-export-hub'; state.vaultKey=null; state.subKey=null; state.opCategory=null; render(); }

/* ================= RENDER ================= */
function render(){
  const view = document.getElementById('view');
  if(state.view==='switcher') view.innerHTML = renderSwitcher();
  else if(state.view==='operational-home') view.innerHTML = renderOperationalHome();
  else if(state.view==='operational-category') view.innerHTML = renderOperationalCategory();
  else if(state.view==='import-export-hub') view.innerHTML = renderImportExportHub();
  else if(state.view==='home') view.innerHTML = renderHome();
  else if(state.view==='vault') view.innerHTML = renderVaultView({type:'simple', key:state.vaultKey});
  else if(state.view==='business-home') view.innerHTML = renderBusinessHome();
  else if(state.view==='subvault') view.innerHTML = renderVaultView({type:'business', key:state.subKey});
  else if(state.view==='progress') view.innerHTML = renderProgress();
  else if(state.view==='settings') view.innerHTML = renderSettings();
  updateNavActive();
}

function updateNavActive(){
  const nOperational = document.getElementById('nav-operational');
  const nTrinity = document.getElementById('nav-trinity');
  const nImportExport = document.getElementById('nav-importexport');
  const nSettings = document.getElementById('nav-settings');
  nOperational.innerHTML = icon('layers');
  nTrinity.innerHTML = icon('home');
  nImportExport.innerHTML = icon('upload');
  nSettings.innerHTML = icon('gear');
  nOperational.classList.toggle('active', state.view==='operational-home' || state.view==='operational-category');
  nTrinity.classList.toggle('active', state.view==='home' || state.view==='vault' || state.view==='progress' || state.view==='business-home' || state.view==='subvault');
  nImportExport.classList.toggle('active', state.view==='import-export-hub');
  nSettings.classList.toggle('active', state.view==='settings');
}

/* ================= SWITCHER ================= */
function renderSwitcher(){
  return '<div class="bento">'
      +'<button class="vault-tile tile-wide" style="--accent:var(--accent-operational)" onclick="openOperationalHome()">'
        +'<div class="tile-icon">'+icon('layers')+'</div>'
        +'<div class="tile-name">Operational Vault</div>'
        +'<div class="tile-desc">Reference library &mdash; procedures, rules, and how-tos, organised by folder.</div>'
      +'</button>'
      +'<button class="vault-tile tile-wide" style="--accent:var(--primary)" onclick="goHome()">'
        +'<div class="tile-icon">'+icon('home')+'</div>'
        +'<div class="tile-name">Trinity Vault</div>'
        +'<div class="tile-desc">Running, Memory, Decisions, Questions, Build Log, Glossary &amp; Business Vault.</div>'
      +'</button>'
    +'</div>';
}

/* ================= IMPORT / EXPORT HUB ================= */
function renderImportExportHub(){
  return '<div class="view-header">'
    +'<button class="icon-btn" onclick="goSwitcher()">'+icon('back')+'</button>'
    +'<div class="page-pill">Import / Export</div>'
    +'</div>'
    +'<p class="view-desc">Choose which vault to import into or export from.</p>'
    +'<div class="bento">'
      +'<button class="vault-tile tile-wide" style="--accent:var(--accent-operational)" onclick="openOperationalImportExportPanel()">'
        +'<div class="tile-icon">'+icon('layers')+'</div>'
        +'<div class="tile-name">Operational Vault Import/Export</div>'
        +'<div class="tile-desc">Import or export the Operational Vault library as JSON.</div>'
      +'</button>'
      +'<button class="vault-tile tile-wide" style="--accent:var(--primary)" onclick="openImportPicker()">'
        +'<div class="tile-icon">'+icon('home')+'</div>'
        +'<div class="tile-name">Trinity Vault Import/Export</div>'
        +'<div class="tile-desc">Import or export Running, Memory, Decisions and the rest as JSON.</div>'
      +'</button>'
    +'</div>';
}

/* ================= OPERATIONAL VAULT ================= */
function operationalEntryTitle(e){
  return e.path && e.path.length ? e.path.join(' › ') : '(untitled)';
}
/* JSON.stringify + HTML-entity the quotes, so arbitrary user text (category
   names, folder names) can be embedded as a JS string literal inside a
   double-quoted onclick="" attribute without breaking out of either. */
function jsAttr(s){
  return JSON.stringify(String(s)).replace(/"/g,'&quot;');
}
function getOperationalCategories(){
  const seen = {};
  operationalEntries.forEach(function(e){ if(e.path && e.path[0]) seen[e.path[0]]=true; });
  return Object.keys(seen).sort();
}
function renderOperationalEntryRow(e, labelOverride){
  const title = escapeHtml(labelOverride!=null ? labelOverride : operationalEntryTitle(e));
  const rawSnippet = e.content||'';
  const snippet = escapeHtml(rawSnippet.slice(0,80)) + (rawSnippet.length>80?'&hellip;':'');
  return '<div class="entry-row">'
    +'<button class="entry-main" style="--accent:var(--accent-operational)" onclick="viewOperationalEntry(\''+e.id+'\')">'
      +'<div class="entry-title">'+title+'</div>'
      +'<div class="entry-snippet">'+snippet+'</div>'
      +'<div class="entry-date">'+formatOpDate(e.updatedAt)+'</div>'
    +'</button>'
    +'<div class="entry-actions">'
      +'<button class="icon-btn" title="Edit" onclick="openOperationalEntryForm(\''+e.id+'\')">'+icon('edit')+'</button>'
      +'<button class="icon-btn" title="Delete" onclick="confirmDeleteOperationalEntry(\''+e.id+'\')">'+icon('trash')+'</button>'
    +'</div>'
  +'</div>';
}
function renderOperationalChipsHtml(){
  const categories = getOperationalCategories();
  if(categories.length===0) return '<div class="empty-state">Nothing here yet. Tap "+ Add" to create the first entry.</div>';
  return '<div class="chip-row">'+categories.map(function(c){
    return '<button class="chip" style="border:none;cursor:pointer;font-family:inherit;" onclick="openOperationalCategory('+jsAttr(c)+')">'+escapeHtml(c)+'</button>';
  }).join('')+'</div>';
}
function filterOperationalHome(){
  const input = document.getElementById('op-search-input');
  const results = document.getElementById('op-results');
  if(!input || !results) return;
  const q = input.value.trim().toLowerCase();
  if(!q){ results.innerHTML = renderOperationalChipsHtml(); return; }
  const matches = operationalEntries.filter(function(e){
    const hay = (operationalEntryTitle(e)+' '+(e.content||'')).toLowerCase();
    return hay.indexOf(q)>-1;
  }).sort(function(a,b){ return opTimeValue(b.updatedAt)-opTimeValue(a.updatedAt); });
  results.innerHTML = matches.length
    ? '<div class="entry-list">'+matches.map(function(e){ return renderOperationalEntryRow(e); }).join('')+'</div>'
    : '<div class="empty-state">No matching entries.</div>';
}
function renderOperationalHome(){
  return '<div class="view-header">'
    +'<button class="icon-btn" onclick="goSwitcher()">'+icon('back')+'</button>'
    +'<div class="page-pill" style="border-color:var(--accent-operational)">Operational Vault</div>'
    +'<button class="add-btn" style="background:var(--accent-operational)" onclick="openOperationalEntryForm()">'+icon('plus')+' Add</button>'
    +'<button class="icon-btn" title="Import / Export" onclick="openOperationalImportExportPanel()">'+icon('upload')+'</button>'
    +'</div>'
    +'<p class="view-desc">Reference library for procedures, rules, and how-tos.</p>'
    +'<div class="form-body" style="margin-bottom:16px;"><input id="op-search-input" type="text" placeholder="Search entries…" oninput="filterOperationalHome()" /></div>'
    +'<div id="op-results">'+renderOperationalChipsHtml()+'</div>';
}

/* ---- category page: nested folder tree by path[1..-2], leaf = path[-1] ---- */
function buildOperationalTree(entries){
  const root = {folders:{}, items:[]};
  entries.forEach(function(e){
    const segments = (e.path||[]).slice(1);
    let node = root;
    for(let i=0;i<segments.length-1;i++){
      const seg = segments[i];
      if(!node.folders[seg]) node.folders[seg] = {folders:{}, items:[]};
      node = node.folders[seg];
    }
    node.items.push(e);
  });
  return root;
}
function renderOperationalTreeNode(node, depth){
  const indent = depth*16;
  let html = '';
  Object.keys(node.folders).sort().forEach(function(name){
    html += '<div class="settings-section-label" style="margin-left:'+indent+'px">'+escapeHtml(name)+'</div>'
      + renderOperationalTreeNode(node.folders[name], depth+1);
  });
  if(node.items.length){
    html += '<div class="entry-list" style="margin-left:'+indent+'px">'+node.items.map(function(e){
      const segs = e.path||[];
      const label = segs.length ? segs[segs.length-1] : null;
      return renderOperationalEntryRow(e, label);
    }).join('')+'</div>';
  }
  return html;
}
function renderOperationalCategory(){
  const cat = state.opCategory;
  const autoEntries = operationalEntries.filter(function(e){ return e.path && e.path[0]===cat; });
  const autoIds = {};
  autoEntries.forEach(function(e){ autoIds[e.id]=true; });
  const crossRefEntries = operationalEntries.filter(function(e){
    return !autoIds[e.id] && e.linkedEntryIds && e.linkedEntryIds.some(function(id){ return autoIds[id]; });
  });
  let body;
  if(autoEntries.length===0 && crossRefEntries.length===0){
    body = '<div class="empty-state">Nothing in this category yet.</div>';
  } else {
    body = renderOperationalTreeNode(buildOperationalTree(autoEntries), 0);
    if(crossRefEntries.length){
      body += '<div class="settings-section-label">Linked from elsewhere</div>'
        +'<div class="entry-list">'+crossRefEntries.map(function(e){ return renderOperationalEntryRow(e); }).join('')+'</div>';
    }
  }
  return '<div class="view-header">'
    +'<button class="icon-btn" onclick="openOperationalHome()">'+icon('back')+'</button>'
    +'<div class="page-pill" style="border-color:var(--accent-operational)">'+escapeHtml(cat)+'</div>'
    +'<button class="add-btn" style="background:var(--accent-operational)" onclick="openOperationalEntryForm(null, '+jsAttr(cat)+')">'+icon('plus')+' Add</button>'
    +'</div>'
    +'<p class="view-desc">Entries filed under '+escapeHtml(cat)+'.</p>'
    +body;
}

function renderOpAttachmentField(e){
  const a = e.attachment;
  if(!a || !a.type || !a.value) return '';
  if(a.type==='link'){
    return '<div class="card-field"><div class="card-field-label">Attachment</div>'
      +'<a class="btn-outline" href="'+escapeHtml(a.value)+'" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">'+icon('upload')+' Open link</a>'
    +'</div>';
  }
  return '<div class="card-field"><div class="card-field-label">Attachment</div>'
    +'<div class="entry-snippet">'+smallIcon('upload',14)+' '+escapeHtml(a.value)+' &mdash; local file (not stored)</div>'
  +'</div>';
}
function sanitizeFilename(s){
  return String(s).replace(/[\\/:*?"<>|]/g,'-');
}
function copyOperationalEntry(id, btnEl){
  const e = getOperationalEntry(id);
  if(!e || !btnEl) return;
  const restore = btnEl.innerHTML;
  function flip(label){
    btnEl.innerHTML = label;
    setTimeout(function(){ btnEl.innerHTML = restore; }, 1500);
  }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(e.content||'').then(function(){
      flip(icon('check')+' Copied');
    }, function(){
      flip('Copy failed');
    });
  } else {
    flip('Copy failed');
  }
}
function downloadOperationalEntryMd(id){
  const e = getOperationalEntry(id);
  if(!e) return;
  const filename = sanitizeFilename(e.path&&e.path.length ? e.path.join(' - ') : 'entry')+'.md';
  const blob = new Blob([e.content||''], {type:'text/markdown'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
function viewOperationalEntry(id){
  const e = getOperationalEntry(id);
  if(!e) return;
  const contentHtml = escapeHtml(e.content||'').replace(/\n/g,'<br>');
  const html = '<div class="card" style="--accent:var(--accent-operational)">'
    +'<button class="card-close" onclick="closeModal()">'+icon('close')+'</button>'
    +'<div class="card-date">'+formatOpDate(e.updatedAt)+'</div>'
    +'<h3>'+escapeHtml(operationalEntryTitle(e))+'</h3>'
    +'<div class="card-field"><div class="card-field-label">Content</div><div class="card-field-value">'+(contentHtml||'&mdash;')+'</div></div>'
    +renderOpAttachmentField(e)
    +'<div class="card-actions">'
      +'<button class="btn-outline" onclick="confirmDeleteOperationalEntry(\''+id+'\')">'+icon('trash')+' Delete</button>'
      +'<button class="btn-outline" onclick="closeModal(); openOperationalEntryForm(\''+id+'\')">'+icon('edit')+' Edit</button>'
      +'<button class="btn-outline" onclick="copyOperationalEntry(\''+id+'\', this)">'+icon('glossary')+' Copy</button>'
      +'<button class="btn-outline" onclick="downloadOperationalEntryMd(\''+id+'\')">'+icon('buildlog')+' Download as .md</button>'
    +'</div>'
  +'</div>';
  showModal(html);
}

/* Add/edit form's attachment sub-state (reset each time the form opens,
   re-rendered in place on toggle so Path/Content aren't disturbed). */
let opFormAttach = {type:'link', value:''};
function renderOpAttachToggleButtons(){
  return '<button type="button" class="'+(opFormAttach.type==='link'?'active':'')+'" onclick="setOpAttachMode(\'link\')">Paste a link</button>'
    +'<button type="button" class="'+(opFormAttach.type==='local'?'active':'')+'" onclick="setOpAttachMode(\'local\')">Choose a file</button>';
}
function renderOpAttachFields(){
  if(opFormAttach.type==='local'){
    return '<input id="op_attach_file_input" type="file" style="display:none" onchange="onOpAttachFileChosen(event)" />'
      +'<button type="button" class="btn-outline" onclick="document.getElementById(\'op_attach_file_input\').click()">'+icon('upload')+' Choose file</button>'
      +' <span id="op_attach_filename" class="form-hint">'+(opFormAttach.value?escapeHtml(opFormAttach.value):'No file chosen')+'</span>';
  }
  return '<input id="op_attach_link_input" type="text" placeholder="https://..." value="'+escapeHtml(opFormAttach.value||'')+'" />';
}
function setOpAttachMode(mode){
  if(opFormAttach.type===mode) return;
  opFormAttach = {type:mode, value:''};
  const toggle = document.getElementById('op-attach-toggle');
  const fields = document.getElementById('op-attach-fields');
  if(toggle) toggle.innerHTML = renderOpAttachToggleButtons();
  if(fields) fields.innerHTML = renderOpAttachFields();
}
function onOpAttachFileChosen(event){
  const file = event.target.files[0];
  opFormAttach.value = file ? file.name : '';
  const span = document.getElementById('op_attach_filename');
  if(span) span.textContent = opFormAttach.value || 'No file chosen';
}

function openOperationalEntryForm(id, prefillCategory){
  const existing = id ? getOperationalEntry(id) : null;
  const pathVal = escapeHtml(existing && existing.path ? existing.path.join(' > ') : (prefillCategory ? prefillCategory+' > ' : ''));
  const contentVal = escapeHtml(existing ? existing.content||'' : '');
  const heading = existing ? 'Edit' : 'Add';
  opFormAttach = (existing && existing.attachment && existing.attachment.type)
    ? {type:existing.attachment.type, value:existing.attachment.value||''}
    : {type:'link', value:''};
  const html = '<div class="card" style="--accent:var(--accent-operational)">'
    +'<button class="card-close" onclick="closeModal()">'+icon('close')+'</button>'
    +'<h3>'+heading+' &mdash; Operational Vault</h3>'
    +'<div class="form-body">'
      +'<label class="form-label">Path</label>'
      +'<input id="op_path" type="text" value="'+pathVal+'" placeholder="ICO &gt; Rule 25.3" />'
      +'<div class="form-hint">Separate nested categories with &gt;, e.g. ICO &gt; Rule 25.3</div>'
      +'<label class="form-label">Content</label>'
      +'<textarea id="op_content" rows="8">'+contentVal+'</textarea>'
      +'<label class="form-label">Attachment</label>'
      +'<div class="theme-toggle" id="op-attach-toggle" style="margin-left:0;">'+renderOpAttachToggleButtons()+'</div>'
      +'<div id="op-attach-fields" style="margin-top:8px;">'+renderOpAttachFields()+'</div>'
      +'<div class="form-hint">Paste a link (OneDrive, Drive, etc.) or pick a file &mdash; only its name is kept, nothing is uploaded.</div>'
    +'</div>'
    +'<div id="op-form-error" class="form-hint" style="color:#c0392b;"></div>'
    +'<div class="card-actions">'
      +'<button class="btn-outline" onclick="closeModal()">Cancel</button>'
      +'<button class="btn-solid" style="background:var(--accent-operational)" onclick="saveOperationalEntryForm('+(existing?"'"+existing.id+"'":'null')+')">Save</button>'
    +'</div>'
  +'</div>';
  showModal(html);
}

function saveOperationalEntryForm(id){
  const pathRaw = document.getElementById('op_path').value.trim();
  const content = document.getElementById('op_content').value.trim();
  if(!pathRaw){
    const err = document.getElementById('op-form-error');
    if(err) err.textContent = 'Please fill in "Path" before saving.';
    return;
  }
  const path = pathRaw.split('>').map(function(s){ return s.trim(); }).filter(Boolean);
  let attachment = {type:null, value:''};
  if(opFormAttach.type==='link'){
    const linkInput = document.getElementById('op_attach_link_input');
    const val = linkInput ? linkInput.value.trim() : '';
    if(val) attachment = {type:'link', value:val};
  } else if(opFormAttach.type==='local' && opFormAttach.value){
    attachment = {type:'local', value:opFormAttach.value};
  }
  if(id) saveOperationalEntry(id, {path:path, content:content, attachment:attachment});
  else addOperationalEntry({path:path, content:content, attachment:attachment});
  hapticTap();
  closeModal();
  render();
}

function confirmDeleteOperationalEntry(id){
  const e = getOperationalEntry(id);
  const label = e ? operationalEntryTitle(e) : 'this entry';
  showConfirm('Delete "'+label+'"? This can’t be undone.', function(){
    deleteOperationalEntry(id);
    closeModal();
    render();
  }, 'Delete');
}

/* ---- Operational Vault import / export ---- */
function exportOperationalData(){
  const blob = new Blob([JSON.stringify(operationalEntries,null,2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'operational-vault-backup-'+todayStr().replace(/\s+/g,'-')+'.json';
  a.click();
}
function doImportOperational(){
  const fileInput = document.getElementById('op-import-file');
  const file = fileInput.files[0];
  const errEl = document.getElementById('op-import-error');
  if(!file){ if(errEl) errEl.textContent = 'Choose a file first.'; return; }
  const reader = new FileReader();
  reader.onload = function(){
    try{
      let parsed = JSON.parse(reader.result);
      if(!Array.isArray(parsed)) parsed = [parsed];
      let added = 0;
      parsed.forEach(function(item){
        if(!item || !Array.isArray(item.path) || item.path.length===0) return;
        addOperationalEntry({
          path: item.path.map(function(s){ return String(s); }),
          content: item.content||'',
          attachment: (item.attachment && item.attachment.type) ? {type:item.attachment.type, value:item.attachment.value||''} : {type:null, value:''},
          linkedEntryIds: Array.isArray(item.linkedEntryIds) ? item.linkedEntryIds : []
        });
        added++;
      });
      if(added===0){ if(errEl) errEl.textContent = 'No valid entries found in that file.'; return; }
      render();
      showAlert(added+' '+(added===1?'entry':'entries')+' added to Operational Vault.');
    }catch(e){
      if(errEl) errEl.textContent = 'That file could not be read as vault entries.';
    }
  };
  reader.readAsText(file);
}
function openOperationalImportExportPanel(){
  const html = '<div class="card" style="--accent:var(--accent-operational)">'
    +'<button class="card-close" onclick="closeModal()">'+icon('close')+'</button>'
    +'<h3>Operational Vault Import/Export</h3>'
    +'<div class="card-actions" style="margin-top:0;margin-bottom:20px;">'
      +'<button class="btn-solid" style="background:var(--accent-operational)" onclick="exportOperationalData()">'+icon('buildlog')+' Export everything</button>'
    +'</div>'
    +'<div class="form-body">'
      +'<label class="form-label">JSON file</label>'
      +'<input id="op-import-file" type="file" accept="application/json" />'
      +'<div class="form-hint">A file with one entry, or a list of entries, matching Operational Vault\'s shape (<code>path</code>, <code>content</code>, <code>attachment</code>, <code>linkedEntryIds</code>). Ask Claude in chat to generate this file.</div>'
      +'<div id="op-import-error" class="form-hint" style="color:#c0392b;"></div>'
    +'</div>'
    +'<div class="card-actions">'
      +'<button class="btn-outline" onclick="closeModal()">Cancel</button>'
      +'<button class="btn-solid" style="background:var(--accent-operational)" onclick="doImportOperational()">Import</button>'
    +'</div>'
  +'</div>';
  showModal(html);
}

function renderHome(){
  const toolbar = '<div class="home-toolbar">'
    +'<button class="icon-btn" title="Import / Export" onclick="openImportPicker()">'+icon('upload')+'</button>'
    +'</div>';
  const tiles = HOME_ORDER.map(function(o){
    const cfg = VAULTS[o.key];
    const count = db[o.key].length;
    return '<button class="vault-tile tile-'+o.size+'" style="--accent:'+cfg.color+'" onclick="openVault(\''+o.key+'\')">'
      +'<div class="tile-icon">'+icon(o.key)+'</div>'
      +'<div class="tile-name">'+cfg.name+'</div>'
      +'<div class="tile-desc">'+cfg.desc+'</div>'
      +'<div class="tile-count">'+count+' '+(count===1?'item':'items')+'</div>'
      +'</button>';
  }).join('');
  const bizCount = businessTotal();
  const bizChips = objValues(BUSINESS_SUB).map(function(s){ return '<span class="chip">'+s.name+'</span>'; }).join('');
  const bizTile = '<button class="vault-tile tile-wide" style="--accent:'+VAULTS.business.color+'" onclick="goBusinessHome()">'
    +'<div class="tile-icon">'+icon('business')+'</div>'
    +'<div class="tile-name">'+VAULTS.business.name+'</div>'
    +'<div class="tile-desc">'+VAULTS.business.desc+'</div>'
    +'<div class="chip-row">'+bizChips+'</div>'
    +'<div class="tile-count">'+bizCount+' '+(bizCount===1?'note':'notes')+' total</div>'
    +'</button>';
  return toolbar+'<div class="bento">'+tiles+bizTile+'</div>';
}

function renderBusinessHome(){
  const tiles = Object.keys(BUSINESS_SUB).map(function(k){
    const s = BUSINESS_SUB[k];
    const count = db.business[k].length;
    return '<button class="tile-sub" style="--accent:'+s.color+'" onclick="openSub(\''+k+'\')">'
      +'<div class="tile-name">'+s.name+'</div>'
      +'<div class="tile-count">'+count+' '+(count===1?'entry':'entries')+'</div>'
      +'</button>';
  }).join('');
  return '<div class="view-header">'
    +'<button class="icon-btn" onclick="goHome()">'+icon('back')+'</button>'
    +'<div class="page-pill" style="border-color:'+VAULTS.business.color+'">Business Vault</div>'
    +'</div>'
    +'<p class="view-desc">'+VAULTS.business.desc+'</p>'
    +'<div class="bento-sub">'+tiles+'</div>';
}

function renderVaultView(target){
  const cfg = getCfg(target);
  const backAction = target.type==='business' ? 'goBusinessHome()' : 'goHome()';
  return '<div class="view-header">'
    +'<button class="icon-btn" onclick="'+backAction+'">'+icon('back')+'</button>'
    +'<div class="page-pill" style="border-color:'+cfg.color+'">'+cfg.name+'</div>'
    +'<button class="add-btn" style="background:'+cfg.color+'" onclick="openEntryForm({type:\''+target.type+'\',key:\''+target.key+'\'})">'+icon('plus')+' Add</button>'
    +'</div>'
    +'<p class="view-desc">'+(cfg.desc||'')+'</p>'
    +'<div class="entry-list">'+renderEntryList(target)+'</div>';
}

function renderEntryList(target){
  const cfg = getCfg(target);
  const list = getList(target);
  if(list.length===0) return '<div class="empty-state">Nothing here yet. Tap "+ Add" to create the first entry.</div>';
  return list.slice().reverse().map(function(e){
    const title = escapeHtml(e[cfg.fields[0].key]||'(untitled)');
    const snippetField = cfg.fields[1];
    const rawSnippet = snippetField ? (e[snippetField.key]||'') : '';
    const snippet = escapeHtml(rawSnippet.slice(0,80)) + (rawSnippet.length>80?'&hellip;':'');
    return '<div class="entry-row">'
      +'<button class="entry-main" style="--accent:'+cfg.color+'" onclick="viewEntry({type:\''+target.type+'\',key:\''+target.key+'\'}, '+e.id+')">'
        +'<div class="entry-title">'+title+'</div>'
        +(snippetField?'<div class="entry-snippet">'+snippet+'</div>':'')
        +'<div class="entry-date">'+(e.date||'')+'</div>'
      +'</button>'
      +'<div class="entry-actions">'
        +'<button class="icon-btn" title="Edit" onclick="openEntryForm({type:\''+target.type+'\',key:\''+target.key+'\'}, '+e.id+')">'+icon('edit')+'</button>'
        +'<button class="icon-btn" title="Delete" onclick="deleteEntry({type:\''+target.type+'\',key:\''+target.key+'\'}, '+e.id+')">'+icon('trash')+'</button>'
      +'</div>'
    +'</div>';
  }).join('');
}

function renderProgress(){
  const stats = [
    {label:'Open running items', value:db.running.length, color:VAULTS.running.color},
    {label:'Memory notes', value:db.memory.length, color:VAULTS.memory.color},
    {label:'Decisions logged', value:db.decisions.length, color:VAULTS.decisions.color},
    {label:'Open questions', value:db.questions.length, color:VAULTS.questions.color},
    {label:'Shipped (build log)', value:db.buildlog.length, color:VAULTS.buildlog.color},
    {label:'Glossary terms', value:db.glossary.length, color:VAULTS.glossary.color},
    {label:'Business notes', value:businessTotal(), color:VAULTS.business.color}
  ];
  const cards = stats.map(function(s){ return '<div class="stat-card" style="--accent:'+s.color+'"><div class="stat-value">'+s.value+'</div><div class="stat-label">'+s.label+'</div></div>'; }).join('');
  return '<div class="view-header"><button class="icon-btn" onclick="goHome()">'+icon('back')+'</button><div class="page-pill">Progress</div></div>'
    +'<p class="view-desc">A quick snapshot of where the build stands.</p>'
    +'<div class="stat-grid">'+cards+'</div>';
}

function renderSettings(){
  const theme = currentTheme();
  let syncSection;
  if(!cloudEnabled){
    syncSection = '<div class="settings-row static">'+icon('cloud')
      +'<div><div class="entry-title">Cloud sync not set up</div><div class="entry-snippet">Data stays on this device only, until Firebase details are added to this file.</div></div>'
      +'</div>';
  } else if(!cloudUser){
    syncSection = '<div class="settings-row static">'+icon('cloud')
      +'<div><div class="entry-title">Not signed in</div><div class="entry-snippet">Sign in with the same Google account on every device to sync.</div></div>'
      +'<button class="sync-btn" onclick="signInWithGoogle()">Sign in</button>'
      +'</div>';
  } else {
    syncSection = '<div class="settings-row static">'
      +'<span class="sync-status-dot on"></span>'
      +'<div><div class="entry-title">Synced as '+escapeHtml(cloudUser.email||cloudUser.displayName||'signed in')+'</div><div class="entry-snippet">Changes save to every device signed in with this account.</div></div>'
      +'<button class="sync-btn outline" onclick="signOutCloud()">Sign out</button>'
      +'</div>';
  }
  return '<div class="view-header"><button class="icon-btn" onclick="goHome()">'+icon('back')+'</button><div class="page-pill">Settings</div></div>'

    +'<div class="settings-section-label">Appearance</div>'
    +'<div class="settings-list">'
      +'<div class="settings-row static">'+icon('gear')
        +'<div><div class="entry-title">Theme</div><div class="entry-snippet">Light or dark</div></div>'
        +'<div class="theme-toggle">'
          +'<button class="'+(theme==='light'?'active':'')+'" onclick="applyTheme(\'light\')">Light</button>'
          +'<button class="'+(theme==='dark'?'active':'')+'" onclick="applyTheme(\'dark\')">Dark</button>'
        +'</div>'
      +'</div>'
    +'</div>'

    +'<div class="settings-section-label">Cloud sync (phone &amp; Chromebook)</div>'
    +'<div class="settings-list">'+syncSection+'</div>'

    +'<div class="settings-section-label">Overview</div>'
    +'<div class="settings-list">'
      +'<button class="settings-row" onclick="goProgress()">'+icon('gauge')+'<div><div class="entry-title">Progress</div><div class="entry-snippet">A quick snapshot of where the build stands</div></div></button>'
    +'</div>'

    +'<div class="settings-section-label">Backup</div>'
    +'<div class="settings-list">'
      +'<button class="settings-row" onclick="exportData()">'+icon('buildlog')+'<div><div class="entry-title">Export a backup</div><div class="entry-snippet">Download everything as a JSON file</div></div></button>'
      +'<label class="settings-row" for="importFile">'+icon('plus')+'<div><div class="entry-title">Restore a full backup</div><div class="entry-snippet">Replaces everything with a JSON file exported before</div></div></label>'
      +'<input type="file" id="importFile" accept="application/json" style="display:none" onchange="importData(event)" />'
      +'<button class="settings-row danger" onclick="resetAll()">'+icon('trash')+'<div><div class="entry-title">Reset everything</div><div class="entry-snippet">Clears all vaults. Cannot be undone &mdash; export a backup first.</div></div></button>'
    +'</div>';
}

/* ================= MODAL ================= */
function showModal(html){
  const overlay = document.getElementById('modal-overlay');
  overlay.innerHTML = html;
  overlay.classList.add('open');
}
function closeModal(){
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('open');
  overlay.innerHTML = '';
  pendingLink = null;
}

/* In-app replacements for window.alert / window.confirm. Some mobile browsers
   silently block native dialogs (e.g. a page opened as a saved home-screen
   shortcut), which would otherwise make actions like Delete quietly do nothing. */
function showAlert(message){
  const html = '<div class="card" style="--accent:'+VAULTS.decisions.color+'">'
    +'<button class="card-close" onclick="closeModal()">'+icon('close')+'</button>'
    +'<h3>'+escapeHtml(message)+'</h3>'
    +'<div class="card-actions"><button class="btn-solid" style="background:'+VAULTS.decisions.color+'" onclick="closeModal()">OK</button></div>'
  +'</div>';
  showModal(html);
}
let pendingConfirmAction = null;
function showConfirm(message, actionFn, confirmLabel){
  pendingConfirmAction = actionFn;
  const html = '<div class="card" style="--accent:#c0392b">'
    +'<button class="card-close" onclick="closeModal()">'+icon('close')+'</button>'
    +'<h3>'+escapeHtml(message)+'</h3>'
    +'<div class="card-actions">'
      +'<button class="btn-outline" onclick="closeModal()">Cancel</button>'
      +'<button class="btn-solid" style="background:#c0392b" onclick="runPendingConfirm()">'+icon('trash')+' '+escapeHtml(confirmLabel||'Confirm')+'</button>'
    +'</div>'
  +'</div>';
  showModal(html);
}
function runPendingConfirm(){
  const fn = pendingConfirmAction;
  pendingConfirmAction = null;
  if(fn) fn();
}

function viewEntry(target, id){
  const cfg = getCfg(target);
  const list = getList(target);
  const e = list.find(function(x){ return x.id===id; });
  if(!e) return;
  const fieldsHtml = cfg.fields.slice(1).map(function(f){
    const val = escapeHtml(e[f.key]||'&mdash;').replace(/\n/g,'<br>');
    return '<div class="card-field"><div class="card-field-label">'+f.label+'</div><div class="card-field-value">'+val+'</div></div>';
  }).join('');
  let extra = '';
  if(target.type==='simple' && target.key==='running'){
    extra += '<button class="btn-solid" style="background:'+VAULTS.buildlog.color+'" onclick="markRunningBuilt('+id+')">'+icon('check')+' Mark built &amp; log it</button>';
  }
  if(target.type==='simple' && target.key==='questions'){
    extra += '<button class="btn-solid" style="background:'+VAULTS.decisions.color+'" onclick="resolveQuestion('+id+')">'+icon('decisions')+' Resolve &rarr; log decision</button>';
  }
  const html = '<div class="card" style="--accent:'+cfg.color+'">'
    +'<button class="card-close" onclick="closeModal()">'+icon('close')+'</button>'
    +'<div class="card-date">'+(e.date||'')+'</div>'
    +'<h3>'+escapeHtml(e[cfg.fields[0].key]||'')+'</h3>'
    +fieldsHtml
    +'<div class="card-actions">'
      +'<button class="btn-outline" onclick="deleteEntry({type:\''+target.type+'\',key:\''+target.key+'\'}, '+id+')">'+icon('trash')+' Delete</button>'
      +'<button class="btn-outline" onclick="closeModal(); openEntryForm({type:\''+target.type+'\',key:\''+target.key+'\'}, '+id+')">'+icon('edit')+' Edit</button>'
      +extra
    +'</div>'
  +'</div>';
  showModal(html);
}

function openEntryForm(target, id, prefill){
  const cfg = getCfg(target);
  const list = getList(target);
  const existing = id ? list.find(function(e){ return e.id===id; }) : null;
  const values = existing || prefill || {};
  const fieldsHtml = cfg.fields.map(function(f){
    const val = escapeHtml(values[f.key]||'');
    const input = f.type==='textarea'
      ? '<textarea id="f_'+f.key+'" rows="3">'+val+'</textarea>'
      : '<input id="f_'+f.key+'" type="text" value="'+val+'" />';
    return '<label class="form-label">'+f.label+'</label>'+input;
  }).join('');
  const heading = existing ? 'Edit' : (pendingLink ? 'Log it' : 'Add');
  const html = '<div class="card" style="--accent:'+cfg.color+'">'
    +'<button class="card-close" onclick="closeModal()">'+icon('close')+'</button>'
    +'<h3>'+heading+' &mdash; '+cfg.name+'</h3>'
    +'<div class="form-body">'+fieldsHtml+'</div>'
    +'<div id="form-error" class="form-hint" style="color:#c0392b;"></div>'
    +'<div class="card-actions">'
      +'<button class="btn-outline" onclick="closeModal()">Cancel</button>'
      +'<button class="btn-solid" style="background:'+cfg.color+'" onclick="saveEntryForm(\''+target.type+'\',\''+target.key+'\', '+(id||'null')+')">Save</button>'
    +'</div>'
  +'</div>';
  showModal(html);
}

function saveEntryForm(type, key, id){
  const target = {type:type, key:key};
  const cfg = getCfg(target);
  const list = getList(target);
  const values = {};
  cfg.fields.forEach(function(f){
    const el = document.getElementById('f_'+f.key);
    values[f.key] = el ? el.value.trim() : '';
  });
  if(!values[cfg.fields[0].key]){
    const err = document.getElementById('form-error');
    if(err) err.textContent = 'Please fill in "'+cfg.fields[0].label+'" before saving.';
    return;
  }
  if(id){
    const idx = list.findIndex(function(e){ return e.id===id; });
    if(idx>-1) Object.assign(list[idx], values);
  } else {
    list.push(Object.assign({id:Date.now(), date:todayStr()}, values));
    if(pendingLink){
      db[pendingLink.removeFrom] = db[pendingLink.removeFrom].filter(function(e){ return e.id!==pendingLink.removeId; });
      pendingLink = null;
    }
  }
  saveDB();
  hapticTap();
  closeModal();
  render();
}

function deleteEntry(target, id){
  const list = getList(target);
  const cfg = getCfg(target);
  const entry = list.find(function(e){ return e.id===id; });
  const label = entry ? (entry[cfg.fields[0].key] || 'this entry') : 'this entry';
  showConfirm('Delete "'+label+'"? This can\u2019t be undone.', function(){
    const idx = list.findIndex(function(e){ return e.id===id; });
    if(idx>-1) list.splice(idx,1);
    saveDB();
    closeModal();
    render();
  }, 'Delete');
}

/* ---- cross-vault flows ---- */
function markRunningBuilt(id){
  const item = db.running.find(function(r){ return r.id===id; });
  if(!item) return;
  pendingLink = {removeFrom:'running', removeId:id};
  openEntryForm({type:'simple',key:'buildlog'}, null, {item:item.task, notes:item.notes||''});
}
function resolveQuestion(id){
  const q = db.questions.find(function(x){ return x.id===id; });
  if(!q) return;
  pendingLink = {removeFrom:'questions', removeId:id};
  openEntryForm({type:'simple',key:'decisions'}, null, {
    decision:'',
    reasoning:'',
    evidence:'Originally raised as a question: '+q.question+(q.context?(' — '+q.context):'')
  });
}

/* ================= IMPORT (targeted, additive) ================= */
function openImportPicker(){
  const options = IMPORT_TARGETS.map(function(t,i){ return '<option value="'+i+'">'+t.label+'</option>'; }).join('');
  const html = '<div class="card" style="--accent:'+VAULTS.running.color+'">'
    +'<button class="card-close" onclick="closeModal()">'+icon('close')+'</button>'
    +'<h3>Trinity Vault Import/Export</h3>'
    +'<div class="card-actions" style="margin-top:0;margin-bottom:20px;">'
      +'<button class="btn-solid" style="background:'+VAULTS.running.color+'" onclick="exportData()">'+icon('buildlog')+' Export everything</button>'
    +'</div>'
    +'<div class="form-body">'
      +'<label class="form-label">Which vault?</label>'
      +'<select id="import-target">'+options+'</select>'
      +'<label class="form-label">JSON file</label>'
      +'<input id="import-file" type="file" accept="application/json" />'
      +'<div class="form-hint">A file with one entry, or a list of entries, matching that vault\'s fields (for example Running Vault uses <code>task</code> and <code>notes</code>). Ask Claude in chat to generate this file for whichever vault you want it dropped into.</div>'
      +'<div id="import-error" class="form-hint" style="color:#c0392b;"></div>'
    +'</div>'
    +'<div class="card-actions">'
      +'<button class="btn-outline" onclick="closeModal()">Cancel</button>'
      +'<button class="btn-solid" style="background:'+VAULTS.running.color+'" onclick="doImport()">Import</button>'
    +'</div>'
  +'</div>';
  showModal(html);
}
function doImport(){
  const idx = parseInt(document.getElementById('import-target').value, 10);
  const target = IMPORT_TARGETS[idx];
  const fileInput = document.getElementById('import-file');
  const file = fileInput.files[0];
  const errEl = document.getElementById('import-error');
  if(!file){ if(errEl) errEl.textContent = 'Choose a file first.'; return; }
  const reader = new FileReader();
  reader.onload = function(){
    try{
      let parsed = JSON.parse(reader.result);
      if(!Array.isArray(parsed)) parsed = [parsed];
      const cfg = getCfg(target);
      const list = getList(target);
      let added = 0;
      parsed.forEach(function(item, i){
        if(!item || !item[cfg.fields[0].key]) return;
        const entry = {id:Date.now()+i, date:item.date||todayStr()};
        cfg.fields.forEach(function(f){ entry[f.key] = item[f.key]||''; });
        list.push(entry);
        added++;
      });
      if(added===0){ if(errEl) errEl.textContent = 'No valid entries found in that file.'; return; }
      saveDB();
      render();
      showAlert(added+' '+(added===1?'entry':'entries')+' added to '+cfg.name+'.');
    }catch(e){
      if(errEl) errEl.textContent = 'That file could not be read as vault entries.';
    }
  };
  reader.readAsText(file);
}

/* ================= SETTINGS ACTIONS ================= */
function exportData(){
  const blob = new Blob([JSON.stringify(db,null,2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'trinity-vaults-backup-'+todayStr().replace(/\s+/g,'-')+'.json';
  a.click();
}
function importData(event){
  const file = event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(){
    try{
      const parsed = JSON.parse(reader.result);
      showConfirm('This will replace everything currently saved.', function(){
        db = Object.assign(defaultDB(), parsed);
        saveDB();
        closeModal();
        goHome();
      }, 'Restore');
    }catch(e){
      showAlert('That file could not be read as a backup.');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}
function resetAll(){
  showConfirm('This clears every vault. Export a backup first if you want to keep anything.', function(){
    db = defaultDB();
    saveDB();
    closeModal();
    goHome();
  }, 'Reset everything');
}

/* ================= CLOUD SYNC (Firebase, optional) ================= */
let cloudEnabled = false;
let cloudUser = null;
let unsubscribeSnapshot = null;
let unsubscribeOperational = null;
let applyingRemoteUpdate = false;
let saveDebounceTimer = null;
let hasPendingLocalWrite = false;

function initCloud(){
  if(!FIREBASE_CONFIG) return;
  try{
    if(typeof firebase === 'undefined') return;
    firebase.initializeApp(FIREBASE_CONFIG);
    cloudEnabled = true;
    /* Offline persistence: cached reads work instantly (including on
       reload while offline), and writes made offline queue locally and
       sync once the connection returns. Must be called before any other
       Firestore call, and before the auth/snapshot listeners below. */
    firebase.firestore().enablePersistence({synchronizeTabs:true}).catch(function(e){
      console.log('Offline persistence not enabled:', e.code);
    });
    firebase.auth().onAuthStateChanged(function(user){
      cloudUser = user;
      if(state.view==='settings') render();
      if(user){
        subscribeToCloud(user.uid);
        subscribeToOperational(user.uid);
      } else {
        if(unsubscribeSnapshot){
          unsubscribeSnapshot();
          unsubscribeSnapshot = null;
        }
        if(unsubscribeOperational){
          unsubscribeOperational();
          unsubscribeOperational = null;
        }
      }
    });
  }catch(e){
    cloudEnabled = false;
  }
}
function signInWithGoogle(){
  if(!cloudEnabled) return;
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).catch(function(e){ showAlert('Sign-in failed: '+e.message); });
}
function signOutCloud(){
  if(!cloudEnabled) return;
  firebase.auth().signOut();
}
function subscribeToCloud(uid){
  const ref = firebase.firestore().collection('trinityVaultsUsers').doc(uid);
  unsubscribeSnapshot = ref.onSnapshot(function(doc){
    /* A local edit is queued or in flight - applying this snapshot now
       (which doesn't include that edit yet) would clobber it in both
       memory and localStorage before it gets pushed. Skip it; our own
       write will settle things once it completes. */
    if(hasPendingLocalWrite) return;
    if(doc.exists){
      const remote = doc.data().db;
      if(remote){
        applyingRemoteUpdate = true;
        db = Object.assign(defaultDB(), remote);
        localStorage.setItem('trinityVaultsDB', JSON.stringify(db));
        render();
        applyingRemoteUpdate = false;
      }
    } else {
      pushToCloud();
    }
  });
}
function pushToCloud(){
  if(!cloudEnabled || !cloudUser || applyingRemoteUpdate) return;
  hasPendingLocalWrite = true;
  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = setTimeout(function(){
    firebase.firestore().collection('trinityVaultsUsers').doc(cloudUser.uid).set({db:db, updatedAt:Date.now()})
      .catch(function(e){ console.log('Cloud save failed (continuing anyway):', e); })
      .then(function(){ hasPendingLocalWrite = false; });
  }, 400);
}

/* ================= INIT ================= */
render();
initCloud();
