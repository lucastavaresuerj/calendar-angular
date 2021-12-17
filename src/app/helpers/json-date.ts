const parser = JSON.parse;
const reISO =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

function dateParser(key: string, value: any) {
  if (reISO.exec(value)) {
    return new Date(value);
  }
  return value;
}

JSON.parse = function (json) {
  try {
    return parser(json, dateParser);
  } catch (e) {
    // orignal error thrown has no error message so rethrow with message
    throw new Error('JSON content could not be parsed');
  }
};
