let historyFilter = 'all';
let salesFilter = 'today';
let historyCustomDate = null;
let salesCustomDate = null;
let caFilter = 'all';
let topFilter = 'all';

function showRegister() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
}

function doRegister() {
  const u = document.getElementById("registerUser").value;
  const p = document.getElementById("registerPass").value;

  if (!u || !p) {
    document.getElementById("registerMsg").textContent =
      lang === "wo" ? "Dugal sa xam-xam!" : "Remplis tous les champs";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find((user) => user.username === u);

  if (exists) {
    document.getElementById("registerMsg").textContent =
      lang === "wo" ? "Jëfandikukat bi am na!" : "Utilisateur déjà existant";
    return;
  }

  users.push({ username: u, password: p });
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("registerMsg").textContent =
    lang === "wo" ? "Inscription bi am na!" : "Compte créé avec succès";

  showLogin();
}

// Initialisation des utilisateurs
if (!localStorage.getItem("users")) {
  const defaultUsers = [{ username: "admin", password: "1234" }];
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// Initialisation des identifiants (si pas encore définis)
if (!localStorage.getItem("user")) {
  localStorage.setItem("user", "admin");
  localStorage.setItem("pass", "1234");
}

// ══════════════════════════════════════════
// TRADUCTIONS
// ══════════════════════════════════════════
const T = {
  fr: {
    loginSub: "Gestion Commerciale PME",
    userLabel: "Utilisateur",
    passLabel: "Mot de passe",
    loginBtn: "Connexion",
    dashboard: "Dashboard",
    salesNav: "Vente",
    stockNav: "Stock",
    historyNav: "Historique",
    supportNav: "Support",
    statCA: "Chiffre d'affaires (FCFA)",
    statVentes: "Ventes totales",
    statProduits: "Produits en stock",
    statAlertes: "Alertes stock faible",
    caEvolution: "Évolution du CA",
    topProduits: "Top produits vendus",
    lastSales: "Dernières ventes",
    newSale: "Nouvelle vente",
    prodLabel: "Produit",
    qtyLabel: "Quantité",
    validate: "Valider la vente",
    todaySales: "Ventes du jour",
    stockTitle: "État du stock",
    resetStock: "Remettre à zéro",
    stockChart: "Visualisation du stock",
    ventesParProduit: "Ventes par produit",
    resumeJour: "Résumé du jour",
    allTransactions: "Toutes les transactions",
    supportTitle: "Contact & Support",
    supportDesc: "Notre équipe est disponible pour vous aider.",
    horaires: "Horaires",
    thDate: "Date/Heure",
    thProduit: "Produit",
    thQte: "Qté",
    thMontant: "Montant",
    thStatut: "Statut",
    thType: "Type",
    createAccount: "Créer un compte",
  },

  wo: {
    createAccount: "Bind akont",
    loginSub: "Jëfandikoo Jaay-jaay PME",
    userLabel: "Jëfandikkat",
    passLabel: "Diggël",
    loginBtn: "Dugg",
    dashboard: "Tëralin",
    salesNav: "Jaay",
    stockNav: "Yëngu",
    historyNav: "Taarix",
    supportNav: "Ndimbal",
    statCA: "Xaalis (FCFA)",
    statVentes: "Jaay yi",
    statProduits: "Xam-xam yi",
    statAlertes: "Tiis ak yëngu",
    caEvolution: "Jaay ak xaalis",
    topProduits: "Ndigël jaay",
    lastSales: "Jaay bu mujj yi",
    newSale: "Jaay bu bees",
    prodLabel: "Xam-xam",
    qtyLabel: "Yëgël",
    validate: "Wone",
    todaySales: "Jaay tey",
    stockTitle: "Yëngu bi",
    resetStock: "Sett ci kanam",
    stockChart: "Xalaat yëngu",
    ventesParProduit: "Jaay yi ci xam-xam",
    resumeJour: "Biir bés bi",
    allTransactions: "Jaay yëp",
    supportTitle: "Ndimbal",
    supportDesc: "Team bi ci nga am ndimbal.",
    horaires: "Yoon bu xëtu",
    thDate: "Waxtu",
    thProduit: "Xam-xam",
    thQte: "Yëgël",
    thMontant: "Xaalis",
    thStatut: "Yoon",
    thType: "Suñu",
  },
};

// ══════════════════════════════════════════
// STATE
// ══════════════════════════════════════════
let lang = "fr";
let currentSection = "dashboard";
let activeNavBtn = null;

let data = {
  ca: 0,
  salesCount: 0,
  history: [],
  chartCA: [],
  products: {
    pain: { stock: 50, prix: 200 },
    sucre: { stock: 30, prix: 500 },
    oeuf: { stock: 100, prix: 100 },
    thon: { stock: 20, prix: 1500 },
    cafe: { stock: 40, prix: 800 },
  },
};

const STOCK_ALERT = 20;

// ══════════════════════════════════════════
// HELPERS – icônes Font Awesome
// ══════════════════════════════════════════
const fa = {
  check: '<i class="fa-solid fa-circle-check"></i>',
  warn: '<i class="fa-solid fa-triangle-exclamation"></i>',
  trash: '<i class="fa-solid fa-trash"></i>',
  plus: '<i class="fa-solid fa-plus"></i>',
  restock: '<i class="fa-solid fa-arrow-up-from-bracket"></i>',
  rotate: '<i class="fa-solid fa-rotate"></i>',
  xmark: '<i class="fa-solid fa-xmark"></i>',
  toastSuccess: '<i class="fa-solid fa-circle-check"></i>',
  toastWarning: '<i class="fa-solid fa-triangle-exclamation"></i>',
  toastDanger: '<i class="fa-solid fa-circle-xmark"></i>',
  calendar: '<i class="fa-solid fa-calendar-day"></i>',
  receipt: '<i class="fa-solid fa-receipt"></i>',
  sack: '<i class="fa-solid fa-sack-dollar"></i>',
};

// ══════════════════════════════════════════
// SAVE / LANG
// ══════════════════════════════════════════
function save() {
  const currentuser = localStorage.getItem("currentUser");
  localStorage.setItem(`data_${currentuser}`, JSON.stringify(data));
}

// changement de langue
function setLang(l, btn) {
  lang = l;
  document
    .querySelectorAll(".lang-btn")
    .forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  document.querySelectorAll("[data-key]").forEach((el) => {
    const k = el.dataset.key;
    if (T[l][k]) el.textContent = T[l][k];
  });
}

// ══════════════════════════════════════════
// LOGIN / LOGOUT
// ══════════════════════════════════════════
function doLogin() {
  const u = document.getElementById("loginUser").value;
  const p = document.getElementById("loginPass").value;

  const users = JSON.parse(localStorage.getItem("users"));

  const foundUser = users.find(
    (user) => user.username === u && user.password === p,
  );

  if (foundUser) {
    localStorage.setItem("currentUser", u);
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    initApp();
  } else {
    document.getElementById("loginErr").textContent =
      lang === "wo" ? "Diggël dafa faw!" : "Identifiants incorrects";
  }
}

function doLogout() {
  location.reload();
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
function initApp() {
  const currentUser = localStorage.getItem("currentUser");

  const savedData = localStorage.getItem(`data_${currentUser}`);
  if (savedData) {
    data = JSON.parse(savedData);
  } else {
    data = {
      products: [
        { name: "pain", stock: 50, prix: 200 },
        { name: "sucre", stock: 30, prix: 500 },
        { name: "oeuf", stock: 100, prix: 100 },
        { name: "thon", stock: 20, prix: 1500 },
        { name: "cafe", stock: 40, prix: 800 },
      ],
      sales: [],
    };
  }

  loadProducts();

  // Garantit que les champs critiques existent toujours
  data.history = data.history ?? [];
  data.chartCA = data.chartCA ?? [];
  data.salesCount = data.salesCount ?? 0;
  data.ca = data.ca ?? 0;
  data.products = data.products ?? {};

  updateDate();
  setInterval(updateDate, 60000);

  activeNavBtn = document.querySelector(".nav-item.active");
  show("dashboard", activeNavBtn);

  setLang(lang);

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", doLogout);

  const btnFR = document.getElementById("btnFR");
  const btnWO = document.getElementById("btnWO");
  if (btnFR) btnFR.addEventListener("click", () => setLang("fr", btnFR));
  if (btnWO) btnWO.addEventListener("click", () => setLang("wo", btnWO));
}

function updateDate() {
  const el = document.getElementById("topDate");
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString("fr-FR");
}

// ══════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════
const sectionTitles = {
  dashboard: "Dashboard",
  sales: "Vente",
  stock: "Stock",
  history: "Historique",
  products: "Produits",
  support: "Support",
};

function show(name, btn) {
  document
    .querySelectorAll(".main .content > section")
    .forEach((s) => s.classList.add("hidden"));
  document.getElementById("sec-" + name).classList.remove("hidden");
  document
    .querySelectorAll(".nav-item")
    .forEach((b) => b.classList.remove("active"));
  if (btn) {
    btn.classList.add("active");
    activeNavBtn = btn;
  }
  document.getElementById("pageTitle").textContent =
    sectionTitles[name] || name;
  currentSection = name;
  if (name === "dashboard") renderDashboard();
  if (name === "sales") renderSales();
  if (name === "stock") renderStock();
  if (name === "history") renderHistory();
  if (name === "products") renderProducts();
}

// ══════════════════════════════════════════
// SELL
// ══════════════════════════════════════════
function renderSales() {
  const sel = document.getElementById("saleProduct");
  sel.innerHTML = "";
  data.products.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.name;
    opt.text = `${p.name} (${p.stock} dispo)`;
    sel.appendChild(opt);
  });
  sel.onchange = updateSaleTotal;
  document.getElementById("saleQty").oninput = updateSaleTotal;
  updateSaleTotal();
  renderTodaySales();
}

function updateSaleTotal() {
  const name = document.getElementById("saleProduct").value;
  const q = Number(document.getElementById("saleQty").value) || 0;
  const product = data.products.find((p) => p.name === name);
  const prix = product ? product.prix : 0;
  document.getElementById("saleTotal").textContent =
    (prix * q).toLocaleString() + " FCFA";
}

function doSell() {
  const p = document.getElementById("saleProduct").value;
  const q = Number(document.getElementById("saleQty").value);
  const msg = document.getElementById("saleMsg");

  if (!p || q <= 0) {
    msg.style.color = "var(--danger)";
    msg.innerHTML = `${fa.warn} Quantité invalide`;
    return;
  }

  const product = data.products.find((prod) => prod.name === p);

  if (!product) {
    msg.style.color = "var(--danger)";
    msg.innerHTML = `${fa.warn} Produit introuvable`;
    return;
  }

  if (product.stock < q) {
    msg.style.color = "var(--danger)";
    msg.innerHTML =
      lang === "wo"
        ? `${fa.warn} Yëngu bi dafa tane!`
        : `${fa.warn} Stock insuffisant ! (${product.stock} dispo)`;
    return;
  }
  const total = product.prix * q;

  // mise à jour stock
  product.stock -= q;

  // mise à jour stats
  data.ca = (data.ca || 0) + total;
  data.salesCount = (data.salesCount || 0) + 1;
  data.chartCA = data.chartCA || [];
  data.chartCA.push(data.ca);

  // historique
  data.history.unshift({
    id: Date.now(),
    date: new Date().toLocaleDateString("fr-FR"),
    heure: new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    produit: p,
    qte: q,
    montant: total,
    type: "vente",
  });

  save();

  msg.style.color = "var(--success)";
  msg.innerHTML = `${fa.check} Vente enregistrée : ${p} × ${q} = ${total.toLocaleString()} FCFA`;
  setTimeout(() => (msg.innerHTML = ""), 4000);

  showToast(
    `Vente : ${p} × ${q}`,
    `${total.toLocaleString()} FCFA encaissés`,
    "success",
  );

  if (product.stock <= STOCK_ALERT) {
    showToast(
      `Stock faible : ${p}`,
      `Il reste ${product.stock} unités`,
      "warning",
    );
    updateStockBadge();
  }

  renderSales();
  renderDashboard();
}

function renderTodaySales() {
  const sales = filterHistory(salesFilter, salesCustomDate)
    .filter(h => h.type === "vente");
  const tbody = document.getElementById("todaySalesTable");

  if (!sales.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:24px">Aucune vente sur cette période</td></tr>`;
  } else {
    tbody.innerHTML = sales.map(h => `
      <tr>
        <td>${h.date} ${h.heure || ''}</td>
        <td><strong style="text-transform:capitalize">${h.produit}</strong></td>
        <td>${h.qte}</td>
        <td><strong>${h.montant.toLocaleString()} FCFA</strong></td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteSale(${h.id})">
            ${fa.trash} Supprimer
          </button>
        </td>
      </tr>`).join("");
  }

  // Résumé sous le tableau
  const totalCA = sales.reduce((a, h) => a + h.montant, 0);
  document.getElementById("salesFilterSummary").innerHTML = sales.length
    ? `<span>${fa.receipt} <strong>${sales.length}</strong> vente(s)</span>
       <span>${fa.sack} Total : <strong style="color:var(--success)">${totalCA.toLocaleString()} FCFA</strong></span>`
    : '';
}

function setSalesFilter(filter, btn) {
  salesFilter = filter;
  salesCustomDate = null;
  document.querySelectorAll('#sec-sales .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const input = document.getElementById('salesCustomDate');
  input.style.display = filter === 'custom' ? 'inline-block' : 'none';
  if (filter !== 'custom') renderTodaySales();
}

function applySalesCustomDate() {
  const val = document.getElementById('salesCustomDate').value; // "yyyy-mm-dd"
  if (!val) return;
  // Convertir en "dd/mm/yyyy"
  const [y, m, d] = val.split('-');
  salesCustomDate = `${d}/${m}/${y}`;
  renderTodaySales();
}

function deleteSale(id) {
  openModal(
    "Supprimer cette vente ?",
    "Cette action annulera la vente et remettra le stock à son niveau précédent.",
    "fa-solid fa-trash",
    () => {
      const idx = data.history.findIndex((h) => h.id === id);
      if (idx === -1) return;
      const h = data.history[idx];
      const prod = data.products.find((p) => p.name === h.produit);
      if (prod) prod.stock += h.qte;
      data.ca -= h.montant;
      data.salesCount -= 1;
      data.history.splice(idx, 1);
      data.chartCA = [];
      let cumul = 0;
      [...data.history].reverse().forEach((h) => {
        cumul += h.montant;
        data.chartCA.push(cumul);
      });
      save();
      showToast("Vente supprimée", "Stock et CA mis à jour", "success");
      renderSales();
      renderDashboard();
      updateStockBadge();
    },
  );
}

// ══════════════════════════════════════════
// STOCK
// ══════════════════════════════════════════
function renderStock() {
  const container = document.getElementById("stockListUI");

  const maxStock = Math.max(...data.products.map((p) => p.stock), 1);

  container.innerHTML = data.products
    .map((p) => {
      const pct = Math.round((p.stock / maxStock) * 100);
      const cls =
        p.stock <= 10 ? "danger" : p.stock <= STOCK_ALERT ? "warning" : "ok";

      return `
<div class="stock-item">
<div class="stock-item-info">
<div class="stock-item-name">${p.name}</div>
<div class="stock-item-prix">${p.prix.toLocaleString()} FCFA/unité</div>
</div>
<div class="stock-bar-wrap">
<div class="stock-bar-bg">
<div class="stock-bar-fill ${cls}" style="width:${pct}%"></div>
</div>
</div>
</div>
`;
    })
    .join("");
  drawStockChart();
}

function restock(name) {
  const q = prompt(`Combien d'unités ajouter pour "${name}" ?`);
  const n = parseInt(q);
  if (!n || n <= 0) return;
  data.products[name].stock += n;
  save();
  renderStock();
  showToast("Stock mis à jour", `+${n} unités pour ${name}`, "success");
}

function confirmResetStock() {
  openModal(
    "Remettre le stock à zéro ?",
    "Tous les stocks seront mis à 0. Cette action est irréversible.",
    "fa-solid fa-rotate",
    () => {
      data.products.forEach((p) => (p.stock = 0));
      save();
      renderStock();
      loadProducts();
      showToast("Stock réinitialisé", "Tous les produits sont à 0", "success");
    },
  );
}

function updateStockBadge() {
  const alerts = data.products.filter((p) => p.stock <= STOCK_ALERT).length;
  const badge = document.getElementById("stockBadge");
  if (alerts > 0) {
    badge.textContent = alerts;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

// ══════════════════════════════════════════
// HISTORIQUE
// ══════════════════════════════════════════
function renderHistory() {
  const tbody = document.getElementById("historyTable");
  const filtered = filterHistory(historyFilter, historyCustomDate);

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px">Aucune transaction sur cette période</td></tr>`;
  } else {
    tbody.innerHTML = filtered.map((h, i) => `
      <tr>
        <td style="color:var(--muted);font-size:0.8rem">${filtered.length - i}</td>
        <td style="font-size:0.82rem">${h.date} ${h.heure || ''}</td>
        <td><strong style="text-transform:capitalize">${h.produit}</strong></td>
        <td>${h.qte}</td>
        <td><strong>${h.montant.toLocaleString()} FCFA</strong></td>
        <td><span class="badge-pill badge-success">Vente</span></td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteSale(${h.id})">${fa.trash}</button>
        </td>
      </tr>`).join("");
  }

  // Résumé du jour (toujours basé sur aujourd'hui, indépendant du filtre)
  const today = new Date().toLocaleDateString("fr-FR");
  const todaySales = data.history.filter(h => h.date === today);
  const todayCA = todaySales.reduce((a, h) => a + h.montant, 0);

  document.getElementById("dailySummary").innerHTML = `
  <div class="summary-row"><span class="summary-row-label">${fa.calendar} Date</span><span class="summary-row-val">${today}</span></div>
  <div class="summary-row"><span class="summary-row-label">${fa.receipt} Ventes du jour</span><span class="summary-row-val">${todaySales.length}</span></div>
  <div class="summary-row highlight"><span class="summary-row-label">${fa.sack} CA du jour</span><span class="summary-row-val">${todayCA.toLocaleString()} FCFA</span></div>
  <div class="summary-row"><span class="summary-row-label">${fa.sack} CA total</span><span class="summary-row-val">${(data.ca||0).toLocaleString()} FCFA</span></div>`;
}

// ══════════════════════════════════════════
// PRODUITS
// ══════════════════════════════════════════
function renderProducts() {
  const tbody = document.getElementById("productsTable");
  tbody.innerHTML = data.products.map(p => {
    const cls = p.stock <= 10 ? "badge-danger" : p.stock <= STOCK_ALERT ? "badge-warning" : "badge-success";
    const label = p.stock <= 10 ? "Critique" : p.stock <= STOCK_ALERT ? "Faible" : "OK";
    return `
      <tr>
        <td><strong style="text-transform:capitalize">${p.name}</strong></td>
        <td style="font-family:'DM Mono',monospace">${p.prix.toLocaleString()} FCFA</td>
        <td style="font-family:'DM Mono',monospace;font-weight:700">${p.stock}</td>
        <td><span class="badge-pill ${cls}">${label}</span></td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="confirmDeleteProduct('${p.name}')">
            <i class="fa-solid fa-ban"></i> Retirer
          </button>
        </td>
      </tr>`;
  }).join("");
}

function loadProducts() {
  const select = document.getElementById("sellProduct");

  if (!select) return;

  select.innerHTML = "";

  data.products.forEach((p, index) => {
    const option = document.createElement("option");

    option.value = index;
    option.textContent = `${p.name} (${p.stock} dispo)`;

    select.appendChild(option);
  });
}

function addProduct() {
  const name = document
    .getElementById("newProdName")
    .value.trim()
    .toLowerCase();
  const prix = parseInt(document.getElementById("newProdPrix").value);
  const stock = parseInt(document.getElementById("newProdStock").value) || 0;
  const msg = document.getElementById("prodMsg");

  if (!name) {
    msg.style.color = "var(--danger)";
    msg.innerHTML = `${fa.warn} Nom requis`;
    return;
  }
  if (!prix || prix <= 0) {
    msg.style.color = "var(--danger)";
    msg.innerHTML = `${fa.warn} Prix invalide`;
    return;
  }

  const existing = data.products.find((p) => p.name === name);

  if (existing) {
    if (existing.stock > 0) {
      // Produit encore en stock → vraie erreur
      msg.style.color = "var(--danger)";
      msg.innerHTML = `${fa.warn} Ce produit existe déjà (stock actuel : ${existing.stock})`;
      return;
    }
    // Produit épuisé → on réapprovisionne
    existing.stock = stock;
    existing.prix = prix; // met aussi le prix à jour si besoin
    save();
    msg.style.color = "var(--success)";
    msg.innerHTML = `${fa.check} Stock de "${name}" remis à ${stock} unité(s) !`;
    setTimeout(() => (msg.innerHTML = ""), 3000);
    renderProducts();
    renderStock();
    loadProducts();
    showToast("Réapprovisionnement", `${name} : +${stock} unités`, "success");
    return;
  }

  // Nouveau produit
  data.products.push({ name, stock, prix });
  save();
  msg.style.color = "var(--success)";
  msg.innerHTML = `${fa.check} Produit "${name}" ajouté !`;
  document.getElementById("newProdName").value = "";
  document.getElementById("newProdPrix").value = "";
  document.getElementById("newProdStock").value = "";
  setTimeout(() => (msg.innerHTML = ""), 3000);
  renderProducts();
  renderStock();
  loadProducts();
  showToast("Produit ajouté", name + " est dans le catalogue", "success");
}

function parseDate(str) {
  // str au format "dd/mm/yyyy"
  const parts = str.split('/');
  if (parts.length !== 3) return null;
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

function filterHistory(filter, customDate) {
  const now = new Date();
  const todayStr = now.toLocaleDateString("fr-FR");

  // Début de semaine (lundi)
  const dow = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dow);
  startOfWeek.setHours(0, 0, 0, 0);

  // Début de mois
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  if (filter === 'today') {
    return data.history.filter(h => h.date === todayStr);
  }
  if (filter === 'week') {
    return data.history.filter(h => {
      const d = parseDate(h.date);
      return d && d >= startOfWeek;
    });
  }
  if (filter === 'month') {
    return data.history.filter(h => {
      const d = parseDate(h.date);
      return d && d >= startOfMonth;
    });
  }
  if (filter === 'custom' && customDate) {
    return data.history.filter(h => h.date === customDate);
  }
  return data.history; // 'all'
}

// ══════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════
function renderDashboard() {
  document.getElementById("statCA").textContent = (
    data.ca || 0
  ).toLocaleString();
  document.getElementById("statVentes").textContent = data.salesCount || 0;

  const totalStock = data.products.reduce((a, p) => a + p.stock, 0);
  document.getElementById("statProduits").textContent = totalStock;

  const alerts = data.products.filter((p) => p.stock <= STOCK_ALERT).length;
  document.getElementById("statAlertes").textContent = alerts;

  const tbody = document.getElementById("lastSalesTable");
  const last5 = (data.history || []).slice(0, 5);
  if (!last5.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:20px">Aucune vente</td></tr>`;
  } else {
    tbody.innerHTML = last5
      .map(
        (h) => `
      <tr>
        <td style="font-size:0.82rem">${h.date} ${h.heure || ""}</td>
        <td style="text-transform:capitalize"><strong>${h.produit}</strong></td>
        <td>${h.qte}</td>
        <td><strong>${h.montant.toLocaleString()} FCFA</strong></td>
        <td><span class="badge-pill badge-success">${fa.check} Vente</span></td>
      </tr>`,
      )
      .join("");
  }
  const today = new Date().toLocaleDateString("fr-FR");
  const todaySales = data.history.filter((h) => h.date === today);
  const todayCA = todaySales.reduce((a, h) => a + h.montant, 0);
  document.getElementById("statCAJour").textContent = todayCA.toLocaleString();
  document.getElementById("statVentesJour").textContent = todaySales.length;
  drawCAChart();
  renderTopProducts();
  updateStockBadge();
}

function setHistoryFilter(filter, btn) {
  historyFilter = filter;
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderHistory();
}

// ══════════════════════════════════════════
// CHARTS
// ══════════════════════════════════════════
let chartCA, chartTop, chartStock, chartPie;

function drawCAChart() {
  const ctx = document.getElementById("chartCA");
  if (chartCA) chartCA.destroy();

  // Grouper les ventes par date
  const now = new Date();
  let history = [...data.history];

  if (caFilter === 'week') {
    const limit = new Date(now); limit.setDate(now.getDate() - 6); limit.setHours(0,0,0,0);
    history = history.filter(h => { const d = parseDate(h.date); return d && d >= limit; });
  } else if (caFilter === 'month') {
    const limit = new Date(now); limit.setDate(now.getDate() - 29); limit.setHours(0,0,0,0);
    history = history.filter(h => { const d = parseDate(h.date); return d && d >= limit; });
  }

  // Regrouper par date → CA journalier
  const byDate = {};
  [...history].reverse().forEach(h => {
    byDate[h.date] = (byDate[h.date] || 0) + h.montant;
  });

  const labels = Object.keys(byDate);
  const values = Object.values(byDate);

  chartCA = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "CA (FCFA)",
        data: values,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.07)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "white",
        pointBorderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { callback: v => v.toLocaleString() }, grid: { color: '#f1f5f9' } },
        x: { grid: { display: false } }
      },
    },
  });
}

function setCAFilter(filter, btn) {
  caFilter = filter;
  document.querySelectorAll('#sec-dashboard .chart-header:first-of-type .filter-btn')
    .forEach(b => b.classList.remove('active'));
  // Cibler uniquement les boutons du graphique CA
  btn.closest('.filter-btns').querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  drawCAChart();
}

function drawTopChart() {}

function renderTopProducts() {
  let history = [...data.history];
  const now = new Date();

  if (topFilter === 'today') {
    const today = now.toLocaleDateString("fr-FR");
    history = history.filter(h => h.date === today);
  } else if (topFilter === 'week') {
    const limit = new Date(now); limit.setDate(now.getDate() - 6); limit.setHours(0,0,0,0);
    history = history.filter(h => { const d = parseDate(h.date); return d && d >= limit; });
  } else if (topFilter === 'month') {
    const limit = new Date(now); limit.setDate(now.getDate() - 29); limit.setHours(0,0,0,0);
    history = history.filter(h => { const d = parseDate(h.date); return d && d >= limit; });
  }

  const counts = {};
  history.forEach(h => { counts[h.produit] = (counts[h.produit] || 0) + h.qte; });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const max = sorted[0]?.[1] || 1;
  const ranks = ['gold', 'silver', 'bronze'];

  const container = document.getElementById("topProductsList");
  if (!sorted.length) {
    container.innerHTML = `<p style="text-align:center;color:var(--muted);padding:32px 0;font-size:0.85rem">Aucune vente sur cette période</p>`;
    return;
  }

  container.innerHTML = sorted.map(([name, qty], i) => `
    <div class="top-product-row">
      <div class="top-rank ${ranks[i] || ''}">${i + 1}</div>
      <div class="top-product-name">${name}</div>
      <div class="top-product-bar-wrap">
        <div class="top-product-bar">
          <div class="top-product-bar-fill" style="width:${Math.round(qty/max*100)}%"></div>
        </div>
      </div>
      <div class="top-product-qty">${qty} u.</div>
    </div>`).join("");
}

function setTopFilter(filter, btn) {
  topFilter = filter;
  btn.closest('.filter-btns').querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTopProducts();
}

function drawStockChart() {
  const ctx = document.getElementById("chartStock");
  if (chartStock) chartStock.destroy();
  const colors = data.products.map((p) =>
    p.stock <= 10 ? "#e63946" : p.stock <= STOCK_ALERT ? "#f4a261" : "#2dc653",
  );
  chartStock = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.products.map((p) => p.name),
      datasets: [
        {
          label: "Stock",
          data: data.products.map((p) => p.stock),
          backgroundColor: colors,
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });
}

function drawPieChart() {
  const ctx = document.getElementById("chartPie");
  if (chartPie) chartPie.destroy();
  const counts = {};
  (data.history || []).forEach((h) => {
    counts[h.produit] = (counts[h.produit] || 0) + h.montant;
  });
  if (!Object.keys(counts).length) {
    ctx.parentElement.innerHTML =
      '<p style="text-align:center;color:var(--muted);padding:40px">Aucune donnée</p>';
    return;
  }
  chartPie = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(counts),
      datasets: [
        {
          data: Object.values(counts),
          backgroundColor: [
            "#00b4d8",
            "#0077b6",
            "#415a77",
            "#2dc653",
            "#f4a261",
            "#e63946",
          ],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { padding: 16, font: { size: 11 } },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label} : ${ctx.raw.toLocaleString()} FCFA`,
          },
        },
      },
    },
  });
}

function setHistoryFilter(filter, btn) {
  historyFilter = filter;
  historyCustomDate = null;
  document.querySelectorAll('#sec-history .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const input = document.getElementById('historyCustomDate');
  input.style.display = filter === 'custom' ? 'inline-block' : 'none';
  if (filter !== 'custom') renderHistory();
}

function applyHistoryCustomDate() {
  const val = document.getElementById('historyCustomDate').value; // "yyyy-mm-dd"
  if (!val) return;
  const [y, m, d] = val.split('-');
  historyCustomDate = `${d}/${m}/${y}`;
  renderHistory();
}

// ══════════════════════════════════════════
// TOAST NOTIFICATIONS
// ══════════════════════════════════════════
function showToast(title, msg, type = "success") {
  const zone = document.getElementById("alertZone");
  const icons = {
    success: fa.toastSuccess,
    warning: fa.toastWarning,
    danger: fa.toastDanger,
  };
  const div = document.createElement("div");
  div.className = `alert-toast ${type}`;
  div.innerHTML = `
    <span class="alert-icon">${icons[type] || '<i class="fa-solid fa-circle-info"></i>'}</span>
    <div class="alert-body">
      <div class="alert-title">${title}</div>
      <div class="alert-msg">${msg}</div>
    </div>
    <button class="alert-close" onclick="this.parentElement.remove()">${fa.xmark}</button>`;
  zone.appendChild(div);
  setTimeout(() => div.remove(), 5000);
}

// ══════════════════════════════════════════
// MODAL
// ══════════════════════════════════════════
let modalCallback = null;

function openModal(title, body, iconClass, cb) {
  const iconHtml = iconClass ? `<i class="${iconClass}"></i> ` : "";
  document.getElementById("modalTitle").innerHTML = iconHtml + title;
  document.getElementById("modalBody").textContent = body;
  modalCallback = cb;
  document.getElementById("modalOverlay").classList.remove("hidden");
  document.getElementById("modalConfirmBtn").onclick = () => {
    closeModal();
    if (cb) cb();
  };
}

function closeModal() {
  document.getElementById("modalOverlay").classList.add("hidden");
  modalCallback = null;
}

document.getElementById("modalOverlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

const btnCancel = document.querySelector(".btn-outline");
if (btnCancel) {
  btnCancel.addEventListener("click", closeModal);
}

// ══════════════════════════════════════════
// EXPORT CSV
// ══════════════════════════════════════════
function exportCSV() {
  if (!data.history.length) {
    showToast("Export impossible", "Aucune donnée à exporter", "warning");
    return;
  }
  const rows = [
    ["#", "Date", "Heure", "Produit", "Quantite", "Montant FCFA", "Type"],
  ];
  data.history.forEach((h, i) => {
    rows.push([
      i + 1,
      h.date,
      h.heure || "",
      h.produit,
      h.qte,
      h.montant,
      h.type || "vente",
    ]);
  });
  const csv = rows.map((r) => r.join(";")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `G360_historique_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  showToast("Export réussi", "Fichier CSV téléchargé", "success");
}

// ══════════════════════════════════════════
// ENTER KEY on login
// ══════════════════════════════════════════
document.getElementById("loginUser").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("loginPass").focus();
});

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    const page = button.dataset.page;
    show(page, button);
  });
});
