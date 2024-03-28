import EmptyRow from "@/components/EmptyRow";
import Header from "@/components/Header";
import MyListRow from "@/components/MyListRow";
import {
  fetchLikedListData,
  fetchWatchLaterListData,
  fetchWatchedListData,
  findListbyId,
} from "@/lib/actions/list.actions";
import {
  getUserById,
  getUserByMongoId,
  isHasOtherLists,
} from "@/lib/actions/user.actions";
import { getListType } from "@/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  const myLikedList = await fetchLikedListData(mongoUser._id);
  const likedListJson = JSON.stringify(myLikedList.shows);

  const myWatchedList = await fetchWatchedListData(mongoUser._id);
  const watchedListJson = JSON.stringify(myWatchedList.shows);

  const myWatchLaterList = await fetchWatchLaterListData(mongoUser._id);
  const watchLaterJson = JSON.stringify(myWatchLaterList.shows);

  // console.log(myWatchLaterList);

  // console.log(myWatchLaterList ? "Yes" : "no");

  const hasOtherLists = await isHasOtherLists(mongoUser._id);

  console.log(hasOtherLists);

  return (
    <main className="relative">
      <Header />
      <div className="relative pt-5 md:pt-7 mt-20 pl-4 pb-5 md:pb-24 lg:pl-16 space-y-6 lg:space-y-24">
        <MyListRow
          title="Saved to Watch Later"
          isEmpty={myWatchLaterList ? false : true}
          shows={watchLaterJson}
          expandBtn={myWatchLaterList ? true : false}
          listId={myWatchLaterList._id}
          noListMessage="No shows saved for later add one to show here"
        />

        <MyListRow
          title="You Liked"
          isEmpty={myLikedList ? false : true}
          shows={likedListJson}
          expandBtn={myLikedList ? true : false}
          listId={myLikedList._id}
          noListMessage="No shows added to liked add one to show here"
        />

        <MyListRow
          title="You Watched"
          isEmpty={myWatchedList ? false : true}
          shows={watchedListJson}
          expandBtn={myWatchedList ? true : false}
          listId={myWatchedList._id}
          noListMessage="No shows marked to watched add one to show here"
        />

        <h2>{`${hasOtherLists.length > 0 ? "Other Lists" : "no"}`}</h2>

        {hasOtherLists.length > 0
          ? hasOtherLists.map(async (other: string) => {
              const list = await findListbyId(other);
              const owner = await getUserByMongoId(list.owner);
              return (
                <MyListRow
                  title={`${getListType(list.listType)} By ${owner.name}`}
                  isEmpty={false}
                  shows={JSON.stringify(list.shows)}
                  expandBtn={true}
                  listId={list._id}
                  noListMessage="No shows marked to watched add one to show here"
                />
              );
            })
          : ""}
      </div>
    </main>
  );
}

export default Page;
