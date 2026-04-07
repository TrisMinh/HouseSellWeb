import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2 } from "lucide-react";

export const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background pointer-events-auto"
        >
          <div className="relative">
            {/* Outer rings animation */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-4 rounded-full border-2 border-primary/30"
            />
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="absolute -inset-8 rounded-full border border-primary/20"
            />

            {/* Inner Logo */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-xl">
              <Building2 className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex flex-col items-center gap-3"
          >
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Blue Sky <span className="text-primary">Real Estate</span>
            </h2>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">Loading premium experience</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3, ease: "linear" }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6, ease: "linear" }}
              >
                .
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
