import axios, { AxiosError } from "axios";

export const server = axios.create({
  baseURL: "https://avancepr.azurewebsites.net",
  timeout: 10_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const server_uplifters = axios.create({
  baseURL: "https://uplifters.azurewebsites.net",
  timeout: 10_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// The fetchers below are used in getStaticProps/getStaticPaths and throw on
// failure. Callers wrap them in fetchWithCache (lib/static-cache.ts) so a
// failed revalidation falls back to the last good snapshot instead of
// regenerating the page with empty data.
const getTestimonials = async (): Promise<Testimonial[]> => {
  const res = await server.get("/testimonials");

  return res.data as Testimonial[];
};

const getOurWork = async (): Promise<Work[]> => {
  const res = await server.get("/our_work");

  return res.data as Work[];
};

const getWorkById = async (id: string | number): Promise<Work | null> => {
  try {
    const res = await server_uplifters.get(`/api/data/our_work/${id}`);

    return res.data as Work;
  } catch (e: any) {
    return null;
  }
};

const getOurClients = async (): Promise<Client[]> => {
  const res = await server.get("/our_client");

  return res.data as Client[];
};

const getLatestNews = async (): Promise<News[]> => {
  const res = await server.get("/latest_news");

  return res.data as News[];
};

const getAwards = async (): Promise<Awards[]> => {
  const res = await server.get("/awards");

  return res.data as Awards[];
};

const getBlogs = async (): Promise<BlogPreview[]> => {
  const res = await server.get("/blogs");

  return res.data as BlogPreview[];
};

const getBlogById = async (id: string | number): Promise<Blog> => {
  const res = await server.get(`/blogs/${id}`);

  return res.data as Blog;
};

const submitEnquiryForm = async (data: EnquiryFormType): Promise<boolean> => {
  try {
    const res = await server.post("/enquiry/", data, {});

    return true;
  } catch (e) {
    return false;
  }
};

export {
  getTestimonials,
  getOurWork,
  getWorkById,
  getOurClients,
  getLatestNews,
  submitEnquiryForm,
  getBlogs,
  getBlogById,
  getAwards
};
