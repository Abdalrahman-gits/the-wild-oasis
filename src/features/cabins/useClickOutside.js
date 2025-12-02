import { useEffect, useRef } from "react";

function useClickOutside(fun) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          fun();
        }
      }

      document.addEventListener("click", handleClickOutside, true);

      return () =>
        document.removeEventListener("click", handleClickOutside, true);
    },
    [fun]
  );

  return { ref };
}

export { useClickOutside };
