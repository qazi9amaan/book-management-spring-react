import React from "react";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import RatingService from "../../service/RatingService";
const RatingComponent = ({ book }) => {
	const user = useSelector((state) => state.user.user);
	const filterRatings = (book) => {
		const active = book.ratings != null ? true : false;
		let rating = 0;
		if (active) {
			book.ratings.filter((r) => {
				if (r.mcid == user.cid) {
					rating = r.rating;
				}
			});
		}
		return {
			rr: rating,
			active: active && rating != 0,
		};
	};

	const { rr, active } = filterRatings(book);
	console.log(active);

	const [ratings, setratings] = useState(rr);
	const [hover, sethover] = useState(0);
	const [hovering, sethovering] = useState(!active);
	const [clicked, setClicked] = useState(!active);

	const saveRating = (e) => {
		e.target.disabled = true;
		setratings(e.target.value);
		sethovering(false);

		if (clicked) {
			const data = {
				mbid: book.bid,
				mcid: user.cid,
				rating: e.target.value,
			};
			RatingService.addRating(data).then((res) => {
				console.log(res);
			});
			setClicked(false);
		}
	};

	return (
		<div>
			{new Array(5).fill(0).map((_, i) => (
				<span>
					<label>
						{!active && (
							<input
								enabled={hovering}
								type="radio"
								name="rating"
								value={i + 1}
								onClick={saveRating}
							/>
						)}
						<AiFillStar
							style={{
								color:
									(hover || ratings) >= i + 1
										? "rgb(249, 210, 50)"
										: "#e4e4e4",
							}}
							onMouseEnter={(e) =>
								hovering && sethover(i + 1)
							}
							onMouseLeave={() => hovering && sethover(0)}
							className="fs-1 rating-star"
						/>
					</label>
				</span>
			))}
		</div>
	);
};

export default RatingComponent;
