import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
// import MottoText from "@ui/motto-text";
import Video from "@ui/video-with-poster/video-02";
// import BottomShape from "@ui/bottom-shape/shape-03";
// import Shape2 from "@assets/svgs/shape-2.svg";
// import { useUI } from "@contexts/ui-context";
import { scrollUpVariants } from "@utils/variants";
import {
    // ImageType,
    // ItemType,
    // MottoType,
    // SectionTitleType,
    TSection,
    // VideoType,
} from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedVideo = motion(Video);

type TProps = TSection & {
    data?: any;
};

const VideoArea = ({ data: { section_title, posts }, titleSize }: TProps) => {
    const featuredVideo = posts?.slice(0, 1)[0];
    const nonFeaturedVideo = posts?.slice(1, 5);

    /** Need to refactor code */
    return (
        <Section className="video-area">
            <div className="container">
                {/* {featuredVideo && ( */}
                <AnimatedSectionTitle
                    {...section_title}
                    titleSize={titleSize}
                    className="tw-mb-7.5 md:tw-mb-15 video-area-section"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                />
                {/* )} */}

                <div className="row">
                    <div className="col-lg-7 md:tw-mb-[80px] lg:tw-mb-0">
                        {featuredVideo &&
                            featuredVideo?.featuredImage?.node?.sourceUrl && (
                                <>
                                    {/* <AnimatedVideo
                                key={featuredVideo?.id}
                                className="feature"
                                poster={{ ...{ src: featuredVideo?.featuredImage?.node?.sourceUrl }, width: 712, height: 406 }}
                                video={featuredVideo?.featuredVideo}
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.4 }}
                                variants={scrollUpVariants}
                                content={featuredVideo?.featuredVideo}
                            /> */}
                                    {featuredVideo?.featuredVideo?.mediaType ===
                                    "iframe" ? (
                                        <div
                                            className="home-video-player tw-height-200 tw-bg-slate-200"
                                            dangerouslySetInnerHTML={{
                                                __html: featuredVideo
                                                    ?.featuredVideo?.sourceHtml,
                                            }}
                                        />
                                    ) : (
                                        <video
                                            className="custom-video-player wp-video-shortcode"
                                            controls
                                            autoPlay={true}
                                            muted={true}
                                            loop={true}
                                            playsInline={true}
                                            poster={
                                                featuredVideo?.featuredImage
                                                    ?.node?.sourceUrl
                                            }
                                        >
                                            <source
                                                src={
                                                    featuredVideo?.featuredVideo
                                                        ?.sourceUrl
                                                }
                                            />
                                        </video>
                                    )}
                                </>
                            )}
                        <h3>{featuredVideo?.title}</h3>
                    </div>
                    <div className="col-lg-5 ">
                        {nonFeaturedVideo?.map((item?: any) => (
                            <div className="row thumbnail-video">
                                <div className="col-md-5">
                                    <AnimatedVideo
                                        key={item?.id}
                                        className="thumbnail"
                                        poster={{
                                            ...{
                                                src: item?.featuredImage?.node
                                                    ?.sourceUrl,
                                            },
                                            width: 192,
                                            height: 102,
                                        }}
                                        video={item.featuredVideo}
                                        initial="offscreen"
                                        whileInView="onscreen"
                                        viewport={{ once: true, amount: 0.4 }}
                                        variants={scrollUpVariants}
                                        content={item?.featuredVideo}
                                    />
                                </div>
                                <div className="col-md-7 video-content">
                                    <h4>{item.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <BottomShape /> */}
        </Section>
    );
};

export default VideoArea;
