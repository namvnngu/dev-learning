declare namespace communicatorGlobal {
  function greet(): string;
  let settings: Settings;
  class Settings {
    constructor(message: string);
    message: string;
  }
}
