const flatListToHierarchical = (
    data = [],
    { idKey = "key", parentKey = "parentId", childrenKey = "children" } = {}
) => {
    const tree: any = [];
    const childrenOf: any = {};
    data.forEach((item?: any) => {
        const newItem: any = { ...item };
        const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
        childrenOf[id] = childrenOf[id] || [];
        newItem[childrenKey] = childrenOf[id];
        parentId
            ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
            : tree.push(newItem);
    });
    return tree;
};

export const removeCategoryString = (uri: string) => {
    return uri.replace("/category", "");
};

export default flatListToHierarchical;
