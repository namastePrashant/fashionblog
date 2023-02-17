import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { IBlog } from "@utils/types";

type TProps = Pick<
    IBlog,
    "title" | "path" | "category" | "postedAt" | "image" | "views"
> & {
    className?: string;
    isProduct?: any;
};

const BlogCard = forwardRef<HTMLDivElement, TProps>(
    ({ title, path, image, className, isProduct }) => {
        return (
            <div className={clsx(className)}>
                <div className="blog-card blog-card--square position-relative">
                    {image?.src && (
                        <figure className="blog-card__figure">
                            <Anchor
                                path={path}
                                className="stretched-link"
                                isProduct={isProduct}
                            >
                                <img
                                    className="img-fluid"
                                    src={image.src}
                                    alt={image?.alt || title}
                                    width={image?.width || 282}
                                    height={image?.height || 282}
                                    loading={image?.loading || "lazy"}
                                />
                            </Anchor>
                        </figure>
                    )}

                    <div className="">
                        <h3 className="blog-card__title">
                            <Anchor
                                path={path}
                                className="stretched-link"
                                isProduct={isProduct}
                            >
                                {title}
                            </Anchor>
                        </h3>
                    </div>
                </div>
            </div>
        );
    }
);

export default BlogCard;
