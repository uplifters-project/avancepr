interface Testimonial {
  id: number;
  order: number;
  name: string;
  designation: string;
  content: string;
  image: string;
  updated_at: string;
  created_at: string;
}

interface Work {
  id: number;
  order: number;
  content: string;
  image: string;
  updated_at: string;
  created_at: string;
}

interface Client {
  id: number;
  order: number;
  image: string;
  updated_at: string;
  created_at: string;
}

interface News {
  link: string;
  id: number;
  order: number;
  content: string;
  image: string;
  updated_at: string;
  created_at: string;
}

interface EnquiryFormType {
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  enquiry: string;
}

interface FAQ {
  title: string;
  description: string;
}
