import { format } from "date-fns";
import { ProjectColumn } from "./components/columns";
import { ProjectsClient } from "./components/client";
import prismadb from "@/lib/prismadb";

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
    description: item.description,
    location: item.location,
    numberOfParticipants: item.numberOfParticipants,
    createdAt: format(item.createdAt, "MMMM dd, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProjectsClient data={formattedProjects} />
      </div>
    </div>
  );
};

export default ProjectsPage;
