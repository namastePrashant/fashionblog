import { useState } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { VideoType } from "@utils/types";

const ModalVideo = dynamic(() => import("../video-modal"), { ssr: false });

type TProps = VideoType & {
    label?: string;
    className?: string;
    content?: any;
};

const VideoButton = ({ label, className, videoId, content }: TProps) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <button
                type="button"
                aria-label={label}
                className={clsx("video-button", className)}
                onClick={() => setOpen(true)}
            >
                <img
                    className="icon tw-w-16 md:tw-w-auto"
                    src="/img/icons/play.png"
                    alt="youtube play"
                    loading="lazy"
                    width={100}
                    height={70}
                />
            </button>
            <ModalVideo
                show={isOpen}
                videoId={videoId}
                onClose={() => setOpen(false)}
                content={content}
            />
        </>
    );
};

VideoButton.defaultProps = {
    label: "Play video",
};

export default VideoButton;
