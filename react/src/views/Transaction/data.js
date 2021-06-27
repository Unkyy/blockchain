import {
    Form, Title,Table,ListBlockChain
} from "../../components/index";
import * as json from "./message.json";

const sections = () => {

    return [{
        flexDisplay: true,
        data: [{
            component: ListBlockChain,
            title: "Latest Blocks",
            texte: "The most recently mined blocks",
            json
        }, {
            component: Form,
            json
        }]
    }]
};

export default sections;