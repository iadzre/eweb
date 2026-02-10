# EWEB Content Admin (Netlify CMS)

Edit site content at **`/admin`** after enabling Netlify Identity and Git Gateway.

## Setup on Netlify

1. **Identity**  
   Netlify dashboard → **Site configuration** → **Identity** → **Enable Identity**.

2. **Git Gateway**  
   Under Identity → **Services** → **Git Gateway** → **Enable**.  
   (Your site must be connected to a Git repo on GitHub or GitLab.)

3. **Invite users**  
   Identity → **Invite users** → add editors by email. They use the invite link to set a password, then log in at `yoursite.com/admin`.

4. **Repo path**  
   The CMS writes content under `public/content/` and uploads under `public/assets/images/uploads/`.  
   If your Netlify **Base directory** is set to `public`, keep the repo’s root as the full project (do not set Base to the repo root and Publish to `public` in a way that would change where Git writes files). The config paths are relative to the **Git repo root**.

## Collections

- **Site Settings** – Home hero, mission, CTAs.
- **About Page** – Mission, vision, story text.
- **Team** – Team members (name, role, photo, bio, social).
- **Programs** – Program cards (title, description, image, tag).
- **Resources** – Resource items (title, category, link, image).
- **Donation Impact** – Get Involved impact amounts and descriptions.
- **Gallery** – Gallery images and captions.

## Using CMS content on the site

Content is stored in `public/content/` as JSON or Markdown. To render it:

- **Option A** – Use the content loader: include `assets/js/content-loader.js` and add `data-content-json="settings"` and `data-content="hero_heading"` on elements that should show that field (with optional fallback text).
- **Option B** – In your own JS, fetch `/content/settings.json` (or other files) and update the DOM.

After you save in the CMS, changes are committed to your repo and the next deploy will serve the updated content.
