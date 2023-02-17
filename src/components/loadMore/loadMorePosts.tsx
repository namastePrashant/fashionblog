import React from "react";
import { useLazyQuery } from "@apollo/client";
import transformPostData, { transformData } from "@utils/transformReceivedData";

const error: any = false;

type LoadMoreProps = {
    pageInfo?: any;
    posts: any;
    postsPerPage?: number;
    query?: any;
    slug?: string;
    newDataCallback?: any;
    authorId?: number;
    tag?: string;
    keyword?: string;
};
const LoadMorePosts = ({
    pageInfo,
    posts,
    postsPerPage,
    query,
    slug,
    newDataCallback,
    authorId,
    tag,
    keyword,
}: LoadMoreProps) => {
    // const { hasNextPage, endCursor } = pageInfo;

    const [fetchPosts, { loading }] = useLazyQuery(query, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            if (data?.powerLists) {
                let newData = transformData(data?.powerLists);
                setPosts({
                    data: newData,
                    pageInfo: data?.powerLists?.pageInfo,
                });
                return;
            }
            let nData = transformPostData(data);
            setPosts({ data: nData, pageInfo: data?.posts?.pageInfo } ?? []);
        },
        onError: (error) => {
            console.log("error lazy here", error);
        },
    });

    const setPosts = (postData?: any) => {
        if (!postData?.data || !postData?.pageInfo) {
            return;
        }
        const newPosts = [...posts, ...postData?.data];
        newDataCallback(newPosts, postData?.pageInfo);
    };

    const handleLoadMore = () => {
        let variables: any = {
            count: postsPerPage,
            after: pageInfo?.endCursor,
        };
        if (slug) {
            variables = {
                ...variables,
                name: slug,
            };
        }
        if (authorId) {
            variables = {
                ...variables,
                author: authorId,
            };
        }
        if (tag) {
            variables = {
                ...variables,
                tag: tag,
            };
        }
        if (keyword) {
            variables = {
                ...variables,
                keyword: keyword,
            };
        }
        fetchPosts({
            variables: variables,
        });
    };

    return (
        <div className="load-more">
            {pageInfo?.hasNextPage ? (
                loading ? (
                    <div className="">
                        <div className="load-more__loader"></div>
                    </div>
                ) : (
                    <button
                        className="load-more__button"
                        onClick={handleLoadMore}
                    >
                        Load More
                    </button>
                )
            ) : (
                <>Looks like you have reached at the end of the list</>
            )}
            {error && (
                <div className="justify-center my-10">{error?.toString()}</div>
            )}
        </div>
    );
};

export default LoadMorePosts;
