import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink } from "react-router-dom";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
import { updateStatus } from "src/service/OrderService";

// material
import {
	Menu,
	MenuItem,
	IconButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

// ----------------------------------------------------------------------

export default function OrderMoreMenu({ id, setisChange }) {
	const ref = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const cancelOnClick = () => {
		const data = {
			status: "Cancelled",
			statusMsg: "Your order has been cancelled",
		};
		updateStatus(data, id).then((res) => {
			setIsOpen(false);
			setisChange((prev) => !prev);
		});
	};
	const deliveredOnClick = () => {
		const data = {
			status: "Delivered",
			statusMsg: "Your order has been delivered",
		};
		updateStatus(data, id).then((res) => {
			setIsOpen(false);
			setisChange((prev) => !prev);
		});
	};

	const shippedOnClick = () => {
		const data = {
			status: "Shipped",
			statusMsg: "Your order has been shipped",
		};
		updateStatus(data, id).then((res) => {
			setIsOpen(false);
			setisChange((prev) => !prev);
		});
	};

	return (
		<>
			<IconButton ref={ref} onClick={() => setIsOpen(true)}>
				<Icon
					icon={moreVerticalFill}
					width={20}
					height={20}
				/>
			</IconButton>

			<Menu
				open={isOpen}
				anchorEl={ref.current}
				onClose={() => setIsOpen(false)}
				PaperProps={{
					sx: { width: 200, maxWidth: "100%" },
				}}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}>
				<MenuItem
					onClick={shippedOnClick}
					sx={{ color: "text.secondary" }}>
					<ListItemText
						primary="Shipped"
						primaryTypographyProps={{ variant: "body1" }}
					/>
				</MenuItem>
				<MenuItem
					onClick={deliveredOnClick}
					sx={{ color: "text.secondary" }}>
					<ListItemText
						primary="Delivered"
						primaryTypographyProps={{ variant: "body1" }}
					/>
				</MenuItem>
				<MenuItem
					onClick={cancelOnClick}
					sx={{ color: "text.secondary" }}>
					<ListItemText
						primary="Cancelled"
						primaryTypographyProps={{ variant: "body1" }}
					/>
				</MenuItem>
			</Menu>
		</>
	);
}
