import clsx from "clsx";
import { TSection } from "@utils/types";

type TProps = Exclude<TSection, "titleSize"> & {
    children: React.ReactNode;
    style?: React.CSSProperties;
};

const Section = ({ space, bg, className, style, children }: TProps) => {
    return (
        <section
            className={clsx(
                className,
                space === "top-bottom" && "default-space",
                space === "top-bottom-2" && "color-space",
                bg
            )}
        >
            {children}
        </section>
    );
};

Section.defaultProps = {
    space: "top-bottom",
};

export default Section;
