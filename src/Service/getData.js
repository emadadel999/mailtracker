import axios from "axios";
import { iCarrier, iPackageInfo, iPackageTracker, iTrackingInfo } from "wave-vue-components";
import { DateTime } from "luxon";

const API_URL = 'https://api.mywavehome.net';
const REGISTER_ENDPOINT = `${API_URL}/pgk/register`;
const TRACKING_INFO_ENDPOINT = `${API_URL}/pgk/gettrackinginfo`;
const CARRIERS_ENDPOINT = `${API_URL}/pgk/getcarriers`;


const REGISTER_ERR_MSG = "Registeration failed, Please try again";
const INFO_ERR_MSG = "Tracking info not found, Please make sure you have the correct info";

export async function register(newPkgInfo: iPackageInfo) {
    if (newPkgInfo.trackingNumber) {
        const pkg = {
            number: newPkgInfo.trackingNumber,
            carrier: `${newPkgInfo.carrierCompanyNo}`
        }
        try {
            const response = await axios.post(REGISTER_ENDPOINT, pkg);
            const result = response.data;
            console.log("register() result", result);

            if (!result) throw new Error(REGISTER_ERR_MSG);
            else if (result.data.rejected && result.data.rejected.length > 0) {
                if (result.data.rejected[0].error) {
                    console.warn("register() error code", result.data.rejected[0].error.code);
                    if (result.data.rejected[0].error.code === -18019901) { // already registered.
                        return true;
                    } else throw new Error(result.data.rejected[0].error.message);
                } else {
                    console.error("register() error rejected object", result.data.rejected[0]);
                    throw new Error(REGISTER_ERR_MSG);
                }
            } else if (result.data.errors && result.data.errors.length > 0) {
                throw new Error(result.data.errors[0].message);
            } else {
                return true;
            }
        } catch (e) {
            console.error("register() error", e);
            return false;
        }
    } else {
        return false;
    }
    
}


export async function getInfo(newPkgInfo: iPackageInfo) {
    console.log("getInfo() called");
    const apiEndpoint = `${TRACKING_INFO_ENDPOINT}?trackingNumber=${newPkgInfo.trackingNumber}&courierCompany=${newPkgInfo.carrierCompanyNo}`;
    try {
        const response = await axios.get(apiEndpoint);
        if (response.data) {
            const info = response.data as iTrkRes;
            console.log("getInfo() info", info);
            if (info.data.accepted && info.data.accepted.length > 0) {
                const trackNum = info.data.accepted[0].number;
                const carrierNum = info.data.accepted[0].carrier;
                const trackInfo = info.data.accepted[0].track_info;
                if (trackNum && carrierNum && trackInfo) {
                    const latestEvent = trackInfo.latest_event;
                    const latestStatus = trackInfo.latest_status;
                    const timeMetrics = trackInfo.time_metrics;
                    let estArr = timeMetrics.estimated_delivery_date.from;
                    if (estArr) estArr = getLocalDate(estArr);

                    const description = latestEvent ? latestEvent.description : "";
                    const status = latestStatus ? latestStatus.status : "No information yet";
                    let deliveryDate = latestEvent && status === TrkMilestones.DELIVERED ? latestEvent.time_iso : "";
                    if (deliveryDate) deliveryDate = getLocalDate(deliveryDate);

                    console.log("getInfo() status", status);
                    console.log("getInfo() latestEvent", latestEvent);
                    console.log("getInfo() estArr", estArr);
                    
                    if (status === "NotFound" && !latestEvent && !estArr) {
                        throw new Error(INFO_ERR_MSG);
                    }

                    const pkgInfo : iPackageInfo = {
                        itemName: newPkgInfo.itemName,
                        trackingNumber: trackNum,
                        carrierCompanyNo: carrierNum,
                    }
                    const trkInfo : iTrackingInfo = {
                        estArrival: estArr,
                        trackingState: status,
                        trackingStateDesc: description,
                        deliveryDate
                    }
                    return {
                        packageInfo: pkgInfo,
                        trackingInfo: trkInfo
                    } as iPackageTracker;

                } else throw new Error(INFO_ERR_MSG);
            } else if (info.data.rejected && info.data.rejected.length > 0) {
                if (info.data.rejected[0].error) {
                    console.error("getInfo() error code", info.data.rejected[0].error.code);
                    throw new Error(info.data.rejected[0].error.message);
                } else {
                    console.error("getInfo() error rejected object", info.data.rejected[0]);
                    throw new Error(`${info.data.rejected[0]}`);
                }
            } else throw new Error(INFO_ERR_MSG);
        } else throw new Error(INFO_ERR_MSG);
    } catch (e: any) {
        console.error("getInfo() error", e.message);
        throw new Error(INFO_ERR_MSG);;
    }
    
}

export async function getCarriers() {
    console.log("getCarriers() called");
        try {
            const response = await axios.get(CARRIERS_ENDPOINT);
            if (response.data) {
                console.log("getCarriers() response.data", response.data);
                return response.data as iCarrier[];
            } else {
                console.error("getCarriers() response.data notfound", response.data);
                throw "carriers not found";
            }
        } catch (e) {
            console.log("getCarriers() error", e);
        }
    
}




enum TrkMilestones {
    INFO_RECEIVED = "InfoReceived",
    PICKED_UP = "PickedUp",
    DEPARTURE = "Departure",
    ARRIVAL = "Arrival",
    AVAIL_FOR_PICKUP = "AvailableForPickup",
    OUT_FOR_DELIVERY = "OutForDelivery",
    DELIVERED = "Delivered",
    RETURNING = "Returning",
    RETURNED = "Returned",
}

interface iTrkResAddress {
    country: string,
    state: string,
    city: string,
    street: string,
    postal_code: string,
    coordinates: {
        longitude: string,
        latitude: string
    }
}
interface iTrkResEvent {
    time_iso: string,
    time_utc: string,
    description: string,
    location: string,
    stage: string,
    address: iTrkResAddress
}
interface iTrkResMilestone {
    key_stage: TrkMilestones,
    time_iso: string,
    time_utc: string
}

interface iTrkRes {
    code: number,
    data: {
        accepted: [
        {
            number: string,
            carrier: number,
            param: string,
            param_type: number,
            data_origin: number,
            tag: string,
            track_info: {
                shipping_info: {
                    shipper_address: iTrkResAddress,
                    recipient_address: iTrkResAddress
                },
                latest_status: {
                    status: string,
                    sub_status: string,
                    sub_status_descr: string
                },
                latest_event: iTrkResEvent,
                time_metrics: {
                    days_after_order: number,
                    days_of_transit: number,
                    days_of_transit_done: number,
                    days_after_last_update: number,
                    estimated_delivery_date: {
                        source: string,
                        from: string,
                        to: string
                    }
                },
                milestone: iTrkResMilestone[],
                misc_info: {
                    risk_factor: number,
                    service_type: string,
                    weight_raw: string,
                    weight_kg: string,
                    pieces: string,
                    dimensions: string,
                    customer_number: string,
                    reference_number: string,
                    local_number: string,
                    local_provider: string,
                    local_key: number
                },
                tracking: {
                    providers_hash: number,
                    providers: [{
                        provider: {
                            key: number,
                            name: string,
                            alias: string,
                            tel: string,
                            homepage: string,
                            country: string
                        },
                        service_type: string,
                        latest_sync_status: string,
                        latest_sync_time: string,
                        events_hash: number,
                        events: iTrkResEvent[]
                    }]
                }
            }
        }
        ],
        rejected: [{
            error: {
                code: number,
                message: string
            }
        }]
    }
}

function getLocalDate(date: string) {
    const converted = DateTime.fromISO(date);
    if (converted.isValid) {
        return converted.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    } else {
        return ""
    }
}