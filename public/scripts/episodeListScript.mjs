import TitleCard from "../custom_elements/titleCard.mjs";

customElements.define("title-card", TitleCard);

const titleWithList = document.querySelector(".title-with-list");
const oldTitleCard = topAppBar.querySelector(".title-card");
const newTitleCard = document.createElement("title-card");
titleWithList.replaceChild(newTitleCard, oldTitleCard);
