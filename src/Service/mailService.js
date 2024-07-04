import axios from "axios";

export const getTrackingData = async (num, courier) => {
  try {
    const response = await axios.post(
      "https://api.ship24.com/public/v1/tracking/search",
      {
        trackingNumber: num,

      },
      {
        headers: {
          "Authorization": "Bearer apik_2DKQzYVPJmAQ7nkyw71aImuWFWcIOC",
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
    console.log("response", response);
    if (
      response.data
      && response.data.data?.trackings?.length > 0
    ) {
      const trackingData = response.data.data?.trackings[0];
      const status = trackingData.shipment?.statusMilestone;
      const times = trackingData.statistics.timestamps;
      const trackingNumbers = trackingData.shipment?.trackingNumbers;
      const trackingNumber = trackingNumbers && trackingNumbers.length > 0 ? trackingNumbers[0].tn : null;
      const latestEvent = trackingData?.events ? trackingData?.events[0] : null;
      return {
        status,
        times,
        latestEvent,
        trackingNumber
      }
    } else {
      return null
    }
  } catch (error) {
    console.log("error calling api", error);
    return null;
  }
};

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
