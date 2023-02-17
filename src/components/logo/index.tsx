import Link from "next/link";
import clsx from "clsx";

type TProps = {
    variant?: "dark" | "light";
    className?: string;
};

const Logo = ({ variant, className }: TProps) => {
    return (
        <Link href="/" className={clsx("tw-inline-block", className)}>
            {variant === "dark" && (
                <img
                    src="/images/logo/logo.png"
                    alt="Logo"
                    width={161}
                    height={54}
                />
            )}
            {variant === "light" && (
                <img
                    src="/images/logo/logo-white.png"
                    alt="Logo"
                    width={161}
                    height={54}
                />
            )}
        </Link>
    );
};

export default Logo;
