import format from "date-fns/format";

import prismadb from "@/lib/prismadb";

import { ProjectColumn } from "./components/columns";
import { ProjectClient } from "./components/client";

const ProjectsPage = async ({ params }: { params: { storeId: string } }) => {
  const projects = await prismadb.project.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProjects: ProjectColumn[] = projects.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProjectClient data={formattedProjects} />
      </div>
    </div>
  );
};

export default ProjectsPage;
