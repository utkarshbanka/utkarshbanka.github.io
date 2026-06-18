# Utkarsh Keshari — Portfolio

A static 3D-flavoured developer portfolio. No build step, no framework —
just `index.html` + `css/` + `js/`. Open `index.html` directly in a browser
and everything works.

## What's inside
```
portfolio/
├── index.html          → all sections / content live here
├── css/style.css        → theme, layout, animations
├── js/script.js          → typing effect, 3D tilt, particle bg, scroll reveals
└── assets/
    ├── profile-hero.jpg  → hero photo
    ├── profile-side.jpg  → about-section flip card photo
    └── resume.pdf        → downloadable resume
```

## Deploy free — Vercel (recommended)
1. Create a free account at vercel.com (sign in with GitHub).
2. Push this `portfolio` folder to a new GitHub repo.
3. On Vercel → **Add New Project** → import that repo.
4. Framework preset: **Other** (it's static, no build command needed).
5. Click **Deploy**. Done — you get a free `your-project.vercel.app` URL with
   free SSL, forever, no card required.
6. Want a custom domain like `utkarshkeshari.dev`? Buy the domain separately
   (~$10–15/yr) and attach it in Vercel's Domains tab — hosting itself stays free.

## Deploy free — alternatives
- **Netlify**: drag-and-drop the `portfolio` folder onto netlify.com/drop. Free, instant.
- **GitHub Pages**: push to GitHub → Settings → Pages → deploy from `main` branch root.
  Free `username.github.io/repo-name` URL.
- **Cloudflare Pages**: same idea, also free with great speed.

All three are genuinely free forever for a static site like this — no hidden costs.

## Editing content later
Everything text-based lives in `index.html` — search for the section you want
(`about`, `projects`, `experience`, etc.) and edit directly. Colors and fonts
are CSS variables at the top of `css/style.css` under `:root`.

## Notes
- Replace `assets/resume.pdf` any time you update your resume — keep the filename the same.
- Two emails appear in your original resume (`utkarshmeradost@gmail.com` and
  `utkarsh.k.keshari@gmail.com`). The contact button currently uses the first one —
  change it in `index.html` (search `mailto:`) if you'd rather use the other.
