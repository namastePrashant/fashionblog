import { gql } from "@apollo/client";
import { AdvertisementFragment } from "./fragments/advertisement";

export const GET_HOME_ADVERTISEMENTS = gql`
    query AdLocationBySlug {
        adHomeMagazine: adLocation(id: "ad-home-magazine", idType: SLUG) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }
        adSingleSidebar: adLocation(id: "ad-single-sidebar", idType: SLUG) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }
        adBelowHomePower300: adLocation(
            id: "ad-below-home-power-300"
            idType: SLUG
        ) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }
        adBelowHomeSlider: adLocation(
            id: "ad-below-home-slider"
            idType: SLUG
        ) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }
        adHomeAsideLatestFirst: adLocation(
            id: "ad-home-aside-latest-first"
            idType: SLUG
        ) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }
        adHomeAsideLatestSecond: adLocation(
            id: "ad-home-aside-latest-second"
            idType: SLUG
        ) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }
        adHomeAsideLatestThird: adLocation(
            id: "ad-home-aside-latest-third"
            idType: SLUG
        ) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }
        adHomeAsideLatestFourth: adLocation(
            id: "ad-home-aside-latest-fourth"
            idType: SLUG
        ) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }

        adBelowHomeVideos: adLocation(
            id: "ad-below-home-videos"
            idType: SLUG
        ) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }
        adBelowHomeFashion: adLocation(
            id: "ad-below-home-fashion"
            idType: SLUG
        ) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }
    }
    ${AdvertisementFragment}
`;

export const GET_ARTICLE_DETAIL_ADVERTISEMENTS = gql`
    query AdLocationBySlug {
        adDetailAboveTitle: adLocation(
            id: "ad-article-detail-above-title"
            idType: SLUG
        ) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }
        adDetailAsideContent: adLocation(
            id: "ad-article-detail-aside-content"
            idType: SLUG
        ) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }
        adDetailBelowContent: adLocation(
            id: "ad-article-detail-below-content"
            idType: SLUG
        ) {
            adLocationId
            name
            slug
            isVisible {
                status
            }
            advertisements {
                edges {
                    node {
                        ...AdvertisementFragment
                    }
                }
            }
        }
    }
    ${AdvertisementFragment}
`;
