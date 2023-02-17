import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout";
import Breadcrumb from "@components/breadcrumb";
import PageSidebar from "@containers/page-sidebar";
import MarkdownRenderer from "@components/markdown-renderer";

import { ICourse } from "@utils/types";

import { getallCourses } from "../lib/course";
import { getPageBySlug } from "../lib/mdx-pages";

type TProps = {
    data: {
        page: string;
        recentCourses: ICourse[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const Subscribe: PageProps = ({ data }) => {
    return (
        <>
            <SEO title="Subscribe" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Subscribe"
            />
            {/* <div className="container">
                <div className="col-12">
                    <MarkdownRenderer content={data.page} />
                </div>
            </div> */}
        </>
    );
};

Subscribe.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    // const page = getPageBySlug("terms-of-service");
    // const recentCourses = getallCourses(
    //     ["title", "thumbnail", "price", "currency"],
    //     0,
    //     4
    // );

    return {
        props: {
            data: {
                page: [],
                recentCourses: [],
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Subscribe;
