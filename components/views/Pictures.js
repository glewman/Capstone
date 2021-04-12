import html from "html-literal";

export default (st) => {
  console.log(st.pictures, "st");
  return html`
    <div id="picturesText"><p>Pictures Page</p></div>
    <section id="gallery">
      ${st.pictures.reduce(
        (html, pic) => html + `<img src="${pic.url}" alt="${pic.title}">`,
        ``
      )}
    </section>
    <form id="UploadPicture" method="POST" action="">
      <p id="uploadText">Add a photo!</p>
      <div>
        <label for="url">Photo URL:</label>
        <input
          type="text"
          name="name"
          id="url"
          placeholder="Enter Photo URL"
          required
        />
      </div>
      <div>
        <label for="title">Photo Title:</label>
        <input
          type="text"
          name="name"
          id="title"
          placeholder="Enter Photo Description"
          required
        />
      </div>
      <input type="submit" name="submit" value="Submit Photo" />
    </form>
  `;
};
