import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import {
	Link as RouterLink,
	useNavigate,
} from "react-router-dom";
// material
import {
	Card,
	Table,
	Stack,
	Avatar,
	Button,
	Checkbox,
	TableRow,
	TableBody,
	TableCell,
	Container,
	Typography,
	TableContainer,
	TablePagination,
} from "@mui/material";
// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import {
	UserListHead,
	UserListToolbar,
	UserMoreMenu,
} from "../../components/_dashboard/user";
//
import {
	getAllBooks,
	deleteBook,
} from "../../service/BooksService";

const TABLE_HEAD = [
	{ id: "id", label: "Id", alignRight: false },
	{ id: "title", label: "Title", alignRight: false },
	{ id: "author", label: "Author", alignRight: false },
	{
		id: "publisher",
		label: "Publisher",
		alignRight: false,
	},
	{ id: "year", label: "Year", alignRight: false },
	{ id: "price", label: "Price", alignRight: false },
	{ id: "category", label: "Category", alignRight: false },
];

export default function Books() {
	const [page, setPage] = useState(0);
	const [USERLIST, setUSERLIST] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const navigate = useNavigate();

	useEffect(() => {
		getAllBooks().then((res) => {
			console.log(res.data);
			setUSERLIST(res.data);
		});
	}, []);

	const deleteHandler = (id) => {
		deleteBook(id).then(() => {
			const newList = filter(
				USERLIST,
				(user) => user.bid !== id
			);
			setUSERLIST(newList);
		});
	};

	const handleRequestSort = (event, property) => {};
	const handleSelectAllClick = (event) => {};
	const handleClick = (event, name) => {};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleFilterByName = (event) => {};

	const filteredUsers = USERLIST;

	const isUserNotFound = filteredUsers.length === 0;

	return (
		<Page title="Admin">
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}>
					<Typography variant="h4" gutterBottom>
						Books
					</Typography>
					<Button
						variant="contained"
						onClick={() => {
							navigate("add");
						}}
						startIcon={<Icon icon={plusFill} />}>
						Add a book
					</Button>
				</Stack>

				<Card>
					{/* <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<UserListHead
									order={null}
									orderBy={null}
									headLabel={TABLE_HEAD}
									rowCount={USERLIST.length}
									numSelected={0}
									onRequestSort={handleRequestSort}
									onSelectAllClick={handleSelectAllClick}
								/>
								<TableBody>
									{filteredUsers
										.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
										)
										.map((row) => {
											const {
												bid,
												title,
												author,
												year,
												price,
												category,
												cover,
												description,
												publisher,
											} = row;

											const isItemSelected = false;

											return (
												<TableRow
													hover
													key={bid}
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
																{bid}
															</Typography>
														</Stack>
													</TableCell>
													<TableCell align="left">
														{title}
													</TableCell>

													<TableCell align="left">
														{author}
													</TableCell>
													<TableCell align="left">
														{publisher}
													</TableCell>
													<TableCell align="left">
														{year}
													</TableCell>

													<TableCell align="left">
														{price}
													</TableCell>
													<TableCell align="left">
														{category.name}
													</TableCell>

													<TableCell align="right">
														<UserMoreMenu
															deleteHandler={deleteHandler}
															id={bid}
														/>
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={USERLIST.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Card>
			</Container>
		</Page>
	);
}
