# 🌙 AgaMoon

 Site web éducatif sur la Lune, réalisé durant le **DemoMot 2025-2026** — puis transformé en application web installable (PWA)

---

## À propos du projet

**AgaMoon** est un site web dédié à la Lune : données scientifiques, phases lunaires, histoire de l'exploration spatiale et galerie photo personnelle prise à l'iPhone 16 et au Samsung S24 Ultra.

Le projet a été réalisé entièrement en **HTML / CSS** dans le cadre du **DemoMot**, une période de 4 semaines dédiée à la création de projets personnels à l'école.

---

## Les 4 semaines de développement

| Semaine | Travail réalisé |
|---------|----------------|
| **Semaine 1** | Conception du projet, choix du thème, structure HTML de base |
| **Semaine 2** | Mise en page CSS, section chiffres, phases de la Lune |
| **Semaine 3** | Section exploration spatiale, galerie photos, animation planètes |
| **Semaine 4** | Restructuration des dossiers, PWA, mise en ligne sur GitHub Pages |

---

## 🗂️ Structure du projet

```
MoonWebsite/
├── code/
│   ├── accueil.html        # Page principale
│   └── accueil.css         # Styles
├── img/
│   ├── 8Phases/            # Photos des 8 phases lunaires
│   ├── MoonPhotos/         # Photos perso (iPhone 16 & Samsung S24 Ultra)
│   │   ├── Agashae/
│   │   └── Massimo/
│   └── Transparent/        # Planètes animées (footer)
├── manifest.json           # Config PWA
├── service-worker.js       # Cache hors-ligne
├── LogoWebSite.png         # Logo AgaMoon
└── README.md
```

---

## Mise en ligne — GitHub Pages

Le site est hébergé gratuitement via **GitHub Pages** et accessible à l'adresse :

>  **[https://agashae.github.io/MoonWebsite/code/accueil.html](https://agashae.github.io/MoonWebsite/code/accueil.html)**

GitHub Pages a été choisi pour deux raisons :
- Accès depuis n'importe quel réseau (y compris celui de l'école)
- HTTPS natif, indispensable pour faire fonctionner la PWA

---

## Application web installable (PWA)

AgaMoon est une **Progressive Web App** — elle peut être installée comme une vraie application sur mobile et desktop, sans passer par l'App Store ou le Play Store.

### Fonctionnalités PWA

- ✅ Installable sur l'écran d'accueil (iOS Safari & Android Chrome)
- ✅ Fonctionne **hors-ligne** grâce au cache service worker
- ✅ Plein écran sans barre d'adresse (mode `standalone`)
- ✅ Thème et couleurs personnalisés (`#0a0a1a`)

### Comment installer l'app

**Sur Android (Chrome) :**
1. Ouvre le site dans Chrome
2. Appuie sur l'icône ➕ dans la barre d'adresse
3. Appuie sur **Installer**

**Sur iPhone / iPad (Safari) :**
1. Ouvre le site dans Safari
2. Appuie sur le bouton **Partager** ↑
3. Sélectionne **Sur l'écran d'accueil**

**Sur desktop (Chrome) :**
1. Ouvre le site dans Chrome
2. Clique sur l'icône ➕ à droite de la barre d'adresse
3. Clique sur **Installer**

### Fichiers PWA

**`manifest.json`** — déclare l'app (nom, icône, couleurs, mode d'affichage)

**`service-worker.js`** — met en cache toutes les ressources du site au premier chargement, puis les sert localement pour un accès hors-ligne

---

## 🛠️ Technologies utilisées

| Technologie | Usage |
|-------------|-------|
| HTML5 | Structure des pages |
| CSS3 | Mise en page et animations |
| Web App Manifest | Configuration PWA |
| Service Worker API | Cache hors-ligne |
| GitHub Pages | Hébergement gratuit avec HTTPS |

---

## 📷 Crédits photos

- **Galerie iPhone 16** — Agashae Premakumar
- **Galerie Samsung S24 Ultra** — Massimo Carota
- Photos des phases lunaires — [calendrierlunaire.org](https://calendrierlunaire.org/phases-lunaires)

---

*Projet réalisé dans le cadre du DemoMot — 2026*