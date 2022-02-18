import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
	Box,
	Card,
	Checkbox,
	CardHeader,
	Typography,
	FormControlLabel,
	Stack,
} from "@mui/material";

// ----------------------------------------------------------------------

const TASKS = [
	"Get Internship",
	"Training",
	"Final Project",
	"Start actual Work",
	"Go on trips",
];

// ----------------------------------------------------------------------

TaskItem.propTypes = {
	task: PropTypes.string,
	checked: PropTypes.bool,
	formik: PropTypes.object,
};

function TaskItem({ task, checked, formik, ...other }) {
	const { getFieldProps } = formik;

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			sx={{ py: 0.75 }}>
			<FormControlLabel
				control={
					<Checkbox
						{...getFieldProps("checked")}
						value={task}
						checked={checked}
						{...other}
					/>
				}
				label={
					<Typography
						variant="body2"
						sx={{
							...(checked && {
								color: "text.disabled",
								textDecoration: "line-through",
							}),
						}}>
						{task}
					</Typography>
				}
			/>
		</Stack>
	);
}

export default function AppTasks() {
	const formik = useFormik({
		initialValues: {
			checked: [TASKS[0], TASKS[1], TASKS[2], TASKS[3]],
		},
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const { values, handleSubmit } = formik;

	return (
		<Card>
			<CardHeader title="Tasks" />
			<Box sx={{ px: 3, py: 1 }}>
				<FormikProvider value={formik}>
					<Form
						autoComplete="off"
						noValidate
						onSubmit={handleSubmit}>
						{TASKS.map((task) => (
							<TaskItem
								key={task}
								task={task}
								formik={formik}
								checked={values.checked.includes(task)}
							/>
						))}
					</Form>
				</FormikProvider>
			</Box>
		</Card>
	);
}
