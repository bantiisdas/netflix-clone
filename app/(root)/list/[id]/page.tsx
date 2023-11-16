import GridCard from "@/components/GridCard";
import Header from "@/components/Header";
import SaveListBtn from "@/components/SaveListBtn";
import { ShareLink } from "@/components/ShareLink";
import { findListbyId } from "@/lib/actions/list.actions";
import { getUserById, getUserByMongoId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface showDetailsProps {
  showId: string;
  type: string;
  name: string;
  posterPath: string;
  backdropPath: string;
}

const page = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  const list = await findListbyId(params.id);

  const sameUser = list.owner.toString() === mongoUser._id.toString();

  const otherUser = await getUserByMongoId(list.owner);

  const listType =
    list.listType === "liked"
      ? "Liked"
      : list.listType === "watched"
      ? "Watched"
      : list.listType === "watchLater"
      ? "Saved for later"
      : list.name;

  //console.log(sameUser);

  return (
    <main className="relative h-screen bg-gradient-to-b">
      <Header />
      <div className="relative mt-16 pt-7 pr-2  cmd:pr-4 pl-4 pb-24 lg:px-8">
        <div className="flex flex-row items-center justify-between">
          <h1 className="p-5 max-md:pl-0 text-xl md:text-3xl font-bold">
            {sameUser
              ? `You ${listType}`
              : `You are viewing content ${listType} by ${otherUser.name} `}
          </h1>
          <div className="flex flex-row items-center justify-center md:gap-2 pr-2 md:pr-4 -mb-2">
            <SaveListBtn
              BtnText="Save this list"
              hidden={false}
              userId={mongoUser._id}
              listId={params.id}
            />
            <ShareLink
              link={`https://watchflix-six.vercel.app/list/${params.id}`}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 mobile:grid-cols-2 clg:grid-cols-3 cxl:grid-cols-4 c2xl:grid-cols-5 gap-2 cmd:gap-4">
          {list.shows.map((show: showDetailsProps) => (
            <GridCard
              showId={show.showId}
              showName={show.name}
              mediaType={show.type}
              backdropPath={show.backdropPath}
              posterPath={show.posterPath}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
