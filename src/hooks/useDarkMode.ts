import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "darkMode";
const DARK_CLASS = "dark-mode";
const LIGHT_CLASS = "light-mode";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

function applyDarkMode(enabled: boolean) {
  const root = document.documentElement;
  root.classList.toggle(DARK_CLASS, enabled);
  root.classList.toggle(LIGHT_CLASS, !enabled);
  root.style.colorScheme = enabled ? "dark" : "light";
}

function readStoredPreference(): boolean | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "true" ? true : value === "false" ? false : null;
  } catch {
    return null;
  }
}

function storePreference(enabled: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(enabled));
  } catch {
    // The selected theme still applies when storage is unavailable.
  }
}

export function useDarkMode() {
  // Keep the server and initial client render identical. The actual preference
  // is resolved after hydration, when browser APIs are available.
  const [value, setValue] = useState(false);
  const hasManualPreference = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_MODE_QUERY);
    const storedPreference = readStoredPreference();
    const initialValue = storedPreference ?? mediaQuery.matches;

    hasManualPreference.current = storedPreference !== null;
    setValue(initialValue);
    applyDarkMode(initialValue);

    const followSystemPreference = (event: MediaQueryListEvent) => {
      if (!hasManualPreference.current) {
        setValue(event.matches);
        applyDarkMode(event.matches);
      }
    };

    mediaQuery.addEventListener("change", followSystemPreference);
    return () => mediaQuery.removeEventListener("change", followSystemPreference);
  }, []);

  const toggle = useCallback(() => {
    setValue((currentValue) => {
      const nextValue = !currentValue;
      hasManualPreference.current = true;
      storePreference(nextValue);
      applyDarkMode(nextValue);
      return nextValue;
    });
  }, []);

  return { value, toggle };
}
