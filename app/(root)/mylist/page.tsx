import Headers from "@/components/Headers";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  const user = await currentUser();

  return (
    <main className="relative ">
      <Headers />
    </main>
  );
}

export default Page;
