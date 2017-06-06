# line-reader

- ### Intro  
   **line-reader** is a ES6 Generator function which returns an iterable to iterater over lines in a `file` or `stdin` one by one using `.next()` method or `for..of` loop.

- ### Install  
   `npm install git+https://github.com/Vikasg7/line-reader.git`  

- ### Usage (in TypeScript)  
   ````javascript  
   import { LineReader } from "line-reader"

   // FromLine and ToLine are optional arguments
   const filePathOrStdin = "path-to-file.txt" || process.stdin
   const list = LineReader(filePathOrStdin, FromLine, ToLine)

   // Call list.next to iterate over lines in a file
   list.next()

   // Iterating using a for..of loop
   for (const item of list) {
      console.log(item)
   }
   ````

- ### Example
   Check the tests folder in src folder for an example.