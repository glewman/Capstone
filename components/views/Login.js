import html from "html-literal";

export default () => html`
  <div class="container">
    <form id="logIn" method="POST" action="">
      <p id="loginText">Login</p>
      <div>
        <label for="username">User name:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <div>
        <label for="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
        />
      </div>
      <input type="submit" name="register" value="Register" />
    </form>
  </div>
`;
