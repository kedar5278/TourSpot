import PackageDetail from "@/components/packageDetail";

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main>
      <PackageDetail slug={slug} />
    </main>
  );
}
