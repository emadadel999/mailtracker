import axios from 'axios';
export const getTrackingData = async (num) => {
	try {
		const response = await axios.post(
			'https://api.ship24.com/public/v1/tracking/search',
			{
				trackingNumber: num,
			},
			{
				headers: {
					Authorization: 'Bearer apik_2DKQzYVPJmAQ7nkyw71aImuWFWcIOC',
					'Content-Type': 'application/json; charset=utf-8',
				},
			}
		);
		if (response.data && response.data.data?.trackings?.length > 0) {
			const trackingData = response.data.data?.trackings[0];
			const times = trackingData.statistics.timestamps;
			const trackingNumbers = trackingData.shipment?.trackingNumbers;
			const trackingNumber = trackingNumbers?.length
				? trackingNumbers[0].tn
				: num;
			const latestEvent = trackingData?.events ? trackingData?.events[0] : null;
			const originCountryCode = trackingData.shipment?.originCountryCode;
			const destinationCountryCode =
				trackingData.shipment?.destinationCountryCode;
			const status =
				latestEvent?.status ||
				trackingData.shipment?.status ||
				trackingData.shipment?.statusMilestone;

			return {
				status,
				times,
				latestEvent,
				trackingNumber,
				events: trackingData?.events,
				origin: originCountryCode,
				destination: destinationCountryCode,
				courierCode: latestEvent?.courierCode,
			};
		} else {
			return null;
		}
	} catch (error) {
		console.log('error calling api', error);
		return null;
	}
};
