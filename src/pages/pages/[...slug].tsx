import React from "react";
import type { GetStaticPaths, NextPage } from "next";
import client from "../../../apollo/apolloClient";
import { GET_ALL_PAGES, GET_PAGE_BY_URI } from "../../queries/pages";
import Layout01 from "@layout/layout";
import { transformPagesData } from "@utils/transformReceivedData";
import SEO from "@components/seo/page-seo";
import { unslugify, toCapitalize } from "@utils/methods";
import Breadcrumb from "@components/breadcrumb";

type TProps = {
    data: {
        pageTitle: string;
        page?: any;
        slug: string;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const Page: PageProps = (props) => {
    const {
        data: { page, slug },
    } = props;
    let pageTitle = Array.isArray(slug) ? slug[0] : slug;
    return (
        <div className="slug-page">
            <div className="container">
                <SEO title={pageTitle ? toCapitalize(pageTitle) : ""} />
                <Breadcrumb
                    pages={[
                        { path: "/", label: "home" },
                        { path: `/${slug}`, label: pageTitle },
                    ]}
                    currentPage={pageTitle}
                    title={pageTitle}
                />
                <div className="page-wrapper">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div
                                className={`site-content grid-${pageTitle}`}
                                dangerouslySetInnerHTML={{
                                    __html: page?.pageBy?.content,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Page.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: pagesData } = await client.query({
        query: GET_ALL_PAGES,
    });

    let newData = transformPagesData(pagesData?.pages);

    return {
        paths: newData,
        fallback: false,
    };
};

type Params = {
    params: {
        slug: string;
        databaseId: any;
    };
};

export const getStaticProps = async ({ params }: Params) => {
    const { data: pageData } = await client.query({
        query: GET_PAGE_BY_URI,
        variables: {
            uri: `/${params?.slug}`,
        },
    });

    return {
        props: {
            data: {
                page: pageData,
                slug: params?.slug,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Page;
