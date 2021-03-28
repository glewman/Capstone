import html from "html-literal";

export default (st) => html`
  <section id="gallery">
    ${st.pictures.reduce(
      (html, pic) => html + `<img src="${pic.url}" alt="${pic.title}">`,
      ``
    )}
  </section>
  <form id="UploadPicture" method="POST" action="">
    <h2>Add a photo to the gallery!</h2>
    <div>
      <label for="url">Photo URL:</label>
      <input
        type="text"
        name="url"
        id="url"
        placeholder="Enter Photo URL"
        required
      />
    </div>
    <div>
      <label for="title">Photo Title/Description:</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter Photo Description"
        required
      />
    </div>
    <input type="submit" name="submit" value="Submit Photo" />
  </form>
`;
