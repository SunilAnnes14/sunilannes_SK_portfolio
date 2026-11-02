# Inside the Machine

A retro amber CRT portfolio for **Sunil Annes S K**, B.Tech Artificial Intelligence and Data Science student. The visitor boots up a computer running **SK-Linux 1.0 LTS** and travels through it, one page at a time.

## Pages

| Page | Name | What it shows |
| --- | --- | --- |
| 1 | **BOOT** (Home) | CRT power-on, BIOS text, dithered portrait scan, intro |
| 2 | **WHOAMI** (About) | `> whoami` bio, skill bars, neofetch-style info panel, timeline |
| 3 | **CARTRIDGES** (Projects) | 3D game cartridges on a shelf; click to insert and load a project |
| 4 | **TRANSMIT** (Contact) | Terminal-style contact form, packet animation, social links |

## Features

- Amber CRT look with scanlines, screen curvature, vignette and flicker
- Page transitions: CRT shutdown, tape slide with RGB split, scanline wipe, glitch cut
- Button effects: keycap press, bracket expand, text scramble, phosphor fill, magnetic pull
- Hidden command line: type `help` anywhere (`about`, `projects`, `skills`, `contact`, `theme`, `clear`)
- Theme switch between amber, green and white phosphor
- Optional sound effects, muted by default
- Responsive layout and reduced-motion support

## Tech stack

- HTML, CSS, JavaScript (no build step)
- [GSAP](https://gsap.com/) for animation and transitions
- [Three.js](https://threejs.org/) for the 3D cartridges
- Google Fonts (VT323 or Press Start 2P)

## Project structure

```
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── content.js        # all personal content lives here
│   ├── main.js
│   ├── transitions.js
│   ├── buttons.js
│   ├── cartridges.js
│   └── terminal.js
├── assets/
│   └── portrait.png
└── README.md
```

## Getting started

1. Clone or download this repository.
2. Add your portrait at `assets/portrait.png`.
3. Open `index.html` in a browser.

For best results (and to avoid browser restrictions on local files), run a small local server:

```bash
# Python
python -m http.server 8000

# or Node
npx serve
```

Then visit `http://localhost:8000`.

## Customising

Everything personal is in `js/content.js`:

- **Name and bio:** edit the profile section
- **Skills:** change names and percentages
- **Projects:** add or remove cartridges (title, description, tech, link, accent colour)
- **Social links:** GitHub, LinkedIn, Kaggle, email
- **Portrait:** replace `assets/portrait.png`

Transition style and theme colour can be changed in the config object at the top of `js/main.js`.

## Command line

Type `help` anywhere on the site to open it.

| Command | Action |
| --- | --- |
| `about` | Go to the About page |
| `projects` | Go to the Projects page |
| `skills` | List skills |
| `contact` | Go to the Contact page |
| `theme` | Cycle amber, green and white |
| `clear` | Clear the terminal |

There is also a hidden easter egg. Try `sudo hire sunil`.

## Deployment

This is a static site, so it can be hosted for free on GitHub Pages, Netlify or Vercel. Upload the project folder or connect the repository and deploy.

## Contact

- **Name:** Sunil Annes S K
- **Education:** B.Tech Artificial Intelligence and Data Science
- **GitHub:** [add link]
- **LinkedIn:** [add link]
- **Email:** [add email]

## License

[Choose a license, for example MIT]
