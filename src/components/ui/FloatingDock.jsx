import { FloatingDockDesktop } from "./FloatingDockDesktop";
import { FloatingDockMobile } from "./FloatingDockMobile";

export function FloatingDock({ items, desktopClassName, mobileClassName }) {
  return (
    <>
      <div className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <FloatingDockDesktop items={items} className={desktopClassName} />
      </div>

      <div className="md:hidden">
        <FloatingDockMobile items={items} className={mobileClassName} />
      </div>
    </>
  );
}
