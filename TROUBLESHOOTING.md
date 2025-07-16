# Troubleshooting Guide

This guide helps resolve common issues with the homepage application.

## 🚨 Common Issues & Solutions

### 1. Server Won't Start or Crashes

**Symptoms:**
- Error loading page
- Server crashes immediately after starting
- Module not found errors

**Solutions:**
```bash
# From root directory:

# 1. Clean install dependencies
rm -rf apps/homepage/node_modules
rm -rf apps/homepage/.next
cd apps/homepage
npm install

# 2. Clear Next.js cache
npm run build -- --no-cache

# 3. Start server
cd ../..
npm run dev
```

### 2. TypeScript Errors

**Symptoms:**
- Red squiggly lines in VS Code
- Build fails with type errors

**Solutions:**
```bash
# Check for type errors
cd apps/homepage
npm run type-check

# If errors persist, try:
npm install --save-dev @types/node@20.11.0 @types/react@18.2.48 @types/react-dom@18.2.18
```

### 3. Framer Motion Issues

**Symptoms:**
- Animation errors
- Module loading issues
- "ease" property type errors

**Solutions:**
- We've downgraded to framer-motion@11.0.0 for stability
- Animations now use cubic-bezier values instead of string ease names
- If issues persist, animations can be temporarily disabled

### 4. Port Already in Use

**Symptoms:**
- Error: Port 3000 is already in use

**Solutions:**
```powershell
# On Windows PowerShell:
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use a different port:
cd apps/homepage
npm run dev -- -p 3001
```

### 5. Environment Variables Not Loading

**Symptoms:**
- API calls failing
- Missing configuration errors

**Solutions:**
1. Create `.env.local` in `apps/homepage/`:
```env
GOOGLE_AI_API_KEY=AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

2. Restart the development server after adding env variables

### 6. Build Failures

**Symptoms:**
- `npm run build` fails
- Production build errors

**Solutions:**
```bash
# Clear all caches and rebuild
cd apps/homepage
rm -rf .next
rm -rf node_modules/.cache
npm run build
```

### 7. Git Status Shows Deleted Files

**Symptoms:**
- Many deleted files in git status
- Confusion about project structure

**Solution:**
This is expected! The project has been restructured as a monorepo:
- Original files were in root directory
- Now organized under `apps/homepage/`
- This is the correct structure going forward

To clean up git status:
```bash
# Option 1: Reset to match the new structure
git add -A
git commit -m "Restructure as monorepo"

# Option 2: If you want to keep the old structure
git checkout -- .
```

## 🛠️ Maintenance Commands

### Regular Maintenance
```bash
# Update dependencies (from root)
cd apps/homepage
npm update

# Check for outdated packages
npm outdated

# Audit for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Performance Optimization
```bash
# Analyze bundle size
cd apps/homepage
npm run analyze

# Build for production
npm run build

# Check build size
```

## 📋 Verification Checklist

After fixing issues, verify everything works:

- [ ] Server starts without errors: `npm run dev`
- [ ] Homepage loads at http://localhost:3000
- [ ] No TypeScript errors: `npm run type-check`
- [ ] Build succeeds: `npm run build`
- [ ] AI Tools sidebar works: Press `ALT+S+D`
- [ ] Theme switching works (light/dark mode)

## 🆘 Still Having Issues?

1. **Check Node.js version**: Requires Node.js 18.0.0 or higher
   ```bash
   node --version
   ```

2. **Check npm version**: Requires npm 8.0.0 or higher
   ```bash
   npm --version
   ```

3. **Full Reset**:
   ```bash
   # From root directory
   rm -rf apps/homepage/node_modules
   rm -rf apps/homepage/.next
   rm -rf apps/homepage/package-lock.json
   cd apps/homepage
   npm install
   cd ../..
   npm run dev
   ```

4. **Check logs**:
   - Browser console (F12)
   - Terminal output
   - Next.js error overlay

## 💡 Pro Tips

1. **Use the monorepo scripts** from root directory:
   ```bash
   npm run dev     # Instead of cd apps/homepage && npm run dev
   npm run build   # Instead of cd apps/homepage && npm run build
   ```

2. **Keep dependencies updated** but test thoroughly:
   ```bash
   npm update --save
   ```

3. **Use TypeScript** for better error catching:
   ```bash
   npm run type-check
   ```

4. **Monitor performance**:
   - Use Chrome DevTools Lighthouse
   - Check bundle size with `npm run analyze`
   - Monitor Core Web Vitals

---

Remember: The application is now structured as a monorepo for better scalability. Always run commands from the root directory unless specifically working on the homepage app. 