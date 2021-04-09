import html from "html-literal";

export default (st) => html`
  <nav>
    <i id="Hidden" class="fas fa-bars"></i>
    <ul class="hidden--mobile nav-links">
      ${st
        .map(
          (link) =>
            `<li><a href="/${link.title}" data-navigo>${link.text}</a></li>`
        )
        .join("")}
    </ul>
  </nav>
`;

//  <ul>
//       <li><a href="index.html">"Home"</a></li>
//       <li><a href="Logs.html">"Logs"</a></li>
//       <li><a href="Charts.html">"Charts"</a></li>
//       <li><a href="Pictures.html">"Pictures"</a></li>
//       <li><a href="About.html">"About"</a></li>
//       <li><a href="Login.html">"Login"</a></li>
//     </ul>
//   </nav>
