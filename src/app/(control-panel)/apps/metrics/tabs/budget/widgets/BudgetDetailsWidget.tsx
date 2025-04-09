import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import FuseLoading from '@fuse/core/FuseLoading';
import { useGetProjectDashboardWidgetsQuery } from '../../../ProjectDashboardApi';
import BudgetDetailsDataType from './types/BudgetDetailsDataType';
import { getCampaignsHistory } from '../../../store/metrics.actions';
import { useAppDispatch } from '@/store/hooks';

/**
 * The BudgetDetailsWidget widget.
 */
function BudgetDetailsWidget() {
	const { data: widgets, isLoading } = useGetProjectDashboardWidgetsQuery();
	const dispatch = useAppDispatch();
	const [init, setInit] = useState('')
    const [end, setEnd] = useState('')
    const [selectedRange, setSelectedRange] = useState("mensal");

	if (isLoading) {
		return <FuseLoading />;
	}

	const widget = widgets?.budgetDetails as BudgetDetailsDataType;

	if (!widget) {
		return null;
	}

	const { columns, rows } = widget;

	useEffect(() => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const formatDate = (date) => {
            return date.toISOString().split('T')[0];
        };
        setEnd(formatDate(today));
        setInit(formatDate(firstDay));

        let filters = {
            date_init: firstDay.toISOString().split("T")[0], // Primeiro dia do mês
            date_end: today.toISOString().split("T")[0], // Dia atual
            range: selectedRange
        };
        dispatch(getCampaignsHistory(filters));
    }, []);

	return (
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-xl overflow-hidden">
			<Typography className="text-lg font-medium tracking-tight leading-6 truncate">Budget Details</Typography>

			<div className="table-responsive mt-24">
				<Table className="table simple w-full min-w-full">
					<TableHead>
						<TableRow>
							{columns.map((column, index) => (
								<TableCell key={index}>
									<Typography
										color="text.secondary"
										className="font-semibold text-md whitespace-nowrap"
									>
										{column}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={index}>
								{Object.entries(row).map(([key, value]) => {
									switch (key) {
										case 'type': {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Chip
														size="small"
														label={value}
													/>
												</TableCell>
											);
										}
										case 'total':
										case 'expensesAmount':
										case 'remainingAmount': {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Typography>
														{value.toLocaleString('en-US', {
															style: 'currency',
															currency: 'USD'
														})}
													</Typography>
												</TableCell>
											);
										}
										case 'expensesPercentage':
										case 'remainingPercentage': {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Typography>{`${value}%`}</Typography>
												</TableCell>
											);
										}
										default: {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Typography>{value}</Typography>
												</TableCell>
											);
										}
									}
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Paper>
	);
}

export default memo(BudgetDetailsWidget);
