import _ from "lodash";

const transformPostData = (data?: any) => {
    const newObj = data?.posts?.edges.map(({ node }: { node?: any }) => {
        return {
            ...node,
        };
    });
    return newObj;
};

export const transformData = (data?: any) => {
    const newObj = data?.edges.map(({ node }: { node?: any }) => {
        return {
            ...node,
        };
    });
    return newObj;
};

export const transformFeaturedData = (
    topStories?: any,
    latestUpdate?: any,
    topHighlights?: any
) => {
    let topStoriesData = transformPostData(topStories)[0];
    let latestUpdateData = transformPostData(latestUpdate)[0];
    let topHighlightsData = transformPostData(topHighlights)[0];
    let finalArray = [];
    if (topStoriesData) {
        finalArray.push({
            ...topStoriesData,
            category: "Top Stories",
        });
    }
    if (latestUpdateData) {
        finalArray.push({
            ...latestUpdateData,
            category: "Latest Update",
        });
    }
    if (topHighlightsData) {
        finalArray.push({
            ...topHighlightsData,
            category: "Top Highlights",
        });
    }
    return finalArray;
};

export const transformCategoryData = (data?: any) => {
    const newObj = data?.categories?.nodes?.map((node?: any) => {
        //    if(node?.parent){
        //     return {
        //         params:{
        //             category:node?.parent?.node?.slug,
        //             subcategory:node?.slug
        //         }
        //     }
        //    }
        if (node?.parent === null) {
            return {
                params: {
                    category: node?.slug,
                },
            };
        }
    });

    return _.compact(newObj);
};

export const transformSubcategoryData = (data?: any) => {
    const newObj = data?.categories?.nodes?.map((node?: any) => {
        if (node?.parent) {
            return {
                params: {
                    category: node?.parent?.node?.slug,
                    subcategory: node?.slug,
                },
            };
        }
        return undefined;
    });
    return _.compact(newObj);
};

export const transformPagesData = (data?: any) => {
    const newObj = data?.edges.map(({ node }: { node?: any }) => {
        return {
            params: {
                slug: [node?.slug],
            },
        };
    });
    return newObj;
};

export default transformPostData;
