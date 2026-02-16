const express = require("express");
const app = express();

app.use(express.json());

let users = [];

// CREATE
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// READ ALL
app.get("/users", (req, res) => {
  res.json(users);
});

// READ BY ID
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  res.json(user);
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  res.json(user);
});

// DELETE
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ message: "Usuário removido com sucesso" });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
