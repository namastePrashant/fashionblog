import clsx from "clsx";
import VideoButton from "@ui/video-button";
import { ImageType, VideoType } from "@utils/types";

type TProps = {
    poster: ImageType;
    video: VideoType;
    className?: string;
};

const Video01 = ({ poster, video, className }: TProps) => {
    return (
        <div
            className={clsx(
                "embed-responsive embed-responsive-16by9",
                className
            )}
        >
            {poster?.src && (
                <img
                    className="tw-w-full tw-transition-transform tw-duration-1500 group-hover:tw-scale-110"
                    src={poster.src}
                    alt={poster?.alt || "video poster"}
                    width={poster?.width || 970}
                    height={poster?.height || 569}
                    loading={poster?.loading || "lazy"}
                />
            )}
            {video && <VideoButton videoId={video.videoId} />}
        </div>
    );
};

export default Video01;
