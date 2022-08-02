import { useRef } from "react";

const useInput = () => {
  const inputRef = useRef(null);
  return { inputRef };
};
