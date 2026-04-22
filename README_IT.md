# G-360 Pro 🛒

> Una soluzione digitale per la gestione commerciale delle PMI senegalesi — disponibile in **francese** e **wolof**.

---

##  Presentazione

**G-360 Pro** è un'applicazione web leggera progettata specificamente per le piccole e medie imprese (PMI) del Senegal. Permette di gestire quotidianamente le vendite, il magazzino e lo storico delle transazioni direttamente dal browser, senza alcuna installazione.

L'interfaccia bilingue **Francese / Wolof** la rende accessibile al maggior numero possibile di utenti, inclusi coloro che non sono a loro agio con il francese scritto.

---

##  Funzionalità

| Modulo | Descrizione |
|---|---|
| 🏠 **Dashboard** | Panoramica: fatturato, vendite totali, avvisi di scorta, grafici |
| 🛒 **Vendite** | Registrazione rapida di una vendita, calcolo automatico dell'importo, storico giornaliero |
| 📦 **Magazzino** | Visualizzazione dei livelli di stock, rifornimento, avvisi scorta bassa |
| 📋 **Storico** | Tutte le transazioni, riepilogo giornaliero, esportazione CSV |
| 🏷️ **Prodotti** | Catalogo prodotti, aggiunta / eliminazione, gestione dei prezzi unitari |
| 🌍 **Bilingue** | Cambio lingua istantaneo Francese ↔ Wolof |
| 🔐 **Multi-utente** | Accesso tramite account, dati salvati per utente |

---

##  Anteprima

> *(Aggiungi qui uno o due screenshot dell'applicazione)*

---

##  Tecnologie utilizzate

- **HTML5 / CSS3** — struttura e layout responsive
- **JavaScript (Vanilla)** — logica applicativa e gestione dello stato
- **Chart.js** — grafici interattivi (fatturato, top prodotti, magazzino, ciambella)
- **Font Awesome 7** — icone
- **LocalStorage** — persistenza dei dati lato browser, per utente

---

##  Avvio del progetto

Nessuna dipendenza da installare. È sufficiente aprire il file HTML nel browser:

```bash
git clone https://github.com/<tuo-username>/<tuo-repo>.git
cd <tuo-repo>
# Apri index.html nel tuo browser
```

In alternativa, utilizza l'estensione **Live Server** su VS Code per il ricaricamento automatico.

> **Account di dimostrazione**
> - Utente: `admin`
> - Password: `1234`

---

##  Struttura del progetto

```
G-360-Pro/
├── index.html              # Pagina principale
├── CSS/
│   └── style.css           # Stili dell'applicazione
├── JAVASCRIPT/
│   └── script.js           # Logica JS + traduzioni
├── favicon-16x16_france.png
└── favicon-16x16_senegal.png
```

---

##  Sistema di traduzione

L'applicazione integra un sistema di traduzione dinamico tramite l'oggetto `T` in `script.js`. Il cambio di lingua avviene senza ricaricare la pagina, grazie agli attributi `data-key` nell'HTML.

```js
// Esempio: aggiunta di una nuova traduzione
T.wo.miaChiave = "Traduzione in wolof";
```

Lingue attualmente supportate: `fr` (Francese), `wo` (Wolof).

---

##  Sviluppi futuri

- [ ] Traduzione wolof completa dell'intera interfaccia
- [ ] Sincronizzazione cloud (Firebase o Supabase)
- [ ] Gestione clienti e fatturazione
- [ ] Modalità offline (PWA)
- [ ] Applicazione mobile (React Native o PWA)
- [ ] Dashboard avanzata con filtri per periodo

---

##  Autore

**Madzou Frederic Franchir**
Bachelor IAGE — ISM Dakar

---

##  Licenza

Questo progetto è distribuito sotto licenza [MIT](LICENSE).

---

<p align="center">Fatto con ❤️ per gli imprenditori senegalesi</p>
