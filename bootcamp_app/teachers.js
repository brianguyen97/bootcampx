const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "postgres",
});

// pool
//   .query(
//     `
// SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
// FROM teachers
// JOIN assistance_requests ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// JOIN cohorts ON cohort_id = cohorts.id
// WHERE cohorts.name = '${process.argv[2] || "JUL02"}'
// ORDER BY teacher;
// `
//   )
//   .then((res) => {
//     res.rows.forEach((row) => {
//       console.log(`${row.cohort}: ${row.teacher}`);
//     });
//   });

const print = function () {
  const args = process.argv.slice(2);
  const queryString = `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name = $1
  ORDER BY teacher;
  `;
  const values = [args[0]];
  pool.query(queryString, values).then((res) => {
    for (let row of res.rows) {
      console.log(`${row.cohort}: ${row.teacher}`);
    }
  });
};

print();
