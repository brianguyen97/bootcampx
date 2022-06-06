SELECT cohorts.name AS cohort, COUNT(students.*) AS student_count
FROM students
JOIN cohorts ON cohort_id = cohorts.id
GROUP BY cohort
HAVING COUNT(students.*) >= 18
ORDER BY COUNT(students.*)
