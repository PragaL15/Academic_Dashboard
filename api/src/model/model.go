package model
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
type Sub1 struct {
	ID           uint `gorm:"primaryKey"`
	Dept1       int
	CourseCode1 int
	CourseID1   int
	CourseTitle1 int
	CourseType1 int
	CourseNature1 int
}

type Sub2 struct {
	ID           uint `gorm:"primaryKey"`
	Dept2       int
	CourseCode2 int
	CourseID2   int
	CourseTitle2 int
	CourseType2 int
	CourseNature2 int
}
type Sub3 struct {
	ID           uint `gorm:"primaryKey"`
	Dept3      int
	CourseCode3 int
	CourseID3   int
	CourseTitle3 int
	CourseType3 int
	CourseNature3 int
}
type Sub4 struct {
	ID           uint `gorm:"primaryKey"`
	Dept4       int
	CourseCode4 int
	CourseID4   int
	CourseTitle4 int
	CourseType4 int
	CourseNature4 int
}
