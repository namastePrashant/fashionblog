import Anchor from "@ui/anchor";
import { IBlog } from "@utils/types";
import { forwardRef } from "react";
import clsx from "clsx";

type TProps = Pick<
    IBlog,
    "title" | "path" | "category" | "postedAt" | "image"
> & {
    className?: string;
};

const RecentPostsWidget = forwardRef<HTMLDivElement, TProps>(
    ({ title, path, image, className }, ref) => (
        <div className={clsx(className)}>
            <div className="blog-card blog-card--square position-relative">
                {image?.src && (
                    <figure className="blog-card__figure">
                        <img
                            className="img-fluid"
                            src={image.src}
                            alt={image?.alt || title}
                            width={image?.width || 282}
                            height={image?.height || 282}
                            loading={image?.loading || "lazy"}
                        />
                    </figure>
                )}

                <div className="">
                    <h3 className="blog-card__title">
                        <Anchor path={path} className="stretched-link">
                            {title}
                        </Anchor>
                    </h3>
                </div>
            </div>
        </div>
    )
);

export default RecentPostsWidget;
