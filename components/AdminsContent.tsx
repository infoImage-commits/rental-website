"use client";

import { useState } from "react";
import {
  useAdmins,
  useCreateSuperAdmin,
  useDeleteAdmin,
} from "@/lib/hooks/useAdmin";
import { useProfile } from "@/lib/hooks/useAuth";
import type { AdminItem } from "@/lib/types/admin";
import ConfirmModal from "./ConfirmModal";

// ── Form Panel Component ──────────────────────────────────────────────────────
function AdminFormPanel({
  isOpen,
  onClose,
  onSaved,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { mutate: createAdmin, isPending: isSaving } = useCreateSuperAdmin();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const passwordsMatch = password === confirmPassword;
  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    userName.trim() &&
    email.trim() &&
    password &&
    passwordsMatch;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      userName: userName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim() || undefined,
      password,
      confirmPassword,
    };

    createAdmin(payload, {
      onSuccess: () => {
        onSaved();
        // Reset form
        setFirstName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setConfirmPassword("");
      },
    });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dfe8e4] px-6 py-4 bg-[#f5f7f6]">
          <div>
             <h2 className="text-[18px] font-semibold text-[#183c2f]">
               Add Super Admin
             </h2>
             <p className="text-[12px] text-[#667c74] mt-0.5">Creates a user with full system access.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full text-[#8a9a94] transition hover:bg-[#dfe8e4] hover:text-[#183c2f]"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-5">
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                   First Name <span className="text-red-500">*</span>
                 </label>
                 <input
                   type="text"
                   required
                   value={firstName}
                   onChange={(e) => setFirstName(e.target.value)}
                   className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
                 />
               </div>
               <div>
                 <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                   Last Name <span className="text-red-500">*</span>
                 </label>
                 <input
                   type="text"
                   required
                   value={lastName}
                   onChange={(e) => setLastName(e.target.value)}
                   className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
                 />
               </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              />
            </div>

            <div className="pt-2">
               <div className="h-px w-full bg-[#dfe8e4]" />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                 <input
                   type={showPassword ? "text" : "password"}
                   required
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
                 />
                 <button 
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8a9a94] hover:text-[#183c2f]"
                 >
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                       {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                       ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                       )}
                    </svg>
                 </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              />
              {password && confirmPassword && !passwordsMatch && (
                <p className="mt-1.5 text-[12px] font-medium text-red-500">
                  Passwords do not match.
                </p>
              )}
            </div>

          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-[#dfe8e4] p-6 bg-[#f5f7f6]">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-full px-5 py-2.5 text-[14px] font-medium text-[#667c74] transition hover:bg-[#dfe8e4] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !isFormValid}
              className="inline-flex min-w-[100px] items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                "Create Admin"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Page Content ─────────────────────────────────────────────────────────
export default function AdminsContent() {
  const [searchInput, setSearchInput] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<AdminItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: currentUser } = useProfile();
  const { data: admins, isLoading, isError } = useAdmins();
  const { mutate: deleteAdmin } = useDeleteAdmin();

  // Client-side filtering
  const filteredAdmins = admins?.filter((admin) => {
    if (!searchInput) return true;
    const term = searchInput.toLowerCase();
    return (
      admin.fullName.toLowerCase().includes(term) ||
      admin.email.toLowerCase().includes(term) ||
      admin.userName.toLowerCase().includes(term)
    );
  }) ?? [];

  function confirmDelete(id: string) {
    setDeletingId(id);
    deleteAdmin(id, {
      onSettled: () => {
        setDeletingId(null);
        setAdminToDelete(null);
      },
    });
  }

  const totalCount = filteredAdmins.length;

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
            System
          </p>
          <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
            Admins
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Manage users with access to the admin dashboard.
          </p>
        </div>
        <button
          onClick={() => setIsPanelOpen(true)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white transition hover:bg-[#255f49] shadow-sm hover:shadow"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Add Super Admin
        </button>
      </header>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex min-w-[200px] max-w-sm flex-1 items-center gap-2 rounded-xl border border-[#dfe8e4] bg-white px-3 focus-within:border-[#2e6f57] focus-within:ring-2 focus-within:ring-[#2e6f57]/10 transition">
          <svg className="size-4 shrink-0 text-[#8a9a94]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search admins by name or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-10 flex-1 bg-transparent text-[13px] text-[#183c2f] outline-none placeholder:text-[#aab4b0]"
          />
        </div>

        {/* Count Badge */}
        {!isLoading && (
          <span className="rounded-full bg-[#f5f7f6] px-3 py-1 text-[12px] font-medium text-[#667c74]">
            {totalCount} Admin{totalCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Main List Area */}
      <div className="w-full rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)] overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-[#8a9a94] text-[14px]">
            <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
            Loading admins...
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-medium text-[#183c2f]">Failed to load admins</p>
            <p className="mt-1 text-[13px] text-[#667c74]">Check your connection and try again.</p>
          </div>
        ) : !filteredAdmins.length ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-[#f5f7f6] text-[#8a9a94] mb-4">
              <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <p className="text-[16px] font-medium text-[#183c2f]">No admins found</p>
            <p className="mt-1 mb-6 text-[14px] text-[#667c74] max-w-sm">
              {searchInput ? "No admins match your search criteria." : "Get started by adding a new Super Admin."}
            </p>
             {!searchInput && (
               <button
                 onClick={() => setIsPanelOpen(true)}
                 className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-4 text-[13px] font-medium text-white transition hover:bg-[#255f49] shadow-sm"
               >
                 Add Super Admin
               </button>
             )}
          </div>
        ) : (
          <div className="divide-y divide-[#f0f4f2]">
            {filteredAdmins.map((admin) => {
               const isCurrentUser = currentUser?.id === admin.id;

               return (
                 <div
                   key={admin.id}
                   className="group flex flex-col gap-4 p-5 sm:flex-row sm:items-center justify-between transition hover:bg-[#f5f7f6]"
                 >
                   {/* Content */}
                   <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#d9a441] text-[13px] font-bold text-white shadow-sm">
                         {admin.firstName[0].toUpperCase()}{admin.lastName[0].toUpperCase()}
                      </div>
                      
                      <div>
                         <div className="flex items-center gap-2">
                           <h3 className="text-[15px] font-semibold text-[#183c2f]">
                             {admin.fullName}
                           </h3>
                           {isCurrentUser && (
                              <span className="rounded bg-[#f5f7f6] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#2e6f57]">
                                 You
                              </span>
                           )}
                           {!admin.isActive && (
                              <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-600">
                                 Inactive
                              </span>
                           )}
                         </div>
                         <div className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#667c74]">
                           <span className="flex items-center gap-1.5">
                             <svg className="size-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                             </svg>
                             {admin.email}
                           </span>
                           {admin.phoneNumber && (
                              <span className="flex items-center gap-1.5">
                                <svg className="size-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                                {admin.phoneNumber}
                              </span>
                           )}
                           <span className="flex items-center gap-1.5 font-medium text-[#d9a441]">
                             <svg className="size-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                             </svg>
                             {admin.roles.join(", ")}
                           </span>
                         </div>
                      </div>
                   </div>

                   {/* Actions */}
                   <div className="flex items-center gap-2 sm:opacity-0 transition-opacity group-hover:opacity-100 mt-2 sm:mt-0">
                     <button
                       onClick={() => setAdminToDelete(admin)}
                       disabled={deletingId === admin.id || isCurrentUser}
                       title={isCurrentUser ? "You cannot delete your own account" : "Delete Admin"}
                       className="flex h-8 items-center gap-1.5 rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed"
                     >
                        {deletingId === admin.id ? (
                           <span className="size-3.5 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />
                         ) : (
                           <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                           </svg>
                         )}
                       Delete
                     </button>
                   </div>
                 </div>
               );
            })}
          </div>
        )}
      </div>

      {/* Create Panel */}
      <AdminFormPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onSaved={() => setIsPanelOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!adminToDelete}
        title="Delete Admin"
        message={`Are you sure you want to delete ${adminToDelete?.fullName} (${adminToDelete?.email})? This action cannot be undone and will permanently revoke their access.`}
        confirmText="Delete Admin"
        onConfirm={() => adminToDelete && confirmDelete(adminToDelete.id)}
        onCancel={() => setAdminToDelete(null)}
        isPending={deletingId === adminToDelete?.id}
      />
    </div>
  );
}
