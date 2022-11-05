import React from "react";
import { useState } from "react";
import { getFEDEXdata, getUPSdata, getUSPSdata } from "../Service/mailService";

import "./AutoSearch.css";

const AutoSearch = () => {
  const [trackNum, setTrackNum] = useState(null);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mailServiceTitle, setMailServiceTitle] = useState("");
  const [imgSrc, setImgSrc] = useState("mail.png");

  //regex to recognise the tracking number's mail service provider
  const uspsRegex = new RegExp(/\b([A-Z]{2}\d{9}[A-Z]{2}|(420\d{9}(9[2345])?)?\d{20}|(420\d{5})?(9[12345])?(\d{24}|\d{20})|82\d{8})\b/);
  const upsRegex = new RegExp(/\b1Z[A-Z0-9]{16}\b/);
  const fedexRegex = new RegExp(/\b([0-9]{12}|100\d{31}|\d{15}|\d{18}|96\d{20}|96\d{32})\b/);

  const onType = (e) => {
    const currNum = e.target.value;

    //for clearing input
    if (!currNum) {
      setMailServiceTitle("");
      setImgSrc("mail.png");
    } else {
      const noSpacesNum = currNum.replace(/\s/g, "");
      setTrackNum(noSpacesNum);

      //auto-detect mail provider while typing
      if (uspsRegex.test(noSpacesNum)) {
        setMailServiceTitle("USPS");
        setImgSrc("usps.png");
      } else if (upsRegex.test(noSpacesNum)) {
        setMailServiceTitle("UPS");
        setImgSrc("ups.png");
      } else if (fedexRegex.test(noSpacesNum)) {
        setMailServiceTitle("FedEX");
        setImgSrc("fedex.png");
      }
    }
  };

  const onTrackClicked = (num) => {
    setIsLoading(true);
    setResult("");

    if (uspsRegex.test(num)) {
      getUSPSdata(num).then((r) => {
        setIsLoading(false);
        setResult(r);
        setMailServiceTitle("USPS");
      });
    } else if (upsRegex.test(num)) {
      getUPSdata(num).then((r) => {
        setIsLoading(false);
        setResult(r);
        setMailServiceTitle("UPS");
      });
    } else if (fedexRegex.test(num)) {
      getFEDEXdata(num).then((r) => {
        setIsLoading(false);
        setResult(r);
        setMailServiceTitle("FedEX");
      });
    }
  };

  return (
    <div className='search-component'>
      <div className='title-container'>
        <h2 className='title'>Track your {mailServiceTitle} package</h2>
      </div>
      <div className='search-container'>
        <div className='input-container'>
          <img src={imgSrc} alt='' />
          <input type='search' className='search-box' placeholder='Enter Tracking number...' onChange={onType} />
        </div>
        <button type='button' className='track-btn' disabled={!trackNum} onClick={() => onTrackClicked(trackNum)}>
          Track
        </button>
      </div>
      {result ? (
        <div className='result-container'>
          <p className='result'>{result}</p>
        </div>
      ) : isLoading ? (
        <div className='loading-container'>
          <div className='loading'></div>
        </div>
      ) : null}
    </div>
  );
};

export default AutoSearch;
