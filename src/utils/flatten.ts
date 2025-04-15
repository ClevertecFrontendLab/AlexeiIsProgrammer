type TreeNode<T extends object> = T & {
    children?: TreeNode<T>[];
};

const flatten = <T extends object>(items: TreeNode<T>[]): T[] =>
    items.flatMap((item) => [item, ...(item.children ? flatten(item.children) : [])]);

export default flatten;
