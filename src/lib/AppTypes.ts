import { ComboConfig } from "@antv/g6"
import { IUserEdge, IUserNode } from "@antv/graphin"

export type ExtendedNode = IUserNode & {
    _metadata: {
        _data?: Record<string, unknown>
        _type?: string
        _title?: string
        _subtitle?: string
        _body?: string
        _clusterLabel?: string
        _clusterId?: string
        _clusterCount?: number
        _clusterColor?: string
        _clusterOpacity?: number
    }
}

export interface RedditNode {
    author: string
    id: string
    score_hidden: boolean
    name: string
    link_id: string
    body: string
    downs: number
    created_utc: string
    score: number
    distinguished: null
    archived: false
    parent_id: string
    subreddit: string
    author_flair_css_class: null
    another_flair_text: null
    gilded: number
    retrieved_on: number
    ups: number
    controversiality: number
    subreddit_id: string
    edited: boolean
}

interface ID_CONFIG {
    [key: string]: string | number | undefined | unknown
}

export interface _NodeConfig extends ID_CONFIG {
    // the property to use in the data for the node id
    id_data_property: string

    // readable name for the node
    // Author, Subreddit, User
    label: string

    // the property to use in the target data for the node data
    content_data_property: string

    // label for the node content
    content_label?: string

    // node display / style properties
    color?: string

    // color when node is selected
    selected_color?: string

    // color when node is highlighted
    highlight_color?: string

    // icon to use for the node
    icon?: string
}

export interface _EdgeConfig extends ID_CONFIG {
    source_node_id: string
    target_node_id: string
    label?: string
}

export type DataToGraphConfig = {
    id: string
    url: string
    description?: string
    data?: any
    nodeConfigs: _NodeConfig[]
    edgeConfigs: _EdgeConfig[]
}

export type _GraphData = {
    nodes: ExtendedNode[]
    edges: IUserEdge[]
    combos: ComboConfig[]
}

export enum STATUS {
    DONE = "Done",
    FETCHING = "Fetching Data",
    SHAPING = "Creating Graph",
    SIMULATING = "Simulating...",
    GRAPH_SIMULATED = "Graph Simulated",
}

export interface ThemeColors {
    primary: string
    secondary: string
    accent: string
    neutral: string
    primaryContent: string
    secondaryContent: string
    accentContent: string
    neutralContent: string
    neutralFocus: string
    base100: string
    base200: string
    base300: string
    baseContent: string
    info: string
    success: string
    warning: string
    error: string
    colorScheme: "light" | "dark"
}

export enum NODE_COLORS {
    primary = "primary",
    secondary = "secondary",
    accent = "accent",
    neutral = "neutral",
}

export enum CONTENT_COLORS {
    primaryContent = "primaryContent",
    secondaryContent = "secondaryContent",
    accentContent = "accentContent",
    neutralContent = "neutralContent",
}

// [
//     ({
//         main: "#F20D0D",
//         complement: "#5CD6D6",
//     },
//     {
//         main: "#F2D40D",
//         complement: "#5C6CD6",
//     },
//     {
//         main: "#4EF20D",
//         complement: "#B45CD6",
//     },
//     {
//         main: "#0DF293",
//         complement: "#D65C8F",
//     },
//     {
//         main: "#0D8FF2",
//         complement: "#D6915C",
//     },
//     {
//         main: "#520DF2",
//         complement: "#B1D65C",
//     },
//     {
//         main: "#F20DD0",
//         complement: "#5CD66E",
//     })
// ]
// method to strip out everything before the equals sign and the ]

// {
//     ;("[data-theme=aqua]")
//     :
//     {
//         ;("color-scheme")
//         : "dark",
//         "primary": "#09ecf3",
//         "primary-content": "#005355",
//         "secondary": "#966fb3",
//         "accent": "#ffe999",
//         "neutral": "#3b8ac4",
//         "base-100": "#345da7",
//         "info": "#2563eb",
//         "success": "#16a34a",
//         "warning": "#d97706",
//         "error": "#dc2626"
//     }
//     ,
//     "[data-theme=black]":
//     {
//         ;("color-scheme")
//         : "dark",
//         "primary": "#343232",
//         "secondary": "#343232",
//         "accent": "#343232",
//         "base-100": "#000000",
//         "base-200": "#0D0D0D",
//         "base-300": "#1A1919",
//         "neutral": "#272626",
//         "neutral-focus": "#343232",
//         "info": "#0000ff",
//         "success": "#008000",
//         "warning": "#ffff00",
//         "error": "#ff0000",
//         "--rounded-box": "0",
//         "--rounded-btn": "0",
//         "--rounded-badge": "0",
//         "--animation-btn": "0",
//         "--animation-input": "0",
//         "--btn-text-case": "lowercase",
//         "--btn-focus-scale": "1",
//         "--tab-radius": "0"
//     }
//     ,
//     "[data-theme=bumblebee]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#f9d72f",
//         "primary-content": "#181830",
//         "secondary": "#e0a82e",
//         "secondary-content": "#181830",
//         "accent": "#DC8850",
//         "neutral": "#181830",
//         "base-100": "#ffffff"
//     }
//     ,
//     "[data-theme=cmyk]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#45AEEE",
//         "secondary": "#E8488A",
//         "accent": "#FFF232",
//         "neutral": "#1a1a1a",
//         "base-100": "#ffffff",
//         "info": "#4AA8C0",
//         "success": "#823290",
//         "warning": "#EE8133",
//         "error": "#E93F33"
//     }
//     ,
//     "[data-theme=corporate]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#4b6bfb",
//         "secondary": "#7b92b2",
//         "accent": "#67cba0",
//         "neutral": "#181a2a",
//         "neutral-content": "#edf2f7",
//         "base-100": "#ffffff",
//         "base-content": "#181a2a",
//         "--rounded-box": "0.25rem",
//         "--rounded-btn": ".125rem",
//         "--rounded-badge": ".125rem",
//         "--animation-btn": "0",
//         "--animation-input": "0",
//         "--btn-focus-scale": "1"
//     }
//     ,
//     "[data-theme=cupcake]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#65c3c8",
//         "secondary": "#ef9fbc",
//         "accent": "#eeaf3a",
//         "neutral": "#291334",
//         "base-100": "#faf7f5",
//         "base-200": "#efeae6",
//         "base-300": "#e7e2df",
//         "base-content": "#291334",
//         "--rounded-btn": "1.9rem",
//         "--tab-border": "2px",
//         "--tab-radius": ".5rem"
//     }
//     ,
//     "[data-theme=cyberpunk]":
//     {
//         ;("color-scheme")
//         : "light",
//         "fontFamily": "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
//         "primary": "#ff7598",
//         "secondary": "#75d1f0",
//         "accent": "#c07eec",
//         "neutral": "#423f00",
//         "neutral-content": "#ffee00",
//         "base-100": "#ffee00",
//         "--rounded-box": "0",
//         "--rounded-btn": "0",
//         "--rounded-badge": "0",
//         "--tab-radius": "0"
//     }
//     ,
//     "[data-theme=dark]":
//     {
//         ;("color-scheme")
//         : "dark",
//         "primary": "#661AE6",
//         "primary-content": "#ffffff",
//         "secondary": "#D926AA",
//         "secondary-content": "#ffffff",
//         "accent": "#1FB2A5",
//         "accent-content": "#ffffff",
//         "neutral": "#2a323c",
//         "neutral-focus": "#242b33",
//         "neutral-content": "#A6ADBB",
//         "base-100": "#1d232a",
//         "base-200": "#191e24",
//         "base-300": "#15191e",
//         "base-content": "#A6ADBB"
//     }
//     ,
//     "[data-theme=dracula]":
//     {
//         ;("color-scheme")
//         : "dark",
//         "primary": "#ff79c6",
//         "secondary": "#bd93f9",
//         "accent": "#ffb86c",
//         "neutral": "#414558",
//         "base-100": "#282a36",
//         "base-content": "#f8f8f2",
//         "info": "#8be9fd",
//         "success": "#50fa7b",
//         "warning": "#f1fa8c",
//         "error": "#ff5555"
//     }
//     ,
//     "[data-theme=emerald]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#66cc8a",
//         "primary-content": "#223D30",
//         "secondary": "#377cfb",
//         "secondary-content": "#f9fafb",
//         "accent": "#ea5234",
//         "accent-content": "#f9fafb",
//         "neutral": "#333c4d",
//         "neutral-content": "#f9fafb",
//         "base-100": "#ffffff",
//         "base-content": "#333c4d",
//         "--animation-btn": "0",
//         "--animation-input": "0",
//         "--btn-focus-scale": "1"
//     }
//     ,
//     "[data-theme=fantasy]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#6e0b75",
//         "secondary": "#007ebd",
//         "accent": "#f8860d",
//         "neutral": "#1f2937",
//         "base-100": "#ffffff",
//         "base-content": "#1f2937"
//     }
//     ,
//     "[data-theme=forest]":
//     {
//         ;("color-scheme")
//         : "dark",
//         "primary": "#1eb854",
//         "primary-content": "#000000",
//         "secondary": "#1DB88E",
//         "accent": "#1DB8AB",
//         "neutral": "#19362D",
//         "base-100": "#171212",
//         "--rounded-btn": "1.9rem"
//     }
//     ,
//     "[data-theme=garden]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#F40076",
//         "secondary": "#8E4162",
//         "accent": "#5c7f67",
//         "neutral": "#291E00",
//         "neutral-content": "#e9e7e7",
//         "base-100": "#e9e7e7",
//         "base-content": "#100f0f"
//     }
//     ,
//     "[data-theme=halloween]":
//     {
//         ;("color-scheme")
//         : "dark",
//         "primary": "#f28c18",
//         "primary-content": "#131616",
//         "secondary": "#6d3a9c",
//         "accent": "#51a800",
//         "accent-content": "#000000",
//         "neutral": "#2F1B05",
//         "base-100": "#212121",
//         "info": "#2563eb",
//         "success": "#16a34a",
//         "warning": "#d97706",
//         "error": "#dc2626"
//     }
//     ,
//     "[data-theme=light]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#570df8",
//         "primary-content": "#E0D2FE",
//         "secondary": "#f000b8",
//         "secondary-content": "#FFD1F4",
//         "accent": "#1ECEBC",
//         "accent-content": "#07312D",
//         "neutral": "#2B3440",
//         "neutral-content": "#D7DDE4",
//         "base-100": "#ffffff",
//         "base-200": "#F2F2F2",
//         "base-300": "#E5E6E6",
//         "base-content": "#1f2937"
//     }
//     ,
//     "[data-theme=lofi]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#0D0D0D",
//         "primary-content": "#ffffff",
//         "secondary": "#1A1919",
//         "secondary-content": "#ffffff",
//         "accent": "#262626",
//         "accent-content": "#ffffff",
//         "neutral": "#000000",
//         "neutral-content": "#ffffff",
//         "base-100": "#ffffff",
//         "base-200": "#F2F2F2",
//         "base-300": "#E6E5E5",
//         "base-content": "#000000",
//         "info": "#0070F3",
//         "info-content": "#ffffff",
//         "success": "#21CC51",
//         "success-content": "#000000",
//         "warning": "#FF6154",
//         "warning-content": "#ffffff",
//         "error": "#DE1C8D",
//         "error-content": "#ffffff",
//         "--rounded-box": "0.25rem",
//         "--rounded-btn": "0.125rem",
//         "--rounded-badge": "0.125rem",
//         "--animation-btn": "0",
//         "--animation-input": "0",
//         "--btn-focus-scale": "1",
//         "--tab-radius": "0"
//     }
//     ,
//     "[data-theme=luxury]":
//     {
//         ;("color-scheme")
//         : "dark",
//         "primary": "#ffffff",
//         "secondary": "#152747",
//         "accent": "#513448",
//         "neutral": "#331800",
//         "neutral-content": "#FFE7A3",
//         "base-100": "#09090b",
//         "base-200": "#171618",
//         "base-300": "#2e2d2f",
//         "base-content": "#dca54c",
//         "info": "#66c6ff",
//         "success": "#87d039",
//         "warning": "#e2d562",
//         "error": "#ff6f6f"
//     }
//     ,
//     "[data-theme=pastel]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#d1c1d7",
//         "secondary": "#f6cbd1",
//         "accent": "#b4e9d6",
//         "neutral": "#70acc7",
//         "base-100": "#ffffff",
//         "base-200": "#f9fafb",
//         "base-300": "#d1d5db",
//         "--rounded-btn": "1.9rem"
//     }
//     ,
//     "[data-theme=retro]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#ef9995",
//         "primary-content": "#282425",
//         "secondary": "#a4cbb4",
//         "secondary-content": "#282425",
//         "accent": "#DC8850",
//         "accent-content": "#282425",
//         "neutral": "#2E282A",
//         "neutral-content": "#EDE6D4",
//         "base-100": "#e4d8b4",
//         "base-200": "#DBCA9A",
//         "base-300": "#D4BF87",
//         "base-content": "#282425",
//         "info": "#2563eb",
//         "success": "#16a34a",
//         "warning": "#d97706",
//         "error": "#dc2626",
//         "--rounded-box": "0.4rem",
//         "--rounded-btn": "0.4rem",
//         "--rounded-badge": "0.4rem"
//     }
//     ,
//     "[data-theme=synthwave]":
//     {
//         ;("color-scheme")
//         : "dark",
//         "primary": "#e779c1",
//         "secondary": "#58c7f3",
//         "accent": "#f3cc30",
//         "neutral": "#221551",
//         "neutral-content": "#f9f7fd",
//         "base-100": "#1a103d",
//         "base-content": "#f9f7fd",
//         "info": "#53c0f3",
//         "info-content": "#201047",
//         "success": "#71ead2",
//         "success-content": "#201047",
//         "warning": "#f3cc30",
//         "warning-content": "#201047",
//         "error": "#e24056",
//         "error-content": "#f9f7fd"
//     }
//     ,
//     "[data-theme=valentine]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#e96d7b",
//         "secondary": "#a991f7",
//         "accent": "#88dbdd",
//         "neutral": "#af4670",
//         "neutral-content": "#f0d6e8",
//         "base-100": "#f0d6e8",
//         "base-content": "#632c3b",
//         "info": "#2563eb",
//         "success": "#16a34a",
//         "warning": "#d97706",
//         "error": "#dc2626",
//         "--rounded-btn": "1.9rem"
//     }
//     ,
//     "[data-theme=wireframe]":
//     {
//         ;("color-scheme")
//         : "light",
//         "fontFamily": "Chalkboard,comic sans ms,\"sanssecondaryerif\"",
//         "primary": "#b8b8b8",
//         "secondary": "#b8b8b8",
//         "accent": "#b8b8b8",
//         "neutral": "#ebebeb",
//         "base-100": "#ffffff",
//         "base-200": "#eeeeee",
//         "base-300": "#dddddd",
//         "info": "#0000ff",
//         "success": "#008000",
//         "warning": "#a6a659",
//         "error": "#ff0000",
//         "--rounded-box": "0.2rem",
//         "--rounded-btn": "0.2rem",
//         "--rounded-badge": "0.2rem",
//         "--tab-radius": "0.2rem"
//     }
//     ,
//     "[data-theme=autumn]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#8C0327",
//         "secondary": "#D85251",
//         "accent": "#D59B6A",
//         "neutral": "#826A5C",
//         "base-100": "#f1f1f1",
//         "info": "#42ADBB",
//         "success": "#499380",
//         "warning": "#E97F14",
//         "error": "#DF1A2F"
//     }
//     ,
//     "[data-theme=business]":
//     {
//         ;("color-scheme")
//         : "dark",
//         "primary": "#1C4E80",
//         "secondary": "#7C909A",
//         "accent": "#EA6947",
//         "neutral": "#23282E",
//         "base-100": "#202020",
//         "info": "#0091D5",
//         "success": "#6BB187",
//         "warning": "#DBAE59",
//         "error": "#AC3E31",
//         "--rounded-box": "0.25rem",
//         "--rounded-btn": ".125rem",
//         "--rounded-badge": ".125rem"
//     }
//     ,
//     "[data-theme=acid]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#FF00F4",
//         "secondary": "#FF7400",
//         "accent": "#CBFD03",
//         "neutral": "#191A3F",
//         "base-100": "#fafafa",
//         "info": "#3194F6",
//         "success": "#5FC992",
//         "warning": "#F7DE2D",
//         "error": "#E60300",
//         "--rounded-box": "1.25rem",
//         "--rounded-btn": "1rem",
//         "--rounded-badge": "1rem"
//     }
//     ,
//     "[data-theme=lemonade]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#519903",
//         "secondary": "#E9E92E",
//         "accent": "#F7F9CA",
//         "neutral": "#191A3F",
//         "base-100": "#ffffff",
//         "info": "#C8E1E7",
//         "success": "#DEF29F",
//         "warning": "#F7E589",
//         "error": "#F2B6B5"
//     }
//     ,
//     "[data-theme=night]":
//     {
//         ;("color-scheme")
//         : "dark",
//         "primary": "#38bdf8",
//         "secondary": "#818CF8",
//         "accent": "#F471B5",
//         "neutral": "#1E293B",
//         "neutral-focus": "#273449",
//         "base-100": "#0F172A",
//         "info": "#0CA5E9",
//         "info-content": "#000000",
//         "success": "#2DD4BF",
//         "warning": "#F4BF50",
//         "error": "#FB7085"
//     }
//     ,
//     "[data-theme=coffee]":
//     {
//         ;("color-scheme")
//         : "dark",
//         "primary": "#DB924B",
//         "secondary": "#263E3F",
//         "accent": "#10576D",
//         "neutral": "#120C12",
//         "base-100": "#20161F",
//         "base-content": "#756E63",
//         "info": "#8DCAC1",
//         "success": "#9DB787",
//         "warning": "#FFD25F",
//         "error": "#FC9581"
//     }
//     ,
//     "[data-theme=winter]":
//     {
//         ;("color-scheme")
//         : "light",
//         "primary": "#047AFF",
//         "secondary": "#463AA2",
//         "accent": "#C148AC",
//         "neutral": "#021431",
//         "base-100": "#ffffff",
//         "base-200": "#F2F7FF",
//         "base-300": "#E3E9F4",
//         "base-content": "#394E6A",
//         "info": "#93E7FB",
//         "success": "#81CFD1",
//         "warning": "#EFD7BB",
//         "error": "#E58B8B"
//     }
// }
