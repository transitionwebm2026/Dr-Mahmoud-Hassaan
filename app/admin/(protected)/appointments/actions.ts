"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { AppointmentStatus } from "@/lib/supabase/types";

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<{ error?: string }> {
  if (!["new", "contacted", "completed"].includes(status)) {
    return { error: "Invalid status." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_appointments").update({ status }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/pages/contact");
  revalidatePath("/admin");
  return {};
}

export async function deleteAppointment(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_appointments").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/pages/contact");
  revalidatePath("/admin");
  return {};
}
