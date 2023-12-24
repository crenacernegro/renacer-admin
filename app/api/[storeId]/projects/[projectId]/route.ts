import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    if (!params.projectId) {
      return new NextResponse("Project id is required", { status: 400 });
    }

    const project = await prismadb.project.findUnique({
      where: {
        id: params.projectId,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("[PROJECT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.projectId) {
      return new NextResponse("Project id is required", { status: 400 });
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

    const project = await prismadb.project.delete({
      where: {
        id: params.projectId,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("[PROJECT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, description, location, numberOfParticipants, images } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.projectId) {
      return new NextResponse("Project id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (!location) {
      return new NextResponse("Location is required", { status: 400 });
    }
    if (!numberOfParticipants) {
      return new NextResponse("Number of participants is required", {
        status: 400,
      });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
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

    await prismadb.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        name,
        description,
        location,
        numberOfParticipants,
        images: {
          deleteMany: {},
        },
      },
    });

    const project = await prismadb.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("[PROJECT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
