import { gql } from "@apollo/client";

export const GET_LATEST_VIDEOS = gql`
    query LatestVideos($count: Int, $after: String) {
        posts(where: { categoryName: "video" }, first: $count, after: $after) {
            edges {
                node {
                    id
                    title
                    slug
                    featuredVideo {
                        sourceHtml
                        mediaType
                        sourceUrl
                    }
                    featuredImage {
                        node {
                            sourceUrl
                            caption
                            mediaDetails {
                                height
                                width
                            }
                        }
                    }
                    categories(first: 1) {
                        nodes {
                            id
                            slug
                            name
                        }
                    }
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`;
