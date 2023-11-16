"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import clipboardCopy from "clipboard-copy";
import link from "next/link";

export function ShareLink({ link }: { link: string }) {
  console.log(link);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PaperAirplaneIcon className="movieDetailsIcons cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#141414] bg-opacity-50">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          {/* <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            {/* <Label htmlFor="link" className="sr-only">
              Link
            </Label> */}
            <Input
              id="link"
              defaultValue={link}
              readOnly
              className="text-black"
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            {/* <span className="sr-only">Copy</span> */}
            <Copy
              className="h-4 w-4"
              onClick={() => {
                clipboardCopy(link);
              }}
            />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
