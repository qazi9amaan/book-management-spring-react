import { useState, useEffect } from "react";
import {
	Link as RouterLink,
	useNavigate,
} from "react-router-dom";

import {
	Card,
	Table,
	Stack,
	Checkbox,
	TableRow,
	TableBody,
	TableCell,
	Container,
	Typography,
	TableContainer,
} from "@mui/material";

import Page from "../../components/Page";
import Label from "../../components/Label";
import Scrollbar from "../../components/Scrollbar";
import { UserListHead } from "../../components/_dashboard/user";
import { getAllCustomers } from "../../service/CustomerService";

const TABLE_HEAD = [
	{ id: "id", label: "Id", alignRight: false },
	{ id: "name", label: "Name", alignRight: false },
	{ id: "phone", label: "Phone", alignRight: false },
	{ id: "address", label: "Address", alignRight: false },
];

export default function Order() {
	const [customers, setcustomers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getAllCustomers().then((res) => {
			const { data } = res;
			setcustomers(data);
		});
	}, []);

	const filteredUsers = customers;

	const getAddressDetails = (address) => {
		return address[0] != null
			? address[0].address
			: "no address";
	};

	return (
		<Page title="Order">
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}>
					<Typography variant="h4" gutterBottom>
						Orders
					</Typography>
				</Stack>

				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<UserListHead headLabel={TABLE_HEAD} />
								<TableBody>
									{filteredUsers.map((row) => {
										return (
											<TableRow
												hover
												key={row.oid}
												tabIndex={-1}
												role="checkbox"
												selected={false}
												aria-checked={false}>
												<TableCell padding="checkbox">
													<Checkbox
														checked={false}
														onChange={() => {}}
													/>
												</TableCell>
												<TableCell
													component="th"
													scope="row"
													padding="none">
													<Stack
														direction="row"
														alignItems="center"
														spacing={2}>
														<Typography
															variant="subtitle2"
															noWrap>
															{row.cid}
														</Typography>
													</Stack>
												</TableCell>
												<TableCell align="left">
													{row.fullName}
												</TableCell>

												<TableCell align="left">
													{row.phoneNumber}
												</TableCell>
												<TableCell align="left">
													{getAddressDetails(row.address)}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>
				</Card>
			</Container>
		</Page>
	);
}
