"use client";

import { useId } from "react";

export function usePrefixedId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}
