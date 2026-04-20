
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
          validate: "✅ Valider la vente",
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
        },
        wo: {
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
          validate: "✅ Wone",
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

      let data = JSON.parse(localStorage.getItem("g360_data")) || {
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
      // SAVE / LANG
      // ══════════════════════════════════════════
      function save() {
        localStorage.setItem("g360_data", JSON.stringify(data));
      }

      function setLang(l, btn) {
        lang = l;
        // update sidebar buttons
        document.getElementById("btnFR").classList.toggle("active", l === "fr");
        document.getElementById("btnWO").classList.toggle("active", l === "wo");
        // update login lang buttons
        document
          .querySelectorAll(".lang-btn")
          .forEach((b) => b.classList.remove("active"));
        if (btn) btn.classList.add("active");
        // apply translations
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
        if (u === "admin" && p === "1234") {
          document.getElementById("loginPage").classList.add("hidden");
          document.getElementById("app").classList.remove("hidden");
          initApp();
        } else {
          document.getElementById("loginErr").textContent =
            lang === "wo"
              ? "⚠️ Diggël dafa faw!"
              : "⚠️ Identifiants incorrects";
        }
      }

      function doLogout() {
        location.reload();
      }

      // ══════════════════════════════════════════
      // INIT
      // ══════════════════════════════════════════
      function initApp() {
        updateDate();
        setInterval(updateDate, 60000);
        // set first nav btn as active
        activeNavBtn = document.querySelector(".nav-item.active");
        show("dashboard", activeNavBtn);
        setLang(lang);
      }

      function updateDate() {
        const now = new Date();
        document.getElementById("topDate").textContent = now.toLocaleDateString(
          "fr-FR",
          { weekday: "long", year: "numeric", month: "long", day: "numeric" },
        );
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
        // hide all
        document
          .querySelectorAll(".main .content > section")
          .forEach((s) => s.classList.add("hidden"));
        // show target
        document.getElementById("sec-" + name).classList.remove("hidden");
        // nav highlight
        document
          .querySelectorAll(".nav-item")
          .forEach((b) => b.classList.remove("active"));
        if (btn) {
          btn.classList.add("active");
          activeNavBtn = btn;
        }
        // page title
        document.getElementById("pageTitle").textContent =
          sectionTitles[name] || name;
        currentSection = name;
        // render
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
        // populate select
        const sel = document.getElementById("saleProduct");
        sel.innerHTML = "";
        for (const p in data.products) {
          const opt = document.createElement("option");
          opt.value = p;
          opt.text = `${p} (${data.products[p].stock} dispo)`;
          sel.appendChild(opt);
        }
        sel.onchange = updateSaleTotal;
        document.getElementById("saleQty").oninput = updateSaleTotal;
        updateSaleTotal();
        renderTodaySales();
      }

      function updateSaleTotal() {
        const p = document.getElementById("saleProduct").value;
        const q = Number(document.getElementById("saleQty").value) || 0;
        const prix = data.products[p] ? data.products[p].prix : 0;
        document.getElementById("saleTotal").textContent =
          (prix * q).toLocaleString() + " FCFA";
      }

      function doSell() {
        const p = document.getElementById("saleProduct").value;
        const q = Number(document.getElementById("saleQty").value);
        const msg = document.getElementById("saleMsg");

        if (!p || q <= 0) {
          msg.style.color = "var(--danger)";
          msg.textContent = "⚠️ Quantité invalide";
          return;
        }
        if (!data.products[p]) {
          msg.style.color = "var(--danger)";
          msg.textContent = "⚠️ Produit introuvable";
          return;
        }
        if (data.products[p].stock < q) {
          msg.style.color = "var(--danger)";
          msg.textContent =
            lang === "wo"
              ? `⚠️ Yëngu bi dafa tane!`
              : `⚠️ Stock insuffisant ! (${data.products[p].stock} dispo)`;
          return;
        }

        const total = q * data.products[p].prix;
        const now = new Date();

        data.products[p].stock -= q;
        data.ca += total;
        data.salesCount += 1;
        data.chartCA.push(data.ca);

        data.history.unshift({
          id: Date.now(),
          date: now.toLocaleDateString("fr-FR"),
          heure: now.toLocaleTimeString("fr-FR", {
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
        msg.textContent = `✅ Vente enregistrée : ${p} × ${q} = ${total.toLocaleString()} FCFA`;
        setTimeout(() => (msg.textContent = ""), 4000);

        showToast(
          `Vente : ${p} × ${q}`,
          `${total.toLocaleString()} FCFA encaissés`,
          "success",
        );

        // stock alert
        if (data.products[p].stock <= STOCK_ALERT) {
          showToast(
            `⚠️ Stock faible : ${p}`,
            `Il reste ${data.products[p].stock} unités`,
            "warning",
          );
          updateStockBadge();
        }

        renderSales();
        renderDashboard();
      }

      function renderTodaySales() {
        const today = new Date().toLocaleDateString("fr-FR");
        const tbody = document.getElementById("todaySalesTable");
        const sales = data.history.filter(
          (h) => h.date === today && h.type === "vente",
        );
        if (!sales.length) {
          tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:24px">Aucune vente aujourd'hui</td></tr>`;
          return;
        }
        tbody.innerHTML = sales
          .map(
            (h, i) => `
    <tr>
      <td>${h.date} ${h.heure}</td>
      <td><strong style="text-transform:capitalize">${h.produit}</strong></td>
      <td>${h.qte}</td>
      <td><strong>${h.montant.toLocaleString()} FCFA</strong></td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteSale(${h.id})">🗑️ Supprimer</button>
      </td>
    </tr>`,
          )
          .join("");
      }

      function deleteSale(id) {
        openModal(
          "🗑️ Supprimer cette vente ?",
          "Cette action annulera la vente et remettra le stock à son niveau précédent.",
          () => {
            const idx = data.history.findIndex((h) => h.id === id);
            if (idx === -1) return;
            const h = data.history[idx];
            // restore stock & CA
            if (data.products[h.produit])
              data.products[h.produit].stock += h.qte;
            data.ca -= h.montant;
            data.salesCount -= 1;
            data.history.splice(idx, 1);
            // rebuild chartCA from scratch
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
        const maxStock = Math.max(
          ...Object.values(data.products).map((p) => p.stock),
          1,
        );
        container.innerHTML = Object.entries(data.products)
          .map(([name, p]) => {
            const pct = Math.round((p.stock / Math.max(maxStock, 1)) * 100);
            const cls =
              p.stock <= 10
                ? "danger"
                : p.stock <= STOCK_ALERT
                  ? "warning"
                  : "ok";
            return `
    <div class="stock-item">
      <div class="stock-item-info">
        <div class="stock-item-name">${name}</div>
        <div class="stock-item-prix">${p.prix.toLocaleString()} FCFA/unité</div>
      </div>
      <div class="stock-bar-wrap">
        <div class="stock-bar-bg">
          <div class="stock-bar-fill ${cls}" style="width:${pct}%"></div>
        </div>
      </div>
      <div class="stock-qty" style="color:${cls === "danger" ? "var(--danger)" : cls === "warning" ? "var(--warning)" : "var(--success)"}">${p.stock}</div>
      <div class="stock-actions">
        <button class="btn btn-outline btn-sm" onclick="restock('${name}')" title="Réapprovisionner">➕</button>
        <button class="btn btn-danger btn-sm" onclick="confirmDeleteProduct('${name}')" title="Supprimer">🗑️</button>
      </div>
    </div>`;
          })
          .join("");

        // stock bar chart
        drawStockChart();
        updateStockBadge();
      }

      function restock(name) {
        const q = prompt(`Combien d'unités ajouter pour "${name}" ?`);
        const n = parseInt(q);
        if (!n || n <= 0) return;
        data.products[name].stock += n;
        save();
        renderStock();
        showToast(`Stock mis à jour`, `+${n} unités pour ${name}`, "success");
      }

      function confirmResetStock() {
        openModal(
          "🔄 Remettre le stock à zéro ?",
          "⚠️ Tous les stocks de tous les produits seront mis à 0. Cette action est irréversible.",
          () => {
            for (const p in data.products) data.products[p].stock = 0;
            save();
            renderStock();
            showToast(
              "Stock remis à zéro",
              "Tous les produits sont à 0",
              "warning",
            );
          },
        );
      }

      function confirmDeleteProduct(name) {
        openModal(
          `🗑️ Supprimer "${name}" ?`,
          "Ce produit sera retiré du catalogue. Les ventes passées seront conservées dans l'historique.",
          () => {
            delete data.products[name];
            save();
            renderStock();
            renderProducts();
            showToast(
              "Produit supprimé",
              name + " a été retiré du catalogue",
              "danger",
            );
          },
        );
      }

      function updateStockBadge() {
        const alerts = Object.values(data.products).filter(
          (p) => p.stock <= STOCK_ALERT,
        ).length;
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
        if (!data.history.length) {
          tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px">Aucune transaction</td></tr>`;
        } else {
          tbody.innerHTML = data.history
            .map(
              (h, i) => `
      <tr>
        <td style="color:var(--muted);font-size:0.8rem">${data.history.length - i}</td>
        <td style="font-size:0.82rem">${h.date} ${h.heure || ""}</td>
        <td><strong style="text-transform:capitalize">${h.produit}</strong></td>
        <td>${h.qte}</td>
        <td><strong>${h.montant.toLocaleString()} FCFA</strong></td>
        <td><span class="badge-pill badge-success">Vente</span></td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteSale(${h.id})">🗑️</button></td>
      </tr>`,
            )
            .join("");
        }

        // daily summary
        const today = new Date().toLocaleDateString("fr-FR");
        const todaySales = data.history.filter((h) => h.date === today);
        const todayCA = todaySales.reduce((a, h) => a + h.montant, 0);
        document.getElementById("dailySummary").innerHTML = `
    <div style="display:grid;gap:8px">
      <div style="display:flex;justify-content:space-between;padding:10px 14px;background:#f8fafc;border-radius:8px">
        <span style="color:var(--muted)">📅 Date</span>
        <strong>${today}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;padding:10px 14px;background:#f8fafc;border-radius:8px">
        <span style="color:var(--muted)">🧾 Ventes du jour</span>
        <strong>${todaySales.length}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;padding:10px 14px;background:#e6f9ee;border-radius:8px">
        <span style="color:var(--muted)">💰 CA du jour</span>
        <strong style="color:var(--success)">${todayCA.toLocaleString()} FCFA</strong>
      </div>
      <div style="display:flex;justify-content:space-between;padding:10px 14px;background:#f8fafc;border-radius:8px">
        <span style="color:var(--muted)">💰 CA total</span>
        <strong>${data.ca.toLocaleString()} FCFA</strong>
      </div>
    </div>`;

        drawPieChart();
      }

      // ══════════════════════════════════════════
      // PRODUITS
      // ══════════════════════════════════════════
      function renderProducts() {
        const tbody = document.getElementById("productsTable");
        tbody.innerHTML = Object.entries(data.products)
          .map(([name, p]) => {
            const cls =
              p.stock <= 10
                ? "badge-danger"
                : p.stock <= STOCK_ALERT
                  ? "badge-warning"
                  : "badge-success";
            const label =
              p.stock <= 10
                ? "Critique"
                : p.stock <= STOCK_ALERT
                  ? "Faible"
                  : "OK";
            return `<tr>
      <td><strong style="text-transform:capitalize">${name}</strong></td>
      <td>${p.prix.toLocaleString()} FCFA</td>
      <td>${p.stock}</td>
      <td><span class="badge-pill ${cls}">${label}</span></td>
      <td style="display:flex;gap:6px">
        <button class="btn btn-outline btn-sm" onclick="restock('${name}')">➕ Réappro</button>
        <button class="btn btn-danger btn-sm" onclick="confirmDeleteProduct('${name}')">🗑️</button>
      </td>
    </tr>`;
          })
          .join("");
      }

      function addProduct() {
        const name = document
          .getElementById("newProdName")
          .value.trim()
          .toLowerCase();
        const prix = parseInt(document.getElementById("newProdPrix").value);
        const stock =
          parseInt(document.getElementById("newProdStock").value) || 0;
        const msg = document.getElementById("prodMsg");

        if (!name) {
          msg.style.color = "var(--danger)";
          msg.textContent = "⚠️ Nom requis";
          return;
        }
        if (!prix || prix <= 0) {
          msg.style.color = "var(--danger)";
          msg.textContent = "⚠️ Prix invalide";
          return;
        }
        if (data.products[name]) {
          msg.style.color = "var(--danger)";
          msg.textContent = "⚠️ Ce produit existe déjà";
          return;
        }

        data.products[name] = { stock, prix };
        save();
        msg.style.color = "var(--success)";
        msg.textContent = `✅ Produit "${name}" ajouté !`;
        document.getElementById("newProdName").value = "";
        document.getElementById("newProdPrix").value = "";
        document.getElementById("newProdStock").value = "";
        setTimeout(() => (msg.textContent = ""), 3000);
        renderProducts();
        showToast("Produit ajouté", name + " est dans le catalogue", "success");
      }

      // ══════════════════════════════════════════
      // DASHBOARD
      // ══════════════════════════════════════════
      function renderDashboard() {
        document.getElementById("statCA").textContent =
          data.ca.toLocaleString();
        document.getElementById("statVentes").textContent = data.salesCount;
        const totalStock = Object.values(data.products).reduce(
          (a, p) => a + p.stock,
          0,
        );
        document.getElementById("statProduits").textContent = totalStock;
        const alerts = Object.values(data.products).filter(
          (p) => p.stock <= STOCK_ALERT,
        ).length;
        document.getElementById("statAlertes").textContent = alerts;

        // last sales
        const tbody = document.getElementById("lastSalesTable");
        const last5 = data.history.slice(0, 5);
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
        <td><span class="badge-pill badge-success">✅ Vente</span></td>
      </tr>`,
            )
            .join("");
        }

        drawCAChart();
        drawTopChart();
        updateStockBadge();
      }

      // ══════════════════════════════════════════
      // CHARTS
      // ══════════════════════════════════════════
      let chartCA, chartTop, chartStock, chartPie;

      function drawCAChart() {
        const ctx = document.getElementById("chartCA");
        if (chartCA) chartCA.destroy();
        chartCA = new Chart(ctx, {
          type: "line",
          data: {
            labels: data.chartCA.map((_, i) => `V${i + 1}`),
            datasets: [
              {
                label: "CA cumulé (FCFA)",
                data: data.chartCA,
                borderColor: "#00b4d8",
                backgroundColor: "rgba(0,180,216,0.08)",
                borderWidth: 2.5,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: "#00b4d8",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { callback: (v) => v.toLocaleString() },
              },
            },
          },
        });
      }

      function drawTopChart() {
        const ctx = document.getElementById("chartTop");
        if (chartTop) chartTop.destroy();

        const counts = {};
        data.history.forEach((h) => {
          counts[h.produit] = (counts[h.produit] || 0) + h.qte;
        });
        const sorted = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        chartTop = new Chart(ctx, {
          type: "bar",
          data: {
            labels: sorted.map(([n]) => n),
            datasets: [
              {
                label: "Unités vendues",
                data: sorted.map(([, v]) => v),
                backgroundColor: [
                  "#00b4d8",
                  "#0077b6",
                  "#415a77",
                  "#2dc653",
                  "#f4a261",
                ],
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

      function drawStockChart() {
        const ctx = document.getElementById("chartStock");
        if (chartStock) chartStock.destroy();
        const colors = Object.values(data.products).map((p) =>
          p.stock <= 10
            ? "#e63946"
            : p.stock <= STOCK_ALERT
              ? "#f4a261"
              : "#2dc653",
        );
        chartStock = new Chart(ctx, {
          type: "bar",
          data: {
            labels: Object.keys(data.products),
            datasets: [
              {
                label: "Stock",
                data: Object.values(data.products).map((p) => p.stock),
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
        data.history.forEach((h) => {
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
                  label: (ctx) =>
                    ` ${ctx.label} : ${ctx.raw.toLocaleString()} FCFA`,
                },
              },
            },
          },
        });
      }

      // ══════════════════════════════════════════
      // TOAST NOTIFICATIONS
      // ══════════════════════════════════════════
      function showToast(title, msg, type = "success") {
        const zone = document.getElementById("alertZone");
        const icons = { success: "✅", warning: "⚠️", danger: "❌" };
        const div = document.createElement("div");
        div.className = `alert-toast ${type}`;
        div.innerHTML = `
    <span class="alert-icon">${icons[type] || "ℹ️"}</span>
    <div class="alert-body">
      <div class="alert-title">${title}</div>
      <div class="alert-msg">${msg}</div>
    </div>
    <button class="alert-close" onclick="this.parentElement.remove()">✕</button>`;
        zone.appendChild(div);
        setTimeout(() => div.remove(), 5000);
      }

      // ══════════════════════════════════════════
      // MODAL
      // ══════════════════════════════════════════
      let modalCallback = null;

      function openModal(title, body, cb) {
        document.getElementById("modalTitle").textContent = title;
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

      // close modal on overlay click
      document
        .getElementById("modalOverlay")
        .addEventListener("click", function (e) {
          if (e.target === this) closeModal();
        });

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
        const blob = new Blob(["\uFEFF" + csv], {
          type: "text/csv;charset=utf-8;",
        });
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
