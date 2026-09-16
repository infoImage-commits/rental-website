"use client";

import Image from "next/image";
import * as LucideIcons from "lucide-react";

export default function DynamicAmenityIcon({
  icon,
  className,
  width = 18,
  height = 18,
}: {
  icon?: string | null;
  className?: string;
  width?: number;
  height?: number;
}) {
  if (!icon || icon.trim() === "") {
    return (
      <Image
        src="/icons/amenities/amenities-title.svg"
        alt=""
        width={width}
        height={height}
        className={className}
      />
    );
  }

  const trimmed = icon.trim();
  if (trimmed.startsWith("lucide:")) {
    const iconName = trimmed.replace("lucide:", "").trim();
    // Case-insensitive lookup just in case
    const exactName = Object.keys(LucideIcons).find(
      (key) => key.toLowerCase() === iconName.toLowerCase()
    );
    const IconComponent = (LucideIcons as any)[exactName || iconName] || (LucideIcons as any).HelpCircle;

    if (IconComponent) {
      return <IconComponent size={width} color="#cfb072" className={className} />;
    }
  }

  const src = trimmed.startsWith("http") || trimmed.startsWith("/") ? trimmed : `/icons/amenities/${trimmed}.svg`;
  return <Image src={src} alt="" width={width} height={height} className={className} />;
}
