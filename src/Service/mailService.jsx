export const getUSPSdata = (num) => {
  const myP = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Package number ${num} is on it's way to you! It will arrive by tomorrow.`);
    }, 2000);
  });
  return myP;
};
export const getUPSdata = (num) => {
  const myP = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Package number ${num} is on it's way to you! It will arrive by tomorrow.`);
    }, 2000);
  });
  return myP;
};
export const getFEDEXdata = (num) => {
  const myP = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Package number ${num} is on it's way to you! It will arrive by tomorrow.`);
    }, 2000);
  });
  return myP;
};
