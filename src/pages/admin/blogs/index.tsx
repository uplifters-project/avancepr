import type { GetServerSideProps, NextPage } from "next";

import AdminLayout from "@/components/admin/AdminLayout";
import ResourceTable from "@/components/admin/ResourceTable";
import { requireAdminSSP } from "@/lib/admin/auth";
import { RESOURCES } from "@/lib/admin/resources";

const BlogsListPage: NextPage<{ email: string }> = ({ email }) => (
  <AdminLayout title="Blogs" email={email}>
    <ResourceTable resource={RESOURCES.blogs} />
  </AdminLayout>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const admin = await requireAdminSSP(ctx);
  if ("redirect" in admin) return admin;
  return { props: { email: admin.email } };
};

export default BlogsListPage;
