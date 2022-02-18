import * as Yup from "yup";
import { useState, useEffect } from "react";
import {
	Link as RouterLink,
	useNavigate,
} from "react-router-dom";
import {
	Card,
	Container,
	Stack,
	Typography,
	InputLabel,
	Input,
	FormHelperText,
	FormControl,
	TextField,
	Select,
	MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik, Form, FormikProvider } from "formik";

import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";

import { getAllCategories } from "../../service/CategoryService";
import { createBook } from "../../service/BooksService";

export default function AddBooks() {
	const navigate = useNavigate();
	const [category, setCategory] = useState("");

	useEffect(() => {}, []);

	const RegisterSchema = Yup.object().shape({
		title: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("Title required"),
		author: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("Author required"),
		publisher: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("Publisher required"),
		year: Yup.number()
			.test(
				"len",
				"Must be exactly 4 characters",
				(val) =>
					!val || (val && val.toString().length === 4)
			)
			.required("Year required"),
		price: Yup.number().required("Price required"),
		description: Yup.string()
			.min(2, "Too Short!")
			.max(500, "Too Long!")
			.required("Description required"),
		cover: Yup.string().required("Cover image required"),
	});

	const formik = useFormik({
		initialValues: {
			title: "",
			author: "",
			publisher: "",
			year: "",
			price: "",
			description: "",
			cover: "",
		},
		validationSchema: RegisterSchema,
		onSubmit: (values) => {
			values.categoryName = category;
			console.log(values);
			createBook(values).then((_res) => {
				window.history.back();
			});
		},
	});

	const {
		errors,
		touched,
		handleSubmit,
		isSubmitting,
		getFieldProps,
	} = formik;

	return (
		<Page title="Admin">
			<Scrollbar>
				<Container>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						mb={2}>
						<Typography variant="h4"> Add Book</Typography>
					</Stack>
					<FormikProvider value={formik}>
						<Form
							autoComplete="off"
							noValidate
							onSubmit={handleSubmit}>
							<Stack
								justifyContent="center"
								sx={{ width: "55%" }}
								spacing={3}>
								<TextField
									fullWidth
									label="Title"
									{...getFieldProps("title")}
									error={Boolean(
										touched.title && errors.title
									)}
									helperText={touched.title && errors.title}
								/>

								<TextField
									fullWidth
									label="Author"
									{...getFieldProps("author")}
									error={Boolean(
										touched.author && errors.author
									)}
									helperText={
										touched.author && errors.author
									}
								/>

								<Stack direction="row" spacing={3}>
									<TextField
										fullWidth
										label="Publisher"
										{...getFieldProps("publisher")}
										error={Boolean(
											touched.publisher && errors.publisher
										)}
										helperText={
											touched.publisher && errors.publisher
										}
									/>
									<TextField
										fullWidth
										label="Year"
										{...getFieldProps("year")}
										error={Boolean(
											touched.year && errors.year
										)}
										helperText={touched.year && errors.year}
									/>
								</Stack>
								<Stack direction="row" spacing={3}>
									<SelectComponent
										category={category}
										setCategory={setCategory}
									/>

									<TextField
										fullWidth
										label="Price"
										{...getFieldProps("price")}
										error={Boolean(
											touched.price && errors.price
										)}
										helperText={
											touched.price && errors.price
										}
									/>
								</Stack>
								<TextField
									fullWidth
									label="Cover"
									{...getFieldProps("cover")}
									error={Boolean(
										touched.cover && errors.cover
									)}
									helperText={touched.cover && errors.cover}
								/>
								<TextField
									fullWidth
									multiline
									id="outlined-multiline-static"
									rows={3}
									label="Description"
									{...getFieldProps("description")}
									error={Boolean(
										touched.description &&
											errors.description
									)}
									helperText={
										touched.description &&
										errors.description
									}
								/>

								<LoadingButton
									fullWidth
									size="large"
									type="submit"
									variant="contained"
									loading={isSubmitting}>
									Add book
								</LoadingButton>
							</Stack>
						</Form>
					</FormikProvider>
				</Container>
			</Scrollbar>
		</Page>
	);
}

function SelectComponent({ category, setCategory }) {
	const [categoryData, setCategoryData] = useState([]);

	const handleChange = (event) => {
		setCategory(event.target.value);
	};

	useEffect(() => {
		getAllCategories().then((_category) => {
			setCategoryData(_category.data);
		});
	}, []);

	return (
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">
				Category
			</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={category}
				label="Category"
				onChange={handleChange}>
				{categoryData.map((item) => (
					<MenuItem key={item.id} value={item.name}>
						{item.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
