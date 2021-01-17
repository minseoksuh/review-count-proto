import { useQuery } from "@apollo/react-hooks";

import { GET_PR_REVIEWS } from "./queries";

export default function Wrapper() {
  // const res = useQuery(INTROSPECT);
  const res2 = useQuery(GET_PR_REVIEWS, {
    variables: {
      owner: "meshkorea",
      name: "vroong-tms-manager-web",
      number: 10,
    },
  });

  console.log({ res2 });

  let dataMap;

  if (res2.data)
    dataMap = res2.data.search.edges.reduce((prev, curr) => {
      console.log({ curr });

      const authorSet = new Set();

      curr.node.comments.nodes.forEach((comment) => {
        authorSet.add(comment.author.login);
      });

      curr.node.reviews.nodes.forEach((review) => {
        authorSet.add(review.author.login);
      });

      authorSet.forEach((username) => {
        console.log(username, prev[username]);
        prev[username] = prev[username] === undefined ? 1 : prev[username] + 1;
      });

      console.log({ prev });
      return prev;
    }, {});

  console.log({ dataMap });

  return (
    <div>
      {dataMap &&
        Object.keys(dataMap).map((key) => (
          <div>
            {key}: {dataMap[key]}
          </div>
        ))}
    </div>
  );
}
