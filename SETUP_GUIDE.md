# Portfolio Setup Guide

Quick start guide for deploying your professional portfolio online.

## 🚀 Quick Start (5 Minutes)

### Step 1: Local Testing
1. Download all files from `/outputs`:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `.gitignore`

2. Create a folder: `my-portfolio`

3. Place all files in this folder

4. Open `index.html` in your web browser
   - Double-click the file, or
   - Right-click → Open with → Your Browser

✅ You should see your portfolio working locally!

---

## 📤 Deploy to GitHub Pages (Free Hosting)

### Step 1: Create GitHub Account
- Go to https://github.com
- Sign up for free account
- Verify your email

### Step 2: Create New Repository
1. Click "+" icon → "New repository"
2. Name it: `portfolio` or `my-portfolio`
3. Add description (optional): "My Professional Portfolio"
4. Select "Public" (required for free hosting)
5. Click "Create repository"

### Step 3: Upload Files
**Option A: Using GitHub Web Interface (Easiest)**
1. In your new repository, click "Add file" → "Upload files"
2. Drag and drop all files into the upload area:
   - index.html
   - styles.css
   - script.js
   - README.md
   - .gitignore
3. Click "Commit changes"

**Option B: Using Git Command Line**
```bash
# Navigate to your portfolio folder
cd my-portfolio

# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio commit"

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" (top right)
3. Go to "Pages" section (left sidebar)
4. Under "Build and deployment"
   - Source: "Deploy from a branch"
   - Branch: "main" and "/root"
5. Click "Save"
6. Wait 1-2 minutes for deployment

### Step 5: Access Your Portfolio
After deployment, your portfolio will be live at:
```
https://USERNAME.github.io/portfolio
```

Replace `USERNAME` with your actual GitHub username.

---

## 🎨 Customization Tips

### Update Your Information
1. Open `index.html` with a text editor (VS Code, Notepad++, etc.)
2. Find sections with your data and update:
   - Name and title
   - About text
   - Experience entries
   - Education details
   - Skills
   - Projects
   - Contact information

3. Save file
4. Push changes to GitHub (will update automatically)

### Update Colors
Open `styles.css` and modify CSS variables at the top:

```css
:root {
    --primary-color: #0f172a;      /* Dark background */
    --accent-color: #0ea5e9;       /* Cyan accent */
    --accent-light: #06b6d4;       /* Light cyan */
    --text-primary: #f1f5f9;       /* Light text */
    /* ... more colors ... */
}
```

### Add Your Photo
1. Save your photo as `profile.jpg` in the same folder
2. Add to HTML (in hero section):
   ```html
   <img src="profile.jpg" alt="Raj Shrestha" style="max-width: 200px; border-radius: 50%;">
   ```

---

## 🔗 Update Linktree Link

In `index.html`, find and update:
```html
<a href="https://linktr.ee/raj_acamit" target="_blank">
```

Replace `raj_acamit` with your Linktree username.

---

## 📱 Testing Your Portfolio

### Desktop
- Chrome
- Firefox
- Safari
- Edge

### Mobile
- Open portfolio URL on your phone
- Test navigation
- Verify all sections display correctly
- Check buttons and links work

### Performance Check
- Visit https://pagespeed.web.dev
- Enter your portfolio URL
- Check scores and suggestions

---

## 🛠️ Advanced Customization

### Add New Sections
1. Add HTML in `index.html`:
```html
<section id="newSection" class="newSection">
    <div class="container">
        <h2 class="section-title">My New Section</h2>
        <!-- Your content here -->
    </div>
</section>
```

2. Add CSS in `styles.css`:
```css
.newSection {
    background: var(--primary-color);
    padding: 5rem 20px;
}
```

3. Add navigation link in navbar:
```html
<li><a href="#newSection" class="nav-link">New Section</a></li>
```

### Change Fonts
In `styles.css`, update the font-family:
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

You can use Google Fonts:
1. Visit https://fonts.google.com
2. Select fonts
3. Copy the `@import` code
4. Paste in `styles.css` at the top
5. Update font-family names

---

## 🔐 Security & Best Practices

1. **Don't share sensitive info**: Avoid putting passwords or API keys
2. **Keep it updated**: Regularly update your experience and projects
3. **Use HTTPS**: GitHub Pages uses HTTPS by default (secure)
4. **Backup**: Keep a local copy of all files
5. **Version control**: Commit changes regularly to GitHub

---

## 📊 Monitor Your Portfolio

### Add Google Analytics (Optional)
1. Go to https://analytics.google.com
2. Create new property for your portfolio
3. Get tracking ID
4. Add to `index.html` before closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
</script>
```

Replace `GA_ID` with your tracking ID.

---

## 🆘 Troubleshooting

### Portfolio Not Showing
- Wait 2-3 minutes after pushing to GitHub
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check GitHub Pages is enabled in Settings

### Styling Not Loading
- Clear browser cache
- Check file names are exactly: `styles.css`, `script.js`
- Verify all files are in repository root (not in folders)

### Links Not Working
- Check relative paths are correct
- For Linktree, use full URL: `https://linktr.ee/username`

### Mobile Menu Not Working
- Check JavaScript file is loaded correctly
- Open browser console (F12) for errors
- Ensure `script.js` is in same folder as `index.html`

---

## 📚 Useful Resources

- **HTML**: https://developer.mozilla.org/en-US/docs/Web/HTML
- **CSS**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **Git**: https://git-scm.com/doc
- **GitHub Pages**: https://pages.github.com
- **Color Picker**: https://colorpicker.com

---

## 🎯 Next Steps

1. ✅ Deploy your portfolio (Today)
2. 📧 Share portfolio URL with recruiters
3. 🔗 Update Linktree with portfolio link
4. 📱 Test on multiple devices
5. 🎨 Customize colors and content
6. 📊 Add Google Analytics
7. 🔄 Keep updating with new projects

---

## ✨ Tips for Success

1. **First Impression**: Make hero section eye-catching
2. **Clear Information**: Use simple, professional language
3. **Recent Projects**: Keep projects section updated
4. **Contact Easy**: Make email/contact clearly visible
5. **Mobile First**: Always test on mobile
6. **Fast Loading**: Optimize images
7. **Regular Updates**: Add new projects monthly
8. **Professional**: Use consistent formatting

---

## 🎓 Learning Resources

If you want to customize further:

- **HTML Basics**: 2 hours to learn
- **CSS Styling**: 3 hours to learn
- **JavaScript Basics**: 4 hours to learn
- **Git/GitHub**: 1 hour to learn

Recommended:
- freeCodeCamp on YouTube
- Codecademy.com
- W3Schools.com
- MDN Web Docs

---

## 📞 Support

If stuck:
1. Check README.md for documentation
2. Search GitHub Issues for similar problems
3. Check browser console (F12) for error messages
4. Try different browser
5. Clear cache and refresh

---

## 🎉 Congratulations!

Your professional portfolio is now live! Share it with:
- Recruiters
- Peers
- Social media (LinkedIn, Twitter, Instagram)
- Your Linktree profile
- Email signature
- Job applications

**Good luck with your career! 🚀**
