/* ============================================================
   THE BARN HOTEL — shared config for HosDesk + HosFix
   Firebase project: brandonhall-7bdef (shared HosPRO project).
   The Barn's data lives in its OWN collections, all prefixed
   "barn_" — nothing is shared with Brandon Hall:
     barn_requests · barn_deliveries · barn_visitors
     barn_fix_jobs · barn_config
   ============================================================ */
const firebaseConfig = {
  apiKey: "AIzaSyDnPWrPGInDRTCF1Go710XC_8_77l_72i0",
  authDomain: "brandonhall-7bdef.firebaseapp.com",
  projectId: "brandonhall-7bdef",
  storageBucket: "brandonhall-7bdef.firebasestorage.app",
  messagingSenderId: "391317900568",
  appId: "1:391317900568:web:643c9d6691f7f16d65226d"
};

/* ---- The Barn Hotel ------------------------------------------- */
const BARN = {
  name: "The Barn Hotel",
  shortName: "The Barn",
  address: "West End Road, Ruislip HA4 6JB",
  site: "https://thebarnhotel.hospro.co.uk/"
};

/* ---- Bedrooms ---------------------------------------------------
   PLACEHOLDER: rooms 1–60 (the hotel has about 60 bedrooms).
   Replace with the real room numbers/names once Catherine sends
   the list, e.g. { room:"101", cat:"Standard", floor:"1" }.
   Rooms can also be saved in Firestore barn_config/current.rooms. */
const BARN_ROOMS = (function(){
  const out=[]; for(let i=1;i<=60;i++) out.push({ room:String(i), cat:"", floor:"" });
  return out;
})();

/* ---- Reception / housekeeping staff shown on HosDesk ------------
   (names reception can pick when logging a request) */
const BARN_STAFF = [
  { id:"catherine", name:"Catherine Virdee", status:"active" },
  { id:"josh",      name:"Josh",             status:"active" },
  { id:"reception", name:"Reception",        status:"active" }
];

/* ---- Minimal HH store (same interface the HosDesk page expects) -- */
(function(){
  const HH = {
    _cfg: null,
    cfg(){ if(!this._cfg) this._cfg = { rooms: BARN_ROOMS.slice(), staff: BARN_STAFF.slice() }; return this._cfg; },
    async loadCfg(){
      try{
        if(typeof firebase!=='undefined' && firebase.apps && firebase.apps.length){
          const d = await firebase.firestore().collection('barn_config').doc('current').get();
          if(d.exists){ const x=d.data()||{}; const c=this.cfg();
            if(Array.isArray(x.rooms) && x.rooms.length) c.rooms = x.rooms;
            if(Array.isArray(x.staff) && x.staff.length) c.staff = x.staff; }
        }
      }catch(e){ console.warn('barn_config', e); }
      return this.cfg();
    }
  };
  window.HH = HH;
})();
