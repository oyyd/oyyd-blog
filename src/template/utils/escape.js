function escape(strings, ...values) {
  return strings.map((str, index) => (
    index === 0 ? `${str}` : `${str}${escape(values[index - 1])}`
  )).join();
}

export default escape;
