import Transition from "@jsee_dev/react-transition";
import React, { ReactElement, RefObject, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface ModalTemplateProps {
  elementRef?: RefObject<HTMLDivElement>;
  rootElementId: string;
  animationClassPrefix?: string;
  animationTimeout?: number | [number, number];
  children: ReactElement;
  onUnmounted?: () => void;
  onMount?: () => void;
  onMounted?: () => void;
  onUnmount?: () => void;
  trigger: boolean;
  handleCloseOnEscape?: (event?: KeyboardEvent) => void;
  bypassAnim?: boolean;
}

const ModalTemplate: React.FC<ModalTemplateProps> = ({
  elementRef,
  rootElementId,
  trigger,
  animationClassPrefix,
  animationTimeout,
  children,
  handleCloseOnEscape,
  onUnmounted,
  onMount,
  onMounted,
  onUnmount,
  bypassAnim = false,
}) => {
  const handleKeydown = (event: KeyboardEvent) => event.key === "Escape" && !!handleCloseOnEscape && handleCloseOnEscape(event);
  const [delayedTrigger, setDelayedTrigger] = useState(false);

  useEffect(() => {
    if (trigger) {
      setDelayedTrigger(true);
      if (handleCloseOnEscape) window.addEventListener("keydown", handleKeydown);
    } else {
      setTimeout(
        () => {
          setDelayedTrigger(false);
        },
        animationTimeout ? (Array.isArray(animationTimeout) ? animationTimeout[1] : animationTimeout) : 0
      );
      if (handleCloseOnEscape) window.removeEventListener("keydown", handleKeydown);
    }
  }, [trigger]);

  return delayedTrigger
    ? createPortal(
        <Transition
          elementRef={elementRef}
          classPrefix={animationClassPrefix}
          timeout={animationTimeout}
          trigger={trigger}
          onUnmounted={onUnmounted}
          onMount={onMount}
          onMounted={onMounted}
          onUnmount={onUnmount}
          bypass={bypassAnim}
        >
          {children}
        </Transition>,
        document.getElementById(rootElementId)!
      )
    : null;
};

export default ModalTemplate;
