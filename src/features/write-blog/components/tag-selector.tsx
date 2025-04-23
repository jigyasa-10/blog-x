import { useFormContext, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PostType } from "../schema";

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

export function TagSelector({ tags }: { tags: { id: string; name: string }[] }) {
  const form = useFormContext<PostType>();

  return (
    <FormField
      control={form.control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <motion.div
              className="flex flex-wrap gap-3 overflow-visible mt-2"
              layout
              transition={transitionProps}
            >
              {tags.map((tag) => {
                const isSelected = field.value?.includes(tag.id);

                return (
                  <motion.button
                    type="button"
                    key={tag.id}
                    onClick={() => {
                      if (isSelected) {
                        field.onChange(field.value.filter((id) => id !== tag.id));
                      } else {
                        field.onChange([...field.value, tag.id]);
                      }
                    }}
                    layout
                    initial={false}
                    animate={{
                      backgroundColor: isSelected
                        ? "" // blue-800
                        : "rgba(219, 234, 254, 0.3)", // blue-100/opacity
                    }}
                    whileHover={{
                      backgroundColor: isSelected
                        ? "" // blue-900
                        : "rgba(191, 219, 254, 0.6)", // blue-200/opacity
                    }}
                    whileTap={{
                      backgroundColor: isSelected
                        ? "#1e429f"
                        : "rgba(147, 197, 253, 0.8)", // blue-300/opacity
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      mass: 0.5,
                      backgroundColor: { duration: 0.1 },
                    }}
                    className={`
                      inline-flex items-center px-4 py-2 rounded-full text-base font-medium
                      whitespace-nowrap overflow-hidden ring-3
                      ${isSelected
                        ? "text-blue-500 ring-blue-500"
                        : "text-blue-300 ring-blue-300"}
                    `}
                  >
                    <motion.div
                      className="relative flex items-center"
                      animate={{
                        width: isSelected ? "auto" : "100%",
                        paddingRight: isSelected ? "1.5rem" : "0",
                      }}
                      transition={{
                        ease: [0.175, 0.885, 0.32, 1.275],
                        duration: 0.3,
                      }}
                    >
                      <span>{tag.name}</span>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={transitionProps}
                            className="absolute right-0"
                          >
                            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" strokeWidth={1.5} />
                            </div>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
