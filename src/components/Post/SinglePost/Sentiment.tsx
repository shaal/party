import React from "react";
import { Post } from "src/__generated__/schema.generated";
import Sentiment from "sentiment";

interface Props {
  post: Post;
}

var sentiment = new Sentiment();

const PostSentiment: React.FC<Props> = ({ post }) => {
  const analysis = sentiment.analyze(post?.body);
  return <div>{JSON.stringify(analysis)}</div>;
};

export default PostSentiment;
