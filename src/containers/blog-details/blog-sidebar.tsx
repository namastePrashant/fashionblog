import { motion } from "framer-motion";
import BlogCard from "@components/blog-card/blog-03";
import { scrollUpVariants } from "@utils/variants";
import { TSection } from "@utils/types";

const AnimatedBlogCard = motion(BlogCard);

type TProps = TSection & {
    data: {
        posts: any;
        className: string;
    };
};

const BlogSidebar = ({ posts }: any) => {
    return (
        <div className="row">
            {posts?.map((blog?: any) => (
                <AnimatedBlogCard
                    key={blog?.slug ? `/articles/${blog?.slug}` : blog.path}
                    title={blog.title}
                    className="col-12 col-md-6 col-lg-4"
                    path={blog?.slug ? `/articles/${blog?.slug}` : blog.path}
                    category={blog.category}
                    postedAt={blog.postedAt}
                    image={
                        blog.image ?? {
                            src: blog?.featuredImage?.node?.sourceUrl,
                        }
                    }
                    views={blog.views}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                />
            ))}
        </div>
    );
};

BlogSidebar.defaultProps = {
    bg: "white",
};

export default BlogSidebar;
