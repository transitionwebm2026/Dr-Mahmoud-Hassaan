"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

/**
 * Wires a `useActionState` result up to toast notifications: fires a success
 * toast (and an optional callback, typically closing a form panel) the
 * moment a pending submission settles without an error, or an error toast
 * otherwise. Detected via the pending->settled transition rather than the
 * state value alone, since `state` is also `undefined`/error-free before the
 * very first submission.
 */
export function useActionFeedback(
  state: { error?: string } | undefined,
  isPending: boolean,
  successMessage: string,
  onSuccess?: () => void
) {
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !isPending) {
      if (state?.error) {
        toast.error(state.error);
      } else {
        toast.success(successMessage);
        onSuccess?.();
      }
    }
    wasPending.current = isPending;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, state]);
}
