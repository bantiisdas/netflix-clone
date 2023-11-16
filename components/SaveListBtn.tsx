"use client";

import { saveList } from "@/lib/actions/user.actions";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface Props {
  BtnText?: string;
  hidden: boolean;
  userId: string;
  listId: string;
}

const SaveListBtn = ({ BtnText, hidden, userId, listId }: Props) => {
  const handleClick = async () => {
    const listSaved = await saveList(userId, listId);
    if (listSaved) {
      toast.success("List saved successfully");
    } else {
      toast.warning("Failed to save the list");
    }
  };

  return (
    <div className={`${hidden ? "hidden" : ""} `} onClick={handleClick}>
      <Button className="text-sm md:text-base font-semibold">{BtnText}</Button>
    </div>
  );
};

export default SaveListBtn;
