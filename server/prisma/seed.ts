import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const fs = require("fs");

// Read the SQL file
// const sqlData = fs.readFileSync(
//   "/dev-arthur/Projects/Padel/server/prisma/test.sql",
//   "utf8"
// );
// console.log(sqlData);

async function rawSql() {
  try {
    const rawSql = fs.readFileSync(
      "/dev-arthur/Projects/Gym/server/prisma/jul_9_two_users_my_training_09_07.sql",
      "utf8"
    );
    const sqlReducedToStatements = rawSql
      .split("\n")
      .filter((line) => !line.startsWith("--")) // remove comments-only lines
      .join("\n")
      .replace(/\r\n|\n|\r/g, " ") // remove newlines
      .replace(/\s+/g, " "); // excess white space
    const sqlStatements = splitStringByNotQuotedSemicolon(
      sqlReducedToStatements
    );

    for (const sql of sqlStatements) {
      console.log(sql);
      await prisma.$executeRawUnsafe(sql);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

function splitStringByNotQuotedSemicolon(input: string): string[] {
  const result = [];

  let currentSplitIndex = 0;
  let isInString = false;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "'") {
      // toggle isInString
      isInString = !isInString;
    }
    if (input[i] === ";" && !isInString) {
      result.push(input.substring(currentSplitIndex, i + 1));
      currentSplitIndex = i + 2;
    }
  }

  return result;
}
rawSql()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
