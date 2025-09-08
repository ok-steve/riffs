const hexagrams = fetch("./hexagrams.json").then((res) => res.json());

async function navigate(hexagram) {
  if (!hexagram) {
    const data = await hexagrams;
    hexagram = data[Math.floor(Math.random() * data.length)];
  }

  window.location.hash = hexagram.key;
}

async function render() {
  if (!window.location.hash) {
    navigate();
  }

  const data = await hexagrams;
  const hash = decodeURI(window.location.hash.slice(1));
  const index = data.findIndex(({ key }) => key === hash);
  const { url, image, character, key } = data[index];

  const template = `
    <a class="hexagram" href="${url}">
      <span>${index}</span>
      <img src="${image}" alt="" />
      <span>${character}</span>
      <span>(${key})</span>
    </a>
  `;

  document.body.innerHTML = template;
}

document.addEventListener("DOMContentLoaded", render);

document.addEventListener("hashchange", render);

window.addEventListener("keyup", (e) => {
  if (e.code === "Enter" || e.code === "Space") {
    navigate();
  }
});
