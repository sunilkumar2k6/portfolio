# Sunil Kumar | Professional Portfolio

An interactive, modern developer portfolio showcasing my experience, projects, technical skills, research, certifications, and achievements.

**[Live Demo](https://sunilkumar2k6.github.io/portfolio/)** • **[GitHub Repository](https://github.com/sunilkumar2k6/portfolio)**

---

## About the Portfolio

This repository contains the source code for my professional portfolio. It serves as a centralized hub for recruiters, hiring managers, and fellow developers to explore my journey as a Computer Science & Engineering student. The project highlights my focus on software development, modern web technologies, and practical problem-solving.

Visitors can explore my interactive resume, deep-dive into my projects, review my certifications, and read my research work—all wrapped in a highly polished, accessible, and performant web application.

---

## Key Features

- **Modern Responsive Design:** Fully responsive layout optimized for mobile, tablet, and desktop viewing.
- **Theming:** Seamless Dark and Light mode support with system preference detection.
- **Animated Interface:** Smooth page transitions, scroll animations, and micro-interactions powered by Framer Motion.
- **Interactive Project Showcase:** Detailed project cards with a custom modal for exploring long-form descriptions and links.
- **Command Palette:** A keyboard-accessible command menu (Ctrl/Cmd + K) for rapid navigation.
- **Custom Cursor & Interactions:** Unique cursor interactions and an interactive noise background.
- **SEO Optimized:** Fully configured with semantic HTML, Open Graph tags, `robots.txt`, and `sitemap.xml`.
- **Easter Eggs:** Hidden keyboard shortcuts for curious developers.
- **Data-Driven Architecture:** All content (experience, projects, skills) is structurally isolated in data files for easy updates.

---

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Linting** | Oxlint |
| **Deployment** | GitHub Pages (via GitHub Actions) |

---

## Project Structure

```text
src/
├── assets/          # Images, resume, certificates, and project assets
├── components/      # Reusable UI, sections, and layout components
│   ├── animation/   # Framer motion wrapper components
│   ├── layout/      # Navbar, Footer, and Page Layout
│   ├── sections/    # Hero, About, Projects, Experience, etc.
│   └── ui/          # Buttons, Badges, Modals, Command Palette
├── data/            # Structured data (projects, skills, social profiles)
├── hooks/           # Custom React hooks (e.g., useSEO, useCopyToClipboard)
├── lib/             # Utility and animation helpers
└── pages/           # Main application routes (Home, Design System)

public/
├── favicon.png
├── apple-touch-icon.png
├── robots.txt
└── sitemap.xml
```

---

## Content Sections

- **About:** A professional bio outlining my background and technical focus.
- **Skills:** A categorized visualization of my technical stack and tools.
- **Projects:** In-depth showcases of my best work (Sattva, Voting DApp, Tic-Tac-Toe, etc.).
- **Experience:** My professional timeline and internships.
- **Education:** My academic background in Computer Science & Engineering.
- **Certifications & Achievements:** Highlights of my technical certifications from Meta, AWS, Google, and more.
- **Research:** Academic papers and publications I've contributed to.
- **Contact:** Links to my social profiles and direct email access.

---

## Project Highlights

This portfolio showcases several of my key projects, including:

- **Sattva:** An Indian ancient-theme yoga website featuring AI integrations and complex user/admin architectures.
- **Voting DApp:** A decentralized blockchain voting application built with Solidity and Ethereum.
- **Tic-Tac-Toe:** An advanced Java-based implementation with complex state management and game logic.
- **Portfolio (This Site):** A modern React SPA demonstrating my frontend architecture skills.

---

## Local Development

Follow these steps to run the portfolio locally on your machine.

### Prerequisites
- Node.js (v20 or higher recommended)
- npm

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/sunilkumar2k6/portfolio.git
cd portfolio
npm install
```

### Development Server
Run the local Vite development server:
```bash
npm run dev
```

### Production Build
Validate content, type-check, and generate a production build:
```bash
npm run build
```

### Preview Production Build
Locally preview the generated `dist` folder:
```bash
npm run preview
```

---

## Environment Variables

No environment variables are required for the current version. The `.env.example` file is included for future extensibility but does not contain any required secrets.

---

## Deployment

The portfolio is deployed using **GitHub Pages**. 

A GitHub Actions workflow (`.github/workflows/deploy.yml`) is configured to automatically build and deploy the application whenever changes are pushed to the `main` branch. 

Alternative deployment configurations for Vercel (`vercel.json`) and Netlify (`netlify.toml`) are also included in the repository to guarantee strict HTTP security headers regardless of the hosting provider.

**Live URL:** [https://sunilkumar2k6.github.io/portfolio/](https://sunilkumar2k6.github.io/portfolio/)

---

## Security

- All application data is statically generated.
- No secrets or API keys are committed to the repository.
- `.env` files are strictly ignored via `.gitignore`.
- HTTP Strict Transport Security (HSTS) and Content Security Policies (CSP) are enforced via deployment configurations.

---

## Accessibility & SEO

- **Accessibility:** Built with semantic HTML, keyboard navigable components (like the Command Palette), and ARIA labels.
- **SEO:** Configured with dynamic `<title>` and `<meta>` tags via a custom `useSEO` hook, a comprehensive `sitemap.xml`, and an open `robots.txt` directive.

---

## Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## License

License information has not yet been specified.

---

## Author & Contact

**Sunil Kumar**  
*Computer Science & Engineering Student*

- **Email:** sunilkumar1758.er@gmail.com
- **GitHub:** [@sunilkumar2k6](https://github.com/sunilkumar2k6/)
- **LinkedIn:** [Sunil Kumar](https://www.linkedin.com/in/sunilsiyol/)
- **X (Twitter):** [@SuniilSiyol9](https://x.com/SuniilSiyol9)
- **Instagram:** [@shunil.siyol](https://www.instagram.com/shunil.siyol)
- **Reddit:** [Ancient_Goose_9743](https://www.reddit.com/u/Ancient_Goose_9743/)
