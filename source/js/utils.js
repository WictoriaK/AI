const isEscapeKey = (evt)  => {
  return evt.keyCode === 27
};

const isEnterKey = (evt) => {
  return evt.keyCode === 13;
}


export { isEnterKey, isEscapeKey };
