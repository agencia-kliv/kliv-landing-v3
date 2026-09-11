import Image from "next/image";
import { FaTiktok } from "react-icons/fa";

// Keep platform names in HTML, not only embedded in the image pixels.
export default function AdPlatformLogos({ className = "" }) {
  return (
    <ul className={`list-none grid-cols-3 gap-[8px] w-full max-w-[320px] lg:max-w-[380px] ${className}`}>
      {[
        { name: "Meta Ads", image: "/images/meta_logo.png" },
        { name: "Google Ads", image: "/images/google_logo.png" },
      ].map(({ name, image }) => (
        <li key={name} className="relative aspect-[1.14] min-w-0">
          <Image src={image} alt="" fill sizes="(min-width: 1024px) 120px, 100px" className="object-contain" />
          <span className="sr-only">{name}</span>
        </li>
      ))}
      <li className="aspect-[1.14] min-w-0 flex flex-col items-center justify-center gap-[4px] text-kliv-text-2">
        <FaTiktok aria-hidden="true" className="h-[48%] w-[48%] text-black drop-shadow-[-2px_-1px_0_#25F4EE]" />
        <span className="flex flex-col items-center gap-[4px]">
          <span className="text-[1rem] leading-none font-semibold">TikTok</span>{" "}
          <span className="text-[0.875rem] leading-none">Ads</span>
        </span>
      </li>
    </ul>
  );
}
