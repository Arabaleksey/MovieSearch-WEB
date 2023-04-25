import { useCallback, useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  const onClickDocument = useCallback(
    (e: any) => {
      if (!ref?.current) {
        return;
      }

      if (ref?.current && !ref?.current.contains(e.target)) {
        callback();
      }
    },
    [ref]
  );

  useEffect(() => {
    document.addEventListener("click", onClickDocument);

    return () => {
      document.removeEventListener("click", onClickDocument);
    };
  }, [ref]);
};
