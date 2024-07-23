<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none">
	<style>
		@keyframes a0_t {
			0% {
				transform: translate(200px, 200px) rotate(0deg) translate(-185px, -185px);
			}
			100% {
				transform: translate(200px, 200px) rotate(359deg) translate(-185px, -185px);
			}
		}
		@keyframes a1_t {
			0% {
				transform: translate(200px, 200px) rotate(0deg) translate(-165px, -165px);
			}
			100% {
				transform: translate(200px, 200px) rotate(359deg) translate(-165px, -165px);
			}
		}
	</style>
	<g
		transform="translate(200,200) translate(-185,-185)"
		style="animation: 1.5s linear infinite both a0_t;"
		id="valve-rotator"
	>
		<rect
			width="6"
			height="32"
			fill="#282828"
			transform="translate(-75.5,34.6) rotate(-11.2) translate(221.7,331.9)"
			class="cap"
		/>
		<rect
			width="10"
			height="9"
			rx="1"
			fill="#282828"
			transform="translate(-75.2,34.1) rotate(-11.2) translate(219.4,330.3)"
			class="valve"
		/>
		<rect width="370" height="370" rx="185" />
	</g>
	<g
		transform="translate(200,200) translate(-165,-165)"
		style="animation: 1.5s linear infinite both a1_t;"
		id="spokes"
	>
		<path stroke="#b3b3b3" stroke-width="3" d="M0 163.5h330" class="spoke" />
		<path stroke="#b3b3b3" stroke-width="3" d="M12.4 226.6l304.9-126.3" class="spoke" />
		<path stroke="#b3b3b3" stroke-width="3" d="M46.9 279.9l233.4-233.3" class="spoke" />
		<path stroke="#b3b3b3" stroke-width="3" d="M100.6 317.4l126.3-304.9" class="spoke" />
		<path stroke="#b3b3b3" stroke-width="3" d="M163.5 330v-330" class="spoke" />
		<path stroke="#b3b3b3" stroke-width="3" d="M226.6 318.6l-126.3-304.9" class="spoke" />
		<path stroke="#b3b3b3" stroke-width="3" d="M279.9 282.1l-233.3-233.4" class="spoke" />
		<path stroke="#b3b3b3" stroke-width="3" d="M317.4 229.4l-304.9-126.3" class="spoke" />
	</g>
	<rect
		x="195"
		y="195"
		width="10"
		height="10"
		rx="5"
		stroke="#949494"
		stroke-width="10"
		class="axle"
	/>
	<rect
		x="187"
		y="187"
		width="26"
		height="26"
		rx="13"
		stroke="#444"
		stroke-width="10"
		class="hub"
	/>
	<rect
		x="37"
		y="37"
		width="326"
		height="326"
		rx="163"
		stroke="#a6a6a6"
		stroke-width="10"
		class="rim"
	/>
	<rect
		x="15"
		y="15"
		width="370"
		height="370"
		rx="185"
		stroke="#000"
		stroke-width="30"
		class="tire"
	/>
</svg>

<style>
	.spoke {
		stroke: rgb(177, 177, 177);
	}
	.tire {
		stroke: rgb(35, 35, 35);
	}
	.rim {
		stroke: rgb(185, 185, 185);
	}
	.hub {
		stroke: rgb(185, 185, 185);
	}
	.valve {
		fill: rgb(28, 28, 28);
	}
	.cap {
		fill: rgb(15, 15, 15);
	}
</style>
