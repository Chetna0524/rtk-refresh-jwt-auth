import React from "react";

const reactionEmojis = {
	like: "👍",
	love: "❤️",
	wow: "😮",
	coffee: "☕",
};

function ReactionsButtons({ post }) {
	return (
		<>
			{Object.entries(reactionEmojis).map(([key, emoji], i) => (
				<button type="submit" className="btn-emojis">
					{emoji}
				</button>
			))}
		</>
	);
}

export default ReactionsButtons;
