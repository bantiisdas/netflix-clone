import Header from "@/components/Header";
import MyListRow from "@/components/MyListRow";
import {
  fetchLikedListData,
  fetchWatchLaterListData,
  fetchWatchedListData,
} from "@/lib/actions/list.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  const myLikedList = await fetchLikedListData(mongoUser._id);
  const likedListJson = JSON.stringify(myLikedList);

  const myWatchedList = await fetchWatchedListData(mongoUser._id);
  const watchedListJson = JSON.stringify(myWatchedList);

  const myWatchLaterList = await fetchWatchLaterListData(mongoUser._id);
  const watchLaterJson = JSON.stringify(myWatchLaterList);

  // console.log(likedListJson);

  return (
    <main className="relative">
      <Header />
      <div className="relative pt-5 md:pt-7 mt-20 pl-4 pb-5 md:pb-24 lg:pl-16 lg:space-y-24">
        <MyListRow
          title="Saved to Watch Later"
          shows={watchLaterJson}
          seeMoreBtn={false}
        />
        <MyListRow title="You Liked" shows={likedListJson} seeMoreBtn={false} />
        <MyListRow
          title="You Watched"
          shows={watchedListJson}
          seeMoreBtn={false}
        />
      </div>
    </main>
  );
}

export default Page;
