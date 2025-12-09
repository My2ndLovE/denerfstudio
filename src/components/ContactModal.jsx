import { useEffect, useRef } from "react";
import { X, Mail, MessageCircle } from "lucide-react";
import gsap from "gsap";

export function ContactModal({ isOpen, onClose }) {
    const modalRef = useRef(null);
    const backdropRef = useRef(null);
    const lastFocusedRef = useRef(null);

    useEffect(() => {
        const backdropEl = backdropRef.current;
        const modalEl = modalRef.current;
        if (!backdropEl || !modalEl) return;

        const focusableSelectors = [
            "a[href]",
            "button:not([disabled])",
            "textarea",
            "input",
            "select",
            "[tabindex]:not([tabindex='-1'])"
        ].join(", ");

        const handleKeydown = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose?.();
            }
            if (e.key === "Tab") {
                const focusable = modalEl.querySelectorAll(focusableSelectors);
                if (!focusable.length) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        if (isOpen) {
            lastFocusedRef.current = document.activeElement;
            // Animate In
            gsap.to(backdropEl, { opacity: 1, duration: 0.3, pointerEvents: "all" });
            gsap.fromTo(modalEl,
                { scale: 0.8, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }
            );

            document.addEventListener("keydown", handleKeydown);

            // Move focus into the dialog
            setTimeout(() => {
                const firstFocusable = modalEl.querySelector(focusableSelectors);
                (firstFocusable || modalEl).focus();
            }, 10);
        } else {
            // Animate Out
            gsap.to(backdropEl, { opacity: 0, duration: 0.3, pointerEvents: "none" });
            gsap.to(modalEl, { scale: 0.8, opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
            document.removeEventListener("keydown", handleKeydown);

            // Restore focus to the element that opened the modal
            if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === "function") {
                lastFocusedRef.current.focus();
            }
        }

        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [isOpen, onClose]);

    return (
        <div
            ref={backdropRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-deepInk/80 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                className="bg-creamWhite w-[90vw] max-w-md p-8 rounded-[2rem] border-4 border-deepGreenText shadow-[8px_8px_0px_0px_rgba(0,77,51,1)] relative"
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-modal-title"
                aria-describedby="contact-modal-desc"
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-deepGreenText hover:bg-deepGreenText/10 rounded-full transition-colors"
                    aria-label="Close contact modal"
                >
                    <X size={24} />
                </button>

                <h3 id="contact-modal-title" className="text-3xl font-display font-bold text-deepGreenText mb-4 text-center">
                    Let's Build It.
                </h3>
                <p id="contact-modal-desc" className="text-center text-softGrayText mb-8">
                    Ready to start your MVP? We're ready to help. <br />
                    Choose how you want to connect.
                </p>

                <div className="space-y-4">
                    <a
                        href="https://wa.me/60165271501"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-offWhite border-2 border-deepGreenText rounded-xl font-bold text-deepGreenText hover:bg-white shadow-[4px_4px_0px_0px_rgba(0,77,51,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(0,77,51,0.2)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,77,51,0.2)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200"
                    >
                        <MessageCircle size={20} />
                        Chat on WhatsApp
                    </a>

                    <a
                        href="mailto:sam@denerf.studio"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-neonMint border-2 border-deepGreenText rounded-xl font-bold text-deepGreenText hover:bg-neonMint/90 shadow-[4px_4px_0px_0px_rgba(0,77,51,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(0,77,51,0.2)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,77,51,0.2)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200"
                    >
                        <Mail size={20} />
                        Send an Email
                    </a>
                </div>

                <p className="mt-6 text-xs text-center text-softGrayText/60">
                    We usually reply within 2 hours during business days.
                </p>
            </div>
        </div>
    );
}
