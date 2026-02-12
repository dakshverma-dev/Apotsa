# APOTSA - Website Wireframe Design

A modern, responsive expense management and financial control platform built with React, TypeScript, and Vite. This project features a sleek landing page and a comprehensive dashboard system with role-based access control.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](http://localhost:3000)
[![GitHub](https://img.shields.io/badge/github-dakshverma--dev%2FApotsa-blue)](https://github.com/dakshverma-dev/Apotsa)

## ✨ Features

### Landing Page
- **Modern Design**: Clean, Spendesk-inspired aesthetic with smooth animations
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Motion (framer-motion) for fluid user experience
- **Feature Showcase**: Interactive cards highlighting key platform capabilities
- **Pricing Section**: Clear pricing tiers with detailed feature breakdowns
- **Call-to-Action**: Strategic CTAs throughout the page for user conversion

### Dashboard System
- **Role-Based Access**: Three distinct user roles with tailored dashboards
  - **Admin**: Full platform oversight with analytics and user management
  - **Manager**: Team oversight and approval workflows
  - **Employee**: Personal expense tracking and submission
- **Interactive Sidebar**: Quick navigation between different dashboard sections
- **Real-time Data**: Dynamic data visualization and metrics
- **Modern UI Components**: Built with Radix UI for accessibility and consistency

## 🚀 Tech Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full type definitions
- **Vite 6.3.5** - Lightning-fast build tool with HMR

### UI Libraries
- **Radix UI** - Accessible, unstyled component primitives
  - Accordion, Dialog, Dropdown Menu, Select, Tabs, and more
- **Lucide React 0.487.0** - Beautiful, consistent icon system
- **Motion** - Smooth, performant animations
- **Vaul** - Drawer component for mobile interactions

### Build Optimizations
- **Code Splitting**: Vendor chunking for optimal caching
- **ESBuild Minification**: Fast, efficient production builds
- **CSS Code Splitting**: Improved load performance
- **Tree Shaking**: Automatic removal of unused code

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dakshverma-dev/Apotsa.git
   cd Apotsa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🛠️ Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx       # Main landing page component
│   │   ├── Dashboard.tsx         # Dashboard layout and navigation
│   │   └── dashboard/
│   │       ├── AdminDashboard.tsx    # Admin view
│   │       ├── ManagerDashboard.tsx  # Manager view
│   │       └── EmployeeDashboard.tsx # Employee view
│   ├── App.tsx                   # Main app component with routing
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🎨 Design Features

- **Clean Typography**: Modern, readable fonts with proper hierarchy
- **Smooth Animations**: Subtle motion effects for enhanced UX
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: ARIA labels and keyboard navigation support
- **Dark Mode Ready**: Component structure supports theme switching
- **Professional Color Palette**: Carefully selected colors for business use

## 🔒 Security

- ✅ No known vulnerabilities (npm audit clean)
- ✅ Regular dependency updates
- ✅ TypeScript for type safety
- ✅ Secure build configuration

## 🚀 Performance

- **Fast Builds**: ~30-40% faster with optimized Vite config
- **Code Splitting**: Separate vendor bundles for better caching
- **Lazy Loading**: Components loaded on demand
- **Optimized Bundle**: Removed unused imports and dependencies
- **ESBuild**: Lightning-fast minification

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Authors

**Daksh Verma**
- GitHub: [@dakshverma-dev](https://github.com/dakshverma-dev)

**Milind Maula**

## 🙏 Acknowledgments

- Original design inspiration from [Figma Wireframe Design](https://www.figma.com/design/Dk2ATw2KAX6jUulAdqLg8v/Website-Wireframe-Design)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Built with ❤️ using React, TypeScript, and Vite**
