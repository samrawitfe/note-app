/*
    USING EXPRESS
*/

const notes = [
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
];

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.static("dist"));
// app.use(cors());
app.get("/", (request, response) => {
  response.send("<b>Backend server is running</b>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  console.log("get id called");
  const id = Number(request.params.id);
  console.log(id);
  const note = notes.find((note) => {
    console.log(
      `id: ${id}, typeof id ${typeof id}, noteId: ${
        note.id
      }, type of noteId: ${typeof note.id}`
    );
    return note.id === id;
  });

  console.log(note);
  if (note) {
    response.json(note);
  } else {
    return response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  console.log("delete id called");
  const id = Number(request.params.id);
  console.log(id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  return maxId + 1;
};

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(express.json());
app.use(requestLogger);

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || Math.random() < 0.5,
    id: generateId(),
  };
  notes.push(note);
  console.log(note);
  response.json(note);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
