"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { db } from "~/server/db";

const schema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
  user: z.string(),
});

export async function getEditPermission(postId?: string) {
  const userFromCookies = cookies().get("user");
  if (!userFromCookies) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    cookies().set("user", uuidv4());
    return;
  }
  console.log("GGGGG ", userFromCookies.value);

  const post = await db.post.findUnique({
    where: {
      id: postId ?? "",
      createdBy: userFromCookies.value,
    },
  });

  return {
    post,
  };
}

export async function createPost(formData: FormData) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user = cookies().get("user");
  const validatedFields = schema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    author: formData.get("author"),
    user: user?.value ?? "",
  });

  if (!validatedFields.success) {
    return {
      status: 400,
      body: {
        message: validatedFields.error.flatten().fieldErrors,
      },
    };
  }

  const { data } = validatedFields;
  const post = await db.post.create({
    data: {
      title: data.title,
      author: data.author,
      content: data.content,
      createdBy: data.user,
    },
  });

  if (!post) {
    throw new Error("Post not created");
  }

  redirect(`/post/${post.id}`);
}
