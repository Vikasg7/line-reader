# csv-write-stream

- ### Intro  
   **line-reader** is a ES6 Generator function which returns an iterable to iterater over lines in a file one by one using `.next()` method.

- ### Install  
   `npm install git+https://github.com/Vikasg7/line-reader.git`  

- ### Usage (in TypeScript)  
   ````javascript  
   import { LineReader } from "line-reader"

   // FromLine and ToLine are optional arguments
   const list = LineReader("path-to-file.txt", FromLine, ToLine)

   // Call list.next to iterate over lines in a file
   list.next()

   // Iterating using a loop
   for (const item of list) {
      console.log(item)
   }
   ````

- ### Example
   Check the tests folder in src folder for an example.