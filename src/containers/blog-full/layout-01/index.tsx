import { motion } from "framer-motion";
import Section from "@ui/section";
import BlogCard from "@components/blog-card/blog-03";
import { IBlog } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedBlogCard = motion(BlogCard);

type TProps = {
    data: {
        blogs: IBlog[];
    };
};

const BlogArea = ({ data: { blogs } }: TProps) => {
    return (
        <Section className="blog-area" space="bottom">
            <h2 className="tw-sr-only">Blog Section</h2>
            <div className="tw-container">
                {blogs?.length > 0 && (
                    <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">
                        {blogs.map((blog) => (
                            <AnimatedBlogCard
                                key={
                                    blog?.slug
                                        ? `/articles/${blog?.slug}`
                                        : blog.path
                                }
                                image={
                                    blog.image ?? {
                                        src: blog?.featuredImage?.node
                                            ?.sourceUrl,
                                    }
                                }
                                title={blog.title}
                                path={
                                    blog?.slug
                                        ? `/articles/${blog?.slug}`
                                        : blog.path
                                }
                                category={blog.category}
                                postedAt={blog.postedAt}
                                views={blog.views}
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={scrollUpVariants}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Section>
    );
};

export default BlogArea;
