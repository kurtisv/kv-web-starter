import * as React from "react";
type LinkProps = { href: string; children: React.ReactNode; className?: string; [k: string]: unknown };
const NextLink = ({ href, children, ...rest }: LinkProps) => <a href={href} {...rest}>{children}</a>;
export default NextLink;
