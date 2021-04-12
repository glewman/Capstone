import html from "html-literal";

export default (st) => html` <p id="logsText">
    On this page you can log everything from the fish you have in your tank to
    that time you changed the flow direction. Make sure to log the date and any
    other specific information.
  </p>
  <div class="logs">
    <div>
      <div id="fishHeader"><p>Fish Log</p></div>
      <textarea name="Fish" id="Fish" cols="50" rows="20" placeholder="Fish">
      ${st.fish.item}
    </textarea>
      <button id="saveFish">Update Fish</button>
    </div>
    <div>
      <div id="equipmentHeader"><p>Equipment Log</p></div>
      <textarea
        name="Equipment"
        id="Equipment"
        cols="50"
        rows="20"
        placeholder="Equipment"
      >
      ${st.equipment.item}
    </textarea>
      <button id="saveEquipment">Update Equipment</button>
    </div>
    <div>
      <div id="plantsHeader"><p>Plants/Coral</p></div>
      <textarea
        name="Plants/Coral"
        id="Plants"
        cols="50"
        rows="20"
        placeholder="Plants/Coral"
      ></textarea>
      <button id="saveCoral">Update Plants/Coral</button>
    </div>
    <div>
      <div id="changesHeader"><p>Changes Log</p></div>
      <textarea
        name="Changes"
        id="Changes"
        cols="50"
        rows="20"
        placeholder="Changes"
      >
      ${st.changes.item}
    </textarea>
      <button id="saveChanges">Update Changes</button>
    </div>
    <div>
      <div id="purchasesHeader"><p>Purchase Log</p></div>
      <textarea
        name="Purchases"
        id="Purchases"
        cols="129"
        rows="15"
        placeholder="Purchases"
      >
      ${st.purchases.item}
    </textarea>
      <button id="savePurchases">Update Purchases</button>
    </div>
  </div>`;
