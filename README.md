# Rock Paper Scissors

A browser-based Rock Paper Scissors game, built as my solution to [The Odin Project's Rock Paper Scissors project](https://www.theodinproject.com/lessons/foundations-rock-paper-scissors).

## Tech stack

- HTML5
- CSS3
- TypeScript, compiled to ES modules with `tsc`

## Getting started

Install dependencies and compile the TypeScript sources:

```bash
npm install
npm run build   # compile src/ into dist/
```

For development, recompile on change:

```bash
npm run watch
```

## Project structure

```text
.
├── index.html        # Page entry point
├── styles/
│   ├── entry.css     # Stylesheet entry point
│   ├── tokens.css    # Design tokens
│   ├── elements.css  # Default styles for bare HTML elements
│   ├── fonts.css     # Font-face declarations
│   ├── icons.css     # Icon classes
│   └── utilities.css # Utility classes for color, typography, box, and layout
├── assets/
│   ├── ui/
│   │   ├── fonts/    # Font files
│   │   └── icons/    # Icon files
│   └── media/
│       ├── images/   # Image files
│       └── videos/   # Video files
├── src/
│   └── index.ts      # TypeScript entry point
├── dist/
├── tsconfig.json
└── package.json
```

## Status

Scaffolded from a hand-authored HTML/CSS/TypeScript starter. The game logic and interface have not been implemented yet.

## License

ISC
