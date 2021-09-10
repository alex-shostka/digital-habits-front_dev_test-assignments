import { getApiData } from "./apiService.js";
// import "./styles.css";

const root = document.querySelector("#root");
root.addEventListener("click", onFolderClickHandler);
fetchAndRenderChildrenTo(root);

function onFolderClickHandler(event) {
  const node = event.target.closest(".node");
  if (!node || !node.classList.contains("folder")) {
    return;
  }
  node.childNodes.forEach((item) => (item.hidden = !item.hidden));
  node.classList.toggle("active");
  if (!node.dataset.loaded) {
    fetchAndRenderChildrenTo(node);
  }
}

async function fetchAndRenderChildrenTo(parentElement) {
  const response = await getApiData(parentElement.dataset.id);
  if (response?.children) {
    response.children.forEach((child) => {
      parentElement.append(createNode(child));
    });
    parentElement.dataset.loaded = true;
  }
}

function createNode({ id, title, children }) {
  const element = document.createElement("div");
  const classNames = children ? "node folder" : "node file";
  const template = `<div class="${classNames}" data-id="${id}">${title}</div>`;
  element.innerHTML = template;
  return element.firstElementChild;
}
