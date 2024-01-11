import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { title, content, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }
    if (!content) {
      return new NextResponse("Content is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const post = await prismadb.post.create({
      data: {
        title,
        content,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POSTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const posts = await prismadb.post.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.log("[POSTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
