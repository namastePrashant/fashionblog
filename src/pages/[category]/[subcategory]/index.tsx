import React, { useState, useEffect } from "react";
import type { GetStaticPaths, NextPage } from "next";
import Layout01 from "@layout/layout";
import { BlogMetaType, IBlog } from "@utils/types";
import { useRouter } from "next/router";
import SEO from "@components/seo/page-seo";
import BlogArea from "@containers/blog-full/layout-01";
import { unslugify, toCapitalize } from "@utils/methods";
import Breadcrumb from "@components/breadcrumb";

import transformPostData, {
    transformSubcategoryData,
} from "@utils/transformReceivedData";
import { GET_ALL_CATEGORIES } from "queries/categories";
import { GET_POSTS_BY_CATEGORIES, GET_ALL_POSTS } from "queries/posts";
import LoadMoreComponent from "@components/loadMore/loadMorePosts";
import client from "../../../../apollo/apolloClient";
import HeroArea from "@containers/hero/layout-07";
import _ from "lodash";
import MainMenu from "@components/menu/main-menu";

type TProps = {
    data: {
        blogs: IBlog[];
        recentPosts: IBlog[];
        tags: BlogMetaType[];
        pageTitle: string;
        slug: string;
        currentPage: number;
        numberOfPages: number;
        pageInfo?: any;
        category?: string;
    };
    menu?: any;
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 12;

const SubcategoryPage: PageProps = ({
    data: { blogs, pageTitle, slug, pageInfo: pageData },
    menu,
}) => {
    const router = useRouter();
    const {
        query: { subcategory, category },
    } = router;
    const [posts, setPosts] = useState(blogs);
    const [pageInfo, setPageInfo] = useState<any>(pageData);
    const currentMenuObj: any = _.find(menu, ["title", toCapitalize(category)]);

    useEffect(() => {
        setPosts(blogs);
        setPageInfo(pageData);
    }, [slug]);

    return (
        <>
            <SEO title={toCapitalize(subcategory)} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/articles/blog-grid-sidebar", label: "blog" },
                ]}
                currentPage={pageTitle}
                title={pageTitle}
            />
            {currentMenuObj?.children?.length > 0 ? (
                <div className="navigation categories-nav d-none d-sm-block">
                    <div className="container">
                        <MainMenu
                            className=""
                            align="center"
                            menu={[
                                {
                                    key: "asdfgh",
                                    title: "View All",
                                    uri: `/${category}`,
                                    children: [],
                                },
                                ...currentMenuObj?.children,
                            ]}
                            activeKey={toCapitalize(subcategory)}
                            color={"light"}
                        />
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className="categories-hero">
                <HeroArea data={{ items: posts?.slice(0, 3) }} />
            </div>
            <BlogArea
                data={{
                    blogs: posts?.slice(3),
                }}
            />
            <LoadMoreComponent
                pageInfo={pageInfo}
                posts={posts}
                postsPerPage={POSTS_PER_PAGE}
                query={GET_POSTS_BY_CATEGORIES}
                slug={slug}
                newDataCallback={(data?: any, pageInformation?: any) => {
                    setPosts(data);
                    setPageInfo(pageInformation);
                }}
            />
        </>
    );
};

SubcategoryPage.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: allCategoriesData } = await client.query({
        query: GET_ALL_CATEGORIES,
        variables: {
            count: 100,
        },
    });

    let newCategoryData = transformSubcategoryData(allCategoriesData);

    return {
        paths: newCategoryData,
        fallback: "blocking",
    };
};

type Params = {
    params: {
        category: string;
        subcategory: string;
    };
};

export const getStaticProps = async ({ params }: Params) => {
    const { data: postsData } = await client.query({
        query: GET_POSTS_BY_CATEGORIES,
        variables: {
            name: params.subcategory,
            count: POSTS_PER_PAGE,
        },
    });
    const transformedData = transformPostData(postsData);

    return {
        props: {
            data: {
                blogs: transformedData,
                pageTitle: `${unslugify(params?.category)} / ${unslugify(
                    params.subcategory
                )}`,
                slug: params.subcategory,
                category: params?.category,
                pageInfo: postsData?.posts?.pageInfo,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default SubcategoryPage;
