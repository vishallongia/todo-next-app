import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {

    const idxParam = Number(searchParams.get("idx")) || 0;
    if (!isNaN(idxParam) && idxParam >= 0 && idxParam < tabs.length) {
      setActive(tabs[idxParam]);
    }
  }, [searchParams, tabs]);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
    if (idx !== 0) {
      router.push(`?idx=${idx}`);
    }
    else {
      router.push("/home");
    }

  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex justify-center items-center [perspective:1000px] relative overflow-hidden sm:overflow-visible no-visible-scrollbar max-w-full bg-[#48aae6] p-[16px] rounded-xl",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-8 py-2", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-[#0b4f79] rounded-xl",
                  activeTabClassName
                )}
              />
            )}

            <span className="relative block   text-[18px] text-[white] font-semibold ">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-8", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => {
        return (
          <motion.div
            key={tab.value}
            layoutId={tab.value}
            style={{
              scale: 1 - idx * 0.1,
              top: hovering ? idx * -50 : 0,
              zIndex: -idx,
              opacity: isActive(tab) ? 1 : 0,
            }}
            animate={{
              y: isActive(tab) ? [0, 40, 0] : 0,
            }}
            className={cn("w-full h-auto absolute top-0 left-0", className)}
          >
            {tab.content}
          </motion.div>
        );
      })}
    </div>
  );
};
