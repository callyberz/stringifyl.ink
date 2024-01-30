"use client";

import { useEffect } from "react";
// import { useFormStatus } from "react-dom";
import { createPost, getEditPermission } from "~/app/action";
import { FormButton } from "./FormButton";

export const Form = () => {
  // const state = useFormStatus();

  useEffect(() => {
    const getPermission = async () => {
      await getEditPermission();
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getPermission();
  }, []);

  return (
    <form action={createPost}>
      <div className="flex gap-4">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" className="bg-slate-500" required />
      </div>
      <div className="flex gap-4">
        <label htmlFor="title">Author</label>
        <input type="text" name="author" className="bg-slate-500" required />
      </div>
      <div className="flex gap-4">
        <label htmlFor="content">Content</label>
        <input type="text" name="content" className="bg-slate-500" required />
      </div>

      <FormButton />
    </form>
  );
};
