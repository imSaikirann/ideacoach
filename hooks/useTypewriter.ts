import { useEffect, useState } from "react";

export function useTypewriter(text = "", speed = 18) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!text) return;

    let i = 0;
    setOutput("");

    const interval = setInterval(() => {
      i++;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return output;
}
