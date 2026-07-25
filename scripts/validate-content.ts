import { z } from 'zod';
import path from 'path';
import { fileURLToPath } from 'url';

// Because we're using ES modules with tsx
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Schemas based on CONTENT_SCHEMA.md
const SocialSchema = z.object({
  platform: z.string().min(1, "Platform name required"),
  url: z.string().url("Invalid social URL"),
});

const ProfileSchema = z.object({
  name: z.string().min(1, "Name required"),
  professionalTitle: z.string().min(1, "Professional Title required"),
  tagline: z.string().min(1, "Tagline required"),
  shortBio: z.string().min(1, "Short Bio required"),
  longBio: z.string().min(1, "Long Bio required"),
  location: z.string().min(1, "Location required"),
  email: z.string().email("Invalid email format").or(z.literal("TODO")),
  availability: z.string().min(1, "Availability required"),
  profileImage: z.string().min(1, "Profile image required"),
  resumeUrl: z.string().min(1, "Resume URL required"),
  socials: z.array(SocialSchema).optional(), // Will be made required once implemented
  seo: z.object({
    siteTitle: z.string().min(1, "SEO siteTitle required"),
    defaultDescription: z.string().min(1, "SEO defaultDescription required"),
    canonicalUrl: z.string().url("SEO canonicalUrl must be valid URL"),
    openGraphImage: z.string().min(1, "SEO openGraphImage required"),
    twitterHandle: z.string().min(1, "SEO twitterHandle required")
  }).optional() // Will be made required once implemented
});

const ProjectSchema = z.object({
  id: z.string().min(1, "Project ID required"),
  slug: z.string().min(1, "Slug required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase and URL safe"),
  title: z.string().min(1, "Title required"),
  shortDescription: z.string().min(1, "Short Description required"),
  longDescription: z.string().min(1, "Long Description required"),
  category: z.string().min(1, "Category required"),
  technologies: z.array(z.string()).min(1, "At least one technology required"),
  features: z.array(z.string()).min(1, "At least one feature required"),
  role: z.string().min(1, "Role required"),
  status: z.string().min(1, "Status required"),
  image: z.string().min(1, "Image required"),
  gallery: z.array(z.string()).optional(),
  githubUrl: z.string().url("Invalid GitHub URL").or(z.string().length(0)).optional().or(z.literal("TODO")),
  liveUrl: z.string().url("Invalid Live URL").or(z.string().length(0)).optional().or(z.literal("TODO")),
  caseStudyUrl: z.string().url("Invalid Case Study URL").or(z.string().length(0)).optional().or(z.literal("TODO")),
  featured: z.boolean(),
  priority: z.number()
});

// Import the data
import { profile } from '../src/data/profile.ts';
import { projects } from '../src/data/projects.ts';

function checkForPlaceholders(data: any, pathContext: string) {
  let warnings = 0;
  if (typeof data === 'string') {
    if (data.includes('TODO') || data.includes('Lorem ipsum')) {
      console.warn(`\x1b[33m[WARNING]\x1b[0m Placeholder detected at ${pathContext}`);
      warnings++;
    }
  } else if (Array.isArray(data)) {
    data.forEach((item, idx) => {
      warnings += checkForPlaceholders(item, `${pathContext}[${idx}]`);
    });
  } else if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      warnings += checkForPlaceholders(data[key], `${pathContext}.${key}`);
    }
  }
  return warnings;
}

async function validate() {
  console.log("Starting Portfolio Content Validation...\n");
  let hasErrors = false;
  let totalWarnings = 0;

  // 1. Validate Profile
  try {
    ProfileSchema.parse(profile);
    console.log("✅ Profile Schema Validation: PASS");
  } catch (error) {
    console.error("❌ Profile Schema Validation: FAIL");
    console.error(error);
    hasErrors = true;
  }

  // 2. Validate Projects
  try {
    const slugSet = new Set<string>();
    for (const project of projects) {
      ProjectSchema.parse(project);
      if (slugSet.has(project.slug)) {
        throw new Error(`Duplicate project slug detected: ${project.slug}`);
      }
      slugSet.add(project.slug);
    }
    console.log("✅ Projects Schema Validation: PASS");
  } catch (error) {
    console.error("❌ Projects Schema Validation: FAIL");
    console.error(error);
    hasErrors = true;
  }

  // 3. Placeholder Detection (Soft Warning)
  console.log("\nChecking for placeholders...");
  totalWarnings += checkForPlaceholders(profile, 'profile');
  totalWarnings += checkForPlaceholders(projects, 'projects');
  
  if (totalWarnings > 0) {
    console.log(`\n⚠️ Found ${totalWarnings} placeholder(s) in content. Ensure these are removed before final production deployment.`);
  } else {
    console.log("\n✅ No placeholders detected.");
  }

  if (hasErrors) {
    console.error("\n❌ Content validation failed. Please fix the errors above.");
    process.exit(1);
  } else {
    console.log("\n✨ All content validated successfully! The application is ready to build.");
  }
}

validate();
