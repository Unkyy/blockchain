import {
    Form, Title,Table,TableBlock
} from "../../components/index";
import * as json from "./message.json";
const sections = [{
    flexDisplay: true,
    data: [{
        component: TableBlock,
        title: "Latest Blocks",
        texte: "The most recently mined blocks",
        json
    }]
}];

export default sections;