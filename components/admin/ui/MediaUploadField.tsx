"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Image as ImageIcon, Loader2, Upload, Video as VideoIcon, X } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { FieldLabel } from "@/components/admin/ui/FormControls";

const BUCKET = "media";

type MediaKind = "image" | "video";

const ACCEPT: Record<MediaKind, string> = {
  image: "image/png,image/jpeg,image/webp,image/gif,image/svg+xml",
  video: "video/mp4,video/webm,video/quicktime",
};

const MAX_SIZE_MB: Record<MediaKind, number> = {
  image: 15,
  video: 300,
};

/**
 * Drop-in replacement for a `type="url"` TextInput on a media field: uploads
 * the chosen file straight to Supabase Storage's public "media" bucket from
 * the browser (bypassing the Server Action 1MB body limit) and stores the
 * resulting public URL in a hidden input under `name`, so the surrounding
 * form/Server Action needs no changes.
 */
export function MediaUploadField({
  name,
  label,
  kind,
  defaultValue,
  required,
  folder = kind === "image" ? "images" : "videos",
}: {
  name: string;
  label: string;
  kind: MediaKind;
  defaultValue?: string | null;
  required?: boolean;
  folder?: string;
}) {
  const id = useId();
  const hiddenRef = useRef<HTMLInputElement>(null);
  const uploadingRef = useRef(false);
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const form = hiddenRef.current?.form;
    if (!form) return;
    const blockWhileUploading = (e: Event) => {
      if (uploadingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        toast.error("Please wait for the upload to finish before saving.");
      }
    };
    form.addEventListener("submit", blockWhileUploading, true);
    return () => form.removeEventListener("submit", blockWhileUploading, true);
  }, []);

  async function handleFile(file: File) {
    if (!file.type.startsWith(`${kind}/`)) {
      toast.error(`Choose a ${kind} file.`);
      return;
    }
    const maxBytes = MAX_SIZE_MB[kind] * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error(`File is too large (max ${MAX_SIZE_MB[kind]}MB).`);
      return;
    }

    uploadingRef.current = true;
    setUploading(true);

    const ext = file.name.includes(".") ? file.name.split(".").pop() : kind === "image" ? "jpg" : "mp4";
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;

    const supabase = createClient();
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    uploadingRef.current = false;
    setUploading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    setUrl(data.publicUrl);
  }

  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <input ref={hiddenRef} type="hidden" name={name} value={url} readOnly />

      <div className="flex items-center gap-3">
        {url ? (
          <div className="relative shrink-0">
            {kind === "image" ? (
              // Admin preview only — next/image isn't worth it for a small thumbnail here.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt="" className="h-16 w-16 rounded-lg border border-ink/10 object-cover" />
            ) : (
              <video src={url} className="h-16 w-28 rounded-lg border border-ink/10 bg-black object-cover" muted />
            )}
            <button
              type="button"
              onClick={() => setUrl("")}
              className="absolute -end-2 -top-2 rounded-full bg-ink/80 p-1 text-white transition hover:bg-rose-500"
              aria-label="Remove"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-ink/20 text-ink/30">
            {kind === "image" ? <ImageIcon className="h-6 w-6" /> : <VideoIcon className="h-6 w-6" />}
          </div>
        )}

        <label
          htmlFor={id}
          className={`btn-outline-glass inline-flex cursor-pointer items-center gap-2 !py-2 !px-4 text-xs ${
            uploading ? "pointer-events-none opacity-60" : ""
          }`}
        >
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          {uploading ? "Uploading..." : url ? "Replace file" : "Choose file"}
          <input
            id={id}
            type="file"
            accept={ACCEPT[kind]}
            disabled={uploading}
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (file) handleFile(file);
            }}
          />
        </label>
      </div>
    </div>
  );
}
