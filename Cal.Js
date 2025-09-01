
     // ---------- Basic helpers ----------
const display = document.getElementById('display');

function append(text){
  display.value += text;
  display.focus();
}
function allClear(){
  display.value = '';
  display.focus();
}
function backspace(){
  display.value = display.value.slice(0, -1);
  display.focus();
}

// ---------- Panel switches ----------
const basicPanel = document.getElementById('basicPanel');
const trigPanel = document.getElementById('trigPanel');
const physicsPanel = document.getElementById('physicsPanel');

document.getElementById('toBasic').addEventListener('click', ()=> {
  showPanel('basic');
});
document.getElementById('toTrig').addEventListener('click', ()=> {
  showPanel('trig');
});
document.getElementById('toPhysics').addEventListener('click', ()=> {
  showPanel('physics');
});

function showPanel(name){
  if(name === 'basic'){
    basicPanel.classList.add('visible');
    basicPanel.classList.remove('hidden');
  } else {
    basicPanel.classList.add('hidden');
    basicPanel.classList.remove('visible');
  }
  if(name === 'trig'){
    trigPanel.classList.add('visible');
    trigPanel.classList.remove('hidden');
  } else {
    trigPanel.classList.add('hidden');
    trigPanel.classList.remove('visible');
  }
  if(name === 'physics'){
    physicsPanel.classList.add('visible');
    physicsPanel.classList.remove('hidden');
  } else {
    physicsPanel.classList.add('hidden');
    physicsPanel.classList.remove('visible');
  }
}

// ---------- Physics constants list ----------
 const physicsConstants = [
  { label: 'c (speed of light)', token: 'C_c', value: 3.0e8, icon: 'fas fa-bolt' },
  { label: 'h (Planck)', token: 'C_h', value: 6.626e-34, icon: 'fas fa-wave-square' },
  { label: 'hc (eV·nm)', token: 'C_hc', value: 1242, icon: 'fas fa-bolt' },
  { label: 'G (grav)', token: 'C_G', value: 6.67e-11, icon: 'fas fa-globe-americas' },
  { label: 'k (Boltzmann)', token: 'C_k', value: 1.38e-23, icon: 'fas fa-thermometer-half' },
  { label: 'R (molar gas)', token: 'C_R', value: 8.314, icon: 'fas fa-flask' },
  { label: 'N_A (Avogadro)', token: 'C_NA', value: 6.023e23, icon: 'fas fa-atom' },
  { label: 'e (electron charge)', token: 'C_e', value: 1.602e-19, icon: 'fas fa-charging-station' },
  { label: 'μ0 (mu0)', token: 'C_mu0', value: 4*Math.PI*1e-7, icon: 'fas fa-magnet' },
  { label: 'ε0 (epsilon0)', token: 'C_eps0', value: 8.85e-12, icon: 'fas fa-bolt' },
  { label: 'k_e (Coulomb const)', token: 'C_ke', value: 9e9, icon: 'fas fa-bolt' },
  { label: 'F (Faraday)', token: 'C_F', value: 96485, icon: 'fas fa-bolt' },
  { label: 'm_e (electron mass)', token: 'C_me', value: 9.109e-31, icon: 'fas fa-circle' },
  { label: 'm_p (proton mass)', token: 'C_mp', value: 1.6726e-27, icon: 'fas fa-circle' },
  { label: 'm_n (neutron mass)', token: 'C_mn', value: 1.6749e-27, icon: 'fas fa-circle' },
  { label: 'u (atomic mass unit)', token: 'C_u', value: 1.66e-27, icon: 'fas fa-atom' },
  { label: 'amu (MeV/c^2)', token: 'C_amu', value: 931.49e6, icon: 'fas fa-bolt' },
  { label: 'σ (Stefan-Boltzmann)', token: 'C_sigma', value: 5.67e-8, icon: 'fas fa-sun' },
  { label: 'R∞ (Rydberg)', token: 'C_Rinf', value: 1.097e7, icon: 'fas fa-wave-square' },
  { label: 'μ_B (Bohr magneton)', token: 'C_muB', value: 9.27e-24, icon: 'fas fa-magnet' },
  { label: 'a0 (Bohr radius)', token: 'C_a0', value: 0.529e-10, icon: 'fas fa-ruler' },
  { label: 'atm (std atm)', token: 'C_atm', value: 1.01325e5, icon: 'fas fa-wind' },
  { label: 'b (Wien)', token: 'C_b', value: 2.9e-3, icon: 'fas fa-thermometer-half' }
];

function renderConstants(){
  constArea.innerHTML = '';
  const start = currentPage * pageSize;
  const slice = physicsConstants.slice(start, start + pageSize);
  slice.forEach(c => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'constant-btn d-flex align-items-center justify-content-center gap-2';
    btn.innerHTML = `<i class="${c.icon}"></i> ${c.label}`;
    btn.onclick = ()=> insertConstToken(c.token);
    constArea.appendChild(btn);
  });
  const totalPages = Math.ceil(physicsConstants.length / pageSize);
  pageInfo.innerText = `Page ${currentPage+1} / ${totalPages}`;
}
// Pagination for constants
const pageSize = 12;
let currentPage = 0;
const constArea = document.getElementById('constArea');
const pageInfo = document.getElementById('pageInfo');
document.getElementById('prevPage').addEventListener('click', ()=>{
  if (currentPage > 0) { currentPage--; renderConstants(); }
});
document.getElementById('nextPage').addEventListener('click', ()=>{
  if ((currentPage+1) * pageSize < physicsConstants.length) { currentPage++; renderConstants(); }
});

function renderConstants(){
  constArea.innerHTML = '';
  const start = currentPage * pageSize;
  const slice = physicsConstants.slice(start, start + pageSize);
  slice.forEach(c => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'constant-btn';
    btn.innerText = c.label;
    btn.onclick = ()=> insertConstToken(c.token);
    constArea.appendChild(btn);
  });
  const totalPages = Math.ceil(physicsConstants.length / pageSize);
  pageInfo.innerText = `Page ${currentPage+1} / ${totalPages}`;
}

function insertConstToken(token){
  display.value += token;
  display.focus();
}

renderConstants(); // initial render

// ---------- Calculation ----------
function calculate(){
  try {
    let expr = display.value.trim();

    if (!expr) return;

    // replace ^ with **
    expr = expr.replace(/\^/g, '**');

    // Replace trig and helpers with Math.
    expr = expr
      .replace(/\bpi\b/g, 'Math.PI')
      .replace(/\bsin\$/g, 'Math.sin(')
      .replace(/\bcos\$/g, 'Math.cos(')
      .replace(/\btan\$/g, 'Math.tan(')
      .replace(/\basin\$/g, 'Math.asin(')
      .replace(/\bacos\$/g, 'Math.acos(')
      .replace(/\batan\$/g, 'Math.atan(')
      .replace(/\bsqrt\$/g, 'Math.sqrt(')
      .replace(/\blog\$/g, 'Math.log10(');

    // Replace physics tokens with numeric values
    physicsConstants.forEach(c => {
      const re = new RegExp('\\b' + c.token + '\\b', 'g');
      expr = expr.replace(re, '(' + c.value + ')');
    });

    const result = Function('"use strict"; return (' + expr + ')')();

    if (result === undefined || result === null || Number.isNaN(result)) {
      display.value = 'Error';
      return;
    }

    if (result === 0) {
      display.value = '0';
      return;
    }

    const abs = Math.abs(result);
    if (abs < 1e-6 || abs > 1e6) {
      const exponent = Math.floor(Math.log10(abs));
      let mantissa = result / Math.pow(10, exponent);

      const sig = 6;
      let decimals = Math.max(0, sig - Math.floor(Math.log10(Math.abs(mantissa))) - 1);
      if (!isFinite(decimals) || decimals < 0) decimals = 6;
      let mantStr = mantissa.toFixed(decimals);
      mantStr = mantStr.replace(/\.?0+$/, '');
      display.value = mantStr + '*10^' + exponent;
    } else {
      if (Number.isInteger(result)) {
        display.value = String(result);
      } else {
        let s = result.toFixed(10).replace(/\.?0+$/, '');
        display.value = s;
      }
    }
  } catch (e) {
    display.value = 'Error';
    console.error(e);
  }
}

// allow Enter key to calculate
display.addEventListener('keydown', function(e){
  if (e.key === 'Enter') { e.preventDefault(); calculate(); }
});

// start in basic
showPanel('basic');
  
