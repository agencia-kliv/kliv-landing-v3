"use client";
import Link from "next-intl/link";
import { useEffect, useState } from "react";
const TabItem = ({ href, ...props }) => {
  const [color, setColor] = useState();

  useEffect(() => {
    setColor(
      href === window.location.pathname ? "kliv-secondary" : "kliv-gray-500"
    );
  }, [href]);

  return (
    <Link
      href={href}
      className={`nav-link ${color} whitespace-nowrap font-[500] cursor-pointer duration-200 ease-in-out text-[22px] lg:text-[16px] 2xl:text-[18px]  `}
      {...props}
    >
      {props.children}
    </Link>
  );
};

export default TabItem;
