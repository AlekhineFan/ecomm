const fs = require("fs");
const crypto = require("crypto");
const { report } = require("process");
class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename!");
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, { encoding: "utf8" })
    );
  }
  async create(attributes) {
    attributes.id = this.randomId();
    const records = await this.getAll();
    records.push(attributes);
    await fs.promises.writeFile(this.filename, JSON.stringify(records), {
      encoding: "utf8",
    });
  }
  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }
  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }
}

const test = async () => {
  const repo = new UsersRepository("users.json");
  repo.create({ email: "test@test.com", password: "password" });
  const users = await repo.getAll();
  console.log(users);
};
test();