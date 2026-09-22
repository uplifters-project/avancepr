import type { GetServerSideProps, NextPage } from "next";

import AdminLayout from "@/components/admin/AdminLayout";
import ResourceTable from "@/components/admin/ResourceTable";
import EnquiryTable from "@/components/admin/EnquiryTable";
import { requireAdminSSP } from "@/lib/admin/auth";
import { getResource, GENERIC_RESOURCE_SLUGS, type ResourceSlug } from "@/lib/admin/resources";

const ResourceListPage: NextPage<{ email: string; slug: ResourceSlug }> = ({ email, slug }) => {
  const resource = getResource(slug)!;

  return (
    <AdminLayout title={resource.label} email={email}>
      {slug === "enquiries" ? <EnquiryTable resource={resource} /> : <ResourceTable resource={resource} />}
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const admin = await requireAdminSSP(ctx);
  if ("redirect" in admin) return admin;

  const slug = String(ctx.params?.resource);
  const isGeneric = GENERIC_RESOURCE_SLUGS.includes(slug as ResourceSlug) || slug === "enquiries";
  if (!isGeneric) return { notFound: true };

  return { props: { email: admin.email, slug } };
};

export default ResourceListPage;
