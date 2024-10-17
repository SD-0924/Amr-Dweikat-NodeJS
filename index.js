// import file system built-in module
import fs from "fs";

// this method to check if word contains alphabetical characters only or not
const validWord = (word) => /^[A-Za-z]+$/.test(word);

// this function to cout number of words inside string
const countWords = (text) => {
  let numberOfWords = 0;
  let word = "";
  for (const character of text) {
    if (character !== " " && character !== "\n") {
      word += character;
    } else {
      if (validWord(word)) {
        numberOfWords++;
      }
      word = "";
    }
  }
  if (validWord(word)) {
    numberOfWords++;
  }
  return numberOfWords;
};
try {
  // reading config file content by using file system module
  const jsonFileContent = fs.readFileSync("config.json", "utf-8");

  // convert config file content into a JavaScript object by using built-in JavaScript method
  const obj = JSON.parse(jsonFileContent);

  // get the list of file paths from object
  const listOfFile = obj.files;

  // loop to iterate over each file
  for (const file of listOfFile) {
    // counting the number of words in each file and displaying the results asynchronously
    fs.readFile(file, "utf-8", (error, fileContent) => {
      if (error) {
        // in case the file does not exist or the path of file is wrong
        console.log(`${file}: error this file does not exist`);
        return;
      }

      // start counting the number of words then display the result
      console.log(`${file}: ${countWords(fileContent)} words`);
    });
  }
} catch (error) {
  console.log(error);
}
