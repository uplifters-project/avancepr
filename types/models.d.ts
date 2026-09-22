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
  banner: string;
  description: string;
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

interface Awards {
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

interface BlogPreview {
  id: number;
  title: string;
  author: string;
  image: string;
}

interface Blog {
  id: number;
  order?: number;
  title: string;
  author: string;
  image: string;
  body?: string;
  body_md?: string;
  credits?: string;
  is_draft?: boolean;
  is_archived?: boolean;
  created_at?: string;
  updated_at?: string;
}
