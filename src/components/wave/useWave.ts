import { useCallback, useEffect, useRef } from "react";

// react-component util/src/hooks/useEvent.ts
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function useEvent<T extends Function>(callback: T): T {
  const fnRef = useRef<T>(callback);
  useEffect(() => {
    fnRef.current = callback;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useCallback(((...args: any) => fnRef.current?.(...args)) as any, []);
}

function requestAnimationFramePolyfill(callback: FrameRequestCallback) {
  return window.requestAnimationFrame
    ? window.requestAnimationFrame(callback)
    : setTimeout(callback, 16); // 60 fps
}

function isElementVisible(element: HTMLElement) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

const genWave = ({ className }: { className: string }) => {
  const waveDiv = document.createElement("div");
  waveDiv.className = className;
  waveDiv.style.boxShadow = `0 0 0 6px currentcolor`;
  waveDiv.style.borderRadius = "inherit";
  waveDiv.style.position = "absolute";
  waveDiv.style.pointerEvents = "none";
  return waveDiv;
};

const useWave = (
  nodeRef: React.RefObject<HTMLElement | null>,
  className: string
) => {
  const showWave = useEvent(() => {
    const target = nodeRef.current;
    if (!target || !isElementVisible(target)) return;

    const waveDiv = genWave({ className });
    target.appendChild(waveDiv);

    setTimeout(() => {
      waveDiv.style.opacity = "0";
      setTimeout(() => target.removeChild(waveDiv), 300);
    }, 200);
  });

  return () => {
    requestAnimationFramePolyfill(() => {
      showWave();
    });
  };
};

export default useWave;
