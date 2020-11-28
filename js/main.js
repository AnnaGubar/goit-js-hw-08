import galleryList from "./gallery-items.js";

const galleryRef = document.querySelector('.js-gallery');
const lightboxOverlayRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
console.log(galleryRef, lightboxOverlayRef, lightboxImageRef);
let imgIndex;

const createImgHandler = galleryList.map((elem, index) => {
  return `<li class="gallery__item">
  <a class="gallery_link" href="${elem.original}" >
  <img class="gallery__image" src="${elem.preview}" alt="${elem.description}" data-source="${elem.original}" data-index="${index}">
  </a>
  </li>`;
});

galleryRef.insertAdjacentHTML("afterbegin", createImgHandler.join(""));

galleryRef.addEventListener('click', openModalHandler);
lightboxOverlayRef.addEventListener('click', closeModalHandler);

function addListenerOnWindowHandler() {
  document.body.addEventListener("keydown", escapeBtnHandler);
  document.body.addEventListener("keydown", changeImgHandler);
}

function removeListenerOnWindowHandler() {
  document.body.removeEventListener("keydown", escapeBtnHandler);
  document.body.removeEventListener("keydown", changeImgHandler);
}

function openModalHandler(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;
  lightboxOverlayRef.classList.add("is-open");
  imgIndex = +event.target.getAttribute("data-index");
  lightboxImageRef.src = event.target.dataset.source;
  lightboxImageRef.alt = event.target.alt;
  addListenerOnWindowHandler();
}

function closeModalHandler(event) {
  if (event.target.nodeName === "IMG") return;
  lightboxOverlayRef.classList.remove("is-open");
  lightboxImageRef.src = "";
  lightboxImageRef.alt = "";
  removeListenerOnWindowHandler();
}

function escapeBtnHandler(event) {
  if (event.code === "Escape") closeModalHandler(event);
}

function changeImgHandler(event) {
  const left = "ArrowLeft";
  const right = "ArrowRight";
  switch (event.code) {
    case left:
      imgIndex -= 1;
      break;
    case right:
      imgIndex += 1;
      break;
  }
  if (imgIndex > galleryList.length - 1) {
    imgIndex = 0;
  }
  if (imgIndex < 0) {
    imgIndex = galleryList.length - 1;
  }
  lightboxImageRef.src = galleryList[imgIndex].original;
}


