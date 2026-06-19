import ServiceBooking from "@/components/serviceBooking";

export default async function BookServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main>
      <ServiceBooking slug={slug} />
    </main>
  );
}
