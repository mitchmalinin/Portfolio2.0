'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence
} from 'motion/react';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
  isExpanded?: boolean;
  onExpandClick?: () => void;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-lg bg-black border border-dashed border-[#333333] hover:border-[#BEFE00] transition-colors ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-10 left-1/2 w-fit whitespace-pre px-3 py-1 text-xs text-[#BEFE00] uppercase tracking-wider bg-black border border-dashed border-[#BEFE00]`}
          style={{ x: '-50%' }}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50,
  isExpanded = true,
  onExpandClick
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  // Calculate fixed widths to avoid 'auto' glitch
  const gap = 10;
  const padding = 12;
  const expandedWidth = (items.length * baseItemSize) + ((items.length - 1) * gap) + (padding * 2);
  const collapsedWidth = 64;

  return (
    <motion.div
      style={{ height: isExpanded ? panelHeight : collapsedWidth, scrollbarWidth: 'none' }}
      className="mx-2 flex max-w-full items-center justify-center"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          if (isExpanded) {
            isHovered.set(1);
            mouseX.set(pageX);
          }
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${className} relative flex items-end justify-center rounded-2xl overflow-visible`}
        initial={false}
        animate={{
          width: isExpanded
            ? [collapsedWidth, expandedWidth + 8, expandedWidth]
            : [expandedWidth, collapsedWidth - 8, collapsedWidth],
          height: isExpanded ? panelHeight : collapsedWidth,
          paddingBottom: isExpanded ? 8 : 0,
          paddingLeft: isExpanded ? padding : 0,
          paddingRight: isExpanded ? padding : 0,
        }}
        transition={{
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1],
          width: {
            duration: 0.25,
            times: [0, 0.7, 1],
            ease: 'easeOut',
          },
        }}
        style={{
          background: 'rgba(30, 30, 30, 0.6)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
        role="toolbar"
        aria-label="Application dock"
      >
        {/* Collapsed state icon */}
        <motion.button
          onClick={onExpandClick}
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          initial={false}
          animate={{
            opacity: isExpanded ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          whileHover={{ scale: isExpanded ? 1 : 1.05 }}
          whileTap={{ scale: isExpanded ? 1 : 0.95 }}
          style={{ pointerEvents: isExpanded ? 'none' : 'auto' }}
        >
          <MoreHorizontal size={24} className="text-white" />
        </motion.button>

        {/* Dock items */}
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
              delay: isExpanded ? index * 0.02 : 0,
            }}
            style={{
              pointerEvents: isExpanded ? 'auto' : 'none',
              marginLeft: isExpanded && index > 0 ? gap : 0,
            }}
          >
            <DockItem
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
