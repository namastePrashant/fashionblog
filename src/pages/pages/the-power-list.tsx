import { useState, useEffect } from "react";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout";
import Breadcrumb from "@components/breadcrumb";
import { GET_POWER_LIST_USERS } from "queries/powerList";
import client from "../../../apollo/apolloClient";
import { transformData } from "@utils/transformReceivedData";
import PowerListCard from "@components/powerlist-card";
import LoadMorePosts from "@components/loadMore/loadMorePosts";
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash/debounce";
import LoadingComponent from "@components/loading";

type TProps = {
    data?: any;
    pageInfo?: any;
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const POSTS_PER_PAGE = 20;

const ThePowerList: PageProps = (props) => {
    const { data, pageInfo: pageData } = props;
    const [powerData, setPowerData] = useState([]);
    const [pageInfo, setPageInfo] = useState<any>(pageData);
    const [keyword, setKeyword] = useState();
    const [searchError, setSearchError] = useState("");

    const [fetchPowerList, { loading }] = useLazyQuery(GET_POWER_LIST_USERS, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data?: any) => {
            let newD = transformData(data?.powerLists);
            setPowerData(newD);
            setPageInfo(data?.powerLists?.pageInfo);
        },
        onError: (error?: any) => {
            setSearchError(error?.graphQLErrors ?? "");
        },
    });

    useEffect(() => {
        setPowerData(transformData(data?.powerLists));
    }, [data?.powerLists]);

    useEffect(() => {
        handleSearch();
    }, [keyword]);

    const handleSearch = () => {
        fetchPowerList({
            variables: {
                count: POSTS_PER_PAGE,
                keyword: keyword,
            },
        });
    };

    return (
        <>
            <SEO title="The Power List" />
            <Breadcrumb
                pages={[{ path: "/", label: "The Power List" }]}
                currentPage="The Power List"
            />
            <div className="tw-flex tw-items-center tw-justify-center search-container">
                <input
                    name="keyword"
                    placeholder="Search"
                    className="search-container__input"
                    onChange={debounce(
                        (val?: any) => setKeyword(val?.target?.value),
                        300
                    )}
                />
                {searchError ? (
                    <span className="error">{searchError?.toString()}</span>
                ) : (
                    <></>
                )}
                {loading ? (
                    <div className="search-loader">
                        <LoadingComponent />
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 g-4 power-list-section">
                    {powerData?.map((powerD?: any) => {
                        return (
                            <>
                                <PowerListCard data={powerD} />
                            </>
                        );
                    })}
                </div>
                <LoadMorePosts
                    pageInfo={pageInfo}
                    posts={powerData}
                    postsPerPage={POSTS_PER_PAGE}
                    query={GET_POWER_LIST_USERS}
                    newDataCallback={(data?: any, pageInformation?: any) => {
                        setPowerData(data);
                        setPageInfo(pageInformation);
                    }}
                />
            </div>
        </>
    );
};

ThePowerList.Layout = Layout;

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await client.query({
        query: GET_POWER_LIST_USERS,
        variables: {
            count: POSTS_PER_PAGE,
        },
    });

    return {
        props: {
            data: data,
            pageInfo: data?.powerLists?.pageInfo,
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default ThePowerList;
