const getPath = require("./getPath");

const testHTML = `
<html>

<head>
  <title>Our Company</title>
</head>

<body>

  <h1>Welcome to Our Company</h1>
  <h2 id = "Ingredient">Web Site Main Ingredients:</h2>
  <ul>
  <li>Pages (HTML)</li>
  <li>Style Sheets (CSS)</li>
  <li>Computer Code (JavaScript)</li>
  <li>Live Data (Files and Databases)</li>
  </ul> 
  <div class="container" id="main_div">
    <div>
    <p>
    <a class="main_url">URL<a>
    <a class="advanced_url">URL<a>
    <p>
    <div>
  <div>
</body>
</html>  
`;

document.body.innerHTML = testHTML;

test("getPath should return different selectors", () => {
  let li1 = document.querySelectorAll("ul > li")[2];
  let li2 = document.querySelectorAll("ul > li")[3];
  expect(getPath(li1)).not.toBe(getPath(li2));
});

test("getPath should return className with nth-child(3)", () => {
  let a = document.querySelectorAll(".advanced_url")[0];
  expect(getPath(a)).toMatch("advanced_url:nth-child(3)");
});

test("getPath should return nth-child(2) for second p", () => {
  let div = document.querySelectorAll("#main_div > div")[0];

  expect(getPath(div)).toMatch("div:nth-child(1)");
});

test("getPath should return only one unique selector", () => {
  let elem = document.querySelector(".container > div > p > a");
  let selector = getPath(elem);
  let elemsLength = document.querySelectorAll(selector).length;
  expect(elemsLength).toBe(1);
});
