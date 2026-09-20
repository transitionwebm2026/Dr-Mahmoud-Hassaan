"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Phone, Calendar, StickyNote } from "lucide-react";
import { DeleteButton } from "@/components/admin/ui/DeleteButton";
import { updateAppointmentStatus, deleteAppointment } from "@/app/admin/(protected)/appointments/actions";
import type { AppointmentStatus, ContactAppointment } from "@/lib/supabase/types";

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  new: "bg-amber-100 text-amber-700",
  contacted: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
};

function StatusSelect({ id, status }: { id: string; status: AppointmentStatus }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(next: AppointmentStatus) {
    startTransition(async () => {
      const result = await updateAppointmentStatus(id, next);
      if (result?.error) toast.error(result.error);
      else toast.success("Status updated.");
    });
  }

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => handleChange(e.target.value as AppointmentStatus)}
      className={`rounded-full border-0 px-2.5 py-1 text-xs font-bold capitalize outline-none ${STATUS_STYLES[status]} disabled:opacity-60`}
    >
      <option value="new">New</option>
      <option value="contacted">Contacted</option>
      <option value="completed">Completed</option>
    </select>
  );
}

export default function AppointmentsTable({ appointments }: { appointments: ContactAppointment[] }) {
  if (appointments.length === 0) {
    return <p className="glass-card p-8 text-center text-sm text-ink/50">No consultation requests yet.</p>;
  }

  return (
    <div className="space-y-3">
      {appointments.map((row) => (
        <div key={row.id} className="glass-card flex flex-wrap items-start justify-between gap-4 p-5">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <p className="font-bold text-ink">{row.name}</p>
              <StatusSelect id={row.id} status={row.status} />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/60">
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                {row.phone}
              </span>
              {row.specialty && <span>{row.specialty}</span>}
              {row.preferred_date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {row.preferred_date}
                </span>
              )}
            </div>
            {row.notes && (
              <p className="mt-2 flex items-start gap-1.5 text-sm text-ink/70">
                <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/40" />
                {row.notes}
              </p>
            )}
            <p className="mt-2 text-xs text-ink/40">
              Received {new Date(row.created_at).toLocaleString("en-GB")}
            </p>
          </div>
          <DeleteButton action={() => deleteAppointment(row.id)} confirmMessage={`Delete request from "${row.name}"?`} />
        </div>
      ))}
    </div>
  );
}
