const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();
const PORT = 1337;

app.use(express.static("public"));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="https://raw.githubusercontent.com/FullstackAcademy/PairExercise.Wizard-news-pt1/master/public/logo.png?token=AUCDHDSENGZMWY4NFO2YLLLBIPZIG"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
        )
        .join("")}
    </div>
  </body>
</html>`;

  res.send(html);
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id) {
    // If the post wasn't found, just throw an error
    throw new Error("Not Found");
  }
  res.send(
    `<strong>${post.title}:</strong> ${post.content} <br>By: ${post.name}</br>`
  );
});

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
