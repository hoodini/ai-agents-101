# LLM Instructions for Automated Installation

This document contains step-by-step instructions for AI assistants (LLMs) to automatically install and set up the AI Agents 101 Interactive Training Platform for users.

---

## Mobile Responsive Architecture

The application features comprehensive mobile responsiveness with the following design patterns:

### Responsive Breakpoints (Tailwind CSS)
- **sm**: 640px (small phones → larger phones)
- **md**: 768px (tablets)
- **lg**: 1024px (small laptops)
- **xl**: 1280px (desktops)

### Collapsible Navigation
- **Desktop (≥768px)**: Full navbar with all controls visible
- **Mobile (<768px)**: Hamburger menu that expands/collapses

```typescript
// Mobile menu state in App.tsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar starts closed on mobile
```

### Sidebar Behavior
- **Desktop**: Sidebar always visible alongside content
- **Mobile**: Sidebar hidden by default, toggleable via "Labs" button
- **Sidebar Overlay**: Semi-transparent backdrop with blur effect
- **Auto-close**: Sidebar closes when a lab is selected

### Viewport Containment
- All content uses `overflow-x-hidden` to prevent horizontal scrolling
- Padding adjusts: `px-3 sm:px-4 md:px-6`
- Maximum widths applied: `max-w-4xl`, `max-w-6xl` for content sections

### Image Responsiveness
- Avatar sizing: `w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56`
- Hero images: `w-full max-w-[200px] sm:max-w-[280px] md:max-w-[340px]`
- Proper aspect ratios maintained with `object-contain` or `object-cover`

### Typography Scaling
- Headings: `text-xl sm:text-2xl md:text-3xl lg:text-4xl`
- Body text: `text-sm sm:text-base md:text-lg`
- Small text: `text-xs sm:text-sm`

### Component-Specific Responsive Features

**Code Cells (CodeCell.tsx)**:
- Full width on mobile with proper padding
- Font size scales for readability
- Toolbar wraps on small screens

**Lab Components (Lab1-Lab8)**:
- Grid layouts convert to single column on mobile
- Cards stack vertically with adjusted spacing
- Interactive elements have increased touch targets

**Homepage (Homepage.tsx)**:
- Hexagon grid shows on desktop, card grid on mobile
- Welcome card stacks avatar above text on mobile
- Module cards resize with responsive typography

---

## Prerequisites Check

Before beginning installation, verify the user's environment:

```bash
# Check Node.js version (required: v18.0.0+)
node --version

# Check npm version (required: v9.0.0+)
npm --version

# Check Git installation
git --version
```

**Expected Output**:
- Node.js: v18.x.x or higher
- npm: 9.x.x or higher
- Git: Any recent version

**If any tool is missing**, provide installation instructions:

### Install Node.js & npm
- **Windows**: Download from [https://nodejs.org](https://nodejs.org)
- **Mac**: `brew install node`
- **Linux**: `sudo apt install nodejs npm` or `sudo yum install nodejs npm`

### Install Git
- **Windows**: Download from [https://git-scm.com](https://git-scm.com)
- **Mac**: `brew install git`
- **Linux**: `sudo apt install git` or `sudo yum install git`

---

## Automated Installation Steps

### Step 1: Clone Repository

Execute the following command to clone the repository:

```bash
git clone https://github.com/hoodini/ai-agents-101.git
cd ai-agents-101
```

**Verification**: Check that the directory exists:
```bash
ls -la
```

Expected output should show `agents-training-app/` directory.

### Step 2: Navigate to Application Directory

```bash
cd agents-training-app
```

**Verification**: Verify package.json exists:
```bash
ls package.json
```

### Step 3: Install Dependencies

Run the installation command:

```bash
npm install
```

**This command will install**:
- React 19.2 and React DOM
- TypeScript 5.9
- Vite 7.2
- Tailwind CSS 3.4
- LangChain.js and provider SDKs
- Monaco Editor
- All development dependencies

**Expected Duration**: 1-3 minutes depending on internet speed

**Verification**: Check that node_modules was created:
```bash
ls -la node_modules/
```

Expected: Directory should contain hundreds of packages.

### Step 4: Verify Installation

Run verification checks:

```bash
# List installed packages
npm list --depth=0

# Check for critical dependencies
npm list react react-dom typescript vite @langchain/core langchain
```

**Expected Output**: All packages should be listed with version numbers matching [package.json](agents-training-app/package.json).

### Step 5: Start Development Server

Launch the application:

```bash
npm run dev
```

**Expected Output**:
```
  VITE v7.2.4  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Verification**:
- Server should be running on port 5173
- No error messages in console
- Application should be accessible at http://localhost:5173

### Step 6: Open in Browser

Automatically open the application:

```bash
# Mac
open http://localhost:5173

# Windows
start http://localhost:5173

# Linux
xdg-open http://localhost:5173
```

**Expected Behavior**:
- Browser opens to the homepage
- Hero image and navigation are visible
- "Configure API Key & Start Learning" button is clickable

---

## API Key Configuration

Guide the user through API key setup:

### Option 1: Groq (Recommended for Beginners)

**Advantages**:
- Free tier available
- Fast inference (1000+ tokens/second)
- Easy sign-up process

**Steps**:
1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up for free account
3. Navigate to API Keys section
4. Click "Create API Key"
5. Copy the key (starts with `gsk_...`)
6. In the app, click "Settings" icon → paste key → save

**Models Available**:
- Llama 3.1 70B Versatile
- Llama 3.3 70B Versatile
- Mixtral 8x7B

### Option 2: Cohere

**Advantages**:
- Free tier available
- Optimized for agent workflows
- Good for production use

**Steps**:
1. Visit [https://dashboard.cohere.ai](https://dashboard.cohere.ai)
2. Sign up for free account
3. Navigate to API Keys
4. Copy production or trial key
5. In the app, click "Settings" → paste key → save

**Models Available**:
- Command R
- Command R+
- Command

### Option 3: OpenAI

**Advantages**:
- Most powerful models
- Wide adoption
- Extensive documentation

**Note**: Paid service (pay-as-you-go)

**Steps**:
1. Visit [https://platform.openai.com](https://platform.openai.com)
2. Sign up and add payment method
3. Navigate to API Keys
4. Click "Create new secret key"
5. Copy the key (starts with `sk-...`)
6. In the app, click "Settings" → paste key → save

**Models Available**:
- GPT-4 Turbo
- GPT-4
- GPT-3.5 Turbo

---

## Verification & Testing

After installation, verify everything works:

### Test 1: Homepage Loads

**Check**:
- Homepage displays hero image
- Navigation menu is visible
- "What You'll Learn" section shows 8 hexagonal modules
- Yuval Avidani's bio card is displayed

### Test 1b: Mobile Responsiveness

**Check on mobile viewport (< 768px)**:
1. Navbar collapses to hamburger menu
2. Mobile menu expands/collapses smoothly
3. Labs sidebar is hidden by default
4. "Labs" button appears in navbar to toggle sidebar
5. Sidebar overlay appears with backdrop blur when open
6. Clicking a lab in sidebar closes the sidebar
7. Content is centered with no horizontal gaps
8. Avatar and hero images scale appropriately
9. Text sizes adjust for readability
10. All interactive elements are touch-friendly

### Test 2: API Key Modal

**Check**:
1. Click "Configure API Key & Start Learning"
2. Modal opens with provider selection
3. Select a provider (Groq, Cohere, or OpenAI)
4. Paste API key
5. Click "Save & Continue"
6. No error messages appear

### Test 3: Lab Navigation

**Check**:
1. Sidebar shows 8 labs
2. Click Lab 1: Agent Components
3. Lab content loads
4. Can navigate between labs

### Test 4: Code Execution

**Check**:
1. Open Lab 2: Simple Prompt/Response
2. Monaco Editor loads with code
3. Click "Run Code" button
4. Terminal output displays result
5. No console errors

**Example Test Code for Lab 2**:
```typescript
import { ChatGroq } from "@langchain/groq";

const llm = new ChatGroq({
  apiKey: "YOUR_API_KEY",
  model: "llama-3.1-70b-versatile",
  temperature: 0.7
});

const response = await llm.invoke("Say hello!");
console.log(response.content);
```

**Expected Output**: LLM response like "Hello! How can I help you today?"

### Test 5: Progress Tracking

**Check**:
1. Complete Lab 1 by clicking "Mark as Complete"
2. Progress bar in header updates (1/8)
3. Lab 1 shows checkmark in sidebar
4. Progress persists after page refresh

---

## Common Installation Issues & Fixes

### Issue 1: Port 5173 Already in Use

**Error Message**:
```
Port 5173 is in use, trying another one...
```

**Solution**:
```bash
# Kill process on port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Issue 2: npm install Fails

**Error Message**:
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps
```

### Issue 3: TypeScript Errors

**Error Message**:
```
error TS2307: Cannot find module...
```

**Solution**:
```bash
# Regenerate TypeScript declarations
rm -rf node_modules/.cache
npm run build
```

### Issue 4: Monaco Editor Not Loading

**Symptoms**:
- Blank code editor area
- Console error about monaco-editor

**Solution**:
```bash
# Reinstall Monaco Editor
npm uninstall @monaco-editor/react
npm install @monaco-editor/react@^4.7.0

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Issue 5: API Key Validation Fails

**Symptoms**:
- "Invalid API key" error
- API calls fail

**Solutions**:
1. **Check API key format**:
   - Groq: starts with `gsk_`
   - OpenAI: starts with `sk-`
   - Cohere: alphanumeric string

2. **Verify API key is active**:
   - Log into provider dashboard
   - Check key hasn't been revoked
   - Verify account has credits

3. **Test API key directly**:
   ```bash
   # Groq
   curl https://api.groq.com/openai/v1/chat/completions \
     -H "Authorization: Bearer gsk_YOUR_KEY" \
     -H "Content-Type: application/json" \
     -d '{"model":"llama-3.1-70b-versatile","messages":[{"role":"user","content":"hi"}]}'

   # OpenAI
   curl https://api.openai.com/v1/chat/completions \
     -H "Authorization: Bearer sk-YOUR_KEY" \
     -H "Content-Type: application/json" \
     -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"hi"}]}'
   ```

4. **Clear localStorage**:
   - Open browser DevTools (F12)
   - Go to Application → Local Storage
   - Clear all entries for localhost:5173
   - Refresh page and re-enter API key

### Issue 6: Build Fails

**Error Message**:
```
npm ERR! Failed at the build script
```

**Solution**:
```bash
# Check for TypeScript errors
npx tsc --noEmit

# If errors found, fix them or skip checks temporarily
npm run build -- --no-type-check

# Clear all caches and rebuild
rm -rf dist node_modules/.vite node_modules/.cache
npm run build
```

---

## Production Build & Deployment

### Build for Production

```bash
npm run build
```

**Expected Output**:
```
vite v7.2.4 building for production...
✓ XXX modules transformed.
dist/index.html                   X.XX kB
dist/assets/index-XXXXX.css      XX.XX kB │ gzip: XX.XX kB
dist/assets/index-XXXXX.js      XXX.XX kB │ gzip: XX.XX kB
✓ built in XXXXs
```

**Verification**:
```bash
ls -lh dist/
```

Expected: `dist/` directory with `index.html`, `assets/`, and static files.

### Preview Production Build

```bash
npm run preview
```

**Expected Output**:
```
  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
```

Test the production build at http://localhost:4173

### Deploy to Vercel

**Automated Deployment**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd agents-training-app
vercel

# Production deployment
vercel --prod
```

**Follow Interactive Prompts**:
1. Login to Vercel account
2. Link to project or create new
3. Confirm build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

**Expected Output**:
```
🔗  Deployed to production: https://your-project.vercel.app
```

### Deploy to Netlify

**Automated Deployment**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

**Expected Output**:
```
✔ Deployed to production: https://your-site.netlify.app
```

### Deploy to GitHub Pages

GitHub Pages offers free hosting with SSL certificates. There are two deployment options:

#### Option A: GitHub Pages Subdirectory (username.github.io/repo-name)

**Steps**:
```bash
# 1. Install gh-pages
cd agents-training-app
npm install --save-dev gh-pages

# 2. Update vite.config.ts
# Set base to your repository name
```

Edit `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/',  // Replace with actual repo name
  plugins: [react()],
})
```

```bash
# 3. Add deploy scripts to package.json
# These should already exist in the package.json
```

Verify `package.json` has:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

```bash
# 4. Deploy
npm run deploy
```

**Expected Output**:
```
Published
```

**Your site**: `https://username.github.io/your-repo-name/`

#### Option B: Custom Domain (Recommended)

For a custom domain like `agents.yourdomain.com`:

**Steps**:
```bash
# 1. Update vite.config.ts for root path
```

Edit `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/',  // Root path for custom domain
  plugins: [react()],
})
```

```bash
# 2. Create CNAME file in public directory
echo "agents.yourdomain.com" > public/CNAME
```

**Important**: Replace `agents.yourdomain.com` with your actual domain

```bash
# 3. Ensure deploy scripts exist in package.json
# (Should already be present)

# 4. Deploy to GitHub Pages
npm run deploy
```

**Expected Output**:
```
Published
```

**5. Configure DNS**:

Log into your DNS provider (Cloudflare, Route53, Namecheap, etc.) and add:

```
Type:    CNAME
Name:    agents  (or your chosen subdomain)
Target:  username.github.io  (your GitHub username)
TTL:     Auto or 300
Proxy:   DNS only (disable proxy initially)
```

**For Cloudflare**:
1. Go to https://dash.cloudflare.com
2. Select your domain
3. Click **DNS** → **Add record**
4. Fill in:
   - Type: `CNAME`
   - Name: `agents` (subdomain)
   - Target: `username.github.io`
   - Proxy status: **DNS only** (gray cloud)
5. Click **Save**

**6. Wait for SSL Certificate** (Automatic):
- GitHub Pages provisions SSL via Let's Encrypt
- Takes 10-60 minutes after DNS propagation
- Check at: `https://github.com/username/repo-name/settings/pages`

**7. Verify Deployment**:
```bash
# Check DNS propagation
nslookup agents.yourdomain.com

# Check GitHub Pages status
gh api repos/username/repo-name/pages
```

Look for:
```json
{
  "cname": "agents.yourdomain.com",
  "https_certificate": {
    "state": "approved"
  },
  "https_enforced": true
}
```

**Your site**: `https://agents.yourdomain.com/`

**Troubleshooting GitHub Pages**:

**Issue**: SSL Certificate Error (`ERR_CERT_COMMON_NAME_INVALID`)
**Solution**:
- CNAME file is missing or incorrect
- Verify file exists: `cat public/CNAME`
- Redeploy: `npm run deploy`
- Wait 10-60 minutes for SSL certificate provisioning

**Issue**: 404 Not Found
**Solution**:
- Check base path in `vite.config.ts` matches deployment type
- Custom domain: `base: '/'`
- Subdirectory: `base: '/repo-name/'`

**Issue**: Images Not Loading
**Solution**:
- Use relative paths: `src="logo.png"`
- Not absolute paths: `src="/logo.png"`

**Issue**: DNS Not Resolving
**Solution**:
```bash
# Check DNS
nslookup agents.yourdomain.com

# Wait for propagation (5-30 minutes)
# Check at: https://dnschecker.org/#CNAME/agents.yourdomain.com
```

---

## Environment Variables (Optional)

For convenience during development, you can create `.env.local`:

```bash
# Create .env.local file
cat > .env.local << EOF
VITE_DEFAULT_PROVIDER=groq
VITE_GROQ_API_KEY=gsk_your_key_here
VITE_COHERE_API_KEY=your_cohere_key_here
VITE_OPENAI_API_KEY=sk_your_openai_key_here
EOF
```

**Important Security Notes**:
- `.env.local` is gitignored - never commit it
- These are optional - UI allows entering keys
- Only use `VITE_` prefix for client-side variables
- Keys are still stored in localStorage when entered via UI

---

## Post-Installation Steps

### 1. Test All Labs

Run through each lab to ensure functionality:

```bash
# Open browser and manually test:
# - Lab 1: Read through concepts
# - Lab 2: Run simple prompt/response code
# - Lab 3: Test custom system prompts
# - Lab 4: Test conversation memory
# - Lab 5: Test knowledge base integration
# - Lab 6: Test RAG with Wikipedia
# - Lab 7: Test multi-agent collaboration
# - Lab 8: Test orchestrator agent
```

### 2. Verify Progress Tracking

```bash
# In browser DevTools console:
localStorage.getItem('ai-agents-training-store')

# Should show JSON with:
# - apiKey
# - selectedProvider
# - currentLab
# - labProgress (object with completion status)
```

### 3. Check Performance

```bash
# Open DevTools (F12)
# Go to Lighthouse tab
# Run audit

# Expected scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 90+
# SEO: 90+
```

### 4. Browser Compatibility

Test in multiple browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari (Mac only)

Expected: Works identically in all modern browsers.

---

## Automated Health Check Script

Create a health check script to verify installation:

```bash
#!/bin/bash
# health-check.sh

echo "🔍 Running AI Agents 101 Health Check..."
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
node --version || { echo "❌ Node.js not found"; exit 1; }

# Check npm
echo "✓ Checking npm..."
npm --version || { echo "❌ npm not found"; exit 1; }

# Check Git
echo "✓ Checking Git..."
git --version || { echo "❌ Git not found"; exit 1; }

# Check if in correct directory
echo "✓ Checking directory..."
[ -f "package.json" ] || { echo "❌ Not in agents-training-app directory"; exit 1; }

# Check node_modules
echo "✓ Checking dependencies..."
[ -d "node_modules" ] || { echo "❌ Dependencies not installed. Run: npm install"; exit 1; }

# Check critical packages
echo "✓ Checking critical packages..."
npm list react react-dom typescript vite langchain > /dev/null 2>&1 || {
    echo "❌ Missing critical packages. Run: npm install"
    exit 1
}

# Try building
echo "✓ Testing build..."
npm run build > /dev/null 2>&1 || { echo "❌ Build failed"; exit 1; }

echo ""
echo "✅ All health checks passed!"
echo ""
echo "🚀 Ready to start:"
echo "   npm run dev"
echo ""
echo "🌐 Then open: http://localhost:5173"
```

**Usage**:
```bash
chmod +x health-check.sh
./health-check.sh
```

---

## Quick Reference Commands

### Development
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run lint -- --fix    # Auto-fix linting issues
```

### Cleanup
```bash
# Clear all caches and rebuild
rm -rf node_modules dist .vite
npm install
npm run build

# Reset to fresh state
git clean -fdx
npm install
```

### Debugging
```bash
# Verbose logging
npm run dev -- --debug

# Check bundle size
npm run build -- --report

# Analyze dependencies
npm ls --depth=0
npm outdated
```

---

## Success Criteria Checklist

Use this checklist to verify successful installation:

- [ ] Node.js v18+ installed and verified
- [ ] npm v9+ installed and verified
- [ ] Git installed and verified
- [ ] Repository cloned successfully
- [ ] Dependencies installed without errors
- [ ] Dev server starts on port 5173
- [ ] Homepage loads correctly in browser
- [ ] API key can be configured via UI
- [ ] Monaco Editor loads in lab components
- [ ] Code execution works (tested in Lab 2)
- [ ] Progress tracking works (tested by completing Lab 1)
- [ ] All 8 labs are accessible
- [ ] Production build completes successfully
- [ ] Preview server works (port 4173)
- [ ] No console errors in browser DevTools
- [ ] LocalStorage persists API key and progress
- [ ] Application works after page refresh

---

## Support & Resources

### Documentation
- Main README: [README.md](README.md)
- Package Info: [package.json](agents-training-app/package.json)
- Vite Docs: [https://vite.dev](https://vite.dev)
- React Docs: [https://react.dev](https://react.dev)
- LangChain Docs: [https://js.langchain.com](https://js.langchain.com)

### API Provider Documentation
- Groq: [https://console.groq.com/docs](https://console.groq.com/docs)
- Cohere: [https://docs.cohere.com](https://docs.cohere.com)
- OpenAI: [https://platform.openai.com/docs](https://platform.openai.com/docs)

### Community
- GitHub Issues: [Report problems or request features]
- Creator: [Yuval Avidani](https://yuv.ai)
- LinkedIn: [yuval-avidani-87081474](https://linkedin.com/in/yuval-avidani-87081474)

---

## Automated Installation Summary

**Total Time**: ~5-10 minutes

**Steps**:
1. ✓ Verify prerequisites (Node.js, npm, Git)
2. ✓ Clone repository
3. ✓ Navigate to app directory
4. ✓ Install dependencies (npm install)
5. ✓ Start dev server (npm run dev)
6. ✓ Configure API key via UI
7. ✓ Test Lab 2 code execution
8. ✓ Verify all functionality

**Result**: Fully functional AI Agents 101 training platform ready for learning!

---

## LLM-Specific Notes

When assisting users with installation:

1. **Always check prerequisites first** - Don't assume tools are installed
2. **Show command output** - Display expected vs actual output
3. **Provide context** - Explain what each command does
4. **Handle errors gracefully** - Offer solutions for common issues
5. **Verify each step** - Confirm success before moving to next step
6. **Be patient** - Users may have different experience levels
7. **Offer alternatives** - Provide multiple solutions when possible
8. **Security first** - Remind users never to commit API keys
9. **Test after install** - Always verify the application works
10. **Celebrate success** - Acknowledge when installation completes!

---

**Built with ❤️ by Yuval Avidani**
© 2025 YUV.AI - Making AI practical, personal, and powerful
