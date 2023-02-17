import { useState, useEffect, useCallback } from "react";
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import SEO from "@components/seo/page-seo";
import Spinner from "@ui/spinner";
import Layout01 from "@layout/layout";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-05";
import { IBlog } from "@utils/types";
import { getAllBlogs } from "../../lib/blog";
import { GET_ALL_POSTS } from "../../queries/posts";
import { useLazyQuery } from "@apollo/client";
import transformPostData from "@utils/transformReceivedData";
import LoadMorePosts from "@components/loadMore/loadMorePosts";

type TProps = {
    data: {
        blogs: IBlog[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 9;

const BlogSearch: PageProps = ({ data }) => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [pageInfo, setPageInfo] = useState([]);
    const [searchError, setSearchError] = useState("");
    const router = useRouter();
    const { s } = router.query;

    const [fetchPosts, { loading }] = useLazyQuery(GET_ALL_POSTS, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data?: any) => {
            let newD = transformPostData(data);
            setBlogs(newD);
            setPageInfo(data?.posts?.pageInfo);
        },
        onError: (error?: any) => {
            setSearchError(error?.graphQLErrors ?? "");
        },
    });

    const filterCourses = useCallback(() => {
        if (s) {
            fetchPosts({
                variables: {
                    count: POSTS_PER_PAGE,
                    keyword: s,
                },
            });
        }
    }, [data.blogs, s]);

    useEffect(() => {
        filterCourses();
    }, [filterCourses]);

    if (loading) {
        return (
            <div className="tw-w-full tw-h-screen tw-flex tw-justify-center tw-items-center">
                <Spinner />
            </div>
        );
    }
    const title = s ? `Search results for: ${s as string}` : "Search";
    return (
        <>
            <SEO title={title} />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage={title}
            />
            <BlogArea
                data={{
                    blogs,
                }}
            />
            <LoadMorePosts
                pageInfo={pageInfo}
                posts={blogs}
                postsPerPage={POSTS_PER_PAGE}
                query={GET_ALL_POSTS}
                keyword={s}
                newDataCallback={(data?: any, pageInformation?: any) => {
                    setBlogs(data);
                    setPageInfo(pageInformation);
                }}
            />
        </>
    );
};

BlogSearch.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    // const { blogs } = getAllBlogs([
    //     "title",
    //     "image",
    //     "category",
    //     "postedAt",
    //     "views",
    //     "content",
    // ]);

    return {
        props: {
            data: {},
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default BlogSearch;
