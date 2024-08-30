"use client"; 
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

const ScrollButton = () => {

    useEffect(() => {
        const scrollButton = document.getElementById('scroll-button');
        const scrollToContent = () => {
            window.scrollBy({ top: window.innerHeight, left: 0, behavior: 'smooth' });
        };
        
        if (scrollButton) {
            scrollButton.addEventListener('click', scrollToContent);
        }

        return () => {
            if (scrollButton) {
                scrollButton.removeEventListener('click', scrollToContent);
            }
        };
    }, []);

    return (
        <button id="scroll-button" className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
            <ChevronDown className="h-14 w-14 text-primary hidden lg:block hover:scale-110 hover:text-primary/80 transition-all duration-300" />
        </button>
    );
};

export default ScrollButton;
