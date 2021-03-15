import html from "html-literal";

export default () =>
  html` <p><div id="homeIntro">
    Welcome to Tankmate, your one stop place to helping maintain a healthy
    Aquarium.</div>
    <div class="toDo">
    <textarea
      name="toDo"
      id="Fish"
      cols="50"
      rows="20"
      placeholder="To Do"
    ></textarea>
  </div>
    <div class="shoppingList">
    <textarea
      name="shoppingList"
      id="Fish"
      cols="50"
      rows="20"
      placeholder="Shopping List"
    ></textarea>
    </div>
  </p>`;
