"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import User from "../models/user.model";
import List from "../models/list.model";
import { connectToDB } from "../mongoose";
import { findListbyId } from "./list.actions";

export async function getUserById(params: any) {
  try {
    connectToDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserByMongoId(mongoId: string) {
  try {
    connectToDB();

    const user = await User.findById(mongoId);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDB();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface UpdateUserParams {
  clerkId: string;
  updateData: {
    name: string;
    username: string;
    email: string;
    picture: string;
  };
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDB();

    const { clerkId, updateData } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    // revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface DeleteeUserParams {
  clerkId: string;
}

export async function deleteUser(params: DeleteeUserParams) {
  try {
    connectToDB();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    await List.deleteMany({ owner: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;

    // revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function saveList(userId: string, listId: string) {
  try {
    connectToDB();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.otherLists.push(listId);

    const list = await findListbyId(listId);

    list.hasAcess.push(userId);

    await user.save();
    await list.save();
    return true;
  } catch (error) {
    throw error;
  }
}

export async function isHasOtherLists(userId: string) {
  try {
    connectToDB();
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const hasOtherlist = user.otherLists;

    return hasOtherlist;
  } catch (error) {
    throw error;
  }
}
