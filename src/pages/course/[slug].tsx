import Link from "next/link";
import Layout from "../../components/layout";
import {
  Lesson as LessonProps,
  getLessonContent,
  getLessons,
} from "../../lib/lessons";
import { Lesson } from "../../components/lesson";

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const lesson = await getLessonContent(params.slug);
  return { props: { lesson } };
}

export async function getStaticPaths() {
  const lessons = await getLessons();
  return {
    paths: lessons.map((l) => ({ params: { slug: l.meta.slug } })),
    fallback: false,
  };
}

const BookPage = ({ lesson }: { lesson: LessonProps }) => {
  return (
    <Layout title={lesson.meta.title}>
      <header className="text-sm mb-6">
        <Link href="/course" className="text-pink-600">
          ← Back to lessons
        </Link>
      </header>
      <Lesson lesson={lesson} />
      <footer className="my-12 flex justify-end">
        {lesson.next && (
          <Link
            href={`/course/${lesson.next.slug}`}
            className="text-pink-600 text-2xl"
          >
            <span dangerouslySetInnerHTML={{ __html: lesson.next.title }} /> →
          </Link>
        )}
      </footer>
    </Layout>
  );
};

export default BookPage;
