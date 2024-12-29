import { Modal } from "./ui/Modal";
import { useState } from "react";

interface SaveThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => Promise<void>;
}

export function SaveThemeModal({ isOpen, onClose, onSave }: SaveThemeModalProps) {
  const [name, setName] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Save Theme</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Theme name"
          className="w-full p-2 border rounded bg-[var(--input-background)]"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={async () => {
              await onSave(name);
              setName("");
              onClose();
            }}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
