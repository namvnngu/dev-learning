// import _ from "lodash";
import * as communicatorUMD from 'communicatorUMD';
// import { otherFunctions } from 'communicatorUMD';
import * as communicatorModularAMD from 'communicatorModularAMD';
import * as communicatorModularCJS from 'communicatorModularCJS';

class Communicator {
  constructor() { }

  greet(message: string) {
    // return `<h1>${_.toUpper(message)}</h1>`;
    // let _settings = new communicatorGlobal.Settings(message);
    // communicatorGlobal.settings = _settings;
    // return communicatorGlobal.greet();
    communicatorModularAMD.greet(message);
    communicatorModularCJS.greet(message);
    communicatorUMD.otherFunctions.goodbye();
    return communicatorUMD.greet(message);
  }
}

let communicator = new Communicator();
document.body.innerHTML = communicator.greet("Hello");
