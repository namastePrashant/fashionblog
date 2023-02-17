/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ReactNode } from "react";
import Link from "next/link";

const defaultProps = {
    target: "_blank",
    rel: "noopener noreferrer",
};

type TProps = typeof defaultProps &
    React.HTMLAttributes<HTMLAnchorElement> & {
        path: string;
        href?: string;
        as?: string;
        children: ReactNode;
        className?: string;
        onClick?: () => void;
        onKeyPress?: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
        onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
        onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
        isProduct?: boolean;
    };

const Anchor = ({
    path,
    children,
    className,
    rel,
    target,
    onClick,
    onKeyPress,
    onFocus,
    onBlur,
    href,
    isProduct,
    ...rest
}: TProps) => {
    if (!path) return null;
    const internal = /^\/(?!\/)/.test(path);

    if (isProduct) {
        return (
            <a
                href={`${process.env.NEXT_PUBLIC_SHOP_BASE_URL}/${path}`}
                target="_blank"
            >
                {children}
            </a>
        );
    }
    if (!internal) {
        const isHash = path.startsWith("#");
        if (isHash) {
            return (
                <a
                    rel={rel}
                    className={className}
                    href={path}
                    onClick={onClick}
                    onKeyPress={onKeyPress}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...rest}
                >
                    {children}
                </a>
            );
        }
        return (
            <a
                rel={rel}
                className={className}
                href={path}
                target={target}
                onClick={onClick}
                onKeyPress={onKeyPress}
                onFocus={onFocus}
                onBlur={onBlur}
                {...rest}
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            href={path}
            className={className}
            onClick={onClick}
            onKeyPress={onKeyPress}
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
        >
            {children}
        </Link>
    );
};

Anchor.defaultProps = defaultProps;

Anchor.displayName = "Anchor";

export default Anchor;
