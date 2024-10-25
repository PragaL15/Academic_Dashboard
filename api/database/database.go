package database

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// Declare a global variable to hold the database connection
var DB *gorm.DB

// Define your table structure using GORM model struct
type UploadDetails struct {
	ID                     uint   `gorm:"primaryKey"`
	Name                   string `gorm:"size:255"`
	Department             string `gorm:"size:255"`
	Designation            string `gorm:"size:255"`
	ReportingTo            string `gorm:"size:255"`
	Responsibilities       string `gorm:"type:text"`
	AcademicWorkloadTheory int
	AcademicWorkloadLab    int
	NoOfSubjects           int
	Sub1                   int
	Sub2                   int
	Sub3                   int
	Sub4                   int
	Sub5                   int
	Sub6                   int
}

// Adding handler function for POST request
func HandlePostRequest(c *fiber.Ctx) error {
	// Parse incoming request body
	uploaddetails := new(UploadDetails)
	if err := c.BodyParser(uploaddetails); err != nil {
		log.Println("Error parsing request body:", err)
		return c.Status(fiber.StatusBadRequest).SendString("Invalid request format")
	}

	// Process the data (e.g., save to database)
	if err := DB.Create(uploaddetails).Error; err != nil {
		log.Println("Error saving to database:", err)
		return c.Status(fiber.StatusInternalServerError).SendString("Error saving data")
	}

	log.Printf("Received user: %+v\n", uploaddetails)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "User data received",
		"data":    uploaddetails, // Return the actual uploaded details
	})
}

// ConnectDatabase initializes the database connection
func ConnectDatabase() error {
	err := godotenv.Load()
	if err != nil {
		return fmt.Errorf("Error loading .env file: %v", err)
	}

	// Fetch the database connection details from the .env file
	dsn := os.Getenv("DB_USER") + ":" + os.Getenv("DB_PASSWORD") + "@tcp(" + os.Getenv("DB_HOST") + ")/" + os.Getenv("DB_NAME") + "?charset=utf8mb4&parseTime=True&loc=Local"

	var connErr error
	DB, connErr = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if connErr != nil {
		return fmt.Errorf("Failed to connect to database: %v", connErr)
	}

	if err := DB.AutoMigrate(&UploadDetails{}); err != nil {
		return fmt.Errorf("Failed to migrate database: %v", err)
	}

	fmt.Println("Database connected and migration completed.")
	return nil
}
