import { gql } from "@apollo/client";

export const GET_AUTHOR_BY_SLUG = gql`
    query getAuthor($slug: ID!) {
        user(idType: SLUG, id: $slug) {
            slug
            name
            nicename
            id
            databaseId
            userId
        }
    }
`;

export const GET_ALL_AUTHORS = gql`
    query getAuthors($count: Int) {
        users(first: $count) {
            nodes {
                id
                slug
                name
                databaseId
                nicename
                userId
            }
        }
    }
`;
