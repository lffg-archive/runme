/* eslint-disable import/prefer-default-export */

export function getId() {
  return (
    parseInt(
      Math.random()
        .toString()
        .substr(2)
    ) + Date.now()
  ).toString(16);
}
