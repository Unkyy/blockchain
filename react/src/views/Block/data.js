import {
    Form, Title,Table
} from "../../components/index";
import * as json from "./message.json";
const sections = [{
    flexDisplay: true,
    data: [{
        component: Title,
        title: "Latest Blocks",
        texte: "The most recently mined blocks",
        json
    }]
}];

export default sections;