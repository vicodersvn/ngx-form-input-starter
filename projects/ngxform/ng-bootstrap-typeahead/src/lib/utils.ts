export const makeid = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getLabel = (c: any): string | null => {
  if (c?.options.label) {
    return c.options.label;
  } else {
    return null;
  }
};

export const getControlName = (c: any): string | null => {
  const formGroup = c.parent.controls;
  return Object.keys(formGroup).find((name) => c === formGroup[name]) || null;
};

export const getControlId = (radomdId: string) => {
  return (c: any, key: string): string | null => {
    const kebabCase = (str: string): string =>
      str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/\s+/g, '-')
        .toLowerCase();
    return key === undefined || key === null || key === '' ? kebabCase(`${getControlName(c)}-${radomdId}`) : kebabCase(`${getControlName(c)}-${key.substr(0, 5)}-${radomdId}`);
  };
};
