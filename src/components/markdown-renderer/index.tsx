import { marked } from "marked";
import clsx from "clsx";

type TProps = {
    content: string;
    className?: string;
};

const MarkdownRenderer = ({ content, className }: TProps) => {
    const renderer = new marked.Renderer();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const linkRenderer = renderer.link;
    renderer.link = (href, linkTitle, text) => {
        const html = linkRenderer.call(renderer, href, linkTitle, text);
        return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
    };
    return (
        <div
            className={clsx("", className)}
            dangerouslySetInnerHTML={{
                __html: marked(content, { renderer }),
            }}
        />
    );
};

export default MarkdownRenderer;
