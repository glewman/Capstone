import html from "html-literal";

export default () => html` <p id="logsText">
    On this page you can log everything from the fish you have in your tank to
    that time you changed the flow direction. Make sure to log the date and any
    other specific information.
  </p>
  <div id="logsContainer">
    <div class="logs">
      <textarea
        name="Fish"
        id="Fish"
        cols="50"
        rows="20"
        placeholder="Fish"
      ></textarea>
      <textarea
        name="Equipment"
        id="Equipment"
        cols="50"
        rows="20"
        placeholder="Equipment"
      ></textarea>
      <textarea
        name="Plants/Coral"
        id="Plants"
        cols="50"
        rows="20"
        placeholder="Plants/Coral"
      ></textarea>
      <textarea
        name="Changes"
        id="Changes"
        cols="50"
        rows="20"
        placeholder="Changes"
      ></textarea>
      </div>
      <textarea
        name="Purchases"
        id="Purchases"
        cols="129"
        rows="15"
        placeholder="Purchases"
      ></textarea>
    </div>
  </div>`;
