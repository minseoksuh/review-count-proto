import { useState, useCallback, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Query, { getFirstDateOfMonth } from "./Query";

const useStyles = makeStyles({
  table: {
    width: 1020,
    margin: "40px auto 40px",
  },
});
const repoList = [
  "mesh-one-web",
  "mesh-one-api",
  "mesh-ui",
  "mesh-control-platform-api",
  "meshkorea-landing-web",
  "vroong-tms-manager-web",
  "vroong-design-system-web",
  "vroong-urban-web",
  "vroong-store-web",
  "vroong-ceo-web",
  "vroong-orga-web",
  "vroong-bi-web",
  "vroong-rider-web",
  "vroong-direct-web",
  "vroong-mds-chrome-extension",
  "cake-form",
  "automata",
];

// TODO: get member list from api
const memberList = [
  "mindfull",
  "ClareKang",
  "yeomhyeseon",
  "magichim",
  "haeguri",
  "kizmo04",
  "Pewww",
  "juunone",
  "k44ng",
  "minseoksuh",
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
      <span style={{ position: "absolute", top: "12px", left: "12px" }}>
        {`${new Date().getFullYear()}년 ${
          new Date().getMonth() + 1
        }월 리뷰 현황판`}
      </span>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{ fontWeight: "700" }}>
          <TableRow>
            <TableCell>Dev / Repo</TableCell>
            {repoList.map((repoName) => (
              <TableCell align="right">{repoName}</TableCell>
            ))}
            <TableCell>Total</TableCell>
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
                  <TableCell>
                    {Object.keys(repoReviewCounts).reduce((prev, curr) => {
                      console.log(prev, curr);
                      return prev + (repoReviewCounts[curr][member] ?? 0);
                    }, 0)}
                  </TableCell>
                </TableRow>
              ))
            : "데이터 로드 중"}
        </TableBody>
      </Table>
      <hr style={{ margin: "0 20px" }} />
      <br />

      <div style={{ marginLeft: "30px", marginBottom: "12px" }}>
        *{getFirstDateOfMonth()} 이후로 생성된 PR에 대하여 코멘트나 리뷰를
        해주셨다면 count 1 이 올라갑니다.
      </div>
      <div style={{ marginLeft: "30px" }}>
        *한 PR에 여러번 리뷰를 하더라도 1로 count 됩니다.
      </div>
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
