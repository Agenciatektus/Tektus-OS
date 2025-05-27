import { useEffect, useRef } from "react";
import { getPaddleInstance } from "@paddle/paddle-js";

export function usePaddle() {
  const paddleRef = useRef<unknown>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !paddleRef.current) {
      paddleRef.current = getPaddleInstance(
        process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || "sandbox",
        process.env.NEXT_PUBLIC_PADDLE_TOKEN
      );
    }
  }, []);

  return paddleRef.current as ReturnType<typeof getPaddleInstance> | null;
} 