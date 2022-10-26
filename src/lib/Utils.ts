import Graph from 'graphology';
import { RedditNode } from './types';

export const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
};

export const populateGraph = (data: [RedditNode]): Graph => {
    const graph: Graph = new Graph({ multi: true });
    data.forEach((node: RedditNode, index: number) => {
        // Create the commment body nodes, keyed off row id
        const comment = node.id;
        const subreddit = node.subreddit_id;
        const author = node.author;

        if (!graph.hasNode(comment)) {
            graph.addNode(comment, {
                label: node.body,
                tag: author,
                clusterLabel: 'Commented',
                ...node,
            });
        }

        // Create the subreddit nodes
        if (!graph.hasNode(subreddit)) {
            graph.addNode(subreddit, {
                label: node.subreddit,
                clusterLabel: 'Subreddit',
                ...node,
            });
        }
        // Create the author nodes
        // first param is key followed by all attributes in the RedditNode
        if (!graph.hasNode(author)) {
            graph.addNode(author, {
                label: author,
                clusterLabel: 'User',
                ...node,
            });
        }

        // now create the edges between author/comment and comment/subreddit
        graph.addEdge(author, comment);
        graph.addEdge(comment, subreddit);
    });

    return graph;
};

export const calculateDegreesAndColor = (graph: Graph) => {
    const degrees = graph.nodes().map((node) => graph.degree(node));
    const minDegree = Math.min(...degrees);
    const maxDegree = Math.max(...degrees);
    const minSize = 2,
        maxSize = 25;
    graph.forEachNode((node, attributes) => {
        // Add Colors
        const COLORS: Record<string, string> = {
            Commented: '#FA5A3D',
            Subreddit: '#5A75DB',
            User: '#5A85AB',
        };
        graph.setNodeAttribute(
            node,
            'color',
            COLORS[attributes.clusterLabel as string]
        );
        const degree = graph.degree(node);
        graph.setNodeAttribute(
            node,
            'size',
            minSize +
                ((degree - minDegree) / (maxDegree - minDegree)) *
                    (maxSize - minSize)
        );
    });
};

// currently calculated above
// export const applyColor = (graph: Graph) => {
//     // Add Colors
//     const COLORS: Record<string, string> = {
//         Commented: '#FA5A3D',
//         Subreddit: '#5A75DB',
//         User: '#5A85AB',
//     };
//     graph.forEachNode((node, attributes) =>
//         graph.setNodeAttribute(
//             node,
//             'color',
//             COLORS[attributes.clusterLabel as string]
//         )
//     );
// };
