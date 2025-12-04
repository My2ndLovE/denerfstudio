import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Initial hide
        gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });
        gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0 });

        const moveCursor = (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, scale: 1 });
            gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power2.out", scale: 1 });
        };

        const handleHover = () => {
            gsap.to(cursor, { scale: 0.5, duration: 0.2 });
            gsap.to(follower, { scale: 2, backgroundColor: "rgba(0, 77, 51, 0.1)", duration: 0.2 });
        };

        const handleUnhover = () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
            gsap.to(follower, { scale: 1, backgroundColor: "transparent", duration: 0.2 });
        };

        window.addEventListener("mousemove", moveCursor);

        // Add hover listeners to all interactive elements
        const interactiveElements = document.querySelectorAll("button, a, .feature-card, .pay-later-card, .tool-card");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleHover);
            el.addEventListener("mouseleave", handleUnhover);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleHover);
                el.removeEventListener("mouseleave", handleUnhover);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-4 h-4 bg-deepGreenText rounded-full pointer-events-none z-[9999] mix-blend-difference"
            ></div>
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-12 h-12 border-2 border-deepGreenText rounded-full pointer-events-none z-[9998] transition-colors duration-300"
            ></div>
        </>
    );
}
