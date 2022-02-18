import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";
import bookOpenFill from "@iconify/icons-eva/book-open-fill";

const getIcon = (name) => (
	<Icon icon={name} width={22} height={22} />
);

const sidebarConfig = [
	{
		title: "Home",
		path: "/app",
		icon: getIcon(pieChart2Fill),
	},
	{
		title: "admin",
		path: "/admin",
		icon: getIcon(peopleFill),
	},
	{
		title: "category",
		path: "/category",
		icon: getIcon(lockFill),
	},
	{
		title: "Books",
		path: "/books",
		icon: getIcon(bookOpenFill),
	},
	{
		title: "Customers",
		path: "/customers",
		icon: getIcon(peopleFill),
	},
	{
		title: "Orders",
		path: "/order",
		icon: getIcon(shoppingBagFill),
	},
];

export default sidebarConfig;
