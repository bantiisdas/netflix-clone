"use client";

import { saveList } from "@/lib/actions/user.actions";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { isInOtherLists, removeOtherList } from "@/lib/actions/list.actions";

interface Props {
  BtnText?: string;
  hidden: boolean;
  userId: string;
  listId: string;
}

const SaveListBtn = ({ BtnText, hidden, userId, listId }: Props) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedOrNot = async () => {
      const saved = await isInOtherLists({
        userId: userId,
        listId: listId,
      });
      setIsSaved(saved ? true : false);
    };
    savedOrNot();
  }, []);

  const handleClick = async () => {
    if (isSaved) {
      const remove = await removeOtherList({ userId: userId, listId: listId });
      if (remove) {
        setIsSaved(false);
        toast.success("List removed successfully");
      } else {
        toast.warning("Failed to remove the list");
      }
    } else {
      const listSaved = await saveList(userId, listId);
      if (listSaved) {
        setIsSaved(true);
        toast.success("List saved successfully");
      } else {
        toast.warning("Failed to save the list");
      }
    }
  };

  return (
    <div className={`${hidden ? "hidden" : ""} `} onClick={handleClick}>
      <Button className="text-sm md:text-base font-semibold">
        {isSaved ? "Remove this List" : "Save this List"}
      </Button>
    </div>
  );
};

export default SaveListBtn;
