// material
import {
	Box,
	Grid,
	Container,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllStats } from "../service/StatsService";
// components
import Page from "../components/Page";
import {
	AppTasks,
	AppNewUsers,
	AppBugReports,
	AppItemOrders,
	AppNewsUpdate,
	AppWeeklySales,
	AppOrderTimeline,
	AppCurrentVisits,
	AppWebsiteVisits,
	AppTrafficBySite,
	AppCurrentSubject,
	AppConversionRates,
} from "../components/_dashboard/app";

export default function DashboardApp() {
	const [stats, setstats] = useState({});
	useEffect(() => {
		getAllStats().then((res) => {
			setstats(res.data);
		});
	}, []);
	return (
		<Page title="Dashboard">
			<Container maxWidth="xl">
				<Box sx={{ pb: 5 }}>
					<Typography variant="h4">
						Hi, Welcome back
					</Typography>
				</Box>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={3}>
						<AppWeeklySales stats={stats} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppNewUsers stats={stats} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppItemOrders stats={stats} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBugReports stats={stats} />
					</Grid>

					<Grid item xs={12} md={6} lg={8}>
						<AppTasks />
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<AppCurrentVisits />
					</Grid>

					<Grid item xs={12} md={6} lg={8}>
						<AppWebsiteVisits />
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
}
