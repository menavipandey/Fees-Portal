const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('./models/Student');
const connectDB = require('./config/db');
const User = require('./models/User');

require('dotenv').config();
connectDB();




const createUsersForExistingStudents = async () => {
  try {
    const students = await Student.find();

    for (const student of students) {
      // Check if a user already exists for this student email
      const existingUser = await User.findOne({ email: student.email });
      if (!existingUser) {
        const defaultPassword = 'password';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(defaultPassword, salt);

        let user = new User({
          name: student.name,
          email: student.email,
          password: hashedPassword,
          role: 'student',
        });

        await user.save();
        console.log(`User profile created for student: ${student.name}`);
      } else {
        console.log(`User profile already exists for student: ${student.name}`);
      }
    }

    console.log('Finished creating user profiles for existing students');
  } catch (err) {
    console.error('Error creating user profiles for existing students:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

createUsersForExistingStudents();






// async function updateStudents() {
//   try {
//     await Student.updateMany({}, {
//       $set: {
//         email: '',
//         gender: '',
//         dob: new Date(),
//         parentName: '',
//         parentContact: '',
//         phone: '',
//         enrollmentDate: new Date(),
//         emergencyContact: '',
//         nationality: '',
//         previousSchool: '',
//         profilePicture: ''
//       }
//     });

//     console.log('Students updated successfully');
//   } catch (error) {
//     console.error('Error updating students:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// updateStudents();























// const updateStudentSessions = async () => {
//     try {
//       // Update all documents in the 'students' collection
//       await Student.updateMany({}, { $set: { session: '2024-2025' } });
//       console.log('Student sessions updated successfully');
//     } catch (error) {
//       console.error('Error updating student sessions:', error);
//     } finally {
//       mongoose.disconnect(); // Close the connection after updating
//     }
//   };
  
//   // Execute the function
//   updateStudentSessions();





// const updateStudentsFeesStatus = async () => {
//   try {
//     await Student.updateMany(
//       { feesStatus: { $exists: false } },
//       { $set: { feesStatus: 'pending' } }
//     );
    
//     console.log('All students updated with default fees status.');
//     mongoose.connection.close();
//   } catch (err) {
//     console.error('Error updating students:', err);
//     mongoose.connection.close();
//   }
// };

// updateStudentsFeesStatus();



























// const mongoose = require('mongoose');
// const Student = require('./models/Student');
// const FeesStructure = require('./models/Feestructure'); 
// const connectDB = require('./config/db');

// require('dotenv').config();
// connectDB();

// const updateStudents = async () => {
//     try {
//         const students = await Student.find();

//         for (const student of students) {
//             const feestructure = await FeesStructure.findOne({ className: student.class });

//             if (feestructure) {
//                 student.feesStructure = feestructure._id;
//                 student.fees = undefined; // Remove the old `fees` field
//                 await student.save();
//                 console.log(`Updated student ${student.name} with fees structure for class ${student.class}`);
//             } else {
//                 console.log(`No fees structure found for class ${student.class}`);
//             }
//         }

//         console.log('Student update complete');
//     } catch (err) {
//         console.error('Error updating students:', err);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// updateStudents();
























// // const mongoose = require('mongoose');
// // const Student = require('./models/Student');
// // const connectDB = require('./config/db');


// // require('dotenv').config();
// // connectDB();

// // const migrate = async () => {
// //   try {
// //     // Find students where fines are not defined or incomplete
// //     const studentsToUpdate = await Student.find({
// //       $or: [
// //         { fines: { $exists: false } },
// //         { 'fines.amount': { $exists: false } },
// //         { 'fines.reason': { $exists: false } }
// //       ]
// //     });

// //     // Update each student to ensure fines are properly defined
// //     const updatePromises = studentsToUpdate.map(async (student) => {
// //       if (!student.fines) {
// //         student.fines = [];
// //       }
// //       // Check each fine object and ensure both amount and reason are defined
// //       student.fines.forEach((fine) => {
// //         if (!fine.amount) {
// //           fine.amount = 0; // Set default amount if missing
// //         }
// //         if (!fine.reason) {
// //           fine.reason = 'Unknown reason'; // Set default reason if missing
// //         }
// //       });
// //       await student.save();
// //     });

// //     await Promise.all(updatePromises);

// //     console.log('Migration complete. All students updated.');
// //     process.exit(0); // Exit script after migration
// //   } catch (error) {
// //     console.error('Error migrating data:', error);
// //     process.exit(1); // Exit with error status
// //   }
// // };

// // migrate();
