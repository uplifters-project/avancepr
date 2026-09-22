import type { GetServerSideProps, NextPage } from "next";

import AdminLayout from "@/components/admin/AdminLayout";
import BlogEditorForm from "@/components/admin/blog/BlogEditorForm";
import { requireAdminSSP } from "@/lib/admin/auth";

const NewBlogPage: NextPage<{ email: string }> = ({ email }) => (
  <AdminLayout title="New blog" email={email}>
    <BlogEditorForm id={null} />
  </AdminLayout>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const admin = await requireAdminSSP(ctx);
  if ("redirect" in admin) return admin;
  return { props: { email: admin.email } };
};

export default NewBlogPage;
