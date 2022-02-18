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
import OrderMoreMenu from "./OrderMoreMenu";
import Page from "../../components/Page";
import Label from "../../components/Label";
import Scrollbar from "../../components/Scrollbar";
import { UserListHead } from "../../components/_dashboard/user";
import { getAllOrders } from "../../service/OrderService";

const TABLE_HEAD = [
	{ id: "id", label: "Id", alignRight: false },
	{ id: "customer", label: "Customer", alignRight: false },
	{ id: "books", label: "Books", alignRight: false },
	{ id: "address", label: "Address", alignRight: false },
	{ id: "status", label: "Status", alignRight: false },
];

export default function Order() {
	const [isChange, setisChange] = useState(false);
	const [orders, setorders] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getAllOrders().then((res) => {
			const { data } = res;
			setorders(data);
		});
	}, [isChange]);

	const filteredUsers = orders;

	const getBookName = (books) => {
		return books.map((book) => book.title).join(", ");
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
									{filteredUsers.map((row, index) => {
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
															{row.oid}
														</Typography>
													</Stack>
												</TableCell>
												<TableCell align="left">
													{row.customer.fullName}
												</TableCell>
												<TableCell align="left">
													{getBookName(row.books)}
												</TableCell>
												<TableCell align="left">
													{row.address.address}
												</TableCell>
												<TableCell align="left">
													<Label
														variant="ghost"
														color={
															(row.status === "Cancelled" &&
																"error") ||
															"success"
														}>
														{row.status}
													</Label>
												</TableCell>
												<TableCell align="right">
													<OrderMoreMenu
														id={row.oid}
														setisChange={setisChange}
													/>
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
