function process_argv() {
    const { argv } = process;
    const result = studentPortal(argv[2]);

    return result;
}

function studentPortal(studentId) {
    const studentList = [
        {
            id: "2010310164",
            name: "Rakanda Pangeran Nasution",
            gpa: 2.65,
            status: false,
        },
        {
            id: "2011310021",
            name: "Yosef Noferianus Gea",
            gpa: 3.1,
            status: true,
        },
        {
            id: "2014310100",
            name: "Angelia",
            gpa: 1.25,
            status: true,
        },
        {
            id: "2011320090",
            name: "Dito Bagus Prasetio",
            gpa: 2.75,
            status: true,
        },
        {
            id: "2011320100",
            name: "Hikman Nurahman",
            gpa: 2.45,
            status: true,
        },
        {
            id: "2010320181",
            name: "Edizon",
            gpa: 1.95,
            status: true,
        },
        {
            id: "2012320055",
            name: "Marrisa Stella",
            gpa: 3.5,
            status: false,
        },
        {
            id: "2012330080",
            name: "Dea Christy Keliat",
            gpa: 3,
            status: true,
        },
        {
            id: "2013330049",
            name: "Sekarini Mahyaswari",
            gpa: 3.5,
            status: true,
        },
        {
            id: "2012330004",
            name: "Yerica",
            gpa: 3.15,
            status: false,
        },
    ];

    let student = studentList.find((student) => student.id === studentId);

    if (!student) {
        return "Mahasiswa tidak terdaftar";
    }

    if (student.status === false) {
        return "Mahasiswa dengan id " + studentId + " sudah tidak aktif";
    }

    let credits = getCredits(student.gpa);
    let subjects = getSubjects(credits);

    let dataStudent = {
        id: student.id,
        name: student.name,
        gpa: student.gpa,
        credits: credits,
        subjects: subjects
    };

    return dataStudent;
}

function getCredits(gpa) {
    if (gpa > 2.99) {
        let credits = 24
        return credits;
    } else if (gpa >= 2.5 && gpa < 3) {
        let credits = 21
        return credits;
    } else if (gpa >= 2 && gpa < 2.5) {
        let credits = 18
        return credits;
    } else if (gpa >= 1.5 && gpa < 2) {
        let credits = 15
        return credits;
    } else if (gpa >= 0 && gpa < 1.5) {
        let credits = 12
        return credits;
    }
}

function getSubjects(credits) {
    const subjectsList = [
        {
            subjectName: "Ilmu Politik",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Ilmu Ekonomi",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Estetika",
            credit: 1,
            status: "pilihan",
        },
        {
            subjectName: "Kepemimpinan",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Etika",
            credit: 2,
            status: "pilihan",
        },
        {
            subjectName: "Sosiologi",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Teori Pengambil keputusan",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Statistika",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Aplikasi IT",
            credit: 3,
            status: "pilihan",
        },
    ];

    const output = [];
    let remainCredits = credits;
    let mustCourses = [];

    for (let i = 0; i < subjectsList.length; i++) {
        const subject = subjectsList[i];

        if (subject.status === "wajib") {
            mustCourses.push(subject);
        }
    }

    for (let i = 0; i < mustCourses.length; i++) {
        const course = mustCourses[i];

        if (remainCredits >= course.credit) {
            output.push(course);
            remainCredits -= course.credit;
        } else {
            break;
        }
    }

    if (remainCredits > 0) {
        const optionCourses = subjectsList.filter(
            (course) => course.status === "pilihan"
        );

        optionCourses.sort((a, b) => b.credit - a.credit);

        for (let i = 0; i < optionCourses.length; i++) {
            const course = optionCourses[i];

            if (remainCredits >= course.credit) {
                output.push(course);
                remainCredits -= course.credit;

                if (remainCredits === 0) {
                    break;
                }
            }
        }
    }
    return output;
}

// Dilarang menghapus/mangganti code dibawah ini!!!
if (process.env.NODE_ENV !== "test") {
    console.log(process_argv());
}

module.exports = {
    studentPortal,
    getSubjects,
    getCredits,
};
