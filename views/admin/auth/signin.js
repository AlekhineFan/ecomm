const layout = require("../layout.js");
const { getError } = require("../../helpers.js");
module.exports = ({ errors }) => {
  return layout({
    content: `<div>
      <form method="post">
          <input name="email" placeholder="email" />
          ${getError(errors, "email")}
          <input name="password" placeholder="password" />
          ${getError(errors, "password")}
          <button>Sign in</button>
        </form>
     </div>
    `,
  });
};
