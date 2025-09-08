import { gsap } from "gsap";

const hoverEffect = ($card, perspective) => {
	let bounds;
	let lastShadowOffsetX = 0;
	let lastShadowOffsetY = 0;
	let lastShadowBlur = 0;

	function moveToMouse(e) {
		const mouseX = e.clientX;
		const mouseY = e.clientY;
		bounds = $card.getBoundingClientRect();
		const leftX = mouseX - bounds.x;
		const topY = mouseY - bounds.y;
		const center = {
			x: leftX - bounds.width / 2,
			y: topY - bounds.height / 2
		};

		const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

		const rotationX = center.y / 30;
		const rotationY = -center.x / 30;

		const shadowOffsetX = -rotationY * 2;
		const shadowOffsetY = rotationX * 2 + 5;
		const shadowBlur = 10 + distance / 80;

		lastShadowOffsetX = shadowOffsetX;
		lastShadowOffsetY = shadowOffsetY;
		lastShadowBlur = shadowBlur;

		gsap.to($card, {
			scale: 1.1,
			rotationX: rotationX,
			rotationY: rotationY,
			transformPerspective: perspective || 500,
			ease: "power2.out",
			boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 4px rgba(0, 0, 0, .1)`
		});
	}

	$card.addEventListener("mouseenter", () => {
		bounds = $card.getBoundingClientRect();
		document.addEventListener("mousemove", moveToMouse);
		gsap.to($card, {
			scale: 1.1,
			rotationX: 0,
			rotationY: 0,
			duration: 0.6
		});
	});

	$card.addEventListener("mouseleave", () => {
		document.removeEventListener("mousemove", moveToMouse);

		gsap.to($card, {
			scale: 1,
			rotationX: 0,
			rotationY: 0,
			duration: 0.6,
			ease: "power2.out",
		});

		gsap.to($card, {
			boxShadow: `0px 5px 15px 0px rgba(0, 0, 0, 0.2)`,
			duration: 0.6,
			ease: "power3.out",
		});
	});
};

export default hoverEffect;

