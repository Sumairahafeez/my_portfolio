const path = require("path");
const _ = require("lodash");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.js`);
  const tagTemplate = path.resolve("src/templates/tag.js");

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`🚨 Error while running GraphQL query.`);
    return;
  }

  // Ensure posts and tags are defined
  const posts = result.data?.postsRemark?.edges || [];
  const tags = result.data?.tagsGroup?.group || [];

  if (posts.length === 0) {
    reporter.warn("⚠️ No blog posts found. Skipping post page creation.");
  } else {
    // Create post detail pages
    posts.forEach(({ node }) => {
      if (node.frontmatter.slug) {
        createPage({
          path: node.frontmatter.slug,
          component: postTemplate,
          context: {
            slug: node.frontmatter.slug, // Pass slug to context
          },
        });
      } else {
        reporter.warn(`⚠️ Skipping post with missing slug.`);
      }
    });
  }

  if (tags.length === 0) {
    reporter.warn("⚠️ No tags found. Skipping tag page creation.");
  } else {
    // Make tag pages
    tags.forEach(tag => {
      if (tag.fieldValue) {
        createPage({
          path: `/pensieve/tags/${_.kebabCase(tag.fieldValue)}/`,
          component: tagTemplate,
          context: {
            tag: tag.fieldValue,
          },
        });
      } else {
        reporter.warn(`⚠️ Skipping tag with missing fieldValue.`);
      }
    });
  }
};

// Fix third-party modules during HTML build
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          { test: /scrollreveal/, use: loaders.null() },
          { test: /animejs/, use: loaders.null() },
          { test: /miniraf/, use: loaders.null() },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@config": path.resolve(__dirname, "src/config"),
        "@fonts": path.resolve(__dirname, "src/fonts"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@images": path.resolve(__dirname, "src/images"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },
  });
};
