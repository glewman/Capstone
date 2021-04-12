import * as state from "./store";
import { Header, Nav, Main, Footer } from "./components";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

//const router = new Navigo("/");
const router = new Navigo(window.location.href);

router.hooks({
  before: (done, params) => {
    // Because not all routes pass params we have to guard against is being undefined
    const page =
      params && Object.prototype.hasOwnProperty.call(params, "page")
        ? capitalize(params.page)
        : "Home";
    console.log(state[page]);
    fetchDataByView(state[page]);
    done();
  },
});
// router.hooks({
//   before: (done, params) => {
//     // Because not all routes pass params we have to guard against is being undefined
//     const page =
//       params && Object.prototype.hasOwnProperty.call(params, "page")
//         ? capitalize(params.page)
//         : "Logs";
//     console.log(state[page]);
//     fetchDataByView(state[page]);
//     done();
//   },
// });

router
  .on({
    "/": () => render(state.Home),
    ":page": (params) => {
      console.log(params);
      let page = capitalize(params.page);
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
      //console.log(event.target.elements);
      // remove submit button from list
      inputList.pop();
      // construct new picture object
      let newPic = inputList.reduce((pictureObject, input) => {
        pictureObject[input.name] = input.value;
        return pictureObject;
      }, {});
      console.log(newPic);
      // add new picture to state.Gallery.pictures
      state.Pictures.pictures.push(newPic);
      render(state.Pictures);
    });
  }

  if (st.view === "Home") {
    document.querySelector("#saveList").addEventListener("click", (event) => {
      event.preventDefault();
      const list = document.querySelector("#shoppingList");
      console.log(list.value);
      const requestData = {
        item: list.value,
        date: Date.now(),
        priority: "medium",
        store: "store",
      };
      axios
        .post(`http://localhost:4040/shoppingList`, requestData)
        .then((response) => {
          state.Home.shoppingList = response.data.map(
            (document) => document.item
          );
          router.navigate("/");
        })
        .catch((error) => {
          console.log("It puked", error);
        });
    });

    document.querySelector("#saveTodo").addEventListener("click", (event) => {
      event.preventDefault();
      const list = document.querySelector("#toDo");
      console.log(list.value);
      const requestData = {
        task: list.value,
        date: Date.now(),
        priority: "medium",
        completed: "No",
      };
      axios
        .post(`http://localhost:4040/toDo`, requestData)
        .then((response) => {
          state.Home.toDo = response.data.map((document) => document.item);
          router.navigate("/");
        })
        .catch((error) => {
          console.log("It puked", error);
        });
    });
  }
}
function fetchDataByView(st = state.Home) {
  console.log(st.view);
  switch (st.view) {
    case "Home":
      axios
        .get(`http://localhost:4040/shoppingList`)
        .then((response) => {
          console.log(response.data);
          state[st.view].shoppingList = response.data.pop();
          render(st);
        })
        .catch((error) => {
          console.log("It puked", error);
        });

      axios
        .get(`http://localhost:4040/toDo`)
        .then((response) => {
          console.log(response.data);
          state[st.view].toDo = response.data.pop();
          render(st);
        })
        .catch((error) => {
          console.log("It puked", error);
        });
      break;
  }
}
//logs page
// if (st.view === "Home") {
//   document.querySelector("#saveList").addEventListener("click", (event) => {
//     event.preventDefault();
//     const list = document.querySelector("#shoppingList");
//     console.log(list.value);
//     const requestData = {
//       item: list.value,
//       date: Date.now(),
//       priority: "medium",
//       store: "store",
//     };
//     axios
//       .post(`http://localhost:4040/shoppingList`, requestData)
//       .then((response) => {
//         state.Home.shoppingList = response.data.map(
//           (document) => document.item
//         );
//         router.navigate("/Home");
//       })
//       .catch((error) => {
//         console.log("It puked", error);
//       });
//   });

//   document.querySelector("#saveTodo").addEventListener("click", (event) => {
//     event.preventDefault();
//     const list = document.querySelector("#toDo");
//     console.log(list.value);
//     const requestData = {
//       task: list.value,
//       date: Date.now(),
//       priority: "medium",
//       completed: "No",
//     };
//     axios
//       .post(`http://localhost:4040/toDo`, requestData)
//       .then((response) => {
//         state.Home.toDo = response.data.map((document) => document.item);
//         router.navigate("/Home");
//       })
//       .catch((error) => {
//         console.log("It puked", error);
//       });
//   });
// }
// }
// function fetchDataByView(st = state.Home) {
// console.log(st.view);
// switch (st.view) {
//   case "Home":
//     axios
//       .get(`http://localhost:4040/shoppingList`)
//       .then((response) => {
//         console.log(response.data);
//         state[st.view].shoppingList = response.data.pop();
//         render(st);
//       })
//       .catch((error) => {
//         console.log("It puked", error);
//       });

//     axios
//       .get(`http://localhost:4040/toDo`)
//       .then((response) => {
//         console.log(response.data);
//         state[st.view].toDo = response.data.pop();
//         render(st);
//       })
//       .catch((error) => {
//         console.log("It puked", error);
//       });
//     break;
// }
// }
