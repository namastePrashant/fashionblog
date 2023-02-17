import { gql } from "@apollo/client";
import { PostFragment } from "./fragments/post";
import { AuthorFragment } from "./fragments/author";

export const GET_POSTS_BY_CATEGORIES = gql`
    query PostsByCategory($name: String, $count: Int, $after: String) {
        posts(where: { categoryName: $name }, first: $count, after: $after) {
            edges {
                node {
                    ...PostFragment
                    author {
                        node {
                            ...AuthorFragment
                        }
                    }
                    categories(first: 1) {
                        edges {
                            node {
                                id
                                slug
                                name
                            }
                        }
                    }
                    content
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
    ${PostFragment}
    ${AuthorFragment}
`;

export const GET_ALL_POSTS = gql`
    query Posts($count: Int, $keyword: String, $after: String) {
        posts(first: $count, where: { search: $keyword }, after: $after) {
            edges {
                node {
                    ...PostFragment
                    author {
                        node {
                            ...AuthorFragment
                        }
                    }
                    date
                    categories {
                        edges {
                            node {
                                slug
                                name
                                id
                            }
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
    ${PostFragment}
    ${AuthorFragment}
`;

export const GET_POST_BY_SLUG = gql`
    query Post($slug: String) {
        postBy(slug: $slug) {
            ...PostFragment
            content
            author {
                node {
                    ...AuthorFragment
                }
            }
            categories {
                nodes {
                    name
                    slug
                    uri
                    id
                }
            }
            tags {
                nodes {
                    slug
                    name
                }
            }
        }
    }
    ${PostFragment}
    ${AuthorFragment}
`;

export const GET_ALL_POSTS_SLUG = gql`
    query GetAllPostsSlug($count: Int) {
        posts(first: $count) {
            nodes {
                slug
                date
                uri
            }
        }
    }
`;

export const GET_POSTS_BY_TAGS = gql`
    query PostsByTag($tag: String, $count: Int, $after: String) {
        posts(where: { tag: $tag }, first: $count, after: $after) {
            edges {
                node {
                    ...PostFragment
                    author {
                        node {
                            ...AuthorFragment
                        }
                    }
                    content
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
    ${PostFragment}
    ${AuthorFragment}
`;

export const GET_POSTS_BY_AUTHOR = gql`
    query PostsByAuthor($author: Int, $count: Int, $after: String) {
        posts(where: { author: $author }, first: $count, after: $after) {
            edges {
                node {
                    ...PostFragment
                    author {
                        node {
                            ...AuthorFragment
                        }
                    }
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
    ${PostFragment}
    ${AuthorFragment}
`;

export const GET_RELATED_POSTS = gql`
    query RelatedPosts($categoryIn: [ID], $notIn: [ID], $count: Int) {
        posts(
            first: $count
            where: { categoryIn: $categoryIn, notIn: $notIn }
        ) {
            edges {
                node {
                    ...PostFragment
                }
            }
        }
    }
    ${PostFragment}
`;
