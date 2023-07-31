import axios from "axios";

export const server = axios.create({
  baseURL: "http://127.0.0.1:8000",
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
  getOurClients,
  getLatestNews,
  submitEnquiryForm,
};
