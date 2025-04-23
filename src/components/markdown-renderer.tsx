"use client"
import ReactMarkdown from "react-markdown"

interface MarkdownRendererProps {
  content: string
}

const markdownStyles = {
  heading1: "text-3xl font-bold mb-4 mt-6 border-b pb-1",
  heading2: "text-2xl font-bold mb-3 mt-5 border-b pb-1",
  heading3: "text-xl font-bold mb-2 mt-4",
  heading4: "text-lg font-bold mb-2 mt-3",
  paragraph: "mb-4",
  list: "list-disc ml-6 mb-4",
  orderedList: "list-decimal ml-6 mb-4",
  listItem: "mb-1",
  blockquote: "border-l-4 border-gray-300 pl-4 italic my-4",
  code: "bg-gray-100 p-1 rounded",
  codeBlock: "bg-gray-100 p-3 rounded my-4 overflow-x-auto",
  link: "text-blue-600 hover:underline",
  image: "max-w-full h-auto my-4",
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => <h1 className={markdownStyles.heading1} {...props} />,
        h2: ({ node, ...props }) => <h2 className={markdownStyles.heading2} {...props} />,
        h3: ({ node, ...props }) => <h3 className={markdownStyles.heading3} {...props} />,
        h4: ({ node, ...props }) => <h4 className={markdownStyles.heading4} {...props} />,
        p: ({ node, ...props }) => <p className={markdownStyles.paragraph} {...props} />,
        ul: ({ node, ...props }) => <ul className={markdownStyles.list} {...props} />,
        ol: ({ node, ...props }) => <ol className={markdownStyles.orderedList} {...props} />,
        li: ({ node, ...props }) => <li className={markdownStyles.listItem} {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className={markdownStyles.blockquote} {...props} />,
        a: ({ node, ...props }) => <a className={markdownStyles.link} {...props} />,
        img: ({ node, ...props }) => <img className={markdownStyles.image} {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

