import SearchBox from "../custom_elements/searchBox.mjs";

customElements.define("search-box", SearchBox);

const topAppBar = document.querySelector(".top-app-bar__title");
const oldSearchBox = topAppBar.querySelector(".search-box");
const newSearchBox = document.createElement("search-box");
topAppBar.replaceChild(newSearchBox, oldSearchBox);

if ("serviceWorker" in navigator) {
  // should be deferred so will run after load
  console.log("triggered");
  navigator.serviceWorker.register("/service-worker.js");
}
