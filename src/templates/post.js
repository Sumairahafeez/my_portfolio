import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const PostTemplate = ({ data }) => {
  const post = data?.markdownRemark;

  if (!post) {
    return (
      <Layout>
        <h1>Post Not Found</h1>
        <p>The post you are looking for does not exist.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
 query ($slug: String!) {
  markdownRemark(frontmatter: { slug: { eq: $slug } }) {
    html
    frontmatter {
      title
      date
    }
  }
}

`;
