# Internet University - Vercel Deployment Guide

## Quick Deploy (5 minutes)

### Option 1: Vercel Dashboard (Recommended for beginners)

#### Step 1: Push to GitHub

```bash
cd internet-university

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Internet University"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/internet-university.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository (`internet-university`)
4. Click **"Next"**

#### Step 3: Configure Environment Variables

Add these environment variables in Vercel:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `RAZORPAY_PAYMENT_LINK` | Your Razorpay payment link URL |

Click **"Deploy"**

#### Step 4: Done!

Your app is live at `https://internet-university.vercel.app`

---

### Option 2: Vercel CLI (For developers)

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
cd internet-university
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → internet-university
- **Directory?** → ./
- **Want to override settings?** → No

#### Step 4: Add Environment Variables

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add RAZORPAY_PAYMENT_LINK
```

Enter values when prompted for each environment.

#### Step 5: Deploy to Production

```bash
vercel --prod
```

---

## Environment Variables Setup

### 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com)
2. Create a new project (free tier)
3. Go to **Settings** → **API**
4. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Razorpay Setup

1. Go to [razorpay.com](https://razorpay.com)
2. Create account and login
3. Go to **Payment Links** → **Create Link**
4. Set amount: ₹10
5. Copy the payment link URL → `RAZORPAY_PAYMENT_LINK`

### 3. Database Setup

Run this SQL in Supabase SQL Editor:

```sql
-- Run contents of supabase-schema.sql
```

---

## Post-Deployment Checklist

### 1. Test the Flow

- [ ] Homepage loads correctly
- [ ] Degree cards are clickable
- [ ] Checklist page works
- [ ] Progress bar updates
- [ ] Completion message appears
- [ ] Name input saves correctly
- [ ] Payment redirect works
- [ ] Certificate generates
- [ ] Download PNG works
- [ ] Download PDF works
- [ ] Share buttons work

### 2. Check Mobile Responsiveness

- [ ] Test on iPhone view
- [ ] Test on Android view
- [ ] Test on tablet view

### 3. Verify Performance

- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals in Vercel dashboard

### 4. Update Custom Domain (Optional)

1. Go to Vercel Project → **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed

---

## Vercel Dashboard Features

### Analytics

- **Page Views**: Track traffic
- **Performance**: Monitor speed
- **Geo Distribution**: See where users are from

### A/B Testing

Use Vercel's **Edge Config** for experiments:

```bash
npm install @vercel/edge-config
```

### Serverless Functions

Your API routes are automatically deployed as serverless functions:
- `/api/certificate`
- `/api/leaderboard`

---

## Scaling Considerations

### Free Tier Limits

| Service | Limit |
|---------|-------|
| Vercel Free | 100GB bandwidth/month |
| Supabase Free | 50K monthly active users |
| Supabase Free | 500MB database |

### When to Upgrade

Upgrade when you hit:
- 10K+ daily active users
- 100GB+ bandwidth/month
- Need custom domains
- Need team collaboration

### Upgrade Path

1. **Vercel Pro**: $20/month → More bandwidth, analytics
2. **Supabase Pro**: $25/month → 8GB database, more auth users
3. **Add Cloudflare R2**: For certificate storage (~$0.015/GB)

---

## Troubleshooting

### Build Fails

**Error: Missing environment variables**

```bash
vercel env pull
```

Or add them in Vercel dashboard: Project → Settings → Environment Variables

### Runtime Errors

**Supabase connection issues:**

Check your environment variables:
```bash
vercel env ls
```

Re-deploy after fixing:
```bash
vercel --prod
```

### Certificate Download Not Working

This is usually a CORS issue. Ensure:
- `html2canvas` has `useCORS: true`
- Fonts are loaded from CDN with CORS headers

---

## Custom Domain Setup

### 1. Buy Domain

Purchase from:
- Namecheap
- GoDaddy
- Google Domains

### 2. Add to Vercel

1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain: `internetuniversity.com`
3. Add `www` subdomain

### 3. Configure DNS

Add these records at your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### 4. SSL Certificate

Vercel automatically provisions SSL. Wait 5-10 minutes for propagation.

---

## Monitoring & Analytics

### Google Analytics

Add GA4 tracking in `src/app/layout.tsx`:

```tsx
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    `,
  }}
/>
```

### Vercel Analytics

Enable in Vercel dashboard: Project → **Analytics** → Enable

### Error Tracking (Optional)

Add Sentry:

```bash
npm install @sentry/nextjs
```

---

## Cost Breakdown

### Stage 1: Launch (0-10K users/month)

| Service | Cost |
|---------|------|
| Vercel | Free |
| Supabase | Free |
| Razorpay | 2% transaction fee |
| **Total** | **₹0 + payment fees** |

### Stage 2: Growth (10K-100K users/month)

| Service | Cost |
|---------|------|
| Vercel Pro | $20/month |
| Supabase Pro | $25/month |
| Razorpay | 2% transaction fee |
| **Total** | **~$45/month + payment fees** |

### Stage 3: Scale (100K+ users/month)

| Service | Cost |
|---------|------|
| Vercel Pro | $20/month |
| Supabase Pro | $25/month |
| Cloudflare R2 | ~$5-10/month |
| Razorpay | 2% transaction fee |
| **Total** | **~$50-60/month + payment fees** |

---

## Continuous Deployment

Vercel automatically deploys on every push to main:

```bash
git add .
git commit -m "Add new feature"
git push
# Vercel deploys automatically!
```

### Preview Deployments

Push to a branch:
```bash
git checkout -b feature/new-degree
git push
# Vercel creates a preview URL
```

Share the preview URL with your team for review.

---

## Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Razorpay Docs](https://razorpay.com/docs)

---

## Go Live Checklist

- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] Payment link tested
- [ ] Certificate download tested
- [ ] Mobile responsiveness verified
- [ ] Social share tested
- [ ] Analytics configured (optional)
- [ ] Custom domain added (optional)
- [ ] SSL certificate active
- [ ] Performance audit passed

**Ready to launch! 🚀**
