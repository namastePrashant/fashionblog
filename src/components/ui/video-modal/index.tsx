import clsx from "clsx";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useKeyboardFocus } from "@hooks";
import { fadeIn02 } from "@utils/variants";

const Portal = dynamic(() => import("../../portal"), {
    ssr: false,
});

type TModal = {
    /**
     * Youtube video ID
     */
    videoId: string;
    /**
     * When `true` The modal will show itself.
     */
    show: boolean;
    /**
     * Callback function for close modal
     */
    onClose: () => void;
    /**
     * Pass extra classes
     */
    className?: string;
    content?: any;
};

const VideoModal = ({ show, onClose, className, content }: TModal) => {
    const modalRef = useKeyboardFocus<HTMLDivElement>(show, onClose);

    return (
        <Portal>
            <div className="video-modal">
                <AnimatePresence
                    initial={false}
                    mode="wait"
                    onExitComplete={() => null}
                >
                    {show && (
                        <>
                            <motion.div
                                className="backdrop tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-bg-black/60 tw-transition-opacity tw-z-50 tw-flex tw-justify-center tw-items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.4,
                                    type: "spring",
                                }}
                                tabIndex={-1}
                            />

                            <motion.div
                                className={clsx(
                                    "tw-fixed tw-inset-0 tw-overflow-hidden tw-outline-0 tw-transition-opacity tw-z-[999] tw-flex tw-justify-center tw-items-center video-modal__container",
                                    className
                                )}
                                role="button"
                                tabIndex={-1}
                                ref={modalRef}
                                onClick={onClose}
                                onKeyPress={(e) => e}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeIn02}
                            >
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="tw-absolute tw-right-0 tw-top-0 tw-w-12 tw-h-12 tw-text-white tw-bg-black tw-flex tw-items-center tw-justify-center remove-btn"
                                >
                                    <i className="linea-arrows-circle-remove tw-text-xl" />
                                </button>
                                <div
                                    className="video-content"
                                    dangerouslySetInnerHTML={{
                                        __html: content?.sourceHtml,
                                    }}
                                ></div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </Portal>
    );
};

export default VideoModal;
