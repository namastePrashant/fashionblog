import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout";
import BlogDetailsArea from "@containers/blog-details";
import BlogSidebar from "@containers/blog-details/blog-sidebar";
import { IBlog, IInstructor } from "@utils/types";
import { toCapitalize } from "@utils/methods";
import client from "../../../apollo/apolloClient";
import {
    GET_ALL_POSTS_SLUG,
    GET_POST_BY_SLUG,
    GET_RELATED_POSTS,
} from "queries/posts";
import { GET_ALL_TAGS } from "queries/tags";
import { GET_ARTICLE_DETAIL_ADVERTISEMENTS } from "queries/advertisement";
import transformPostData from "@utils/transformReceivedData";

type TProps = {
    data: {
        blog: any;
        author: IInstructor;
        posts: IBlog[];
        tags: any;
        ad: any;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const ArticleDetails: PageProps = ({ data: { blog, posts, tags, ad } }) => {
    return (
        <>
            <SEO
                title={toCapitalize(blog.title)}
                description={blog?.excerpt}
                jsonLdType="article"
                article={{
                    publishedTime: blog.date,
                    modifiedTime: blog.date,
                    authors: [blog?.author?.node?.name],
                    tags: tags.map((tag?: any) => tag?.name),
                }}
                image={`${blog?.featuredImage?.node?.sourceUrl}`}
            />
            <div className="container">
                <div className="col-12">
                    <BlogDetailsArea ad={ad} {...blog} />
                </div>
            </div>
            <section className="additional default-space">
                <div className="container">
                    <h2>Read More</h2>
                    <BlogSidebar posts={posts} className="recent" />
                </div>
            </section>
        </>
    );
};

ArticleDetails.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: postsSlugData } = await client.query({
        query: GET_ALL_POSTS_SLUG,
        variables: {
            count: 30,
        },
    });

    return {
        paths: postsSlugData?.posts?.nodes.map(
            ({ slug }: { slug?: string }) => {
                return {
                    params: {
                        slug,
                    },
                };
            }
        ),
        fallback: "blocking",
    };
};

type Params = {
    params: {
        slug: string;
    };
};

export const getStaticProps = async ({ params }: Params) => {
    const { data: postData } = await client.query({
        query: GET_POST_BY_SLUG,
        variables: {
            slug: params?.slug,
        },
    });

    const { data: relatedPostsData } = await client.query({
        query: GET_RELATED_POSTS,
        variables: {
            count: 5,
            categoryIn: [postData?.postBy?.categories?.nodes[0]?.id],
            notIn: postData?.postBy?.id,
        },
    });
    const transformedRelatedPosts = transformPostData(relatedPostsData);

    const { data: adData } = await client.query({
        query: GET_ARTICLE_DETAIL_ADVERTISEMENTS,
    });

    const { data: tagsData } = await client.query({
        query: GET_ALL_TAGS,
        variables: {
            count: 20,
        },
    });

    return {
        props: {
            data: {
                blog: postData?.postBy,
                posts: transformedRelatedPosts,
                tags: tagsData?.tags?.nodes,
                ad: adData,
            },
        },
    };
};

export default ArticleDetails;
