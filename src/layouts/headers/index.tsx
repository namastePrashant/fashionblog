import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Logo from "@components/logo";
// import SearchForm from "@components/forms/search-form";
import MainMenu from "@components/menu/main-menu";
import BurgerButton from "@ui/burger-button";
import Anchor from "@ui/anchor";
// import menu from "@data/menu";
import { useSticky } from "@hooks";

const MobileMenu = dynamic(() => import("../../components/menu/mobile-menu"), {
    ssr: false,
});
const FlyoutSearchForm = dynamic(
    () => import("../../components/forms/flyout-search-form-01"),
    {
        ssr: false,
    }
);

type TProps = {
    shadow?: boolean;
    fluid?: boolean;
    transparent?: boolean;
    mode?: "light" | "dark";
    menu?: any;
};

const Header = ({
    shadow,
    fluid,
    transparent,
    mode,
    menu: dynamicMenu,
}: TProps) => {
    const router = useRouter();
    const [visibleSearch, setVisibleSearch] = useState(false);
    const [offcanvas, setOffcanvas] = useState(false);
    const { sticky, measuredRef } = useSticky();

    useEffect(() => {
        setOffcanvas(false);
    }, [router]);

    return (
        <>
            <header
                className={clsx(
                    "header container",
                    !transparent && "tw-relative",
                    transparent &&
                        "tw-absolute tw-inset-0 tw-bottom-auto tw-bg-transparent"
                )}
            >
                <div className="mainNavigation">
                    <BurgerButton
                        className="burger-menu d-block d-sm-none"
                        onClick={() => setOffcanvas(true)}
                        color={mode}
                        label="Toggle Menu"
                    />
                    <MobileMenu
                        isOpen={offcanvas}
                        onClose={() => setOffcanvas(false)}
                        menu={dynamicMenu}
                    />
                    <Logo variant={mode} className="" />
                    <div className="searchMenu">
                        <a
                            href="mailto:subscribe@itotalmedia.com"
                            target="_blank"
                            className={clsx(
                                "tw-inline-block tw-px-2.5 tw-py-1.5",
                                mode === "light" &&
                                    "tw-text-white hover:tw-text-white",
                                mode === "dark" && "tw-text-dark-50"
                            )}
                        >
                            Subscribe
                        </a>

                        <div className="">
                            <button
                                type="button"
                                className={clsx(
                                    "",
                                    mode === "light" && "tw-text-white",
                                    mode === "dark" && "tw-text-dark-50"
                                )}
                                onClick={() =>
                                    setVisibleSearch((prev) => !prev)
                                }
                                aria-label="Search Toggle"
                            >
                                <i className="far fa-search tw-text-lg" />
                            </button>
                            <FlyoutSearchForm
                                show={visibleSearch}
                                onClose={() => setVisibleSearch(false)}
                            />
                        </div>
                    </div>
                </div>

                <div ref={measuredRef} className="navigation d-none d-sm-block">
                    <div className="container">
                        <MainMenu
                            className=""
                            align="center"
                            menu={dynamicMenu}
                            color={mode}
                        />
                    </div>
                </div>
                <div />
            </header>
        </>
    );
};

Header.defaultProps = {
    fluid: true,
    mode: "dark",
};

export default Header;
