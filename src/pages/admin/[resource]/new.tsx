import type { GetServerSideProps, NextPage } from "next";

import AdminLayout from "@/components/admin/AdminLayout";
import ResourceForm from "@/components/admin/ResourceForm";
import { requireAdminSSP } from "@/lib/admin/auth";
import { getResource, GENERIC_RESOURCE_SLUGS, type ResourceSlug } from "@/lib/admin/resources";

const NewResourcePage: NextPage<{ email: string; slug: ResourceSlug }> = ({ email, slug }) => {
  const resource = getResource(slug)!;

  return (
    <AdminLayout title={`New ${resource.singular}`} email={email}>
      <ResourceForm resource={resource} defaultValues={resource.emptyDefaults} />
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const admin = await requireAdminSSP(ctx);
  if ("redirect" in admin) return admin;

  const slug = String(ctx.params?.resource);
  if (!GENERIC_RESOURCE_SLUGS.includes(slug as ResourceSlug)) return { notFound: true };

  return { props: { email: admin.email, slug } };
};

export default NewResourcePage;
