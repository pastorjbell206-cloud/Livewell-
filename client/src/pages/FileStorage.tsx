import Layout from "@/components/Layout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import {
  Upload,
  FileText,
  Image,
  Film,
  Music,
  Archive,
  File,
  Trash2,
  Download,
  Pencil,
  Check,
  X,
  Loader2,
  CloudUpload,
  HardDrive,
} from "lucide-react";

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith("image/")) return <Image size={20} style={{ color: "#2D4A3E" }} />;
  if (mimeType.startsWith("video/")) return <Film size={20} style={{ color: "#B8963E" }} />;
  if (mimeType.startsWith("audio/")) return <Music size={20} style={{ color: "#2C3E50" }} />;
  if (mimeType.includes("pdf")) return <FileText size={20} style={{ color: "#C0392B" }} />;
  if (mimeType.includes("zip") || mimeType.includes("tar") || mimeType.includes("rar"))
    return <Archive size={20} style={{ color: "#6B7280" }} />;
  return <File size={20} style={{ color: "#6B7280" }} />;
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function FileRow({
  file,
  onDelete,
  onUpdateDescription,
}: {
  file: {
    id: number;
    filename: string;
    url: string;
    mimeType: string;
    size: number;
    description: string | null;
    createdAt: Date;
  };
  onDelete: (id: number) => void;
  onUpdateDescription: (id: number, desc: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [desc, setDesc] = useState(file.description ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSaveDesc = () => {
    onUpdateDescription(file.id, desc);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setDesc(file.description ?? "");
    setEditing(false);
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    onDelete(file.id);
    setConfirmDelete(false);
  };

  const isImage = file.mimeType.startsWith("image/");

  return (
    <div
      className="p-5 transition-all duration-200"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #D1C9BB",
      }}
    >
      <div className="flex items-start gap-4">
        {/* Thumbnail or icon */}
        <div
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-sm overflow-hidden"
          style={{ backgroundColor: "#F7F5F0", border: "1px solid #D1C9BB" }}
        >
          {isImage ? (
            <img
              src={file.url}
              alt={file.filename}
              className="w-full h-full object-cover"
            />
          ) : (
            getFileIcon(file.mimeType)
          )}
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3
              className="font-ui text-sm font-semibold truncate"
              style={{ color: "#1A1A1A" }}
              title={file.filename}
            >
              {file.filename}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="meta-label">{formatFileSize(file.size)}</span>
            <span className="meta-label">{file.mimeType}</span>
            <span className="meta-label">{formatDate(file.createdAt)}</span>
          </div>

          {/* Description */}
          {editing ? (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Add a description..."
                className="flex-1 px-3 py-1.5 font-ui text-sm border"
                style={{ borderColor: "#D1C9BB", color: "#1A1A1A" }}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveDesc();
                  if (e.key === "Escape") handleCancelEdit();
                }}
              />
              <button
                onClick={handleSaveDesc}
                className="p-1.5 transition-colors"
                style={{ color: "#2D4A3E" }}
                title="Save"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1.5 transition-colors"
                style={{ color: "#6B7280" }}
                title="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-1">
              <p
                className="font-body text-sm"
                style={{
                  color: file.description ? "#2C3E50" : "#6B7280",
                  marginBottom: 0,
                  fontStyle: file.description ? "normal" : "italic",
                }}
              >
                {file.description || "No description"}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="p-1 transition-colors"
                style={{ color: "#6B7280" }}
                title="Edit description"
              >
                <Pencil size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 transition-colors rounded-sm"
            style={{ color: "#2C3E50", backgroundColor: "#F7F5F0" }}
            title="Download"
          >
            <Download size={16} />
          </a>
          <button
            onClick={handleDelete}
            className="p-2 transition-colors rounded-sm"
            style={{
              color: confirmDelete ? "#FFFFFF" : "#6B7280",
              backgroundColor: confirmDelete ? "#C0392B" : "#F7F5F0",
            }}
            title={confirmDelete ? "Click again to confirm" : "Delete"}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FileStorage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const utils = trpc.useUtils();

  const filesQuery = trpc.files.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const uploadMutation = trpc.files.upload.useMutation({
    onSuccess: () => {
      utils.files.list.invalidate();
      toast.success("File uploaded successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Upload failed");
    },
  });

  const deleteMutation = trpc.files.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.files.list.cancel();
      const prev = utils.files.list.getData();
      utils.files.list.setData(undefined, (old) =>
        old ? old.filter((f) => f.id !== id) : []
      );
      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) utils.files.list.setData(undefined, context.prev);
      toast.error("Failed to delete file");
    },
    onSettled: () => {
      utils.files.list.invalidate();
    },
    onSuccess: () => {
      toast.success("File deleted");
    },
  });

  const updateDescMutation = trpc.files.updateDescription.useMutation({
    onSuccess: () => {
      utils.files.list.invalidate();
      toast.success("Description updated");
    },
    onError: () => {
      toast.error("Failed to update description");
    },
  });

  const handleFileUpload = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      setUploading(true);
      try {
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i];
          if (file.size > 16 * 1024 * 1024) {
            toast.error(`${file.name} exceeds 16MB limit`);
            continue;
          }

          const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              // Strip the data URL prefix to get raw base64
              const base64 = result.split(",")[1];
              resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          await uploadMutation.mutateAsync({
            filename: file.name,
            mimeType: file.type || "application/octet-stream",
            base64Data,
          });
        }
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [uploadMutation]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFileUpload(e.dataTransfer.files);
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  // Not logged in state
  if (!authLoading && !isAuthenticated) {
    return (
      <Layout>
        <section className="py-24" style={{ backgroundColor: "#F7F5F0" }}>
          <div className="container">
            <div className="max-w-xl mx-auto text-center">
              <HardDrive size={48} style={{ color: "#B8963E" }} className="mx-auto mb-6" />
              <h1
                className="font-display font-bold mb-4"
                style={{ color: "#1A1A1A", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                File Storage
              </h1>
              <p className="font-body mb-8" style={{ color: "#2C3E50" }}>
                Sign in to upload, manage, and access your files securely. All files are stored in the cloud with instant access.
              </p>
              <a
                href={getLoginUrl()}
                className="inline-flex items-center gap-2 px-7 py-3.5 font-ui text-sm font-medium no-underline transition-all duration-200"
                style={{ backgroundColor: "#1A1A1A", color: "#F7F5F0" }}
              >
                Sign In to Continue
              </a>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const filesList = filesQuery.data ?? [];
  const totalSize = filesList.reduce((sum, f) => sum + f.size, 0);

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-16 pb-12" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="container">
          <div className="max-w-3xl">
            <div
              className="font-ui text-xs font-medium uppercase tracking-[0.15em] mb-4"
              style={{ color: "#B8963E" }}
            >
              File Storage
            </div>
            <h1
              className="font-display font-bold mb-4"
              style={{ color: "#1A1A1A", fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
            >
              Your files, securely stored
            </h1>
            <p className="font-body text-lg" style={{ color: "#2C3E50", lineHeight: 1.8 }}>
              Upload, organize, and access your files from anywhere. All files are stored securely in the cloud.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <span className="meta-label">{filesList.length} files</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="meta-label">{formatFileSize(totalSize)} total</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-rule container" style={{ margin: "0 auto" }} />

      {/* Upload Zone */}
      <section className="py-8" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="container">
          <div
            className="relative p-8 text-center transition-all duration-200 rounded-sm"
            style={{
              border: `2px dashed ${dragOver ? "#B8963E" : "#D1C9BB"}`,
              backgroundColor: dragOver ? "rgba(184,150,62,0.05)" : "#FFFFFF",
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />

            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 size={32} className="animate-spin" style={{ color: "#B8963E" }} />
                <p className="font-ui text-sm font-medium" style={{ color: "#1A1A1A" }}>
                  Uploading...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <CloudUpload size={32} style={{ color: "#B8963E" }} />
                <div>
                  <p className="font-ui text-sm font-medium mb-1" style={{ color: "#1A1A1A" }}>
                    Drag and drop files here, or{" "}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="font-medium underline"
                      style={{ color: "#B8963E" }}
                    >
                      browse
                    </button>
                  </p>
                  <p className="font-ui text-xs" style={{ color: "#6B7280" }}>
                    Maximum file size: 16MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Files List */}
      <section className="pb-24" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="container">
          {authLoading || filesQuery.isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={24} className="animate-spin" style={{ color: "#B8963E" }} />
              <span className="ml-3 font-ui text-sm" style={{ color: "#6B7280" }}>
                Loading files...
              </span>
            </div>
          ) : filesList.length === 0 ? (
            <div className="text-center py-16">
              <Upload size={40} style={{ color: "#D1C9BB" }} className="mx-auto mb-4" />
              <p className="font-body text-lg mb-2" style={{ color: "#6B7280" }}>
                No files yet
              </p>
              <p className="font-body text-sm" style={{ color: "#6B7280" }}>
                Upload your first file using the area above.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filesList.map((file) => (
                <FileRow
                  key={file.id}
                  file={file}
                  onDelete={(id) => deleteMutation.mutate({ id })}
                  onUpdateDescription={(id, description) =>
                    updateDescMutation.mutate({ id, description })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
