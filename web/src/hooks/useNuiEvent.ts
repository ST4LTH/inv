import { MutableRefObject, useEffect, useRef } from "react";

interface NuiMessageData<T = unknown> {
  type: string;
  data: T;
}

type NuiHandlerSignature<T> = (data: T) => void;

export const noop = () => {};

export const useNuiEvent = <T = unknown>(
  type: string,
  handler: (data: T) => void,
) => {
  const savedHandler: MutableRefObject<NuiHandlerSignature<T>> = useRef(noop);
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: MessageEvent<NuiMessageData<T>>) => {
      const { type: eventType, data } = event.data;

      if (savedHandler.current) {
        if (eventType === type) {
          savedHandler.current(data);
        }
      }
    };

    window.addEventListener("message", eventListener);
    return () => window.removeEventListener("message", eventListener);
  }, [type]);
};