import { useQuery } from "@apollo/react-hooks";
import { GET_PR_REVIEWS } from "./queries";

import { useEffect, useMemo } from "react";

const Query = ({ repoName, onRequestComplete, isDataLoaded }) => {
  const queryString = useMemo(
    () => `repo:meshkorea/${repoName} is:pr created:>=${getFirstDateOfMonth()}`,
    [repoName]
  );

  const res = useQuery(GET_PR_REVIEWS, {
    variables: {
      queryString: queryString,
    },
  });
  useEffect(() => {
    if (res && res.data) {
      const userToReviewCountMap = res.data.search.edges.reduce(
        (prev, curr) => {
          const authorSet = new Set();

          curr.node.comments.nodes.forEach((comment) => {
            authorSet.add(comment.author.login);
          });

          curr.node.reviews.nodes.forEach((review) => {
            authorSet.add(review.author.login);
          });

          authorSet.forEach((username) => {
            prev[username] =
              prev[username] === undefined ? 1 : prev[username] + 1;
          });

          return prev;
        },
        {}
      );

      onRequestComplete(repoName, userToReviewCountMap);
    }
  }, [res]);

  return (
    <li style={{ marginTop: "20px" }}>
      {repoName}: {isDataLoaded ? "데이터 로드 완료" : "데이터 로드 중"}
    </li>
  );
};

export default Query;

function getFirstDateOfMonth() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    year = d.getFullYear();

  if (month.length < 2) month = month.padStart(2, "0");

  return [year, month, "01"].join("-");
}
