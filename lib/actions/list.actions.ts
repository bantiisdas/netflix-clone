"use server";

import List from "../models/list.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Props {
  ownerId: string;
  movieDetails: {
    showId: string;
    type: string;
    name: string;
    posterPath: string;
    backdropPath: string;
  };
}
export async function updateLikedList({ ownerId, movieDetails }: Props) {
  try {
    connectToDB();
    // Find the likedList for the owner
    const likedList = await List.findOne({
      owner: ownerId,
      listType: "likedList",
    });

    if (likedList) {
      // LikedList already exists, so update it with movie details
      likedList.shows.push(movieDetails);
      await likedList.save();
    } else {
      // LikedList doesn't exist, create a new one
      const newLikedList = new List({
        name: "LikedList",
        listType: "likedList",
        owner: ownerId,
        shows: [movieDetails],
      });
      await newLikedList.save();
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error updating likedList:", error);
  }
}
