import { useState, useEffect } from "react";
import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-02";
import { BlogMetaType, IBlog } from "@utils/types";
import { unslugify, toCapitalize } from "@utils/methods";
import { GET_ALL_TAGS } from "queries/tags";
import { GET_POSTS_BY_TAGS, GET_ALL_POSTS } from "queries/posts";
import client from "../../../../../apollo/apolloClient";
import transformPostData from "@utils/transformReceivedData";
import LoadMoreComponent from "@components/loadMore/loadMorePosts";

type TProps = {
    data: {
        blogs: IBlog[];
        recentPosts: IBlog[];
        tags: BlogMetaType[];
        pageTitle: string;
        slug: string;
        pageInfo: any;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 10;

const BlogTagPage: PageProps = ({
    data: { blogs, recentPosts, tags, pageTitle, slug, pageInfo: pageData },
}) => {
    const [posts, setPosts] = useState(blogs);
    const [pageInfo, setPageInfo] = useState<any>(pageData);

    useEffect(() => {
        setPosts(blogs);
        setPageInfo(pageData);
    }, [slug]);

    const LoadMore = () => {
        return (
            <LoadMoreComponent
                pageInfo={pageInfo}
                posts={posts}
                postsPerPage={POSTS_PER_PAGE}
                query={GET_POSTS_BY_TAGS}
                tag={slug}
                newDataCallback={(data?: any, pageInformation?: any) => {
                    setPosts(data);
                    setPageInfo(pageInformation);
                }}
            />
        );
    };

    return (
        <>
            <SEO title={toCapitalize(pageTitle)} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/articles/blog-grid-sidebar", label: "blog" },
                ]}
                currentPage={pageTitle}
                title={`Tag: ${pageTitle}`}
            />
            <BlogArea
                data={{
                    blogs: posts,
                    recentPosts,
                    tags,
                }}
                loadMore={<LoadMore />}
            />
        </>
    );
};

BlogTagPage.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: tagsData } = await client.query({
        query: GET_ALL_TAGS,
        variables: {
            count: 100,
        },
    });

    return {
        paths: tagsData?.tags?.nodes.map(({ slug }: { slug: string }) => {
            return {
                params: {
                    tag: slug,
                },
            };
        }),
        fallback: "blocking",
    };
};

type Params = {
    params: {
        tag: string;
    };
};

export const getStaticProps = async ({ params }: Params) => {
    const { data: postsData } = await client.query({
        query: GET_POSTS_BY_TAGS,
        variables: {
            count: POSTS_PER_PAGE,
            tag: params?.tag,
        },
    });
    const transformedData = transformPostData(postsData);

    const { data: recentPostsData } = await client.query({
        query: GET_ALL_POSTS,
        variables: {
            count: 5,
        },
    });
    const transformedRecentPosts = transformPostData(recentPostsData);

    const { data: tagsData } = await client.query({
        query: GET_ALL_TAGS,
        variables: {
            count: 20,
        },
    });

    return {
        props: {
            data: {
                blogs: transformedData,
                recentPosts: transformedRecentPosts,
                tags: tagsData?.tags?.nodes,
                pageTitle: unslugify(params.tag),
                slug: params.tag,
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

export default BlogTagPage;
