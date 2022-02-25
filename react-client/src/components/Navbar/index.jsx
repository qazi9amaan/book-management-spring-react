import react from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
function Navbar() {
	const user = useSelector((state) => state.user);
	return (
		<nav className="navbar navbar-expand-lg border-bottom  navbar-light bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					<p
						style={{ opactity: ".5" }}
						className="fs-2 mb-0 ">
						<span style={{ letterSpacing: "-1px" }}>
							Diamond
						</span>
						<small
							style={{
								fontSize: "18px",
								letterSpacing: "2px",
							}}>
							<b>BOOKS</b>
						</small>
					</p>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="w-100 d-flex justify-content-center">
					<input
						className="form-search  px-4 w-50 mx-5"
						type="search"
						placeholder="Search for a book, author, or category"
						aria-label="Search"
					/>
				</div>
				<div
					className="collapse navbar-collapse"
					id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item ">
							<Link className="nav-link" to="/cart">
								<div className="position-relative">
									<TiShoppingCart
										style={{
											fontSize: "40px",
											opacity: 0.8,
										}}
									/>
									{user.cart.length > 0 && (
										<span
											data-test="cart-item-count"
											className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
											{user.cart.length}
										</span>
									)}
								</div>
							</Link>
						</li>
						<li className="nav-item active">
							<Link className="nav-link" to="/profile">
								<img
									style={{ height: "45px", width: "45px" }}
									src="https://www.w3schools.com/howto/img_avatar2.png"
									className="rounded-circle"
									alt="avatar"
								/>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
export default Navbar;
