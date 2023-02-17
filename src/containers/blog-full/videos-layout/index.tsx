import { motion } from "framer-motion";
import Section from "@ui/section";
import BlogCard from "@components/blog-card/blog-03";
import { IBlog } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import Video from "@ui/video-with-poster/video-02";

const AnimatedBlogCard = motion(BlogCard);
const AnimatedVideo = motion(Video);

type TProps = {
    data: {
        blogs: any;
    };
};

const BlogArea = ({ data: { blogs } }: TProps) => {
    return (
        <Section className="blog-area" space="bottom">
            <h2 className="tw-sr-only">Blog Section</h2>
            <div className="tw-container">
                {blogs?.length > 0 && (
                    <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">
                        {blogs.map((blog?: any) => (
                            <AnimatedVideo
                                key={blog?.id}
                                className="thumbnail"
                                title={blog?.title}
                                poster={{
                                    ...{
                                        src: blog?.featuredImage?.node
                                            ?.sourceUrl,
                                    },
                                    width: 192,
                                    height: 102,
                                }}
                                video={blog?.featuredVideo}
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.4 }}
                                variants={scrollUpVariants}
                                content={blog?.featuredVideo}
                                categories={blog?.categories}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Section>
    );
};

export default BlogArea;
