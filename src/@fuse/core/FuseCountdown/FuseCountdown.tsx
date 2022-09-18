import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import moment from 'moment';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Moment } from 'moment/moment';

interface Props {
	onComplete?: () => void;
	endDate?: Moment | Date | string;
	className?: string;
}

function FuseCountdown(props: Props) {
	const { onComplete, endDate: propsEndDate, className } = props;
	const [endDate] = useState(moment.isMoment(propsEndDate) ? propsEndDate : moment(propsEndDate));
	const [countdown, setCountdown] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});
	const intervalRef = useRef<number | null>(null);

	const complete = useCallback(() => {
		if (intervalRef.current) {
			window.clearInterval(intervalRef.current);
		}
		if (onComplete) {
			onComplete();
		}
	}, [onComplete]);

	const tick = useCallback(() => {
		const currDate = moment();
		const diff = endDate.diff(currDate, 'seconds');
		if (diff < 0) {
			complete();
			return;
		}
		const timeLeft = moment.duration(diff, 'seconds');
		setCountdown({
			days: Number(timeLeft.asDays().toFixed(0)),
			hours: timeLeft.hours(),
			minutes: timeLeft.minutes(),
			seconds: timeLeft.seconds()
		});
	}, [complete, endDate]);

	useEffect(() => {
		intervalRef.current = window.setInterval(tick, 1000);
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [tick]);

	return (
		<div className={clsx('flex items-center', className)}>
			<div className="flex flex-col items-center justify-center px-12">
				<Typography variant="h4" className="mb-4">
					{countdown.days}
				</Typography>
				<Typography variant="caption" color="text.secondary">
					days
				</Typography>
			</div>
			<div className="flex flex-col items-center justify-center px-12">
				<Typography variant="h4" className="mb-4">
					{countdown.hours}
				</Typography>
				<Typography variant="caption" color="text.secondary">
					hours
				</Typography>
			</div>
			<div className="flex flex-col items-center justify-center px-12">
				<Typography variant="h4" className="mb-4">
					{countdown.minutes}
				</Typography>
				<Typography variant="caption" color="text.secondary">
					minutes
				</Typography>
			</div>
			<div className="flex flex-col items-center justify-center px-12">
				<Typography variant="h4" className="mb-4">
					{countdown.seconds}
				</Typography>
				<Typography variant="caption" color="text.secondary">
					seconds
				</Typography>
			</div>
		</div>
	);
}

FuseCountdown.defaultProps = {
	endDate: moment().add(15, 'days')
};

export default memo(FuseCountdown);
