const path = require('path');
const fs = require('fs-extra');
const Turndown = require('turndown');

const loadQuestion = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw Error(`Failed to fetch: ${response.statusCode}`);
  }

  return await response.text();
};

const extractDescription = (html) => {
  const match = html.match(/<article class="day-desc"><h2>([\s\S]*)<\/h2>([\s\S]*)<\/article>/m);
  const title = match[1];
  const body = match[2];

  if (!title || !body) {
    throw Error(`Failed to located question in html`);
  }
  
  return [title.replaceAll('-', ''), body];
};

const descriptionToMarkdown = (htmlDescription) => {
  const td = new Turndown();

  try {
    return td.turndown(htmlDescription);
  } catch {
    throw Error('Failed to convert html to markdown')
  }
};

const scaffoldQuestion = async (year, day, title, markdown) => {
  const basePath = process.cwd();
  const yearPath = path.resolve(basePath, `./${year}`);

  // (over)write the year readme
  await fs.outputFile(
    path.resolve(yearPath, './README.md'),
    `# [Advent of Code ${year}](https://adventofcode.com/${year})`
  );

  const fullMarkdown = `# [${title}](https://adventofcode.com/${year}/day/${day})\n${markdown}\n---`;

  // Format the day...love js sometimes
  let d = `${day}`;
  if (d.length === 1) {
    d = `0${d}`;
  }

  const mdPath = path.resolve(yearPath, `./${d}`, './README.md');

  // (over)write the question readme
  await fs.outputFile(
    mdPath,
    fullMarkdown,
  );

  return mdPath;
};

const generateQuestion = async (year, day) => {
  // Scrape & parse question
  const url = `https://adventofcode.com/${year}/day/${day}`;
  const html = await loadQuestion(url);
  const [title, bodyHtml] = await extractDescription(html);
  const markdown = descriptionToMarkdown(bodyHtml);

  // Scaffold folder etc.
  const questionPath = await scaffoldQuestion(year, day, title, markdown);

  console.log(`${year} ${title}`);
  console.log(`Scaffolded in ./${path.relative(process.cwd(), questionPath)}`);
};

const main = async () => {
  const [year, day] = process.argv.slice(2);
  await generateQuestion(year, day);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })