import { z } from "zod";
import { MEDIA_FOLDERS, type MediaFolder } from "@/lib/admin/storage";

// One registry entry per main_* table drives the generic list/form pages
// (src/pages/admin/[resource]/index.tsx, new.tsx, [id].tsx) and the generic
// API routes (src/pages/api/admin/[resource]/*). Blogs are the one
// exception — they get a hand-built editor page instead of the generic
// form, because of the Tiptap/markdown field — but still share this
// registry's schema, table name and revalidation paths.
//
// Field maxLengths mirror the Django model `max_length=`/Postgres varchar
// widths exactly (see advancepr_backend/main/models.py and
// supabase/migrations/0001_initial.sql), so a bad submission fails cleanly
// in the form instead of erroring at the database.

export type FieldType =
  | "text"
  | "textarea"
  | "url"
  | "number"
  | "image"
  | "boolean";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  maxLength?: number;
  folder?: MediaFolder;
  helpText?: string;
}

export interface ListColumn {
  key: string;
  label: string;
}

export interface ResourceDef<Row = any> {
  slug: string;
  table: string;
  label: string;
  singular: string;
  /** Row is draggable/reorderable in the list view. */
  orderable: boolean;
  /** Enquiries: viewable/archivable/deletable, never created or edited. */
  readOnly?: boolean;
  fields: FieldDef[];
  listColumns: ListColumn[];
  listSelect: string;
  formSelect: string;
  schema: z.ZodObject<any>;
  emptyDefaults: Record<string, any>;
  revalidatePaths: (row: Row) => string[];
  /** Columns searched (ILIKE) by the list view's search box. */
  searchColumns: string[];
}

const orderField: FieldDef = {
  name: "order",
  label: "Order",
  type: "number",
  helpText: "Lower numbers show first.",
};

// ---------------------------------------------------------------------------
// testimonials
// ---------------------------------------------------------------------------
const testimonials: ResourceDef = {
  slug: "testimonials",
  table: "main_testimonial",
  label: "Testimonials",
  singular: "Testimonial",
  orderable: true,
  fields: [
    { name: "name", label: "Name", type: "text", required: true, maxLength: 50 },
    { name: "designation", label: "Designation", type: "text", required: true, maxLength: 50 },
    { name: "content", label: "Testimonial", type: "textarea", required: true },
    { name: "image", label: "Photo", type: "image", folder: MEDIA_FOLDERS.testimonial },
    orderField,
  ],
  listColumns: [
    { key: "image", label: "" },
    { key: "name", label: "Name" },
    { key: "designation", label: "Designation" },
    { key: "order", label: "Order" },
  ],
  listSelect: "id, order, name, designation, image, is_archived, updated_at",
  formSelect: "id, order, name, designation, content, image, is_archived",
  schema: z.object({
    name: z.string().trim().min(1, "Required").max(50),
    designation: z.string().trim().min(1, "Required").max(50),
    content: z.string().trim().min(1, "Required"),
    image: z.string().url().nullable().optional(),
    order: z.coerce.number().int().min(0).default(0),
  }),
  emptyDefaults: { name: "", designation: "", content: "", image: null, order: 0 },
  searchColumns: ["name", "designation"],
  revalidatePaths: () => ["/", "/testimonials"],
};

// ---------------------------------------------------------------------------
// clients
// ---------------------------------------------------------------------------
const clients: ResourceDef = {
  slug: "clients",
  table: "main_ourclient",
  label: "Clients",
  singular: "Client",
  orderable: true,
  fields: [
    { name: "name", label: "Name", type: "text", required: true, maxLength: 100 },
    { name: "image", label: "Logo", type: "image", folder: MEDIA_FOLDERS.ourClient },
    orderField,
  ],
  listColumns: [
    { key: "image", label: "" },
    { key: "name", label: "Name" },
    { key: "order", label: "Order" },
  ],
  listSelect: "id, order, name, image, is_archived, updated_at",
  formSelect: "id, order, name, image, is_archived",
  schema: z.object({
    name: z.string().trim().min(1, "Required").max(100).default("Unnamed Client"),
    image: z.string().url().nullable().optional(),
    order: z.coerce.number().int().min(0).default(0),
  }),
  emptyDefaults: { name: "Unnamed Client", image: null, order: 0 },
  searchColumns: ["name"],
  revalidatePaths: () => ["/"],
};

// ---------------------------------------------------------------------------
// work
// ---------------------------------------------------------------------------
const work: ResourceDef = {
  slug: "work",
  table: "main_ourwork",
  label: "Our Work",
  singular: "Work item",
  orderable: true,
  fields: [
    { name: "content", label: "Title", type: "text", required: true, maxLength: 50 },
    { name: "description", label: "Description", type: "textarea" },
    { name: "image", label: "Thumbnail", type: "image", folder: MEDIA_FOLDERS.ourWork },
    { name: "banner", label: "Banner", type: "image", folder: MEDIA_FOLDERS.ourWorkBanner },
    orderField,
  ],
  listColumns: [
    { key: "image", label: "" },
    { key: "content", label: "Title" },
    { key: "order", label: "Order" },
  ],
  listSelect: "id, order, content, image, is_archived, updated_at",
  formSelect: "id, order, content, description, image, banner, is_archived",
  schema: z.object({
    content: z.string().trim().min(1, "Required").max(50),
    description: z.string().trim().nullable().optional(),
    image: z.string().url().nullable().optional(),
    banner: z.string().url().nullable().optional(),
    order: z.coerce.number().int().min(0).default(0),
  }),
  emptyDefaults: { content: "", description: "", image: null, banner: null, order: 0 },
  searchColumns: ["content"],
  revalidatePaths: (row) => ["/", "/work", `/work/${row.id}`],
};

// ---------------------------------------------------------------------------
// news
// ---------------------------------------------------------------------------
const news: ResourceDef = {
  slug: "news",
  table: "main_latestnews",
  label: "Latest News",
  singular: "News item",
  orderable: true,
  fields: [
    { name: "content", label: "Content", type: "textarea", required: true },
    { name: "link", label: "Link", type: "url" },
    { name: "image", label: "Image", type: "image", folder: MEDIA_FOLDERS.latestNews },
    orderField,
  ],
  listColumns: [
    { key: "image", label: "" },
    { key: "content", label: "Content" },
    { key: "order", label: "Order" },
  ],
  listSelect: "id, order, content, image, is_archived, updated_at",
  formSelect: "id, order, content, link, image, is_archived",
  schema: z.object({
    content: z.string().trim().min(1, "Required"),
    link: z.string().trim().url().nullable().optional().or(z.literal("")),
    image: z.string().url().nullable().optional(),
    order: z.coerce.number().int().min(0).default(0),
  }),
  emptyDefaults: { content: "", link: "", image: null, order: 0 },
  searchColumns: ["content"],
  revalidatePaths: () => ["/", "/featured"],
};

// ---------------------------------------------------------------------------
// awards
// ---------------------------------------------------------------------------
const awards: ResourceDef = {
  slug: "awards",
  table: "main_awardsrecognition",
  label: "Awards & Recognition",
  singular: "Award",
  orderable: true,
  fields: [
    { name: "content", label: "Content", type: "textarea", required: true },
    { name: "link", label: "Link", type: "url" },
    { name: "image", label: "Image", type: "image", folder: MEDIA_FOLDERS.awards },
    orderField,
  ],
  listColumns: [
    { key: "image", label: "" },
    { key: "content", label: "Content" },
    { key: "order", label: "Order" },
  ],
  listSelect: "id, order, content, image, is_archived, updated_at",
  formSelect: "id, order, content, link, image, is_archived",
  schema: z.object({
    content: z.string().trim().min(1, "Required"),
    link: z.string().trim().url().nullable().optional().or(z.literal("")),
    image: z.string().url().nullable().optional(),
    order: z.coerce.number().int().min(0).default(0),
  }),
  emptyDefaults: { content: "", link: "", image: null, order: 0 },
  searchColumns: ["content"],
  revalidatePaths: () => ["/", "/about"],
};

// ---------------------------------------------------------------------------
// blogs — schema/table/revalidation shared with the custom editor pages
// (src/pages/admin/blogs/*); the generic list/form pages are NOT used for
// this resource (see src/pages/admin/blogs/index.tsx).
// ---------------------------------------------------------------------------
const blogs: ResourceDef = {
  slug: "blogs",
  table: "main_blog",
  label: "Blogs",
  singular: "Blog",
  orderable: false,
  fields: [
    { name: "title", label: "Title", type: "text", required: true, maxLength: 100 },
    { name: "author", label: "Author", type: "text", required: true, maxLength: 50 },
    { name: "credits", label: "Credits", type: "textarea" },
    { name: "image", label: "Cover image", type: "image", folder: MEDIA_FOLDERS.blogPhoto },
  ],
  listColumns: [
    { key: "image", label: "" },
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "updated_at", label: "Updated" },
  ],
  listSelect: "id, title, author, image, is_draft, is_archived, updated_at",
  formSelect:
    "id, order, title, author, body, body_md, image, credits, is_draft, is_archived, created_at, updated_at",
  schema: z.object({
    title: z.string().trim().min(1, "Required").max(100),
    author: z.string().trim().min(1, "Required").max(50),
    body_md: z.string().trim().min(1, "Write something first"),
    credits: z.string().trim().nullable().optional(),
    image: z.string().url().nullable().optional(),
    is_draft: z.boolean().default(true),
  }),
  emptyDefaults: {
    title: "",
    author: "",
    body_md: "",
    credits: "",
    image: null,
    is_draft: true,
  },
  searchColumns: ["title", "author"],
  revalidatePaths: (row) => ["/blogs", `/blogs/${row.id}`],
};

// ---------------------------------------------------------------------------
// enquiries — read-only (see src/pages/admin/enquiries/index.tsx). This is
// the data behind VAPT finding WAT-01 (SECURITY_FIX_REPORT.md); it must
// never be reachable through an unauthenticated route.
// ---------------------------------------------------------------------------
const enquiries: ResourceDef = {
  slug: "enquiries",
  table: "main_enquiry",
  label: "Enquiries",
  singular: "Enquiry",
  orderable: false,
  readOnly: true,
  fields: [],
  listColumns: [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "company_name", label: "Company" },
    { key: "created_at", label: "Received" },
  ],
  listSelect: "id, full_name, email, phone, company_name, enquiry, is_archived, created_at",
  formSelect: "id, full_name, email, phone, company_name, enquiry, is_archived, created_at",
  schema: z.object({}),
  emptyDefaults: {},
  searchColumns: ["full_name", "email", "phone", "company_name"],
  revalidatePaths: () => [],
};

export const RESOURCES = {
  testimonials,
  clients,
  work,
  news,
  awards,
  blogs,
  enquiries,
} as const;

export type ResourceSlug = keyof typeof RESOURCES;

export function getResource(slug: string): ResourceDef | null {
  return (RESOURCES as Record<string, ResourceDef>)[slug] ?? null;
}

// Resources exposed through the generic /api/admin/[resource] + admin UI
// list/form pages. Blogs and enquiries opt out (custom editor / read-only).
export const GENERIC_RESOURCE_SLUGS: ResourceSlug[] = [
  "testimonials",
  "clients",
  "work",
  "news",
  "awards",
];
