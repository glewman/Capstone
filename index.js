import * as state from "./store";
import { Header, Nav, Main, Footer } from "./components";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo("/");

router.hooks({
  before: (done, params) => {
    // Because not all routes pass params we have to guard against is being undefined
    const page =
      params && Object.prototype.hasOwnProperty.call(params, "page")
        ? capitalize(params.page)
        : "Home";
    fetchDataByView(state[page]);
    done();
  },
});

router
  .on({
    "/": () => render(state.Home),
    ":page": (params) => {
      let page = capitalize(params.data.page);
      render(state[page]);
    },
  })
  .resolve();

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
`;
  router.updatePageLinks();
  addPicOnFormSubmit(st);
}
function addPicOnFormSubmit(st) {
  if (st.view === "Pictures") {
    document.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      // convert HTML elements to Array
      let inputList = Array.from(event.target.elements);
      // remove submit button from list
      inputList.pop();
      // construct new picture object
      let newPic = inputList.reduce((pictureObject, input) => {
        pictureObject[input.name] = input.value;
        return pictureObject;
      }, {});
      // add new picture to state.Gallery.pictures
      state.Pictures.pictures.push(newPic);
      render(state.Pictures);
    });
  }
  if (st.view === "Home") {
    document
      .querySelector("#shoppingList")
      .addEventListener("input", (event) => {
        event.preventDefault();
        console.log(event.target.value);
        const requestData = {
          shoppingList: event.target.value,
        };
        axios
          .post(`http://localhost:4040/shoppingList`, requestData)
          .then((response) => {
            // state.Pizza.pizzas.push(response.data);
            // router.navigate("/Pizza");
          })
          .catch((error) => {
            console.log("It puked", error);
          });
      });
  }
}
function fetchDataByView(st = state.Home) {
  switch (st.page) {
    case "Home":
      axios
        .get(`http://localhost:4040/shoppingList`)
        .then((response) => {
          state[st.page].shoppingList = response.data;
          render(st);
        })
        .catch((error) => {
          console.log("It puked", error);
        });
      break;
  }
}
