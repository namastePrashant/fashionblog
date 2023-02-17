import { ReactNode } from "react";
import ScrollToTop from "@ui/scroll-to-top";
import Header from "../headers";
import Footer from "../footers";

type TProps = {
    children: ReactNode;
    headerShadow?: boolean;
    headerFluid?: boolean;
    headerMode?: "light" | "dark";
    headerTransparent?: boolean;
    footerMode?: "light" | "dark";
    menu?: any;
    footerMenu?: any;
};

const Layout01 = ({
    children,
    headerShadow,
    headerFluid,
    headerMode,
    headerTransparent,
    footerMode,
    menu,
    footerMenu,
}: TProps) => {
    return (
        <>
            <Header
                shadow={headerShadow}
                fluid={headerFluid}
                transparent={headerTransparent}
                mode={headerMode}
                menu={menu}
            />
            <main className="tw-relative">{children}</main>
            <Footer mode={footerMode} menu={footerMenu} />
            <ScrollToTop />
        </>
    );
};

export default Layout01;
