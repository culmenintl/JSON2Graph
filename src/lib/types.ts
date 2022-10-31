export interface NodeData {
    key: string;
    label?: string;
    tag?: string;
    URL?: string;
    cluster?: string;
    x?: number;
    y?: number;
}

export interface Cluster {
    key: string;
    color: string;
    clusterLabel: string;
}

export interface Tag {
    key: string;
    image: string;
}

export interface Dataset {
    nodes: NodeData[];
    edges: [Edges];
    clusters?: Cluster[];
    tags?: Tag[];
}

export interface Edges {
    source: string;
    target: string;
}

export interface FiltersState {
    clusters: Record<string, boolean>;
    tags: Record<string, boolean>;
}

export interface RedditNode {
    author: string;
    id: string;
    score_hidden: boolean;
    name: string;
    link_id: string;
    body: string;
    downs: number;
    created_utc: string;
    score: number;
    distinguished: null;
    archived: false;
    parent_id: string;
    subreddit: string;
    author_flair_css_class: null;
    another_flair_text: null;
    gilded: number;
    retrieved_on: number;
    ups: number;
    controversiality: number;
    subreddit_id: string;
    edited: boolean;
}
