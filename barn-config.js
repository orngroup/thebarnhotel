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

/* ---- Bedrooms (71 rooms in 4 accommodation buildings (319 added from the job list), as supplied by the hotel 6 Nov 2026) ----
   cat = building, floor = Ground/First. Rooms can also be saved in Firestore barn_config/current.rooms. */
const BARN_ROOMS = [{"room": "1", "cat": "Shirley's Farm Building", "floor": "Ground"}, {"room": "2", "cat": "Shirley's Farm Building", "floor": "Ground"}, {"room": "3", "cat": "Shirley's Farm Building", "floor": "Ground"}, {"room": "7", "cat": "Shirley's Farm Building", "floor": "Ground"}, {"room": "4", "cat": "Shirley's Farm Building", "floor": "First"}, {"room": "5", "cat": "Shirley's Farm Building", "floor": "First"}, {"room": "6", "cat": "Shirley's Farm Building", "floor": "First"}, {"room": "10", "cat": "Middle Building", "floor": "Ground"}, {"room": "11", "cat": "Middle Building", "floor": "Ground"}, {"room": "12", "cat": "Middle Building", "floor": "Ground"}, {"room": "14", "cat": "Middle Building", "floor": "Ground"}, {"room": "15", "cat": "Middle Building", "floor": "Ground"}, {"room": "16", "cat": "Middle Building", "floor": "Ground"}, {"room": "17", "cat": "Middle Building", "floor": "Ground"}, {"room": "18", "cat": "Middle Building", "floor": "Ground"}, {"room": "19", "cat": "Middle Building", "floor": "Ground"}, {"room": "20", "cat": "Middle Building", "floor": "Ground"}, {"room": "21", "cat": "Middle Building", "floor": "Ground"}, {"room": "22", "cat": "Middle Building", "floor": "Ground"}, {"room": "23", "cat": "Middle Building", "floor": "Ground"}, {"room": "24", "cat": "Middle Building", "floor": "Ground"}, {"room": "25", "cat": "Middle Building", "floor": "Ground"}, {"room": "26", "cat": "Middle Building", "floor": "Ground"}, {"room": "27", "cat": "Middle Building", "floor": "Ground"}, {"room": "28", "cat": "Middle Building", "floor": "First"}, {"room": "29", "cat": "Middle Building", "floor": "First"}, {"room": "30", "cat": "Middle Building", "floor": "First"}, {"room": "31", "cat": "Middle Building", "floor": "First"}, {"room": "32", "cat": "Middle Building", "floor": "First"}, {"room": "33", "cat": "Middle Building", "floor": "First"}, {"room": "34", "cat": "Middle Building", "floor": "First"}, {"room": "35", "cat": "Middle Building", "floor": "First"}, {"room": "36", "cat": "Middle Building", "floor": "First"}, {"room": "37", "cat": "Middle Building", "floor": "First"}, {"room": "38", "cat": "Middle Building", "floor": "First"}, {"room": "39", "cat": "Middle Building", "floor": "First"}, {"room": "40", "cat": "Middle Building", "floor": "First"}, {"room": "41", "cat": "Middle Building", "floor": "First"}, {"room": "42", "cat": "Middle Building", "floor": "First"}, {"room": "43", "cat": "Middle Building", "floor": "First"}, {"room": "44", "cat": "Middle Building", "floor": "First"}, {"room": "45", "cat": "Back Building", "floor": "Ground"}, {"room": "46", "cat": "Back Building", "floor": "Ground"}, {"room": "47", "cat": "Back Building", "floor": "Ground"}, {"room": "48", "cat": "Back Building", "floor": "Ground"}, {"room": "50", "cat": "Back Building", "floor": "Ground"}, {"room": "51", "cat": "Back Building", "floor": "Ground"}, {"room": "52", "cat": "Back Building", "floor": "Ground"}, {"room": "53", "cat": "Back Building", "floor": "First"}, {"room": "54", "cat": "Back Building", "floor": "First"}, {"room": "55", "cat": "Back Building", "floor": "First"}, {"room": "56", "cat": "Back Building", "floor": "First"}, {"room": "58", "cat": "Back Building", "floor": "First"}, {"room": "59", "cat": "Back Building", "floor": "First"}, {"room": "60", "cat": "Back Building", "floor": "First"}, {"room": "301", "cat": "Deanes Lodge", "floor": "Ground"}, {"room": "302", "cat": "Deanes Lodge", "floor": "Ground"}, {"room": "303", "cat": "Deanes Lodge", "floor": "Ground"}, {"room": "304", "cat": "Deanes Lodge", "floor": "Ground"}, {"room": "305", "cat": "Deanes Lodge", "floor": "Ground"}, {"room": "306", "cat": "Deanes Lodge", "floor": "Ground"}, {"room": "307", "cat": "Deanes Lodge", "floor": "Ground"}, {"room": "308", "cat": "Deanes Lodge", "floor": "Ground"}, {"room": "309", "cat": "Deanes Lodge", "floor": "Ground"}, {"room": "310", "cat": "Deanes Lodge", "floor": "Ground"}, {"room": "311", "cat": "Deanes Lodge", "floor": "First"}, {"room": "312", "cat": "Deanes Lodge", "floor": "First"}, {"room": "314", "cat": "Deanes Lodge", "floor": "First"}, {"room": "315", "cat": "Deanes Lodge", "floor": "First"}, {"room": "316", "cat": "Deanes Lodge", "floor": "First"}, {"room": "319", "cat": "Deanes Lodge", "floor": "First"}];

/* ---- Reception / housekeeping staff shown on HosDesk ------------
   (names reception can pick when logging a request) */
const BARN_STAFF = [
  { id:"catherine", name:"Catherine Virdee", status:"active" },
  { id:"josh",      name:"Josh",             status:"active" },
  { id:"mani",      name:"Mani",             status:"active" },
  { id:"reception", name:"Security / Reception", status:"active" }
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
