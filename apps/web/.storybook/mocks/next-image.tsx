import * as React from "react";
type ImageProps = {
  src: string; alt: string; width?: number; height?: number;
  fill?: boolean; className?: string; style?: React.CSSProperties;
  sizes?: string; priority?: boolean; quality?: number;
};
const NextImage = ({ src, alt, fill, className, style, width, height }: ImageProps) => {
  const s: React.CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }
    : { width, height, ...style };
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} style={s} />;
};
export default NextImage;
