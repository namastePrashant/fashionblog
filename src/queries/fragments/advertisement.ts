export const AdvertisementFragment = `
    fragment AdvertisementFragment on Advertisement{ id
        databaseId
        title
        advertisement {
            adUrl
            adExpiry
            adImageDesktop {
                sourceUrl
                mediaDetails {
                    width
                    height
                }
                sizes
            }
            adImageMobile {
                sourceUrl
                mediaDetails {
                    width
                    height
                }
                sizes
            }
        }
    }
`;
