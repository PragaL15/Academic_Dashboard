package main

import (
	"database/sql"
	
	"github.com/gofiber/fiber/v2"
	_ "github.com/jackc/pgx/v5"
	"log"
)

type UploadDetails struct {
	Name                   string `json:"name"`
	Department             string `json:"department"`
	Designation            string `json:"designation"`
	ReportingTo            string `json:"reporting_to"`
	Responsibilities       string `json:"responsibilities"`
	AcademicWorkloadTheory int    `json:"academic_workload_theory"`
	AcademicWorkloadLab    int    `json:"academic_workload_lab"`
	NoOfSubjects           int    `json:"no_of_subjects"`
	Sub1                   int    `json:"sub1,omitempty"`
	Sub2                   int    `json:"sub2,omitempty"`
	Sub3                   int    `json:"sub3,omitempty"`
	Sub4                   int    `json:"sub4,omitempty"`
	Sub5                   int    `json:"sub5,omitempty"`
	Sub6                   int    `json:"sub6,omitempty"`
}

type sub1 struct {
	Dept1          int `json:"dept1"`
	Course_code1   int `json:"course_code1"`
	Course_id1     int `json:"course_id1"`
	Course_title1  int `json:"course_title1"`
	Course_type1   int `json:"course_type1"`
	Course_nature1 int `json:"course_nature1"`
}

func main() {
	app := fiber.New()

	db, err := sql.Open("pgx", "host=localhost user=PragalyaK dbname=academic_portal password=pragalya123 sslmode=disable")
	if err != nil {
		log.Fatal("Error connecting to the database:", err)
	}
	defer db.Close()

	app.Post("/upload", func(c *fiber.Ctx) error {
		var details UploadDetails

		if err := c.BodyParser(&details); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
		}

		query := `INSERT INTO upload_details (name, department, designation, reporting_to, responsibilities, 
            academic_workload_theory, academic_workload_lab, no_of_subjects, sub1, sub2, sub3, sub4, sub5, sub6) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`

		values := []interface{}{
			details.Name,
			details.Department,
			details.Designation,
			details.ReportingTo,
			details.Responsibilities,
			details.AcademicWorkloadTheory,
			details.AcademicWorkloadLab,
			details.NoOfSubjects,
		}

		for i := 1; i <= 6; i++ {
			if i <= details.NoOfSubjects {
				values = append(values, 1) 
			} else {
				values = append(values, nil)
			}
		}

		_, err = db.Exec(query, values...)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error inserting data into database"})
		}

		return c.JSON(fiber.Map{"message": "Data uploaded successfully"})
	})

	log.Fatal(app.Listen(":8000"))
}
