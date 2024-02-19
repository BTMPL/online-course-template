import hydrate from "next-mdx-remote/hydrate";
import { useState } from "react";

import { Aside, AsideContext } from "./aside";
import { Lesson as LessonProp } from "@/lib/lessons";
import { components } from "@/lib/markdown";

export const Lesson = ({ lesson }: { lesson: LessonProp }) => {
  if (!lesson.content) return null;

  const content = hydrate(lesson.content, { components: components });

  let header = null;
  if (lesson.meta.type === "lesson") {
    header = (
      <small className="block text-base mb-4">
        Lesson {lesson.meta.number}
      </small>
    );
  } else if (lesson.meta.type === "sublesson" && lesson.parent) {
    header = (
      <small className="block text-base mb-4">
        Lesson {lesson.parent.number}.{" "}
        <span dangerouslySetInnerHTML={{ __html: lesson.parent.title }} />
      </small>
    );
  }

  let title;
  if (lesson.meta.type === "sublesson") {
    title = (
      <>
        <span className="text-3xl mr-2">{lesson.meta.number}.</span>{" "}
        <span dangerouslySetInnerHTML={{ __html: lesson.meta.title }} />
      </>
    );
  } else {
    title = <span dangerouslySetInnerHTML={{ __html: lesson.meta.title }} />;
  }

  return (
    <AsideContext>
      <article className="prose prose-pink max-w-none">
        <h1>
          {header}
          {title}
        </h1>
        {content}

        {(lesson.aside || []).map((l) => (
          <Aside aside={l} key={l.meta.slug} />
        ))}
      </article>
    </AsideContext>
  );
};
