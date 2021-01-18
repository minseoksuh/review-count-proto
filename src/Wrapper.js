import { useState, useCallback, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Query from "./Query";

const useStyles = makeStyles({
  table: {
    width: 1020,
    margin: "40px auto 40px",
  },
});
const repoList = [
  "vroong-tms-manager-web",
  "vroong-design-system-web",
  "mesh-one-web",
  "vroong-ceo-web",
];

// TODO: get member list from api
const memberList = [
  "mindfull",
  "magichim",
  "haeguri",
  "kizmo04",
  "Pewww",
  "jungpaeng",
  "juunone",
  "k44ng",
  "minseoksuh",
  "yeomhyeseon",
];

export default function Wrapper() {
  const classes = useStyles();

  const [repoReviewCounts, setRepoReviewCounts] = useState({});

  const setReviewCountsData = useCallback(
    (repoName, reviewCountData) => {
      setRepoReviewCounts({ ...repoReviewCounts, [repoName]: reviewCountData });
    },
    [repoReviewCounts]
  );

  console.log("state", repoReviewCounts);

  const isDataReady = useMemo(() => {
    return repoList.every((repoName) => !!repoReviewCounts[repoName]);
  }, [repoReviewCounts]);

  console.log({ isDataReady });

  return (
    <div style={{ margin: "auto" }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dev / Repo</TableCell>
            {repoList.map((repoName) => (
              <TableCell align="right">{repoName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isDataReady
            ? memberList.map((member) => (
                <TableRow key={member}>
                  <TableCell component="th" scope="row">
                    {member}
                  </TableCell>
                  {repoList.map((repoName) => (
                    <TableCell align="right">
                      {repoReviewCounts[repoName][member] ?? 0}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : "데이터 로드 중"}
        </TableBody>
      </Table>
      <hr style={{ margin: "0 20px" }} />
      <br />

      <ul style={{ marginLeft: "30px" }}>
        {repoList.map((repoName) => (
          <Query
            repoName={repoName}
            onRequestComplete={setReviewCountsData}
            isDataLoaded={!!repoReviewCounts[repoName]}
          />
        ))}
      </ul>
    </div>
  );
}
