import { Modal } from "../ui/Modal";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
  const handleDelete = async () => {
    try {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
      });
      if (response.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-xl font-semibold mb-4">Delete Account</h3>
      <p className="text-[var(--text-secondary)] mb-6">
        Are you sure? This action cannot be undone and will permanently delete your account and all saved
        themes.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-[var(--card-border)] hover:bg-[var(--card-background)]"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </Modal>
  );
}
