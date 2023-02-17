import clsx from "clsx";

type TProps = {
    className?: string;
    pages: Array<{
        path: string;
        label: string;
    }>;
    currentPage: string;
    showTitle?: boolean;
    title?: string;
};

const Breadcrumb = ({ className, currentPage, showTitle, title }: TProps) => {
    return (
        <div
            className={clsx(
                "page-title-area",
                showTitle &&
                    "tw-pt-15 tw-pb-10 md:tw-pt-20 md:tw-pb-15 lg:tw-pt-[100px] lg:tw-pb-20",
                !showTitle && "tw-pb-10 md:tw-pb-15 lg:tw-pb-20",
                className
            )}
        >
            {showTitle && (
                <div className="tw-container">
                    <h1 className="title tw-capitalize tw-mt-5 tw-mb-0 tw-text-3xl md:tw-text-4xl lg:tw-text-5xl tw-text-center">
                        {title || currentPage}
                    </h1>
                    {/* <h2>SubCategory with Menu</h2> */}
                </div>
            )}
            {!showTitle && (
                <h1 className="tw-sr-only">{title || currentPage}</h1>
            )}
        </div>
    );
};

Breadcrumb.defaultProps = {
    showTitle: true,
};

export default Breadcrumb;
