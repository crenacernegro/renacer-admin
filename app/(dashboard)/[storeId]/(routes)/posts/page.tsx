import { format } from "date-fns";
import { PostColumn } from "./components/columns";
import { PostsClient } from "./components/client";
import prismadb from "@/lib/prismadb";

const PostsPage = async ({ params }: { params: { storeId: string } }) => {
  const posts = await prismadb.post.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedPosts: PostColumn[] = posts.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    createdAt: format(item.createdAt, "MMMM dd, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PostsClient data={formattedPosts} />
      </div>
    </div>
  );
};

export default PostsPage;
