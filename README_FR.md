# G-360 Pro 

> Solution digitale de gestion commerciale pour les PME sénégalaises — disponible en **français** et en **wolof**.

---

##  Présentation

**G-360 Pro** est une application web légère conçue spécifiquement pour les petites et moyennes entreprises (PME) du Sénégal. Elle permet de piloter au quotidien les ventes, les stocks et l'historique des transactions depuis un navigateur, sans installation requise.

L'interface bilingue **Français / Wolof** la rend accessible à un maximum d'utilisateurs, y compris ceux qui ne sont pas à l'aise avec le français écrit.

---

##  Fonctionnalités

| Module | Description |
|---|---|
| 🏠 **Dashboard** | Vue d'ensemble : chiffre d'affaires, ventes totales, alertes stock, graphiques |
| 🛒 **Ventes** | Enregistrement rapide d'une vente, calcul automatique du montant, historique du jour |
| 📦 **Stock** | Visualisation des niveaux de stock, réapprovisionnement, alertes stock faible |
| 📋 **Historique** | Toutes les transactions, résumé journalier, export CSV |
| 🏷️ **Produits** | Catalogue produits, ajout / suppression, gestion des prix unitaires |
| 🌍 **Bilingue** | Basculement instantané Français ↔ Wolof |
| 🔐 **Multi-utilisateurs** | Connexion par compte, données sauvegardées par utilisateur |

---

## 📸 Aperçu

> *(Ajoute ici une ou deux captures d'écran de l'application)*

---

## 🛠️ Technologies utilisées

- **HTML5 / CSS3** — structure et mise en page responsive
- **JavaScript (Vanilla)** — logique applicative, gestion d'état
- **Chart.js** — graphiques interactifs (CA, top produits, stock, camembert)
- **Font Awesome 7** — icônes
- **LocalStorage** — persistance des données côté navigateur, par utilisateur

---

## 🚀 Lancer le projet

Aucune dépendance à installer. Il suffit d'ouvrir le fichier HTML dans un navigateur :

```bash
git clone https://github.com/<ton-pseudo>/<ton-repo>.git
cd <ton-repo>
# Ouvre index.html dans ton navigateur
```

Ou en utilisant une extension comme **Live Server** sur VS Code pour un rechargement automatique.

> **Compte de démonstration**
> - Utilisateur : `admin`
> - Mot de passe : `1234`

---

##  Structure du projet

```
G-360-Pro/
├── index.html              # Page principale
├── CSS/
│   └── style.css           # Styles de l'application
├── JAVASCRIPT/
│   └── script.js           # Logique JS + traductions
├── favicon-16x16_france.png
└── favicon-16x16_senegal.png
```

---

##  Système de traduction

L'application intègre un système de traduction dynamique via l'objet `T` dans `script.js`. Le basculement de langue se fait sans rechargement de page grâce aux attributs `data-key` dans le HTML.

```js
// Exemple d'ajout d'une traduction
T.wo.monCle = "Traduction en wolof";
```

Les langues actuellement supportées : `fr` (Français), `wo` (Wolof).

---

##  Améliorations prévues

- [ ] Traduction wolof complète de toute l'interface
- [ ] Synchronisation cloud (Firebase ou Supabase)
- [ ] Gestion des clients et de la facturation
- [ ] Mode hors-ligne (PWA)
- [ ] Application mobile (React Native ou PWA)
- [ ] Tableau de bord avancé avec filtres par période

---

##  Auteur

**Madzou Frederic Franchir**
Bachelor IAGE — ISM Dakar / Web solution architect ITS ICT PIEMONTE

---

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).

---

<p align="center">Fait avec ❤️ pour les entrepreneurs sénégalais</p>
