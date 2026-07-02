"use client";

import * as React from "react";
import { ThreeDFallback } from "./three-d-fallback";

interface Props {
  children: React.ReactNode;
  /** Node rendered in place of the scene when it crashes */
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render-phase crashes from three.js / R3F children (context loss,
 * shader failures, bad geometry) and swaps in a DOM fallback so the page
 * around the scene keeps working.
 */
export class ThreeDErrorBoundary extends React.Component<Props, State> {
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
        "[three-d] Scene error caught by ThreeDErrorBoundary:",
        error.message,
        info.componentStack?.slice(0, 200)
      );
    }
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <ThreeDFallback
            variant="abstract"
            label="La scene 3D n'a pas pu etre affichee"
            description="Un apercu statique remplace la scene 3D."
            className="absolute inset-0 min-h-0 rounded-none"
          />
        )
      );
    }
    return this.props.children;
  }
}
