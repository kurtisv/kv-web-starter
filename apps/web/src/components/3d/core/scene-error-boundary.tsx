import * as React from "react";
import { FallbackVisual, type FallbackVisualType } from "../fallback-visual";

interface Props {
  children: React.ReactNode;
  fallbackType?: FallbackVisualType;
  /** className forwarded to FallbackVisual (e.g. "absolute inset-0") */
  fallbackClassName?: string;
}

interface State {
  hasError: boolean;
}

/**
 * Wraps a Three.js / R3F scene and catches any render-phase errors.
 * On error, renders FallbackVisual instead of a blank page or React crash.
 */
export class SceneErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[3D] Scene error caught by SceneErrorBoundary:",
        error.message,
        info.componentStack?.slice(0, 200)
      );
    }
  }

  override render() {
    if (this.state.hasError) {
      return (
        <FallbackVisual
          type={this.props.fallbackType ?? "abstract"}
          className={this.props.fallbackClassName}
        />
      );
    }
    return this.props.children;
  }
}
