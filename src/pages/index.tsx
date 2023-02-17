import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Layout from "@layout/layout";
import SEO from "@components/seo/page-seo";
import HeroArea from "@containers/hero/layout-07";
import VideoArea from "@containers/video/layout-02";
import BlogArea from "@containers/blog/layout-03";
import CategoryArea from "@containers/blog/category";
import { IBlog, ICourse } from "@utils/types";
import transformPostData, {
    transformFeaturedData,
    transformData,
} from "@utils/transformReceivedData";
import Advertisement from "@components/ad/advertisement";
import client from "../../apollo/apolloClient";
import { getPageData } from "../lib/page";
import { GET_POSTS_BY_CATEGORIES, GET_ALL_POSTS } from "queries/posts";
import { GET_HOME_ADVERTISEMENTS } from "queries/advertisement";
import { GET_LATEST_PRODUCTS } from "queries/products";
import { GET_LATEST_VIDEOS } from "queries/videos";

interface PageContent {
    section: string;
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
        courses: ICourse[];
        popularCourse: ICourse;
        power: IBlog[];
        fashion: IBlog[];
        shop: IBlog[];
        blogs: IBlog[];
        className: string;
        ads?: any;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const Home: PageProps = ({ data }: { data?: any }) => {
    const shop = transformData(data?.shopData?.products);
    const fashion = transformPostData(data?.fashionData);
    const allData = transformPostData(data?.allData);
    const videoData = transformPostData(data?.videoData);
    const powerData = transformPostData(data?.powerData);
    const featuredData = transformFeaturedData(
        data?.topStoriesData,
        data?.latestUpdateData,
        data?.topHighlightsData
    );

    return (
        <>
            <SEO title="Gafencu Home Page" />
            <HeroArea data={{ items: featuredData }} />
            <Advertisement
                data={data?.ads?.adBelowHomeSlider}
                className="vertical"
            />
            <BlogArea
                data={{
                    section_title: { title: "The Latest" },
                    blogs: allData.slice(0, 4),
                    adData: data?.ads?.adHomeAsideLatestFirst,
                }}
            />
            <VideoArea
                data={{
                    section_title: { title: "Videos" },
                    posts: videoData,
                }}
            />
            <Advertisement
                data={data?.ads?.adBelowHomeVideos}
                className="vertical"
            />
            <BlogArea
                data={{
                    // section_title: { title: 'The Latest' },
                    blogs: allData.slice(4, 8),
                    adData: data?.ads?.adHomeAsideLatestSecond,
                }}
            />
            <CategoryArea
                data={{
                    section_title: { title: "Power 300" },
                    posts: { posts: powerData, count: powerData.length },
                }}
                className="power"
            />
            <Advertisement
                data={data?.ads?.adBelowHomePower300}
                className="vertical"
            />
            <BlogArea
                data={{
                    // section_title: { title: 'The Latest' },
                    blogs: allData.slice(8, 12),
                    adData: data?.ads?.adHomeAsideLatestThird,
                }}
            />
            <CategoryArea
                data={{
                    section_title: { title: "Fashion" },
                    posts: { posts: fashion, count: fashion?.length },
                }}
                className="fashion"
            />
            <Advertisement
                data={data?.ads?.adBelowHomeFashion}
                className="vertical"
            />
            <BlogArea
                data={{
                    // section_title: { title: 'The Latest' },
                    blogs: allData.slice(12, 16),
                    adData: data?.ads?.adHomeAsideLatestFourth,
                }}
            />
            <CategoryArea
                data={{
                    section_title: { title: "Shop at Gafencu" },
                    posts: { posts: shop, count: shop?.length },
                }}
                className="shop"
                category="shop"
            />
        </>
    );
};

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async () => {
    const page = getPageData("home", "index");

    const { data: shopData } = await client.query({
        query: GET_LATEST_PRODUCTS,
    });

    const { data: fashionData } = await client.query({
        query: GET_POSTS_BY_CATEGORIES,
        variables: {
            name: "Fashion",
            count: 4,
        },
    });
    const { data: powerData } = await client.query({
        query: GET_POSTS_BY_CATEGORIES,
        variables: {
            name: "Power-300",
            count: 4,
        },
    });

    const { data: allData } = await client.query({
        query: GET_ALL_POSTS,
        variables: {
            count: 16,
        },
    });

    const { data: topStoriesData } = await client.query({
        query: GET_POSTS_BY_CATEGORIES,
        variables: {
            name: "Top Stories",
            count: 1,
        },
    });

    const { data: topHighlightsData } = await client.query({
        query: GET_POSTS_BY_CATEGORIES,
        variables: {
            name: "Top Highlights",
            count: 1,
        },
    });

    const { data: videoData } = await client.query({
        query: GET_LATEST_VIDEOS,
        variables: {
            count: 5,
        },
    });

    const { data: adData } = await client.query({
        query: GET_HOME_ADVERTISEMENTS,
    });

    const { data: latestUpdateData } = await client.query({
        query: GET_POSTS_BY_CATEGORIES,
        variables: {
            name: "Latest Update",
            count: 1,
        },
    });

    return {
        props: {
            data: {
                topStoriesData,
                topHighlightsData,
                latestUpdateData,
                page,
                allData,
                fashionData,
                videoData,
                shopData,
                powerData,
                ads: adData,
            },
        },
    };
};

export default Home;
