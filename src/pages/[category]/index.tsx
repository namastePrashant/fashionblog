import { useState, useEffect } from "react";
import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-01";
import VideoArea from "@containers/blog-full/videos-layout";
import { unslugify, toCapitalize } from "@utils/methods";
import { BlogMetaType, IBlog } from "@utils/types";
import transformPostData, {
    transformCategoryData,
} from "@utils/transformReceivedData";
import { GET_ALL_CATEGORIES } from "queries/categories";
import { GET_POSTS_BY_CATEGORIES } from "queries/posts";
import { GET_LATEST_VIDEOS } from "queries/videos";
import LoadMoreComponent from "@components/loadMore/loadMorePosts";
import client from "../../../apollo/apolloClient";
import HeroArea from "@containers/hero/layout-07";
import MainMenu from "@components/menu/main-menu";
import _ from "lodash";

type TProps = {
    data: {
        blogs: IBlog[];
        recentPosts: IBlog[];
        tags: BlogMetaType[];
        pageTitle: string;
        slug: string;
        currentPage: number;
        numberOfPages: number;
        pageInfo: any;
    };
    menu?: any;
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 12;

const BlogCategoryPage: PageProps = (props) => {
    const {
        data: { blogs, pageTitle, slug, pageInfo: pageData },
        menu,
    } = props;
    const currentMenuObj: any = _.find(menu, ["title", toCapitalize(slug)]);
    const [posts, setPosts] = useState(blogs);
    const [pageInfo, setPageInfo] = useState<any>(pageData);

    useEffect(() => {
        setPosts(blogs);
        setPageInfo(pageData);
    }, [slug]);

    //TODO Find a way to use same component for both category and subcategory

    return (
        <>
            <SEO title={toCapitalize(pageTitle)} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/video", label: "video" },
                ]}
                currentPage={pageTitle}
                title={pageTitle}
            />
            {currentMenuObj?.children?.length > 0 ? (
                <div className="navigation categories-nav ">
                    <div className="container">
                        <MainMenu
                            className=""
                            align="center"
                            menu={[
                                {
                                    key: "asdfgh",
                                    title: "View All",
                                    uri: slug,
                                    children: [],
                                },
                                ...currentMenuObj?.children,
                            ]}
                            activeKey="View All"
                            color="light"
                        />
                    </div>
                </div>
            ) : (
                <></>
            )}

            {slug === "video" ? (
                <div className="video-category">
                    <VideoArea
                        data={{
                            blogs: posts,
                        }}
                    />
                </div>
            ) : (
                <>
                    <div className="categories-hero">
                        <HeroArea data={{ items: posts?.slice(0, 3) }} />
                    </div>
                    <BlogArea
                        data={{
                            blogs: posts?.slice(3),
                        }}
                    />
                </>
            )}
            <LoadMoreComponent
                pageInfo={pageInfo}
                posts={posts}
                postsPerPage={POSTS_PER_PAGE}
                query={
                    slug === "video"
                        ? GET_LATEST_VIDEOS
                        : GET_POSTS_BY_CATEGORIES
                }
                slug={slug}
                newDataCallback={(data?: any, pageInformation?: any) => {
                    setPosts(data);
                    setPageInfo(pageInformation);
                }}
            />
        </>
    );
};

BlogCategoryPage.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: allCategoriesData } = await client.query({
        query: GET_ALL_CATEGORIES,
        variables: {
            count: 100,
        },
    });

    let newCategoryData = transformCategoryData(allCategoriesData);

    return {
        paths: newCategoryData,
        fallback: false,
    };
};

type Params = {
    params: {
        category: string;
    };
};

export const getStaticProps = async ({ params }: Params) => {
    const { data: postsData } = await client.query({
        query:
            params?.category === "video"
                ? GET_LATEST_VIDEOS
                : GET_POSTS_BY_CATEGORIES,
        variables: {
            name: params.category,
            count: POSTS_PER_PAGE,
        },
    });
    const transformedData = transformPostData(postsData);

    return {
        props: {
            data: {
                blogs: transformedData,
                pageTitle: unslugify(params.category),
                slug: params.category,
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

export default BlogCategoryPage;
