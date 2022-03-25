const EntryCard = document.getElementById("entry-card");
const searchBar = document.getElementById("searchBar");
const btn = document.querySelector("#btn");
var childDivs = document
  .getElementById("entry-card")
  .getElementsByTagName("div");
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  let childDivs = document
    .getElementById("entry-container")
    .getElementsByTagName("div");
  for (let i = 0; i < childDivs.length; i++) {
    var childDiv = childDivs[i];
    if (
      !childDiv.innerText.includes(searchString) ||
      !childDiv.innerText.toUpperCase().includes(searchString)
    ) {
      childDiv.classList.add("remove");
    } else {
      childDiv.classList.remove("remove");
    }
  }
});
