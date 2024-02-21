import remark from 'remark'
import html from 'remark-html'

import { CodeBlock, Note } from "../components/Markdown";
import { AsideLink } from '@/components/Aside';

export const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export const markdownTitleToHtml = async (title: string) => {
  return (await markdownToHtml(title)).replace(/<\/?p>/g, '')
}

export const components = {
  code: CodeBlock as unknown as React.ReactNode,
  aside: Note as unknown as React.ReactNode,
  AsideLink: AsideLink as unknown as React.ReactNode,
};