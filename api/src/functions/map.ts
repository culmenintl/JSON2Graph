import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext,
} from "@azure/functions"

import { OpenAIClient, AzureKeyCredential } from "@azure/openai"

export interface MapRequest {
    // array of objects
    example: any[]
}

export async function map(
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`)

    const exampleData = [
        {
            score_hidden: false,
            name: "t1_cnas8zv",
            link_id: "t3_2qyr1a",
            body: "Most of us have some family members like this. *Most* of my family is like this. ",
            downs: 0,
            created_utc: "1420070400",
            score: 14,
            author: "YoungModern",
            distinguished: null,
            id: "cnas8zv",
            archived: false,
            parent_id: "t3_2qyr1a",
            subreddit: "exmormon",
            author_flair_css_class: null,
            author_flair_text: null,
            gilded: 0,
            retrieved_on: 1425124282,
            ups: 14,
            controversiality: 0,
            subreddit_id: "t5_2r0gj",
            edited: false,
        },
        {
            distinguished: null,
            id: "cnas8zw",
            archived: false,
            author: "RedCoatsForever",
            score: 3,
            created_utc: "1420070400",
            downs: 0,
            body: "But Mill's career was way better. Bentham is like, the Joseph Smith to Mill's Brigham Young.",
            link_id: "t3_2qv6c6",
            name: "t1_cnas8zw",
            score_hidden: false,
            controversiality: 0,
            subreddit_id: "t5_2s4gt",
            edited: false,
            retrieved_on: 1425124282,
            ups: 3,
            author_flair_css_class: "on",
            gilded: 0,
            author_flair_text: "Ontario",
            subreddit: "CanadaPolitics",
            parent_id: "t1_cnas2b6",
        },
        {
            score_hidden: false,
            link_id: "t3_2qxefp",
            name: "t1_cnas8zx",
            created_utc: "1420070400",
            downs: 0,
            body: "Mine uses a strait razor, and as much as i love the clippers i love the razor so much more. Then he follows it up with a warm towel. \nI think i might go get a hair cut this week.",
            distinguished: null,
            id: "cnas8zx",
            archived: false,
            author: "vhisic",
            score: 1,
            subreddit: "AdviceAnimals",
            parent_id: "t3_2qxefp",
            retrieved_on: 1425124282,
            ups: 1,
            author_flair_css_class: null,
            author_flair_text: null,
            gilded: 0,
            controversiality: 0,
            subreddit_id: "t5_2s7tt",
            edited: false,
        },
    ]

    const exampleMapping = [
        {
            description:
                "What the dataset is. What are the nodes. What are the edges. Why these were selected. For example: There are 3 nodes: Comment, User, Subreddit. There are 2 edges: Commented, Commented in. These were selected because they are the most common and most interesting properties of the dataset.",
            nodes: [
                {
                    id_data_property: "id",
                    content_data_property: "body",
                    label: "Commented",
                    icon: "comment",
                },
                {
                    id_data_property: "subreddit_id",
                    content_data_property: "subreddit",
                    label: "Subreddit",
                    icon: "book",
                },
                {
                    id_data_property: "author",
                    content_data_property: "author",
                    label: "User",
                    icon: "user",
                },
            ],
            edges: [
                {
                    source_node_id: "author",
                    target_node_id: "id",
                    label: "commented",
                },
                {
                    source_node_id: "id",
                    target_node_id: "subreddit_id",
                    label: "commented in",
                },
            ],
        },
    ]

    const exampleDataPrompt = [
        {
            parent_id: "t1_cnan0ne",
            subreddit: "sausagetalk",
            author_flair_css_class: null,
            author_flair_text: null,
            gilded: 0,
            ups: 2,
            retrieved_on: 1425124282,
            controversiality: 0,
            subreddit_id: "t5_2t13q",
            edited: false,
            score_hidden: false,
            name: "t1_cnas905",
            link_id: "t3_2qxiao",
            body: "I don't know how to describe it.  Gently pinched two spots weiner length apart and just twisted them about 3or 4 times.",
            downs: 0,
            created_utc: "1420070400",
            score: 2,
            author: "jaggazz",
            id: "cnas905",
            distinguished: null,
            archived: false,
        },
        {
            parent_id: "t1_cnas7u7",
            subreddit: "hiphopheads",
            controversiality: 0,
            subreddit_id: "t5_2rh4c",
            edited: false,
            author_flair_css_class: "django",
            author_flair_text: "",
            gilded: 0,
            retrieved_on: 1425124282,
            ups: 2,
            name: "t1_cnas906",
            link_id: "t3_2qyl4w",
            score_hidden: false,
            score: 2,
            author: "thebasedyeezus",
            id: "cnas906",
            distinguished: null,
            archived: false,
            body: "says you my g",
            downs: 0,
            created_utc: "1420070400",
        },
        {
            subreddit_id: "t5_2qh33",
            edited: false,
            controversiality: 0,
            ups: 10,
            retrieved_on: 1425124282,
            author_flair_text: null,
            gilded: 0,
            author_flair_css_class: null,
            subreddit: "funny",
            parent_id: "t1_cnar76e",
            archived: false,
            id: "cnas907",
            distinguished: null,
            author: "Meltingteeth",
            score: 10,
            downs: 0,
            created_utc: "1420070401",
            body: "/r/Im14andthisisfunny",
            link_id: "t3_2qxubc",
            name: "t1_cnas907",
            score_hidden: false,
        },
    ]

    // {"role": "system", "content": "Provide some context and/or instructions to the model."},
    // {"role": "user", "content": "Example question goes here."},
    // {"role": "assistant", "content": "Example answer goes here."},
    // {"role": "user", "content": "First question/message for the model to actually respond to."}

    const systemPromptText = `You are an assistant designed to be a graph data expert. You are to analyze a small subsample of JSON row data and make your best guess as to what would be the most interesting and impactful properties of the JSON data to use for node and edges in a graph. If the rows look like message data, highlight interactions for nodes. If the rows contain geographic data, highlight locations for node relationships. You will answer with high confidence, and respond with any insights you have about the dataset. You are to return a JSON object with the following properties: " +
    "{description, nodes:[id_data_property, content_data_property, label, icon], edges:[source_node_id, target_node_id, label] }

    The description is your best guess of what the data and reasoning for why you selected the nodes and edges. The icon field is a string representing an icon using Graphin Icons. Each property returned should be a single string that corresponds to a property in the JSON data. The JSON response must be valid JSON format and must be an object with the properties described above.
    `

    try {
        const url = process.env.AI_ENDPOINT
        const key = process.env.AI_KEY
        const deploymentId = process.env.AI_DEPLOYMENT_ID
        const client = new OpenAIClient(url, new AzureKeyCredential(key))

        // read in the POST body and parse it as JSON
        const body = (await request.json()) as MapRequest

        if (!body.example) {
            return {
                status: 400,
                body: "Please pass an array of objects in the request body",
            }
        }
        const sampleData = body.example

        const prompt = [
            {
                role: "system",
                content: JSON.stringify(systemPromptText),
            },
            {
                role: "user",
                content: JSON.stringify(exampleData),
            },
            {
                role: "assistant",
                content: JSON.stringify(exampleMapping),
            },
            {
                role: "user",
                content: JSON.stringify(sampleData),
            },
        ]

        context.log("== Get completions Sample ==")
        const result = await client.getChatCompletions(deploymentId, prompt, {
            maxTokens: 2000,
            temperature: 0.5,
            frequencyPenalty: 0,
            presencePenalty: 0,
        })

        context.log(`result is: ${result}`)

        context.log(result.choices)
        for (const choice of result.choices) {
            context.log(choice.message.content)
        }

        const resp = result.choices.map((choice) =>
            choice.message.content.replace(/(\r\n|\n|\r)/gm, ""),
        )

        context.log(resp)

        return { body: `${JSON.stringify(resp)}` }
    } catch (err) {
        context.log(err)
        return { status: 500, body: `"Error": ${err} ` }
    }

    //
}

app.http("map", {
    methods: ["GET", "POST"],
    authLevel: "anonymous",
    handler: map,
})
