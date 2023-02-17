import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";

interface TProps
    extends Pick<ICourse, "thumbnail" | "title" | "path" | "category"> {
    className?: string;
}

const CourseCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, thumbnail, title, path, category }, ref) => {
        return (
            <div className={clsx("col-4", className)} ref={ref}>
                <figure className="tw-relative tw-overflow-hidden">
                    {thumbnail?.src && (
                        <img
                            src={thumbnail.src}
                            alt={thumbnail?.alt || title}
                            width={thumbnail?.width || 390}
                            height={thumbnail?.height || 294}
                            loading={thumbnail?.loading || "lazy"}
                            className="tw-w-full tw-transition-transform tw-duration-1000 tw-ease-out group-hover:tw-scale-110"
                        />
                    )}

                    <Anchor className="link-overlay" path={path}>
                        {title}
                    </Anchor>
                </figure>
                <div className="">
                    <span className="">{category}</span>
                    <h3 className="">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                </div>
            </div>
        );
    }
);

export default CourseCard;
