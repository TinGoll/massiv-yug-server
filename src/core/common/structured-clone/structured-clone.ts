const cloneObject = <T extends object = {}>(value: object = {}): T => {
  return <T>structuredClone(value);
};

export default cloneObject;
