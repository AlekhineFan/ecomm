const layout = require("../layout.js");
module.exports = () => {
  return layout({
    content: `<div>
      <form method="post">
          <input name="email" placeholder="email" />
          <input name="password" placeholder="password" />
          <button>Sign in</button>
        </form>
     </div>
    `,
  });
};
