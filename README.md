# dataviz — lollipop plot mutations

Visualiseur de mutations dans le navigateur : on charge un fichier de mutations au format MAF (`data_mutations.txt`, comme utilisé par [cBioPortal](https://www.cbioportal.org/)), et on affiche un **lollipop plot** — la protéine en barre horizontale, un point à chaque position mutée, hauteur = nombre de mutations à cette position.

Exemple typique visé : le hotspot IDH1 codon 132 doit ressortir comme un pic net.

## Périmètre

Volontairement restreint : **un gène, un graphe.** Pas de multi-gènes, pas de recherche, pas de fonctionnalités façon cBioPortal complet — juste le lollipop plot pour un gène donné.

## État actuel

- [x] Parser : lecture d'un fichier MAF (colonnes trouvées dynamiquement via l'en-tête — `Hugo_Symbol`, `Protein_position`, `Tumor_Sample_Barcode`), lignes sans position filtrées
- [x] Agrégation : compte des mutations par position protéique
- [ ] Chargement du fichier réel par drag & drop (pour l'instant testé avec des données en dur)
- [ ] Rendu du lollipop plot en canvas
- [ ] Interactivité (survol, tooltip)

## Stack

- [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/), sans framework
- Rendu en `<canvas>` natif, sans lib de visualisation (pas de D3)

## Lancer le projet

```
npm install
npm run dev
```

Puis ouvrir l'URL affichée dans le terminal (`http://localhost:5173` par défaut).

## Format de données attendu

Un fichier MAF tab-séparé (`.txt`), avec au minimum les colonnes `Hugo_Symbol`, `Protein_position` et `Tumor_Sample_Barcode` dans l'en-tête. C'est le format des exports `data_mutations.txt` des datasets publics [cBioPortal](https://www.cbioportal.org/datasets).
