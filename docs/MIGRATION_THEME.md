# Migracja motywu na zewnętrzny pakiet npm

Ten dokument opisuje, jak w przyszłości zamienić wewnętrzne paczki workspace'owe
(`@p4/crm-mvp-components-tokens` oraz `@p4/crm-mvp-components-tailwind-preset`)
na **zewnętrzny pakiet npm** dostarczający motyw (kolory `primary`, `secondary`,
typografia, spacing itd.) — tak, aby przestać trzymać definicje stylów w tym
repo.

> Dokument zakłada, że nowy pakiet zewnętrzny będzie dostarczony przez inny
> zespół / inne repo i opublikowany na rejestrze npm (publiczny lub prywatny).
> Nazwa robocza pakietu w tej instrukcji: `@external/design-theme`.

---

## 1. Stan obecny

Motyw jest dziś trzymany w dwóch paczkach workspace:

| Paczka | Co zawiera | Co eksportuje |
| --- | --- | --- |
| `packages/tokens` | TypeScript: `colors`, `spacing`, `radius`, `fontFamily`, `fontSize`, `fontWeight`, `shadow`, `motion` (`src/lib/tokens.ts`) | obiekt `tokens` + typ `Tokens` |
| `packages/tailwind-preset` | `presetCss()` generuje string `@import "tailwindcss"; @theme { … }` z tokenów. Skrypt `generate-preset-css.ts` zapisuje wynik do `dist/preset.css` | plik `dist/preset.css` (subpath export `./preset.css`) |

Paczki frameworkowe (`@p4/crm-mvp-components-{react,vue,angular}`) konsumują
**preset.css** przez subpath export:

```jsonc
// w package.json każdej z paczek frameworkowych
"exports": {
  "./styles.css": "../tailwind-preset/dist/preset.css"
}
```

Czyli **single source of truth** dla wartości stylów to `packages/tokens/src/lib/tokens.ts`,
a **wyjściowym artefaktem** który trafia do konsumenta to `preset.css` z
dyrektywą Tailwind 4 `@theme { … }`.

---

## 2. Trzy warianty zewnętrznego pakietu

Wybór wariantu zależy od tego, **w jakim formacie** zewnętrzny pakiet
dostarczy motyw. Zacznij od ustalenia tego z zespołem, który publikuje
`@external/design-theme`.

### Wariant A — pakiet eksportuje obiekt tokens w JS (najmniej zmian)

Zewnętrzny pakiet eksportuje strukturę o **takim samym kształcie** jak nasza
obecna paczka `tokens`:

```ts
// @external/design-theme
export const colors: { primary: { 50: string, ..., 950: string }, ... };
export const tokens: { colors, spacing, radius, fontFamily, fontSize, fontWeight, shadow, motion };
export type Tokens = typeof tokens;
```

Co robimy:

1. W `packages/tailwind-preset/package.json` dodaj `@external/design-theme` do
   `dependencies` (zamiast `@p4/crm-mvp-components-tokens`).
2. W `packages/tailwind-preset/src/lib/preset.ts` zmień import:
   ```diff
   -import { tokens, type Tokens } from '@p4/crm-mvp-components-tokens';
   +import { tokens, type Tokens } from '@external/design-theme';
   ```
3. Usuń całą paczkę `packages/tokens`:
   - `rm -rf packages/tokens`
   - usuń wpis w `.changeset/config.json` w `linked` (jeśli zostanie sam preset, w ogóle usuń tę parę z `linked`)
   - usuń `@p4/crm-mvp-components-tokens` z `dependencies` wszędzie gdzie jeszcze występuje (`packages/angular/package.json`, `packages/react/package.json`, `packages/vue/package.json`)
4. `pnpm install` + `pnpm nx run-many -t build` — sprawdź czy `preset.css` generuje się identycznie.

### Wariant B — pakiet eksportuje gotowy plik CSS z `@theme`

Zewnętrzny pakiet dostarcza już skompilowany blok Tailwind:

```css
/* @external/design-theme/theme.css */
@theme {
  --color-primary-500: #a855f7;
  …
}
```

Co robimy:

1. **Wyrzucamy obie wewnętrzne paczki** (`tokens` i `tailwind-preset`).
2. Każda paczka frameworkowa konsumuje motyw bezpośrednio z `@external/design-theme`:
   ```jsonc
   // packages/react/package.json (analogicznie vue / angular)
   "dependencies": {
     "@external/design-theme": "^1.0.0"
   },
   "exports": {
     "./styles.css": "./node_modules/@external/design-theme/theme.css"
     // lub re-export własnego pliku, który robi:
     //   @import "tailwindcss";
     //   @import "@external/design-theme/theme.css";
   }
   ```
3. Aplikacje konsumenckie importują:
   ```ts
   import '@p4/crm-mvp-components-react/styles.css';
   // pod spodem ciągnie się @external/design-theme/theme.css
   ```

### Wariant C — pakiet eksportuje plik z CSS variables (bez `@theme`)

Zewnętrzny pakiet dostarcza `theme.css` z surowymi zmiennymi, np.:

```css
:root {
  --color-primary-500: #a855f7;
  --spacing-4: 1rem;
}
```

Co robimy:

1. Tworzymy w workspace **cieńką** paczkę-shim, która łączy:
   ```css
   /* packages/tailwind-preset/dist/preset.css */
   @import "tailwindcss";
   @import "@external/design-theme/theme.css";
   @theme inline {
     --color-primary-500: var(--color-primary-500);
     /* ... */
   }
   ```
2. Usuwamy `packages/tokens` (Wariant A applies dla preset.ts: zamiast TS-owej
   generacji można wpisać statyczny preset.css ręcznie z mappingiem `@theme inline`).
3. Reszta jak w wariancie A/B.

> Wariant B jest najbardziej radykalny (paczki `tokens` + `tailwind-preset` znikają zupełnie).
> Wariant A wymaga najmniej zmian — preset wciąż żyje w naszym repo, ale
> ciągnie dane z zewnątrz.

---

## 3. Konkretne kroki — checklist (na bazie wariantu A)

```text
[ ] 1. Otwórz changeset: `pnpm changeset` → wybierz major bump dla tokens/preset
[ ] 2. packages/tailwind-preset/package.json
        - usuń `@p4/crm-mvp-components-tokens` z dependencies
        - dodaj `@external/design-theme` (zalecane: ^MAJOR.0.0)
[ ] 3. packages/tailwind-preset/src/lib/preset.ts
        - podmień import na `@external/design-theme`
        - upewnij się, że typ `Tokens` jest zgodny (alternatywnie zlokalizuj typ lokalnie)
[ ] 4. packages/{react,vue,angular}/package.json
        - usuń `@p4/crm-mvp-components-tokens` z dependencies (jeśli był)
        - tailwind-preset ZOSTAJE jako zależność (nadal dostarcza preset.css)
[ ] 5. Usuń katalog `packages/tokens`
[ ] 6. tsconfig.base.json
        - usuń ścieżkę path-mapping prowadzącą do `packages/tokens` (jeśli istnieje)
[ ] 7. .changeset/config.json
        - usuń `@p4/crm-mvp-components-tokens` z grupy `linked`
        - jeśli grupa zostanie pusta (1 element), usuń ją całą
[ ] 8. pnpm install
[ ] 9. pnpm nx run-many -t build  # zwłaszcza tailwind-preset musi zbudować się czysto
[10] pnpm nx run-many -t test
[11] Sprawdź Storybooka (apps/storybook) — czy kolory się nie rozjechały
[12] Zaktualizuj README paczek (sekcja "Theme source")
[13] Zacommituj + zrób release: `pnpm changeset version && pnpm release`
```

Dla wariantu B dodaj jeszcze:

```text
[B-1] Usuń `packages/tailwind-preset` w całości
[B-2] W każdej paczce frameworkowej zmień subpath export `./styles.css`
      tak, by wskazywał na artefakt z `@external/design-theme` (przez re-export
      lub bezpośrednio plik z node_modules zapakowany w `files: ["styles.css"]`)
[B-3] Zaktualizuj wszystkie storybook'i (`apps/storybook`, `packages/*/src/.../*.stories`)
      które importowały `@p4/crm-mvp-components-tailwind-preset/preset.css`
```

---

## 4. Kontrakt z zewnętrznym pakietem (do ustalenia z autorami)

Aby wariant A działał bez zmian w `preset.ts`, zewnętrzny pakiet **musi**
eksportować obiekt `tokens` o kształcie zgodnym z naszym obecnym typem
`Tokens` z `packages/tokens/src/lib/tokens.ts`. Konkretnie:

| Klucz | Wymagany shape | Uwagi |
| --- | --- | --- |
| `colors.<scale>.<shade>` | `string` (hex/oklch/rgb) | `primary`, `secondary`, `neutral`, `success`, `warning`, `danger`, `info` (lub dowolne nowe — `preset.ts` iteruje po kluczach) |
| `spacing.<key>` | `string` (rem/px) | dowolne klucze |
| `radius.<key>` | `string` | min: `none`, `sm`, `md`, `lg`, `xl`, `full` |
| `fontFamily.<key>` | `string` | min: `sans`, `mono` |
| `fontSize.<key>` | `[size: string, lineHeight: string]` | tupla, oba elementy `string` |
| `fontWeight.<key>` | `string` (`'400'` itd.) | |
| `shadow.<key>` | `string` (pełna wartość CSS) | |
| `motion.duration.<key>` | `string` (`'180ms'`) | |
| `motion.easing.<key>` | `string` (`'cubic-bezier(…)'`) | |

> **Tip:** jeśli zewnętrzny zespół ma własną nomenklaturę, można zostawić nasz
> `tokens.ts` jako **cienki adapter** (mapping zewnętrznych nazw na nasz
> kształt) zamiast wyrzucać paczkę. To kompromis między wariantami A i B.

---

## 5. Co z wersjonowaniem i releasem po migracji

Po usunięciu `packages/tokens`:

- Z `.changeset/config.json` znika `@p4/crm-mvp-components-tokens` z `linked`.
- `@p4/crm-mvp-components-tailwind-preset` releasuje się niezależnie.
- Paczki `react`/`vue`/`angular` dalej są niezależne (każda osobny changeset).
- `updateInternalDependencies: "patch"` w `.changeset/config.json` zadba o
  automatyczny patch bump paczek frameworkowych, gdy zmieni się preset.

Tym samym Twoje obecne wymaganie — **niezależne releasowanie Angular / React /
Vue** — pozostaje spełnione.

---

## 6. Rollback

W razie problemów:

1. `git revert <merge-commit>` — wszystkie zmiany są w jednym PR.
2. `pnpm install` przywraca workspace.
3. Wersje paczek wzrosły o major — przed publikacją upewnij się, że masz
   `--dry-run` w `pnpm changeset publish` przy pierwszej próbie.

---

## 7. Pliki do edycji — szybka mapa

```
packages/tokens/                              ← usuwany (warianty A, B)
packages/tailwind-preset/
  src/lib/preset.ts                           ← podmiana importu (A)
  package.json                                ← dependencies (A) / cała paczka usunięta (B)
packages/react/package.json                   ← dependencies, exports (B)
packages/vue/package.json                     ← dependencies, exports (B)
packages/angular/package.json                 ← dependencies (B)
tsconfig.base.json                            ← path mapping (A, B)
.changeset/config.json                        ← `linked` (A, B)
apps/storybook/**                             ← weryfikacja kolorów (A, B)
```
