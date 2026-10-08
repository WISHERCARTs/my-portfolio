import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * False during SSR and the first client render, true afterwards. Used where the
 * theme is only known after hydration so the toggle icon doesn't mismatch.
 */
export function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
