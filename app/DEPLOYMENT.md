# Deployment Guide for ShopLogic Utility

ShopLogic is ready to deploy as a live PWA. Choose your preferred platform below.

## Option 1: Deploy to Vercel (Recommended - 2 minutes)

Vercel is the official Vite hosting platform and provides the best performance and DX.

### Prerequisites
- GitHub account
- Code pushed to GitHub repository

### Steps

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Add PWA support with offline functionality"
   git push origin main
   ```

2. **Visit Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub (or create account)

3. **Import Repository**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Vercel auto-detects Vite and populates settings

4. **Configure Build**
   - **Framework Preset**: Vite (auto-selected)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

5. **Deploy**
   - Click "Deploy"
   - Wait 30-60 seconds for build to complete
   - App is live! 🎉

6. **Custom Domain** (optional)
   - Settings → Domains
   - Add custom domain
   - Point DNS to Vercel

### Benefits
✅ Automatic deploys on git push  
✅ Preview deployments for PRs  
✅ Built-in SSL/HTTPS  
✅ Global CDN for fast loading  
✅ Service Worker caching works perfectly  

---

## Option 2: Deploy to Netlify (Alternative)

### Prerequisites
- GitHub account
- Code pushed to GitHub repository

### Steps

1. **Visit Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub (or create account)

2. **New Site from Git**
   - Click "New site from Git"
   - Connect GitHub → Authorize
   - Select your repository

3. **Configure Build**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - Click "Deploy site"

4. **Wait for Build**
   - Build logs visible in real-time
   - Site live once build succeeds (~1 min)

5. **Custom Domain** (optional)
   - Site settings → Domain management
   - Add custom domain

### Benefits
✅ Simple, straightforward deployment  
✅ Continuous deployment from git  
✅ Built-in SSL/HTTPS  
✅ Netlify functions available (not needed here)  

---

## Option 3: Deploy to GitHub Pages (Free, Simplest)

### Steps

1. **Configure for GitHub Pages**
   Edit `vite.config.js`:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     server: { port: 5173 },
     base: '/shoplogic/' // if deploying to project repo
     // OR remove this line if deploying to username.github.io
   })
   ```

2. **Update package.json**
   Add deploy script:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

### Benefits
✅ Completely free  
✅ No third-party account needed (GitHub is enough)  
✅ Automatic updates on push  

### Note
Service Worker may need adjustments for GitHub Pages since it serves from a subdirectory.

---

## Post-Deployment Testing

### Test PWA Installation
1. Open deployed URL on mobile
2. **Android (Chrome)**:
   - Menu (⋮) → Install app
   - Confirm installation
3. **iOS (Safari)**:
   - Share → Add to Home Screen
   - Confirm installation

### Test Offline Functionality
1. Open installed app
2. Use some features (calculations)
3. Toggle airplane mode (or disconnect WiFi)
4. Reload page
5. Previous calculations should still be accessible
6. Try new calculations - they work offline!

### Verify PWA Features
- Check DevTools → Application → Manifest
- Check DevTools → Application → Service Workers
- Verify manifest.json loads from root domain

---

## Troubleshooting

### Build Fails
**Symptom**: Deployment fails during build  
**Solution**: 
- Check build logs in deployment dashboard
- Ensure `npm run build` works locally: `npm run build`
- Check for any console errors in dev server: `npm run dev`

### Service Worker Not Registering
**Symptom**: Service Worker doesn't appear in DevTools  
**Solution**:
- Check browser console for errors
- Verify `/service-worker.js` exists in deployed files
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)

### App Not Installable
**Symptom**: Install button doesn't appear on mobile  
**Solution**:
- Verify manifest.json loads (DevTools → Application → Manifest)
- Verify HTTPS is enabled (should be automatic)
- Check that all manifest fields are present
- Wait a few seconds before prompt appears

### Offline Calculations Fail
**Symptom**: Calculations don't work offline  
**Solution**:
- Service Worker may not be fully activated
- Try uninstalling and reinstalling app
- Check Service Worker status in DevTools (should be "activated and running")
- All calculations are client-side only - should work without network

---

## Performance Metrics

**Production Build Sizes** (gzipped):
- HTML: 0.48 kB
- CSS: 3.56 kB
- JS: 58.13 kB
- **Total**: ~62 kB

**Expected Performance**:
- First paint: < 1s (cached)
- Interactive: < 2s
- Offline load: instant (from cache)

---

## Next Steps

1. **Custom Domain**: Set up domain pointing to deployment
2. **Analytics**: Add Google Analytics or Vercel Analytics
3. **Feedback**: Collect user feedback for improvements
4. **Versioning**: Update `package.json` version for releases

---

## Support

For deployment issues:
- **Vercel**: [docs.vercel.com](https://docs.vercel.com)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)

For app issues:
- Check browser console for errors
- Test locally: `npm run dev`
- Verify all dependencies installed: `npm install`
