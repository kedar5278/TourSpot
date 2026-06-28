import PackageBooking from "@/components/packageBooking";

export default async function PackageBookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main>
      <PackageBooking slug={slug} />
    </main>
  );
}
