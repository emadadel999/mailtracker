import { useRef } from 'react';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { DateTime } from 'luxon';
import { getTrackingData } from '../Service/mailService';
import StartIcon from './Icons/StartIcon';
import MailIcon from './Icons/MailIcon';

const AutoSearch = () => {
	const [trackNum, setTrackNum] = useState('');
	const [trackingResult, setTrackingResult] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [iconType, setIconType] = useState('default');
	const [iconUrl, setIconUrl] = useState('');

	const resultsRef = useRef(null);

	//regex to recognise the tracking number's mail service provider
	const uspsRegex = new RegExp(
		/\b([A-Z]{2}\d{9}[A-Z]{2}|(420\d{9}(9[2345])?)?\d{20}|(420\d{5})?(9[12345])?(\d{24}|\d{20})|82\d{8})\b/
	);
	const upsRegex = new RegExp(/\b1Z[A-Z0-9]{16}\b/);
	const fedexRegex = new RegExp(
		/\b([0-9]{12}|100\d{31}|\d{15}|\d{18}|96\d{20}|96\d{32})\b/
	);

	const onType = (e) => {
		const currNum = e.target.value;

		//for clearing input
		if (!currNum) {
			setTrackNum('');
			setIconType('default');
			setIconUrl('');
			setTrackingResult(null);
			setIsLoading(false);
		} else {
			//clear white spaces
			const noSpacesNum = currNum.replace(/\s/g, '');
			//auto-detect mail provider while typing
			if (uspsRegex.test(noSpacesNum)) {
				setIconType('USPS');
				setIconUrl(
					`https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=${noSpacesNum}`
				);
			} else if (upsRegex.test(noSpacesNum)) {
				setIconType('UPS');
				setIconUrl(
					`https://www.ups.com/track?loc=en_US&requester=QUIC&tracknum=${noSpacesNum}`
				);
			} else if (fedexRegex.test(noSpacesNum)) {
				setIconType('FEDEX');
				setIconUrl(`https://www.fedex.com/fedextrack/?trknbr=${noSpacesNum}`);
			} else {
				setIconType('default');
				setIconUrl('');
			}
			setTrackNum(noSpacesNum);
			setTrackingResult(null);
		}
	};

	const onTrackClicked = (num) => {
		setIsLoading(true);
		setTrackingResult(null);

		getTrackingData(num)
			.then((r) => {
				if (!r) throw 'empty result returned';
				setTrackingResult(r);
				setIsLoading(false);
				setTrackNum('');
				setIconType('default');
			})
			.catch((e) => {
				setTrackingResult(e);
				setIsLoading(false);
				setTrackNum(num);
				setHasError(true);
				setIconType('default');
			});
	};

	function capFirstLetter(text) {
		return text?.replace(text[0], text[0].toUpperCase());
	}

	return (
		<div className='search-component'>
			<div className='input-container'>
				<div className={`--input-icon ${!trackNum ? '--disabled' : ''}`}>
					<MailIcon className='--icon' iconType={iconType} />
				</div>
				<input
					type='search'
					className='input'
					placeholder='Enter tracking number'
					autoFocus
					onChange={onType}
					value={trackNum}
				/>
				<button
					type='button'
					className='search-button --input-icon --clickable --right'
					disabled={!trackNum}
					onClick={() => onTrackClicked(trackNum)}
				>
					<StartIcon className='--icon' />
				</button>
			</div>
			<CSSTransition
				nodeRef={resultsRef}
				in={isLoading || !!trackingResult}
				timeout={600}
				classNames='results'
				unmountOnExit
			>
				<div ref={resultsRef} className='result-container'>
					{isLoading ? (
						<div className='loading-container'>
							<div className='loading'></div>
						</div>
					) : (
						<>
							{trackingResult && !hasError ? (
								<div className='result'>
									<a
										href={iconUrl || '#'}
										className='result-heading'
										target={iconUrl ? '_blank' : '_self'}
									>
										<MailIcon className='result-icon' iconType={iconType} />
										<p className='result-text'>
											<b>Tracking Number</b> {trackingResult.trackingNumber}
										</p>
										{trackingResult.destination && (
											<p className='result-text'>
												<b>Destination</b> {trackingResult.destination}
											</p>
										)}
										{trackingResult.origin && (
											<p className='result-text'>
												<b>Origin</b> {trackingResult.origin}
											</p>
										)}
									</a>
									{trackingResult.events?.length && (
										<ul className='result-events'>
											{trackingResult.events.map((event, index) => (
												<li key={index} className='result-event'>
													<p className='result-text'>
														<b>Status </b>
														<span className='result-status'>
															{capFirstLetter(
																event.status || event.statusMilestone
															)}
														</span>
													</p>
													<p className='result-text'>
														<b>Date</b>{' '}
														{DateTime.fromISO(event.datetime).toFormat(
															"yyyy-MM-dd' - 'HH:mm z"
														)}
													</p>
													{event.location && (
														<p className='result-text'>
															<b>Location</b> {event.location}
														</p>
													)}
												</li>
											))}
										</ul>
									)}
								</div>
							) : (
								hasError && (
									<div className='result'>
										<div className='result-heading'>
											<MailIcon className='result-icon' iconType={iconType} />
											<p className='result-text'>
												<b>Tracking Number</b> {trackNum}
											</p>
											<p className='result-text --error'>
												No data found, Please try a different tracking number
											</p>
										</div>
									</div>
								)
							)}
						</>
					)}
				</div>
			</CSSTransition>
		</div>
	);
};

export default AutoSearch;
