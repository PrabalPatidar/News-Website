
const API_KEY = "745a7d376f0248dba638897748ae9bd7";
const url = "https://newsapi.org/v2/everything?q";
 
window.addEventListener("load", () => fetchNews("India"));

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}
// async function fetchNews(query) {
//     const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
//     const data = await res.json();
//     bindData(data.articles);
// }

function bindData(articles) {
  const cardscontainer = document.getElementById('cards-container');
  const newsCardTemplate = document.getElementById('template-news-card');

  cardscontainer.innerHTML = "";

  articles.forEach(article => {
    if(!article.urlToimage) return;
    const cardclone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardclone, article);
    cardscontainer.appendChild(cardclone);
  });
}

function fillDataInCard(cardclone, article) {
    const newsImg = cardclone.querySelector("#news-img");
    const newsTitle = cardclone.querySelector("#news-title");
    const newsSource = cardclone.querySelector("#news-source");
    const newsDesc = cardclone.querySelector("#news-desc");

    newsImg.src = article.urlToimage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Data(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardclone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}