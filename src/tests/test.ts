import { LineReader } from "../index"
import { resolve as PathResolve} from "path"

for (const line of LineReader(process.argv[2])) {
   console.log(line)
}

console.log([...LineReader(process.argv[2])])