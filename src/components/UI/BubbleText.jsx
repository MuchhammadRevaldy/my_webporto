import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BubbleText = ({ text, as: Tag = "h2", className = "text-xl md:text-2xl font-light cursor-default", baseTextColor = "text-gray-400" }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    let globalIndex = 0;

    return (
        <Tag
            className={className}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            {text.split(" ").map((word, wordIndex) => {
                const wordComponent = (
                    <span key={wordIndex} className="inline-block whitespace-nowrap">
                        {word.split("").map((char, charIndex) => {
                            const currentIndex = globalIndex;
                            globalIndex++;
                            return (
                                <Character
                                    key={charIndex}
                                    char={char}
                                    index={currentIndex}
                                    hoveredIndex={hoveredIndex}
                                    setHoveredIndex={setHoveredIndex}
                                    baseTextColor={baseTextColor}
                                />
                            );
                        })}
                    </span>
                );

                globalIndex++;

                return (
                    <React.Fragment key={wordIndex}>
                        {wordComponent}
                        {" "}
                    </React.Fragment>
                );
            })}
        </Tag>
    );
};

const Character = ({ char, index, hoveredIndex, setHoveredIndex, baseTextColor }) => {

    let scale = 1;
    let targetColor = "#9ca3af";
    if (baseTextColor === "text-gray-300") targetColor = "#d1d5db";

    let y = 0;
    let zIndex = 0;

    if (hoveredIndex !== null) {
        const distance = Math.abs(hoveredIndex - index);
        if (distance === 0) {
            scale = 1.3;
            targetColor = "#FFFFFF";
            y = -2;
            zIndex = 50;
        } else if (distance === 1) {
            scale = 1.15;
            targetColor = "#DDDDDD";
            zIndex = 10;
        } else if (distance === 2) {
            scale = 1.05;
            targetColor = "#AAAAAA";
            zIndex = 1;
        }
    }

    return (
        <motion.span
            className="inline-block"
            animate={{
                scale: scale,
                y: y,
                color: targetColor,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{
                zIndex: zIndex,
                position: 'relative'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
        >
            {char}
        </motion.span>
    );
};

export default BubbleText;
