# Nexora Desktop

Wrapper Electron minimal autour du CLI existant. Electron n'implémente ni l'authentification, ni le chat, ni les modèles: il affiche la sortie du processus CLI et lui transmet le texte saisi via un pseudo-terminal.

## Lancer en développement

Depuis la racine du fork:

```bash
cd desktop
npm install
npm start
```

Bun doit être installé et disponible dans le `PATH`. Pour utiliser un chemin explicite:

```bash
NEXORA_BUN_PATH=/chemin/vers/bun npm start
```

Pour ouvrir un projet précis:

```bash
NEXORA_PROJECT_DIR="$HOME/mon-projet" npm start
```

Windows PowerShell:

```powershell
$env:NEXORA_PROJECT_DIR = "C:\\Users\\toi\\mon-projet"
$env:NEXORA_BUN_PATH = "C:\\Users\\toi\\.bun\\bin\\bun.exe"
npm start
```

## Ce qui se passe

1. Electron ouvre une fenêtre Nexora.
2. `desktop/src/main.cjs` lance `cli/src/index.tsx` avec `FREEBUFF_MODE=true`.
3. `node-pty` fournit un vrai terminal au CLI, indispensable à OpenTUI.
4. La sortie est envoyée à la fenêtre et nettoyée des séquences ANSI.
5. Le champ du bas écrit dans le même stdin pseudo-terminal, donc le fonctionnement reste celui du CLI original.

Le bouton **Projet** ouvre un dossier, mais le choix s'applique au prochain lancement. Ferme puis relance Electron après avoir changé de projet.

## Limite volontaire

Cette première version affiche la sortie brute rendue en texte. Elle ne cherche pas à recréer l'interface OpenTUI dans React, ce qui évite de dupliquer le fonctionnement existant et de créer un second client susceptible de diverger.
