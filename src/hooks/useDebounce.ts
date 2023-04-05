export const useDebounce = (func: any, timeout: any) => {
  let timer: any;
  return (e: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(e);
    }, timeout);
  };
};
