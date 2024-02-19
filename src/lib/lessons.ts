import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { components, markdownTitleToHtml } from './markdown'
import renderToString from 'next-mdx-remote/render-to-string'

import { MdxRemote } from 'next-mdx-remote/types'

const lessonsDirectory = path.resolve('./src/lessons')

type LesonBasic = {
    slug?: string;
    title: string;
    number: string | null;
}

type LessonMeta = LesonBasic & {
    slug: string;
    type: string;
    parentSlug?: string;
    previousSlug?: string;
    nextSlug?: string;    
    aside?: string[],
}

export type Lesson = {
    content?: MdxRemote.Source; 
    meta: LessonMeta;
    parent?: LesonBasic
    next?: LesonBasic
    previous?: LesonBasic
    aside?: Lesson[]
}

export async function getLessonContent(slug: string): Promise<Lesson> {
  const allLessons = await getLessons()

  const lesson = allLessons.find((l) => l.meta.slug === slug)

  if (!lesson) throw new Error(`No lesson found`);

  const lessonWithContent: Lesson = {
    ...lesson,
    meta: {
        ...lesson.meta,
        title: await markdownTitleToHtml(lesson.meta.title)
    }
  }

  const fullPath = path.join(lessonsDirectory, `${slug.toLowerCase()}.mdx`)
  if (!fs.existsSync(fullPath)) throw new Error(`Unknown lesson ${slug}`)
  lessonWithContent.content = await renderToString(
    matter(fs.readFileSync(fullPath, 'utf8')).content,
    { components: components }
  )

  if (lesson.meta.parentSlug) {
    const parent = allLessons.find((l) => l.meta.slug === lesson.meta.parentSlug)
    if (!parent) throw new Error(`Unknown parent lesson ${lesson.meta.parentSlug}`)
    lessonWithContent.parent = {
      title: await markdownTitleToHtml(parent.meta.title),
      slug: parent.meta.slug,
      number: parent.meta.number || null,
    }
  }

  if (lesson.meta.nextSlug) {
    const next = allLessons.find((l) => l.meta.slug === lesson.meta.nextSlug)
    if (!next) throw new Error(`Unknown next lesson ${lesson.meta.nextSlug}`)
    lessonWithContent.next = {
      title: await markdownTitleToHtml(next.meta.title),
      slug: next.meta.slug,
      number: next.meta.number || null,
    }
  }

  if (lesson.meta.previousSlug) {
    const previous = allLessons.find((l) => l.meta.slug === lesson.meta.previousSlug)
    if (!previous)
      throw new Error(`Unknown previous lesson ${lesson.meta.previousSlug}`)
    lessonWithContent.previous = {
      title: await markdownTitleToHtml(previous.meta.title),
      slug: previous.meta.slug,
      number: previous.meta.number || null,
    }
  }

  if(lesson.meta.aside && lesson.meta.aside.length !== 0) {
    const aside = allLessons.filter(l => (lesson.meta.aside || []).includes(l.meta.slug));
    lessonWithContent.aside = await Promise.all(aside.map(async l => {
      return await getLessonContent(l.meta.slug)
    }));
  }

  return lessonWithContent
}

export async function getLessons(): Promise<Lesson[]> {
  const slugs = fs
    .readdirSync(lessonsDirectory)
    .map((f) => f.replace(/\.mdx?$/, ''))

  const lessons: Lesson[] = slugs.map((slug) => {
    const fullPath = path.join(lessonsDirectory, `${slug.toLowerCase()}.mdx`)
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Unknown lesson ${slug}`)
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents) as unknown as { data: LessonMeta };
    return { meta: {...data, slug } }
  })

  let previous
  for (const lesson of lessons) {
    if (previous) {
      lesson.meta.previousSlug = previous.meta.slug
      previous.meta.nextSlug = lesson.meta.slug
    }
    previous = lesson
  }

  return lessons
}
