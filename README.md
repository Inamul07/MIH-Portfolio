# Portfolio Website

A modern, dark-themed portfolio website built with React, Vite, and Framer Motion.

## ✨ Features

- 🎨 Modern dark theme design
- ⚡ Lightning-fast performance with Vite
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🔗 GitHub and LeetCode stats integration
- 📧 Contact form
- 🌐 Easy deployment to Vercel

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Axios** - HTTP client for API calls

## 📦 Installation

1. Clone the repository or navigate to the project folder:

```bash
cd mihPortfolio
```

2. Install dependencies (if not already installed):

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173/`

## 🚀 Deployment to Vercel

### Method 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:

```bash
npm install -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy the project:

```bash
vercel
```

4. Follow the prompts and your site will be deployed!

### Method 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the settings
6. Click "Deploy"

Your portfolio will be live in minutes!

## 🎨 Customization

### Update Personal Information

1. **Name and Title**: Edit [Hero.jsx](src/components/Hero.jsx)
2. **GitHub Username**: Update in [GitHubStats.jsx](src/components/GitHubStats.jsx)
3. **LeetCode Username**: Update in [LeetCodeStats.jsx](src/components/LeetCodeStats.jsx)
4. **About Section**: Edit [About.jsx](src/components/About.jsx)
5. **Skills**: Modify skills array in [Skills.jsx](src/components/Skills.jsx)
6. **Projects**: Update projects array in [Projects.jsx](src/components/Projects.jsx)
7. **Experience**: Edit experience array in [Experience.jsx](src/components/Experience.jsx)
8. **Contact Info**: Update in [Contact.jsx](src/components/Contact.jsx) and [Footer.jsx](src/components/Footer.jsx)

### Customize Colors

Edit the CSS variables in [index.css](src/index.css):

```css
:root {
	--bg-primary: #0a0a0a;
	--accent-primary: #3b82f6;
	/* ... other colors */
}
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

Made with ❤️ using React + Vite
