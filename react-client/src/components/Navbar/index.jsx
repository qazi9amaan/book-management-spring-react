import react from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
function Navbar() {
	const user = useSelector((state) => state.user);

	return (
		<nav class="navbar navbar-expand-lg border-bottom  navbar-light bg-light">
			<div className="container-fluid">
				<Link class="navbar-brand" to="/">
					<p
						style={{ opactity: ".5" }}
						className="fs-2 mb-0 ">
						<span style={{ letterSpacing: "-1px" }}>
							Diamond{" "}
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
					class="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
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
					class="collapse navbar-collapse"
					id="navbarNav">
					<ul class="navbar-nav ms-auto">
						<li class="nav-item ">
							<Link class="nav-link" to="/cart">
								<div className="position-relative">
									<TiShoppingCart
										style={{
											fontSize: "40px",
											opacity: 0.8,
										}}
									/>
									{user.cart.length > 0 && (
										<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
											{user.cart.length}
											<span class="visually-hidden">
												unread messages
											</span>
										</span>
									)}
								</div>
							</Link>
						</li>
						<li class="nav-item active">
							<Link class="nav-link" to="/profile">
								<img
									style={{ height: "45px", width: "45px" }}
									src="https://www.w3schools.com/howto/img_avatar2.png"
									className="rounded-circle"
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
