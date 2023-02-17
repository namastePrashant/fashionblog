import clsx from "clsx";
import Anchor from "@ui/anchor";
import { IInstructor } from "@utils/types";

type TProps = {
    author: IInstructor;
    className?: string;
};

const AuthorMeta = ({ author, className }: TProps) => {
    return (
        <div className={clsx("", className)}>
            {/* <Anchor path={`/articles/author/${author.slug}`}>
                By {author.name}
            </Anchor> */}
            <span className="author-name">
                By {author.name}
            </span>
        </div>
    );
};

export default AuthorMeta;
