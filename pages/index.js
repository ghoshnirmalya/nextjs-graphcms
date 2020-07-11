import { GraphQLClient } from "graphql-request";
import Link from "next/link";

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT);

export async function getStaticProps() {
  const { posts } = await graphcms.request(
    `
    query Posts() {
      posts {
        id
        title
        excerpt
        slug
        coverImage {
          id
          url
        }
        author {
          id
          name
        }
        date
      }
    }
  `
  );

  return {
    props: {
      posts,
    },
  };
}

export default ({ posts }) => {
  return (
    <div className="py-16 bg-gray-100">
      {posts.map((post) => {
        return (
          <Link key={post.id} as={`/post/${post.slug}`} href="/post/[slug]">
            <a className="max-w-lg shadow-lg mb-16 rounded-lg mx-auto flex">
              <div
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                style={{ backgroundImage: `url(${post.coverImage.url})` }}
                title={post.title}
              />
              <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                  <div className="text-gray-900 font-bold text-xl mb-2">
                    {post.title}
                  </div>
                  <p className="text-gray-700 text-base">{post.excerpt}</p>
                </div>
                <div className="flex items-center">
                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">
                      {post.author.name}
                    </p>
                    <p className="text-gray-600">{post.date}</p>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
