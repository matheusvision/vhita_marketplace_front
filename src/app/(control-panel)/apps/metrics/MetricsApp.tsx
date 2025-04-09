import FusePageSimple from '@fuse/core/FusePageSimple';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseTabs from 'src/components/tabs/FuseTabs';
import FuseTab from 'src/components/tabs/FuseTab';
import MetricsAppHeader from './MetricsAppHeader';
import BudgetTab from './tabs/budget/BudgetTab';
import { useGetProjectDashboardWidgetsQuery } from './ProjectDashboardApi';
import VhitaFilters from '../filters/VhitaFilters';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch } from 'react-redux';
import * as Slices from './store/metricsFilterAppSlice';
import { useAppSelector } from '@/store/hooks';
import * as Actions from './store/metricsFilter.actions';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		boxShadow: `inset 0 -1px 0 0px  ${theme.palette.divider}`
	}
}));

/**
 * The MetricsApp page.
 */
function MetricsApp() {
	const { isLoading } = useGetProjectDashboardWidgetsQuery();

	const dispatch = useDispatch();
	const [init, setInit] = useState('');
	const [end, setEnd] = useState('');
	const [selectedMeta, setSelectedMeta] = useState('sem_meta');
	const [selectedRange, setSelectedRange] = useState("mensal");
	const [start, setStart] = useState('');
	const filter = useAppSelector(Slices.filter);

	const handleMetaChange = (event) => {
		setSelectedMeta(event.target.value);
	};

	const [tabValue, setTabValue] = useState('budget');

	function handleTabChange(event: React.SyntheticEvent, value: string) {
		setTabValue(value);
	}

	const handleChange = (event) => {
		setSelectedRange(event.target.value);
	};

	useEffect(() => {
		loadContent()
	}, []);

	function loadContent() {
		const today = new Date();
		const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
		const formatDate = (date: Date) => date.toISOString().split('T')[0];
		setEnd(formatDate(today));
		setInit(formatDate(firstDay));

		const filters = {
			date_init: formatDate(firstDay),
			date_end: formatDate(today),
			range: selectedRange
		};
		dispatch(Slices.setInitialFilter())
	}

	async function onClick() {
		console.log('\n\n\nfilter');
		console.log(filter);
	}

	useEffect(() => {
		console.log('\n\n\nfilter - useEffect');
		console.log(filter);
	}, [filter])

	function setInitFormatted(val: Date | string) {
		const date = new Date(val);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		setInit(`${year}-${month}-${day}`);
	}

	useEffect(() => {
		dispatch(Actions.setMetricsFilter({ ...filter, date_init: init }) as any)
	}, [init])

	useEffect(() => {
		dispatch(Actions.setMetricsFilter({ ...filter, date_end: end }) as any)
	}, [end])

	useEffect(() => {
		dispatch(Actions.setMetricsFilter({ ...filter, range: selectedRange }) as any)
	}, [selectedRange])

	useEffect(() => {
		dispatch(Actions.setMetricsFilter({ ...filter, meta: selectedMeta }) as any)
	}, [selectedMeta])

	function setEndFormatted(val: Date | string) {
		const date = new Date(val);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		setEnd(`${year}-${month}-${day}`);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Root
			header={<MetricsAppHeader />}
			content={
				<>
					<div className="w-full pt-16 sm:pt-24">
						<VhitaFilters>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-2">
									<DatePicker
										className="w-full"
										value={new Date(init)}
										onChange={(val) => { setInitFormatted(val) }}
										slotProps={{
											textField: {
												label: 'Data inicial',
												variant: 'outlined'
											}
										}}
										minDate={new Date(start)}
										format="dd/MM/yyyy"
									/>
								</div>
								<div className="col-span-2 ml-10">
									<DatePicker
										className="w-full"
										value={new Date(end)}
										onChange={(val) => { setEndFormatted(val) }}
										slotProps={{
											textField: {
												label: 'Data final',
												variant: 'outlined'
											}
										}}
										minDate={new Date(start)}
										format="dd/MM/yyyy"
									/>
								</div>
								<div className="col-span-3" style={{ marginLeft: 20 }}>
									<RadioGroup
										name="meta" value={selectedMeta} onChange={handleMetaChange}
										row
									>
										<FormControlLabel
											name='meta'
											key="sem_meta"
											value="sem_meta"
											control={<Radio />}
											label="Sem meta"
										/>
										<FormControlLabel
											name='meta'
											key="com_meta"
											value="com_meta"
											control={<Radio />}
											label="Com meta"
										/>
									</RadioGroup>
								</div>
								<div className="col-span-4">
									<RadioGroup
										name="range" value={selectedRange} onChange={handleChange}
										row
									>
										<FormControlLabel
											name='range'
											key="mensal"
											value="mensal"
											control={<Radio />}
											label="Mensal"
										/>
										<FormControlLabel
											name='range'
											key="semanal"
											value="semanal"
											control={<Radio />}
											label="Semanal"
										/>
										<FormControlLabel
											name='range'
											key="diario"
											value="diario"
											control={<Radio />}
											label="Diário"
										/>
									</RadioGroup>
								</div>
								<div className="flex items-center mt-24 sm:mt-0">
									<Button
										className="whitespace-nowrap"
										variant="contained"
										color="secondary"
										startIcon={<FuseSvgIcon size={20}>
											heroicons-solid:magnifying-glass
										</FuseSvgIcon>}
										onClick={() => { onClick() }}
									>
										Filtrar
									</Button>
								</div>
							</div>
						</VhitaFilters>
					</div>
					<div className="w-full pt-16 sm:pt-24">
						<BudgetTab />
					</div>
				</>
			}
		/>
	);
}

export default MetricsApp;
