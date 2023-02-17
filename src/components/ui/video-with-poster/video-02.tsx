import { forwardRef } from "react";
import clsx from "clsx";
import VideoButton from "@ui/video-button";
import { ImageType, VideoType } from "@utils/types";
import Anchor from "@ui/anchor";

type TProps = {
    poster: ImageType;
    video: VideoType;
    className?: string;
    content?: any;
    key?: string;
    title?: string;
    categories?: any;
};

const Video02 = forwardRef<HTMLDivElement, TProps>(
    ({ poster, video, className, content, key, title, categories }, ref) => {
        return (
            <div className="tw-flex tw-flex-col video-thumb">
                <div
                    className={"tw-relative tw-shadow-black/[22%] poster"}
                    ref={ref}
                >
                    {poster?.src && (
                        <img
                            className="tw-w-full tw-transition-transform tw-duration-1500 group-hover:tw-scale-110 tw-bg-slate-50	poster__image"
                            src={poster.src}
                            alt={poster?.alt || "video poster"}
                            width={poster?.width || 1170}
                            height={poster?.height || 620}
                            loading={poster?.loading || "lazy"}
                        />
                    )}
                    {video && <VideoButton videoId={key} content={content} />}
                </div>

                <div className="blog-card__categories">
                    {categories?.nodes?.length > 0 ? (
                        <div className="blog-card__categories__category">
                            <Anchor
                                path={`/${categories?.nodes[0]?.slug}`}
                                className="blog-card__title"
                            >
                                {categories?.nodes[0]?.name}
                            </Anchor>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <h3 className="video-category__title ">{title}</h3>
            </div>
        );
    }
);

export default Video02;
