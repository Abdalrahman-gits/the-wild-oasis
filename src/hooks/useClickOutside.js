import { useEffect, useRef } from "react";

function useClickOutside(fun, isBubbling = true) {
  // to attach it with the target element
  const ref = useRef();

  useEffect(
    function () {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          // Responsible for closing
          fun();
        }
      }

      document.addEventListener("click", handleClickOutside, isBubbling);

      return () =>
        document.removeEventListener("click", handleClickOutside, isBubbling);
    },
    [fun, isBubbling]
  );

  return { ref };
}

export { useClickOutside };
