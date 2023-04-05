import { useEffect } from "react";

export const useScrollHandler = (setIsFetching: any) => {
  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      250
    ) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document?.removeEventListener("scroll", scrollHandler);
    };
  }, []);
};
