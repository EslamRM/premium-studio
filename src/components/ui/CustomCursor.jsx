import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import './CustomCursor.css';

/**
 * CustomCursor — Enhanced Magnetic & Trailing Cursor
 * Features:
 * - Constant Precision Dot + Smooth Trailing Ring
 * - Magnetic Snapping to buttons/links
 * - Color inversion via mix-blend-mode: difference
 * - High-speed 60FPS motion via Framer Motion
 */
const CustomCursor = () => {
    // 1. Core Position Values (Direct tracking)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // 2. Trailing Spring Values (Fluid delay)
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const trailingX = useSpring(cursorX, springConfig);
    const trailingY = useSpring(cursorY, springConfig);

    // 3. Interaction State
    const [isHovering, setIsHovering] = useState(false);
    const [isMagnetic, setIsMagnetic] = useState(false);
    const [hoverText, setHoverText] = useState('');
    const [targetRect, setTargetRect] = useState(null);

    useEffect(() => {
        const moveCursor = (e) => {
            if (isMagnetic && targetRect) {
                // If magnetic, we calculate a "pull" toward the element center
                const centerX = targetRect.left + targetRect.width / 2;
                const centerY = targetRect.top + targetRect.height / 2;
                
                // Cursor stays near the magnet but moves slightly with the mouse
                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;
                
                cursorX.set(centerX + (distanceX * 0.15));
                cursorY.set(centerY + (distanceY * 0.15));
            } else {
                cursorX.set(e.clientX);
                cursorY.set(e.clientY);
            }
        };

        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, .project-card, [data-cursor-hover]');
            if (target) {
                setIsHovering(true);
                setHoverText(target.getAttribute('data-cursor-hover') || '');
                
                // Enable magnetic effect for buttons and links
                if (target.tagName === 'BUTTON' || target.tagName === 'A') {
                    setIsMagnetic(true);
                    setTargetRect(target.getBoundingClientRect());
                }
            } else {
                setIsHovering(false);
                setIsMagnetic(false);
                setTargetRect(null);
                setHoverText('');
            }
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            setIsMagnetic(false);
            setTargetRect(null);
            setHoverText('');
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isMagnetic, targetRect]);

    return (
        <div className="custom-cursor-layer">
            {/* 1. Main Precision Dot (Inverted + Fast) */}
            <motion.div
                className="cursor-dot"
                style={{
                    left: cursorX,
                    top: cursorY,
                    x: '-50%',
                    y: '-50%'
                }}
                animate={{
                    scale: isMagnetic ? 0.5 : 1,
                }}
            />

            {/* 2. Trailing Fluid Ring (Inverted + Spring) */}
            <motion.div
                className="cursor-ring"
                style={{
                    left: trailingX,
                    top: trailingY,
                    x: '-50%',
                    y: '-50%'
                }}
                animate={{
                    width: isHovering ? (isMagnetic ? 80 : 100) : 40,
                    height: isHovering ? (isMagnetic ? 80 : 100) : 40,
                    opacity: 1,
                    backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    borderColor: isHovering ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.4)'
                }}
            />

            {/* 3. Interaction Label Text */}
            <AnimatePresence>
                {hoverText && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 10 }}
                        className="cursor-label"
                        style={{
                            left: trailingX,
                            top: trailingY,
                            x: 50,
                            y: 50
                        }}
                    >
                        {hoverText}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomCursor;
