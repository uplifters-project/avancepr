import axios, { AxiosError } from "axios";

export const server = axios.create({
  baseURL: "https://avancepr.azurewebsites.net",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const server_uplifters = axios.create({
  baseURL: "https://uplifters.azurewebsites.net",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const res = await server.get("/testimonials");

    return res.data as Testimonial[];
  } catch (e) {
    return [];
  }
};

const getOurWork = async (): Promise<Work[]> => {
  try {
    const res = await server.get("/our_work");

    return res.data as Work[];
  } catch (e) {
    return [];
  }
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
  try {
    const res = await server.get("/our_client");

    return res.data as Client[];
  } catch (e) {
    return [];
  }
};

const getLatestNews = async (): Promise<News[]> => {
  try {
    const res = await server.get("/latest_news");

    return res.data as News[];
  } catch (e) {
    return [];
  }
};

const getAwards = async (): Promise<Awards[]> => {
  try {
    const res = await server.get("/awards");

    return res.data as Awards[];
  } catch (e) {
    return [];
  }
};

const getBlogs = async (): Promise<BlogPreview[]> => {
  try {
    const res = await server.get("/blogs");

    return res.data as BlogPreview[];
  } catch (e) {
    console.log(e);

    return [];
  }
};

const getBlogById = async (id: string | number): Promise<Blog | null> => {
  try {
    const res = await server.get(`/blogs/${id}`);

    return res.data as Blog;
  } catch (e: any) {
    return null;
  }
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
