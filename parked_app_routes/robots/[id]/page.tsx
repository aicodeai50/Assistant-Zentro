import RobotDetail from "@/components/robots/RobotDetail";

export default async function RobotDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <RobotDetail id={id} />
      </div>
    </div>
  );
}