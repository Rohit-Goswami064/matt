"use client";

import { useEffect, useState } from "react";
import { motion, type HTMLMotionProps } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  animationType?: "letters" | "words";
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  initialY?: number;
  initialOpacity?: number;
  animateY?: number;
  animateOpacity?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
}

export default function AnimatedText({
  text,
  className = "text-4xl font-bold",
  animationType = "letters",
  duration = 0.6,
  delay = 0,
  staggerDelay = 0.05,
  initialY = 10,
  initialOpacity = 0,
  animateY = 0,
  animateOpacity = 1,
  as = "div"
}: AnimatedTextProps) {
  const [ready, setReady] = useState(false);
  const MotionTag = motion[as] as typeof motion.div;
  const Tag = as;
  const accessibleLabel = text.replace(/\n/g, " ");

  useEffect(() => {
    setReady(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: initialY,
      opacity: initialOpacity
    },
    visible: {
      y: animateY,
      opacity: animateOpacity,
      transition: {
        duration: duration,
        ease: "easeOut" as const
      }
    }
  };

  const renderLetters = (animated: boolean) => {
    return text.split("").map((char, index) => {
      if (char === "\n") {
        return <br key={`br-${index}`} />;
      }

      const style = { whiteSpace: char === " " ? "pre" : "normal" } as const;

      if (!animated) {
        return (
          <span key={`letter-${index}`} className="inline-block" style={style}>
            {char}
          </span>
        );
      }

      return (
        <motion.span
          key={`letter-${index}`}
          variants={itemVariants}
          className="inline-block"
          style={style}>
          {char}
        </motion.span>
      );
    });
  };

  const renderWords = (animated: boolean) => {
    return text.split(/(\s+)/).map((part, index) => {
      if (part === "\n") {
        return <br key={`br-${index}`} />;
      }

      if (/^\s+$/.test(part)) {
        return (
          <span key={`space-${index}`} style={{ whiteSpace: "pre" }}>
            {part}
          </span>
        );
      }

      if (!animated) {
        return (
          <span key={`word-${index}`} className="mr-2 inline-block">
            {part}
          </span>
        );
      }

      return (
        <motion.span key={`word-${index}`} variants={itemVariants} className="mr-2 inline-block">
          {part}
        </motion.span>
      );
    });
  };

  const content = animationType === "letters" ? renderLetters(ready) : renderWords(ready);

  if (!ready) {
    return (
      <Tag className={className} aria-label={accessibleLabel} style={{ opacity: 0 }}>
        <span aria-hidden="true">{content}</span>
      </Tag>
    );
  }

  const motionProps: HTMLMotionProps<"div"> = {
    className,
    variants: containerVariants,
    initial: "hidden",
    animate: "visible",
    "aria-label": accessibleLabel
  };

  return (
    <MotionTag {...motionProps}>
      <span aria-hidden="true">{content}</span>
    </MotionTag>
  );
}
