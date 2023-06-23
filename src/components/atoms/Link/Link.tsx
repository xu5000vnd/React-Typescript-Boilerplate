import React, { useMemo } from "react";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
const Link = (props: LinkProps) => {
  const { children, ...rest } = props;

  const component = useMemo(() => {
    if (typeof children === "string") {
      return <span>{children}</span>;
    }
    return children;
  }, [children]);

  return <a {...rest}>{component}</a>;
};

export default Link;
