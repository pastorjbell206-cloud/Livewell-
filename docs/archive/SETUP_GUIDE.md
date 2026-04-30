# Livewell Setup Guide

This guide walks you through activating Mailchimp, configuring feed syncing, and populating your site with content.

---

## 1. Activate Mailchimp for Email Automation

### Step 1: Create a Mailchimp Account (if you don't have one)
1. Go to **https://mailchimp.com**
2. Click **Sign Up**
3. Enter your email, create a password, and complete the signup
4. Verify your email address

### Step 2: Create an Audience (Mailing List)
1. Log into Mailchimp
2. Click **Audience** in the left sidebar
3. Click **Create Audience** or **Create**
4. Fill in the form:
   - **Audience name**: "Livewell Newsletter" (or your preferred name)
   - **Default from email**: Your email address
   - **Default from name**: "James Bell" or your name
   - **Audience permission**: Select "I have permission to email these contacts"
5. Click **Save**

### Step 3: Get Your API Key
1. In Mailchimp, click your **profile icon** (top right)
2. Select **Account & billing**
3. Click **Extras** → **API Keys**
4. Click **Create A Key** (or copy an existing key)
5. **Copy the API Key** - you'll need this next

### Step 4: Get Your List ID
1. Go back to **Audience** in the left sidebar
2. Click on your audience name ("Livewell Newsletter")
3. Click **Settings** → **Audience name and defaults**
4. Scroll down to find **Audience ID** (looks like: `a1b2c3d4e5`)
5. **Copy the Audience ID**

### Step 5: Add Credentials to Livewell
1. Go to your Livewell admin dashboard
2. Click **Settings** in the left sidebar
3. Scroll to **Mailchimp Configuration**
4. Paste your **API Key** and **Audience ID**
5. Click **Save**

**✅ Done!** Your Mailchimp is now connected. Newsletter subscribers will automatically receive:
- Welcome email when they sign up
- Weekly digest emails when you publish new articles
- Manual campaign emails you send from the admin panel

---

## 2. Configure Feed Syncing (Substack & Pastors Connection)

### Step 1: Get Your Substack Feed URL
1. Go to your **Substack publication**
2. Look for the **RSS feed link** (usually at the bottom of the page or in settings)
3. It will look like: `https://yourname.substack.com/feed`
4. **Copy this URL**

### Step 2: Get Your Pastors Connection Feed URL
1. Go to **Pastors Connection Network** website
2. Look for an **RSS feed link** or **feed URL**
3. If you can't find it, ask the Pastors Connection team for the feed URL
4. It typically looks like: `https://pastorsconnection.com/feed` or similar
5. **Copy this URL**

### Step 3: Add Feed URLs to Livewell
1. Log into your **Livewell admin dashboard**
2. Click **Content Sync** in the left sidebar
3. You'll see two sections: **Substack Feed** and **Pastors Connection Feed**
4. Paste your **Substack URL** in the Substack field
5. Paste your **Pastors Connection URL** in the Pastors Connection field
6. Click **Save**

### Step 4: Test the Sync
1. On the **Content Sync** page, click **Sync Substack** button
2. Wait 10-30 seconds for the sync to complete
3. You should see a success message
4. Go to **Writing** page to see if new articles appeared
5. Repeat for **Sync Pastors Connection**

**✅ Done!** Your feeds are now syncing. By default, new articles will be pulled automatically every day at 6 AM. You can also manually sync anytime from the admin panel.

---

## 3. Populate Your Site with Content

### Option A: Add Articles Manually

#### Create a New Article
1. Log into your **Livewell admin dashboard**
2. Click **Writing** in the left sidebar
3. Click **Create New Post** button
4. Fill in the form:
   - **Title**: Your article title (e.g., "The Gospel for Life")
   - **Slug**: URL-friendly version (auto-generated, e.g., "the-gospel-for-life")
   - **Pillar**: Select a category (Prophetic Disruption, Theological Depth, etc.)
   - **Excerpt**: 1-2 sentence summary
   - **Body**: Full article content (supports markdown)
   - **Featured Image**: Upload a cover image
   - **Read Time**: Estimated reading time (e.g., "8 min read")
5. Click **Save Draft** to save without publishing
6. Click **Publish** when ready to go live

#### Edit an Existing Article
1. Go to **Writing** in admin
2. Find the article in the list
3. Click **Edit**
4. Make your changes
5. Click **Save**

#### Delete an Article
1. Go to **Writing** in admin
2. Find the article
3. Click **Delete** (you'll be asked to confirm)

### Option B: Add Books

#### Create a New Book
1. Log into your **Livewell admin dashboard**
2. Click **Books** in the left sidebar
3. Click **Create New Book** button
4. Fill in the form:
   - **Title**: Book title
   - **Author**: Author name (if different from you)
   - **Description**: Book summary
   - **Cover Image**: Upload book cover
   - **Type**: Select "Authored" (your books) or "Recommended" (books you recommend)
   - **Purchase URL**: Link to Amazon or your store
5. Click **Save**

### Option C: Add Resources

#### Create a New Resource
1. Log into your **Livewell admin dashboard**
2. Click **Resources** in the left sidebar
3. Click **Create New Resource** button
4. Fill in the form:
   - **Title**: Resource title
   - **Description**: What is this resource?
   - **File/URL**: Upload a PDF or paste a link
   - **Category**: Select a category
5. Click **Save**

### Option D: Add Testimonials

#### Create a New Testimonial
1. Log into your **Livewell admin dashboard**
2. Click **Moderation** in the left sidebar
3. Click the **Testimonials** tab
4. Click **Add Testimonial** button
5. Fill in the form:
   - **Author**: Person's name
   - **Role/Title**: Their title or affiliation
   - **Quote**: The testimonial text
   - **Featured**: Check this box to show on homepage carousel
6. Click **Save**

---

## 4. Verify Everything is Working

### Check Email Signup
1. Go to your **Livewell homepage**
2. Scroll down and find the **"Join the Community"** section
3. Enter a test email address
4. Click **Subscribe**
5. Check your email for a welcome message from Mailchimp

### Check Feed Syncing
1. Go to **Admin Dashboard** → **Content Sync**
2. Click **Sync All** button
3. Wait for completion
4. Go to **Writing** page
5. Verify new articles from Substack/Pastors Connection appear

### Check Article Display
1. Go to **Writing** page
2. Click on an article
3. Verify:
   - Title and content display correctly
   - Social sharing buttons appear
   - Comments section is visible
   - Related articles show at the bottom

### Check Books Store
1. Go to **Store** in navigation
2. Verify your books display with:
   - Cover images
   - Descriptions
   - Purchase buttons (Stripe or Amazon links)

### Check Admin Dashboard
1. Log in with your account
2. Click **Admin** in navigation
3. Verify you can see:
   - Dashboard overview
   - Writing management
   - Books management
   - Resources management
   - Moderation panel
   - Content sync controls

---

## 5. Troubleshooting

### Mailchimp Not Sending Emails
- **Check**: Verify API key and List ID are correct in Settings
- **Check**: Confirm subscriber email is in your Mailchimp audience
- **Check**: Look in Mailchimp dashboard for delivery reports

### Feed Sync Not Working
- **Check**: Verify feed URLs are correct (test them in a browser)
- **Check**: Ensure the feeds are public and accessible
- **Check**: Try manual sync first, then check for errors

### Articles Not Displaying
- **Check**: Verify article is set to "Published" (not Draft)
- **Check**: Check browser console for JavaScript errors (F12 → Console tab)
- **Check**: Clear browser cache and reload page

### Email Capture Pop-up Not Showing
- **Check**: Pop-up only shows after 2 minutes on article pages
- **Check**: It only shows once per browser (check localStorage)
- **Check**: Try in an incognito/private browser window

---

## 6. Next Steps

Once you've completed these setup steps:

1. **Add 5-10 sample articles** to showcase your content
2. **Invite early subscribers** to test the newsletter signup
3. **Test the complete workflow**: Publish article → Email sent to subscribers
4. **Customize your branding**: Update colors, fonts, and images in Settings
5. **Go live**: Deploy to your custom domain (contact support for help)

---

## 7. Support & Questions

If you get stuck:
- Check the **Admin Dashboard** for helpful tooltips
- Review the **README.md** in your project for technical details
- Contact Manus support at https://help.manus.im

**You're all set! Your world-class Livewell platform is ready to go.** 🎉
