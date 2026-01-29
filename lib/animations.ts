import { Variants } from "framer-motion";

// Fade in animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    // Short, lightweight fade
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 12 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -12 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -16 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 16 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.96 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

export const scaleInUp: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.94,
    y: 10
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Stagger animations for lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Tighter stagger so lists feel snappy
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

// Slide animations
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -24 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 24 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

// Rotate animations
export const rotateIn: Variants = {
  hidden: { 
    opacity: 0, 
    rotate: -6,
    scale: 0.96
  },
  visible: { 
    opacity: 1, 
    rotate: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Hover animations
export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

export const hoverLift: Variants = {
  rest: { 
    y: 0,
    boxShadow: "0 0 0 rgba(0,0,0,0)"
  },
  hover: { 
    y: -5,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 }
  }
};

// Viewport-based animations
export const viewportFadeIn: Variants = {
  hidden: { 
    opacity: 0, 
    y: 16 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3, 
      ease: "easeOut" 
    }
  }
};

export const viewportFadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.35, 
      ease: "easeOut" 
    }
  }
};

// Delay variants for sequential animations
export const createDelayedVariant = (delay: number, baseVariant: Variants = fadeInUp): Variants => ({
  ...baseVariant,
  visible: {
    ...baseVariant.visible,
    transition: {
      ...(typeof baseVariant.visible === 'object' && 'transition' in baseVariant.visible ? baseVariant.visible.transition : {}),
      delay
    }
  }
});
