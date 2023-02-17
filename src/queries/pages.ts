import { gql } from "@apollo/client";

// const DIGITAL_EDITION=69547;
// const EVENTS_PROMOTIONS=645;
// const MEDIA_KIT=647;
// const GAFENCU_ARCHIVE=69553;
// const ADVERTISE=625;
// const CAREERS=653;
// const TERMS_OF_USE=69543;
// const PRIVACY_POLICY=30014;
// const ABOUT_US=655;

export const GET_ALL_PAGES = gql`
    query Pages {
        pages(
            where: { in: [69547, 645, 647, 69553, 625, 653, 69543, 30014, 655] }
        ) {
            edges {
                node {
                    databaseId
                    slug
                }
            }
        }
    }
`;

export const GET_PAGE_BY_URI = gql`
    query Page($uri: String) {
        pageBy(uri: $uri) {
            slug
            title
            id
            content
        }
    }
`;
