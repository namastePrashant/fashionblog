import clsx from "clsx";

type TProps = {
    className?: string;
    text: string;
    path?: string;
    icon?: string;
};

const BlogMetaItem = ({ className, text }: TProps) => {
    return (
        <div className={clsx("blog-meta-itemn tw-mb-[5px]", className)}>
            <>{text}</>
        </div>
    );
};

export default BlogMetaItem;
