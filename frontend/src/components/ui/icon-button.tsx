import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconButtonProps = React.ComponentProps<typeof Button>;

function IconButton({
  className,
  variant = "icon",
  size = "icon",
  shape = "square",
  ...props
}: IconButtonProps) {
  return (
    <Button
      data-slot="icon-button"
      variant={variant}
      size={size}
      shape={shape}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

export { IconButton };
