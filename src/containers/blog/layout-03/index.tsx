import { motion } from "framer-motion";
import Section from "@ui/section";
import BlogCard from "@components/blog-card/blog-03";
import SectionTitle from "@components/section-title";
import { scrollUpVariants } from "@utils/variants";
import { MottoType, SectionTitleType, IBlog, TSection } from "@utils/types";

import Advertisement from "@components/ad/advertisement";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedBlogCard = motion(BlogCard);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        blogs: IBlog[];
        adData?: any;
    };
};

const BlogArea = ({
    data: { section_title, blogs, adData },
    titleSize,
}: TProps) => {
    return (
        <Section className="blog-area">
            <div className="container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw-mb-7.5 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="row">
                            {blogs?.map((blog?: any) => {
                                return (
                                    <AnimatedBlogCard
                                        key={
                                            blog?.slug
                                                ? `/articles/${blog?.slug}`
                                                : blog.path
                                        }
                                        title={blog.title}
                                        className="col-md-6 latest"
                                        path={
                                            blog?.slug
                                                ? `/articles/${blog?.slug}`
                                                : blog.path
                                        }
                                        categories={blog?.categories?.edges}
                                        postedAt={blog.postedAt}
                                        image={
                                            blog.image ?? {
                                                src: blog?.featuredImage?.node
                                                    ?.sourceUrl,
                                            }
                                        }
                                        views={blog.views}
                                        initial="offscreen"
                                        whileInView="onscreen"
                                        viewport={{ once: true, amount: 0.4 }}
                                        variants={scrollUpVariants}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <Advertisement data={adData} />
                    </div>
                </div>
            </div>
        </Section>
    );
};

BlogArea.defaultProps = {
    bg: "tw-bg-gray-200",
};

export default BlogArea;
