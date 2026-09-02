"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider, MutationCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster, toast } from "sonner";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    mutationCache: new MutationCache({
      onSuccess: (data: any, _variables, _context, mutation) => {
        // Automatically show toast if the API response includes a message
        if (data?.message) {
          toast.success(data.message);
        } else if (mutation.meta?.successMessage) {
          toast.success(mutation.meta.successMessage as string);
        }
      },
      onError: (error: any, _variables, _context, mutation) => {
        if (mutation.meta?.hideErrorToast) return;
        const msg = error?.response?.data?.errors?.[0] || error?.response?.data?.message || error.message || "An error occurred";
        toast.error(msg);
      }
    })
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
