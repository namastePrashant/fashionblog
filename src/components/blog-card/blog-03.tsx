import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { IBlog } from "@utils/types";

type TProps = Pick<
    IBlog,
    "image" | "path" | "title" | "category" | "postedAt" | "views"
> & {
    className?: string;
    categories?: any;
};

const BlogCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, image, path, title, categories }, ref) => {
        return (
            <div
                className={clsx("blog-card position-relative", className)}
                ref={ref}
            >
                <div className="">
                    {image?.src && (
                        <figure className="blog-card__figure">
                            <Anchor path={path}>
                                <img
                                    className="img-fluid"
                                    src={image.src}
                                    alt={image?.alt || title}
                                    width={image.width || 390}
                                    height={image.height}
                                    loading={image.loading || "lazy"}
                                />
                            </Anchor>
                        </figure>
                    )}
                </div>

                <div className="flex flex-row ">
                    <div className="blog-card__categories">
                        {categories?.length > 0 ? (
                            <div className="blog-card__categories__category">
                                <Anchor
                                    path={`/${categories[0]?.node?.slug}`}
                                    className="blog-card__title"
                                >
                                    {categories[0]?.node?.name}
                                </Anchor>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>

                    <h3 className="blog-card__title ">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                </div>
            </div>
        );
    }
);

export default BlogCard;
