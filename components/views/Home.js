import html from "html-literal";

export default (st) =>
  html`
    <div id="homeIntro">
      Welcome to Tankmate, your one stop place for maintaining a healthy
      Aquarium.
    </div>
    <div class="toDo">
      <div id="toDoList"><p>To Do List</p></div>
      <textarea name="toDo" id="toDo" cols="50" rows="20" placeholder="To Do">
      ${st.toDo.task}
      </textarea
      >
      <button id="saveTodo">Update To Do</button>
    </div>
    <div class="shoppingList">
      <div id="shoppingListText"><p>Shopping List</p></div>
      <textarea
        name="shoppingList"
        id="shoppingList"
        cols="50"
        rows="20"
        placeholder="Shopping List"
      >
        ${st.shoppingList.item}
      </textarea
      >
      <button id="saveList" type="button">Update Shopping List</button>
    </div>
  `;
