import AdminLayout from "@/components/AdminLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Trash2, Edit2, Plus, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function AdminResources() {
  const resourcesQuery = trpc.resources.listAll.useQuery();
  const deleteResourceMutation = trpc.resources.delete.useMutation();
  const updateResourceMutation = trpc.resources.update.useMutation();

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this resource?")) return;
    try {
      await deleteResourceMutation.mutateAsync({ id });
      toast.success("Resource deleted");
      resourcesQuery.refetch();
    } catch (err) {
      toast.error("Failed to delete resource");
    }
  };

  const handleTogglePublish = async (resource: any) => {
    try {
      await updateResourceMutation.mutateAsync({
        id: resource.id,
        published: !resource.published,
      });
      toast.success(resource.published ? "Resource unpublished" : "Resource published");
      resourcesQuery.refetch();
    } catch (err) {
      toast.error("Failed to update resource");
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
              Resources
            </h1>
            <p className="font-body" style={{ color: "#6B7280" }}>
              Manage downloadable resources and study materials
            </p>
          </div>
          <Link
            href="/admin/resources/new"
            className="flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline"
            style={{ backgroundColor: "#2D4A3E", color: "#F7F5F0" }}
          >
            <Plus size={16} /> New Resource
          </Link>
        </div>

        {resourcesQuery.isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin" style={{ color: "#B8963E" }} />
          </div>
        ) : resourcesQuery.data?.length === 0 ? (
          <div className="text-center py-12" style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
            <p className="font-body mb-4" style={{ color: "#6B7280" }}>
              No resources yet. Create your first resource.
            </p>
            <Link
              href="/admin/resources/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline"
              style={{ backgroundColor: "#2D4A3E", color: "#F7F5F0" }}
            >
              <Plus size={16} /> Create Resource
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {resourcesQuery.data?.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: "#FFFFFF", borderLeft: `4px solid ${resource.published ? "#2D4A3E" : "#D1C9BB"}` }}
              >
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold mb-1" style={{ color: "#1A1A1A" }}>
                    {resource.title}
                  </h3>
                  <div className="flex items-center gap-3 font-ui text-sm" style={{ color: "#6B7280" }}>
                    <span>{resource.category || "Uncategorized"}</span>
                    <span>•</span>
                    <span>{resource.fileType || "—"}</span>
                    <span>•</span>
                    <span>{resource.published ? "Published" : "Draft"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePublish(resource)}
                    className="p-2 rounded transition-colors"
                    style={{ backgroundColor: "#F0F0F0", color: "#6B7280" }}
                  >
                    {resource.published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  <Link
                    href={`/admin/resources/${resource.id}/edit`}
                    className="p-2 rounded transition-colors no-underline"
                    style={{ backgroundColor: "#F0F0F0", color: "#6B7280" }}
                  >
                    <Edit2 size={16} />
                  </Link>

                  <button
                    onClick={() => handleDelete(resource.id)}
                    className="p-2 rounded transition-colors"
                    style={{ backgroundColor: "#F0F0F0", color: "#DC2626" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
