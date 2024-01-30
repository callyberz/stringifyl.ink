import { getEditPermission } from "~/app/action";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getEditPermission(params.id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-800 text-white">
      <div className="container flex flex-col items-center justify-center ">
        My Post: {params.id}
        <div>{`Title: ${data?.post?.title}`}</div>
        <div>{`Author: ${data?.post?.author}`}</div>
        <div>{`Content: ${data?.post?.content}`}</div>
      </div>
    </main>
  );
}
