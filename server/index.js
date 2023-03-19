const express = require("express");
const cors = require("cors");
const {  Configuration, OpenAIApi  } = require('openai')
const app = express();
const PORT = 4000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());  

const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.post("/convert", async (req, res) => {
    let {value} = req.body;

    const prompt = `Convert the JSON Object into Typescript n ${value} Please, I need the only the code, I don't need any explanations. `
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}]
    });
    res.json({
        message: "Successful",
        response: completion.data.choices[0].message.content,
    })
    console.log(req.body);
});

app.get("/api", (req,res) =>{
    res.json({
        message: "Hello Typescript"
    });
});

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
});

