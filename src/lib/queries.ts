import { supabaseAdmin, mediaUrl } from "@/lib/supabase";

// Server-only: these run in getStaticProps/getStaticPaths and read directly
// from Supabase using the service-role key. This must stay a separate module
// from src/lib/apis.ts (which also exports the client-callable
// submitEnquiryForm) — if a Supabase-backed export shared a module with
// client code, the whole module (including supabase.ts's service-role key
// check) would end up in the browser bundle.
//
// The fetchers below throw on failure, so a failed ISR revalidation keeps
// serving the previously generated page instead of regenerating it with
// empty/broken data.

const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabaseAdmin
    .from("main_testimonial")
    .select("id, order, name, designation, content, image, created_at, updated_at")
    .eq("is_archived", false)
    .order("order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    ...row,
    image: mediaUrl(row.image) ?? "",
  })) as Testimonial[];
};

const getOurWork = async (): Promise<Work[]> => {
  const { data, error } = await supabaseAdmin
    .from("main_ourwork")
    .select("id, order, content, image, banner, description, created_at, updated_at")
    .eq("is_archived", false)
    .order("order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    ...row,
    image: mediaUrl(row.image) ?? "",
    banner: mediaUrl(row.banner) ?? "",
  })) as Work[];
};

const getOurClients = async (): Promise<Client[]> => {
  const { data, error } = await supabaseAdmin
    .from("main_ourclient")
    .select("id, order, image, created_at, updated_at")
    .eq("is_archived", false)
    .order("order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    ...row,
    image: mediaUrl(row.image) ?? "",
  })) as Client[];
};

const getLatestNews = async (): Promise<News[]> => {
  const { data, error } = await supabaseAdmin
    .from("main_latestnews")
    .select("id, order, content, image, link, created_at, updated_at")
    .eq("is_archived", false)
    .order("order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    ...row,
    image: mediaUrl(row.image) ?? "",
  })) as News[];
};

const getAwards = async (): Promise<Awards[]> => {
  const { data, error } = await supabaseAdmin
    .from("main_awardsrecognition")
    .select("id, order, content, image, link, created_at, updated_at")
    .eq("is_archived", false)
    .order("order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    ...row,
    image: mediaUrl(row.image) ?? "",
  })) as Awards[];
};

const getBlogs = async (): Promise<BlogPreview[]> => {
  const { data, error } = await supabaseAdmin
    .from("main_blog")
    .select("id, title, author, image")
    .eq("is_archived", false)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    ...row,
    image: mediaUrl(row.image) ?? "",
  })) as BlogPreview[];
};

const getBlogById = async (id: string | number): Promise<Blog> => {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;

  const { data, error } = await supabaseAdmin
    .from("main_blog")
    .select(
      "id, order, title, author, image, body, body_md, credits, created_at, updated_at"
    )
    .eq("is_archived", false)
    .eq("id", numericId)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error(`Blog ${numericId} not found`);

  return {
    ...data,
    image: mediaUrl(data.image) ?? "",
  } as Blog;
};

export {
  getTestimonials,
  getOurWork,
  getOurClients,
  getLatestNews,
  getBlogs,
  getBlogById,
  getAwards,
};
