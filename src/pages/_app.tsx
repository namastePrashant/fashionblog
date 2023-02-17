import { ElementType, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import SEO from "@components/seo/deafult-seo";
import FallbackLayout from "@layout/fallback";

import "@assets/css/font-awesome-pro.min.css";
import "@assets/css/font-linea.css";
import "@assets/css/fonts.css";
import "@assets/css/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@assets/css/swiper.css";
import "@assets/css/custom.css";
import "@assets/scss/custom.scss";

import { UIProvider } from "../contexts/ui-context";
import { UserProvider } from "../contexts/user-context";

import { GET_MENUS } from "queries/menu";
import client from "../../apollo/apolloClient";
import transformMenu from "@utils/transformMenu";
import { ApolloProvider } from "@apollo/client";

interface CustomAppProps extends Omit<AppProps, "Component"> {
    Component: AppProps["Component"] & { Layout: ElementType };
    pageProps: {
        [key: string]: unknown;
    };
    menu?: any;
    aboutFooterMenu?: any;
    categoryFooterMenu?: any;
}

const MyApp = ({
    Component,
    pageProps,
    menu,
    aboutFooterMenu,
    categoryFooterMenu,
}: CustomAppProps) => {
    const router = useRouter();
    const Layout = Component.Layout || FallbackLayout;
    const layoutProps =
        typeof pageProps.layout === "object" ? pageProps.layout : {};
    const transformedMenu = transformMenu(menu);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
    }, [router]);

    useEffect(() => {
        document.body.className = (pageProps?.className as string) || "";
    });

    return (
        <UIProvider>
            <UserProvider>
                <Layout
                    menu={transformedMenu}
                    footerMenu={{
                        category: categoryFooterMenu,
                        about: aboutFooterMenu,
                    }}
                    {...layoutProps}
                >
                    <SEO />
                    <ApolloProvider client={client}>
                        <Component menu={transformedMenu} {...pageProps} />
                    </ApolloProvider>
                </Layout>
            </UserProvider>
        </UIProvider>
    );
};

MyApp.getInitialProps = async (appContext: any) => {
    const { loading, data: menuData } = await client.query({
        query: GET_MENUS,
    });

    return {
        menu: menuData?.primaryMenu?.menuItems?.nodes,
        aboutFooterMenu: menuData?.footerAbout?.menuItems?.nodes,
        categoryFooterMenu: menuData?.footerCategory?.menuItems?.nodes,
    };
};

export default MyApp;
