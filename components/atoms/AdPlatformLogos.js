import Image from "next/image";
import { FaTiktok } from "react-icons/fa";

export const ALL_PLATFORMS = ["meta", "google", "tiktok"];

const IMAGE_PLATFORMS = {
  meta: { name: "Meta Ads", image: "/images/meta_logo.png" },
  google: { name: "Google Ads", image: "/images/google_logo.png" },
};

// Keep platform names in HTML, not only embedded in the image pixels.
export default function AdPlatformLogos({ className = "", platforms = ALL_PLATFORMS }) {
  // Las landings de una sola plataforma muestran un logo solo, más grande.
  const single = platforms.length === 1;
  return (
    <ul
      className={`list-none gap-[8px] w-full ${
        single ? "grid-cols-1 max-w-[160px] lg:max-w-[200px]" : "grid-cols-3 max-w-[320px] lg:max-w-[380px]"
      } ${className}`}
    >
      {platforms
        .filter((platform) => IMAGE_PLATFORMS[platform])
        .map((platform) => {
          const { name, image } = IMAGE_PLATFORMS[platform];
          return (
            <li key={name} className="relative aspect-[1.14] min-w-0">
              <Image src={image} alt="" fill sizes="(min-width: 1024px) 200px, 160px" className="object-contain" />
              <span className="sr-only">{name}</span>
            </li>
          );
        })}
      {platforms.includes("tiktok") && (
        <li className="aspect-[1.14] min-w-0 flex flex-col items-center justify-center gap-[4px] text-kliv-text-2">
          <FaTiktok aria-hidden="true" className="h-[48%] w-[48%] text-black drop-shadow-[-2px_-1px_0_#25F4EE]" />
          <span className="flex flex-col items-center gap-[4px]">
            <span className="text-[1rem] leading-none font-semibold">TikTok</span>{" "}
            <span className="text-[0.875rem] leading-none">Ads</span>
          </span>
        </li>
      )}
    </ul>
  );
}
