# SEO Tags Script

This script automatically adds SEO tags (title, description, canonical URL) to all service pages using `react-helmet-async`.

## Usage

Run the script from the project root:

```bash
npm run add-seo-tags
```

Or directly with Node:

```bash
node scripts/add-seo-tags.js
```

## What it does

1. Scans all `.tsx` files in `src/pages/Services/` directory
2. Skips files that already have SEO tags (Helmet component)
3. Adds `react-helmet-async` import if not present
4. Wraps the return statement with a fragment (`<>`) and adds Helmet component
5. Generates appropriate SEO tags based on the service name:
   - Title (50-60 characters)
   - Meta description (140-160 characters)
   - Canonical URL

## Service Pages Covered

The script includes SEO configuration for all major service pages:
- Essay Writing
- Research Paper Writing
- Dissertation Writing
- Thesis Writing
- Assignment Help (all subjects)
- Programming Help (all languages)
- And more...

## Notes

- The script will skip files that already have SEO tags
- Files with "Carousel" or "Experts" in the name are skipped
- If a service page is not in the SEO configuration, it will be skipped with a warning
- The script preserves existing code formatting and indentation

## Manual Review

After running the script, it's recommended to:
1. Review the changes in git diff
2. Test that pages still render correctly
3. Verify SEO tags are present in the page source
4. Check that canonical URLs are correct

