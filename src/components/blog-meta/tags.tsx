import clsx from "clsx";
import Anchor from "@ui/anchor";
import { BlogMetaType } from "@utils/types";

type TProps = {
    className?: string;
    tags: BlogMetaType[];
};

const TagMeta = ({ className, tags }: TProps) => {
    return (
        <div className={clsx("tags blog-details__tags", className)}>
            <span className="" />
            {tags.map((tag?: any, i?: any, arr?: any) => (
                <Anchor
                    key={tag.slug}
                    path={`/articles/tag/${tag.slug}`} //TODO this needs fixing
                    className="blog-details__tag-single"
                >
                    {tag?.name}
                    {i !== arr.length - 1 && " "}
                </Anchor>
            ))}
        </div>
    );
};

export default TagMeta;
