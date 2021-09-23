import { TransactionTest } from "../cases/transaction/Transaction";
import { tests } from "./testLoader";


class TestHandler {
    constructor(){
        tests.forEach(([test, data]) => {
            // console.log(publicKey = ...data)
            // test.mock({...data})
            // const res = test.init(data)
            // test.assert(res)
        })
    }
}

new TestHandler()