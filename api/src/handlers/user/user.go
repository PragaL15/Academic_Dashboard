package userHandler

import (
    "github.com/gofiber/fiber/v2"
    "gorm.io/gorm"
    "net/http"
)




type UploadDetails struct {
    Name                  string `json:"name"`
    Department            string `json:"department"`
    Designation           string `json:"designation"`
    ReportingTo           string `json:"reporting_to"`
    Responsibilities      string `json:"responsibilities"`
    AcademicWorkloadTheory int    `json:"academic_workload_theory"`
    AcademicWorkloadLab    int    `json:"academic_workload_lab"`
    NoOfSubjects          int    `json:"no_of_subjects"`
    Sub1                  int    `json:"sub1"`
    Sub2                  int    `json:"sub2"`
    Sub3                  int    `json:"sub3"`
    Sub4                  int    `json:"sub4"`
    Sub5                  int    `json:"sub5"`
    Sub6                  int    `json:"sub6"`
}
var DB *gorm.DB
func HandlePostRequest(c *fiber.Ctx) error {
    var details UploadDetails

    if err := c.BodyParser(&details); err != nil {
        return c.Status(http.StatusBadRequest).JSON(fiber.Map{
            "error": "Cannot parse request body",
        })
    }

    if result := DB.Create(&details); result.Error != nil {
        return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to insert data into database",
        })
    }
    return c.Status(http.StatusCreated).JSON(fiber.Map{
        "message": "Details uploaded successfully",
        "data":    details,
    })
}
