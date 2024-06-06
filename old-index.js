console.log("hellow world");

const http = require("http");

/*
    USING PLAIN NODE JS TO CREATE SERVER
*/

const notes = {
  notes: [
    {
      id: 1,
      content: "HTML is easy",
      important: true,
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true,
    },
    {
      id: "980b",
      content: "",
      important: false,
    },
    {
      id: "53cf",
      content: "new note added",
      important: false,
    },
    {
      id: "d83e",
      content: "hehe",
      important: true,
    },
    {
      id: "8588",
      content: "a new note ...",
      important: true,
    },
  ],
};
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(notes));
});

const PORT = 3002;

app.listen(PORT);
console.log(`server is running on ${PORT}`);
