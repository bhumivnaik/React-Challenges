import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
    const [value, setValue] = useState<T>(() => {
        try {

            const data = localStorage.getItem(key);
            if (data == null) {
                return initialValue;
            }
            const response = JSON.parse(data) as T;
            return response;
        } catch {
            return initialValue;
        }
    });

    function setStoredValue(newValue: T | ((prev: T) => T)) {
        setValue((prev) => {
            const valueToStore =
                newValue instanceof Function
                    ? newValue(prev)
                    : newValue;
            try {
                localStorage.setItem(
                    key,
                    JSON.stringify(valueToStore)
                );
            } catch {
                // Ignore localStorage write errors
            }

            return valueToStore;
        });
    }
    return [value, setStoredValue];
}
