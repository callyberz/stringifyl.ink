"use client";

import { useFormStatus } from "react-dom";

export function FormButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}
