import { motion } from "framer-motion";
import Section from "@ui/section";
import BlogCard from "@components/blog-card/blog-01";
import SectionTitle from "@components/section-title";
import clsx from "clsx";
import { scrollUpVariants } from "@utils/variants";
import { MottoType, SectionTitleType, IBlog, TSection } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedBlogCard = motion(BlogCard);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        posts: any;
    };
    category?: string;
};

const CategoryArea = ({
    data: { section_title, posts },
    titleSize,
    className,
    category,
}: TProps) => {
    return (
        <Section className={clsx("", className)}>
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
                    {posts?.["posts"].map((blog) => {
                        return (
                            <AnimatedBlogCard
                                key={
                                    blog?.slug
                                        ? `/articles/${blog?.slug}`
                                        : blog.path
                                }
                                title={blog.title}
                                className="col-md-6 col-lg-3 square"
                                path={
                                    blog?.slug
                                        ? `/articles/${blog?.slug}`
                                        : blog.path
                                }
                                category={blog.category}
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
                                isProduct={category === "shop" ? true : false}
                            />
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};

CategoryArea.defaultProps = {
    bg: "white",
};

export default CategoryArea;
