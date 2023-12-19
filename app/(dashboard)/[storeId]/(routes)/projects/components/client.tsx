"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, ProjectColumn } from "./columns";

interface ProjectClientProps {
  data: ProjectColumn[];
}

export const ProjectClient: React.FC<ProjectClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Projectos (${data.length})`}
          description="Administra los projectos de tu sitio"
        />
        <Button onClick={() => router.push(`/${params.storeId}/projects/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Añadir Projecto
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Projects" />
      <Separator />
      <ApiList entityName="projects" entityIdName="projectId" />
    </>
  );
};
