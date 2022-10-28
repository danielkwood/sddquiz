// ----------------------------------------------------------------------------
// SDD Random Quiz Generator
// Date created 12th October 2016
// Last updated 29th December 2020 (added multi-choice questions from 2020 exam)
// Purpose: To test SDD HSC students using random questions from past exams that
// can be filtered by topic. This site is not associated with NESA and is intended
// to help students prepare for exams.
// ----------------------------------------------------------------------------

// Variable list:
// --------------
// pos is the question that the user is currently on, randomly selected from questions array
// test refers to the div displaying the test questions, test_status refers to progress in quiz
// testFeedback refers to the div displaying the test feedback
// detailedFeedback refers to the div displaying the detailed test feedback
// choice refers to the user-selected choice from answer choices
// chA, chB, chC, and chC store the options for the current question
// totalAnswered stores total number of questions answered this session
// correct and incorrect store the number of questions answered correctly and incorrectly
// scorestreak stores number of questions correctly answered in a row
// scorestreak clears when a question is answered incorrectly
// --------------

// Declare variables
var pos = 0, test, testFeedback, detailedFeedback, test_status, question, choice, choices, chA, chB, chC, chD, totalAnswered = 0, correct = 0, incorrect = 0, scorestreak = 0;
// filterPos selects random array item from filteredQuestions
var filterPos;
// result stores the result from the last answered question (correct or incorrect)
// Initial value is set to incorrect when page loads (before any question is answered)
var result = "incorrect";
// currentQuestionTopic stores the name of the topic that the current question belongs to
var currentQuestionTopic;
// filteredQuestions stores array of topics filtered by user preference
var filteredQuestions;
// filter refers to the filter div - get the filter div here
var filter = get("filter");
// feedback stores the feedback displayed to the user for the last answered question
var feedback;
// answerFeedback provides an explanation of the correct and incorrect answers for the question answered
var answerFeedback;
// score refers to the div containing the score
var score;
// nextQuestions refers to the div containing the Next Question button
var nextQuestion;
// stores the detailedFeedbackLink link
var detailedFeedbackLink;
// checkboxItem stores individual checkbox items on filter list
var checkboxItem;
// topicsChecked stores number of topics checked - set to zero when user clicks Select none
var topicsChecked;
// selectedCount stores the number of answers selected (either 0 or 1) - use for data validation when checking answer
var selectedCount = 0;

// questions is a multidimensional array that stores questions, answer options, correct answer, HSC exam year/question, topic the question belongs to, status (if question has been used or not use before), and feedback
// Questions array format:
// ["Question text", "Option A", "Option B", "Option C", "Option D", "Actual answer eg. C","Exam year, subject, question number", "filter keyword 1","notused or used", "feedback"]

// var topics = [
//   ["softwaredevcycle"],
//   ["sdas"],
//   ["understandingproblem"],
//   ["planningdesigning"],
//   ["interfacedesign"],
//   ["implementing"],
//   ["testevaluate"],
//   ["maintaining"],
//   ["issues"],
//   ["documentation"],
//   ["algorithms"],
//   ["datatypes"],
//   ["datastructures"],
//   ["controlstructures"],
//   ["translation"],
//   ["metalanguages"],
//   ["searchsort"],
//   ["testingcorrecting"],
//   ["modellingtools"]
//   ];

var questions = [
  // 2020
  ["Consider the following pseudocode.<br><img src='images/2020_1.png'/><br>Which data type is <i>final</i> most likely to be?", "Boolean", "Integer", "Real", "String", "A", "2020 SDD Exam Q1", "datatypes", "notused","The answer is A."],  
  ["Various forms of documentation are produced when software is developed.<br><br>Which row of the table correctly identifies ONE type of user documentation and ONE type of developer documentation?<br><img src='images/2020_2.png'/>", "A", "B", "C", "D", "C", "2020 SDD Exam Q2", "documentation", "notused","The answer is C."],  
  ["An engineer created a spreadsheet to estimate the cost of her next project.<br><br>Which software development approach was used to create the spreadsheet?", "Agile", "End user", "Prototyping", "Structured", "B", "2020 SDD Exam Q3", "sdas", "notused","The answer is B."],  
  ["A piece of software is to be developed for people to learn to play the piano.<br><br>During which stage of the software development cycle should the boundaries of the software first be considered?", "Defining and understanding", "Planning and designing", "Implementing", "Testing and evaluating", "A", "2020 SDD Exam Q3", "softwaredevcycle", "notused","The answer is A."],  
  ["An array contains the names of 7 countries.<br><img src='images/2020_5.png'/><br>Using a binary search, how many comparisons are required to determine that Australia is not in the array?", "1", "2", "3", "7", "C", "2020 SDD Exam Q5", "searchsort", "notused","The answer is C."],  
  ["Which row of the table shows features of both bubble sort and selection sort that are always true?<br><img src='images/2020_6.png'/>", "A", "B", "C", "D", "D", "2020 SDD Exam Q6", "searchsort", "notused","The answer is D."],  
  ["Consider this algorithm.<br><img src='images/2020_7.png'/><br>What is the output of this algorithm if it is tested with data values of 3 and 14?", "-7", "1", "15", "25", "B", "2020 SDD Exam Q7", "algorithms", "notused","The answer is B."],  
  ["In which row of the table are the statements correct for both syntax error and logic error?<br><img src='images/2020_8.png'/>", "A", "B", "C", "D", "D", "2020 SDD Exam Q8", "testingcorrecting", "notused","The answer is D."],  
  ["At which level of testing would a software developer use a driver?", "Acceptance", "Module", "Program", "System", "B", "2020 SDD Exam Q9", "testingcorrecting", "notused","The answer is B."],  
  ["During which process would a software developer be most likely to use a metalanguage?", "Creating source code", "Developing a token stream", "Conducting lexical analysis", "Generating random test data", "A", "2020 SDD Exam Q10", "softwaredevcycle", "notused","The answer is A."],  
  ["Which of the following best describes quality assurance?", "Comparing the performance of similar technologies", "Responding to user feedback to improve a software package", "Implementing a documented process to ensure defined criteria are met", "Evaluating a software product to ensure that the client’s needs are satisfied", "C", "2020 SDD Exam Q11", "testevaluate", "notused","The answer is C."],  
  ["Which of the following correctly matches an EBNF statement with its corresponding railroad diagram?<br><img src='images/2020_12.png'/>", "A", "B", "C", "D", "A", "2020 SDD Exam Q12", "metalanguages", "notused","The answer is A."],  
  ["Consider this code fragment.<br><img src='images/2020_13.png'/><br>What is a benefit of writing the code in this manner?", "It uses global variables", "It simplifies maintenance.", "It minimises syntax errors.", "It improves execution speed.", "B", "2020 SDD Exam Q13", "algorithms", "notused","The answer is B."],  
  ["Consider this statement.<br><br><i>Students(3).Age = 17</i><br><br>Which of the following best describes <i>Students(3)</i>?", "Field", "Index", "Integer", "Record", "D", "2020 SDD Exam Q14", "datastructures", "notused","The answer is D."],  
  ["Consider this code fragment.<br><img src='images/2020_15.png'/><br>The file <i>ItemList</i> initially contains 4 and 2. The values 9 and –1 are used as input.<br><br>What are the contents of <i>ItemList</i> after the code is run?", "9", "9, -1", "4, 2, 9", "4, 2, 9, -1", "C", "2020 SDD Exam Q15", "algorithms", "notused","The answer is C."],  
  ["What is the purpose of dynamic link libraries (DLLs)?", "To enable faster compilation of source code", "To allow developers to re-use their programs", "To allow appropriate system modules to be accessed at run time", "To enable modules written in different higher-level languages to be incorporated", "C", "2020 SDD Exam Q16", "translation", "notused","The answer is C."],  
  ["Executable code has been decompiled.<br><br>Which row of the table correctly shows features of the code produced by the decompilation process?<br><img src='images/2020_17.png'/>", "A", "B", "C", "D", "A", "2020 SDD Exam Q17", "translation", "notused","The answer is A."],  
  ["Consider this flowchart.<br><img src='images/2020_18.png'/><br>Which pseudocode fragment has the same output as the flowchart?<br><img src='images/2020_18a.png'/>", "A", "B", "C", "D", "A", "2020 SDD Exam Q18", "modellingtools", "notused","The answer is A."],  
  ["Use the following code to answer the question.<br><img src='images/2020_19.png'/><br>The following values are already in memory.<br><br><i>Mem1 = 10<br>Mem2 = 1<br>Mem3 = 3</i><br><br>What is in <i>Mem1</i> as a result of running this code?", "10", "20", "30", "40", "C", "2020 SDD Exam Q19", "algorithms", "notused","The answer is C."],  
  ["Use the following code to answer the question.<br><img src='images/2020_19.png'/><br>Which statement can alter the value in the program counter?", "LDR Reg1, Mem1", "Loop: ADD Reg1, Reg2", "CMP Mem2, Mem3", "BNE Loop", "D", "2020 SDD Exam Q20", "algorithms", "notused","The answer is D."],  

  // 2019
  ["A developer uses existing modules of code to meet a client’s needs quickly.<br><br>Which development approach is being used?", "Agile", "End user", "Prototyping", "Rapid application development", "D", "2019 SDD Exam Q1", "sdas", "notused","The answer is D."],  
  ["Which of the following best describes load testing?", "Testing every function of a system", "Testing a system with large amounts of data", "Testing a system with every transaction type", "Testing of a system by different types of users", "B", "2019 SDD Exam Q2", "testevaluate", "notused","The answer is B."],  
  ["What is a benefit of outsourcing parts of a large software development project?", "It ensures protection of trade secrets.", "It makes it easier to oversee work in progress.", "It provides access to skilled personnel when needed.", "It helps maintain the consistency of code and documentation.", "C", "2019 SDD Exam Q3", "softwaredevcycle", "notused","The answer is C."],  
  ["What is the purpose of a post-implementation review?", "To check that the overall system functions correctly", "To discuss the results of the acceptance testing process", "To help evaluate the new system based on client feedback", "To demonstrate the features of the new system to the client", "C", "2019 SDD Exam Q4", "testevaluate", "notused","The answer is C."],  
  ["Version control software, Gantt chart generators and test data generators are all examples of", "CASE tools", "data modelling tools", "project management tools", "system documentation tools", "A", "2019 SDD Exam Q5", "softwaredevcycle", "notused","The answer is A."],  
  ["A program requires the use of three variables:<br><br>- Weekday (for example Monday, Wednesday)<br>- IsDayTime (for example Y, N)<br>- AverageTemp (for example 9.6).<br><br>Which of the following correctly shows how these variables are described in a data dictionary?</br><img src='images/2019_6.png'/>", "A", "B", "C", "D", "A", "2019 SDD Exam Q6", "modellingtools", "notused","The answer is A."],  
  ["The following algorithm correctly searches an array for an item and outputs the position of that item in the array. Two pieces of code are missing, represented by X and Y below.</br><img src='images/2019_7.png'/><br>Which row of the table correctly identifies X and Y?<br><img src='images/2019_7a.png'/>", "A", "B", "C", "D", "C", "2019 SDD Exam Q7", "algorithms", "notused","The answer is C."],  
  ["The following algorithm correctly searches an array for an item and outputs the position of that item in the array. Two pieces of code are missing, represented by X and Y below.</br><img src='images/2019_7.png'/><br>Which of the following variables is used as a flag in the algorithm?", "Found", "Index", "LastIndex", "SearchItem", "A", "2019 SDD Exam Q8", "algorithms", "notused","The answer is A."],  
  ["Which row of the table contains correct statements about interpretation and compilation?<br><img src='images/2019_9.png'/>", "A", "B", "C", "D", "C", "2019 SDD Exam Q9", "translation", "notused","The answer is C."],  
  ["Consider the following algorithm fragment.</br><img src='images/2019_10.png'/><br>Which of the following is equivalent to this fragment?</br><img src='images/2019_10a.png'/><br>", "A", "B", "C", "D", "B", "2019 SDD Exam Q10", "algorithms", "notused","The answer is B."],  
  ["Which installation method is best suited to the system upgrade required?</br><img src='images/2019_11.png'/>", "A", "B", "C", "D", "D", "2019 SDD Exam Q11", "softwaredevcycle", "notused","The answer is D."],  
  ["What happens during the 'fetch' step of the fetch–execute cycle?", "The program counter is incremented.", "A program is copied into the CPU for execution.", "Data needed to carry out an instruction in the CPU are moved from memory.", "An instruction is copied from memory and placed in the instruction register.", "D", "2019 SDD Exam Q12", "implementing", "notused","The answer is D."],  
  ["The IPO chart represents the procedure for enabling a user to login to a system.</br><img src='images/2019_13.png'/><br>Which of the following is a valid data flow diagram for this procedure?<br><img src='images/2019_13a.png'/>", "A", "B", "C", "D", "A", "2019 SDD Exam Q13", "modellingtools", "notused","The answer is A."],  
  ["A student designed an algorithm to determine entry costs into a show. She correctly designed the following set of concise, thorough and appropriate test data to test the algorithm.<br><br>2, 4, 10, 12, 20<br><br>Which of the following algorithms is she testing?<br><img src='images/2019_14.png'/>", "A", "B", "C", "D", "A", "2019 SDD Exam Q14", "testingcorrecting", "notused","The answer is A."],  
  ["Which row of the table correctly describes features of a sequential file and a relative file?</br><img src='images/2019_15.png'/>", "A", "B", "C", "D", "C", "2019 SDD Exam Q15", "datastructures", "notused","The answer is C."],  
  ["Consider the following code.<br><img src='images/2019_16.png'/><br>What is the output produced?", "10, 20", "10, 25", "15, 20", "15, 25", "B", "2019 SDD Exam Q16", "algorithms", "notused","The answer is B."],  
  ["A system requires users to enter a valid ID which must start with an N or an E. The following instructions are displayed.<br><br><i>First type N or E<br>Then type # followed by a code and then another #<br>The code must start with two or three letters followed by at least two digits.</i><br><br>Which of the following is the correct EBNF definition for a valid ID based on these instructions?<br><br>You may assume that <i>Letter</i> and <i>Digit</i> are already defined.<br><img src='images/2019_17.png'/>", "A", "B", "C", "D", "D", "2019 SDD Exam Q17", "metalanguages", "notused","The answer is D."],  
  ["<i>RND(N)</i> produces a random integer between 1 and N, inclusive. Which of the following would always produce a random integer between 11 and 30, inclusive?", "X = RND(30) – 11", "X = RND(20) + 10", "X = RND(30) – RND(10)", "X = RND(10) + RND(20)", "B", "2019 SDD Exam Q18", "algorithms", "notused","The answer is B."],  
  ["The input data for a program needs to be a single uppercase letter.<br><br>Which of the following would ensure that data accepted for processing are always valid?<br><img src='images/2019_19.png'/>", "A", "B", "C", "D", "B", "2019 SDD Exam Q19", "algorithms", "notused","The answer is B."],  
  ["This array has been partially sorted using an insertion sort with some passes already completed.<br><img src='images/2019_20.png'/><br>Which of the following is a possible result of the next pass?<br><img src='images/2019_20a.png'/>", "A", "B", "C", "D", "C", "2019 SDD Exam Q20", "searchsort", "notused","The answer is C."],  

  // 2018
  ["Consider the following code fragment.</br><img src='images/2018_1a.png'/></br>What output is produced?</br><img src='images/2018_1b.png'/>", "A", "B", "C", "D", "D", "2018 SDD Exam Q1", "algorithms", "notused","The answer is D."],  
  ["An algorithm has been developed to check temperature. 'Too cold' is displayed if the temperature is below 40 degrees and 'Too hot' is displayed if it is 60 degrees or more. Otherwise, the display is 'Just right'. The algorithm has been tested with the values 30, 50, 60 and 70.</br></br>Which other value should definitely be tested?", "0", "20", "40", "80", "C", "2018 SDD Exam Q2", "testingcorrecting", "notused","40 is a value that allows for boundary testing. The value 30 already tests the <40 condition, the value 50 tests between 40 and 60, the value 60 tests exactly 60, and 70 tests greater than 60. The test value can be used to test exactly = 40."],  
  ["Consider the following code fragment.</br><img src='images/2018_3a.png'/></br>Which combination of inputs for <i>r</i> and <i>t</i> will cause a runtime error when the code is executed?</br><img src='images/2018_3b.png'/>", "A", "B", "C", "D", "B", "2018 SDD Exam Q3", "testingcorrecting", "notused","A value of 0 for <i>t</i> will cause a Division by Zero error (a type of runtime error)."],  
  ["Which of the following is part of software maintenance?", "Defragmenting data files on a regular basis", "Modifying code in response to changed requirements", "Ensuring that software is compatible with a range of hardware", "Making sure all personnel are trained in the use of any upgraded software", "B", "2018 SDD Exam Q4", "softwaredevcycle", "notused","Modifying code in response to changed requirements is an example of software maintenance."],  
  ["How is a code of conduct relevant to software developers?", "It defines the rate of pay.", "It defines their expected professional behaviour.", "It describes the various duties included in their role.", "It describes the minimum conditions for them to be allowed to work.", "B", "2018 SDD Exam Q5", "issues", "notused","A code of conduct defines the expected professional behaviour of software developers."],  
  ["Which type of software is NOT protected by copyright laws?", "Shareware", "Open source", "Public domain", "Creative commons", "C", "2018 SDD Exam Q6", "topics", "notused","The term 'public domain' refers to creative work that is not protected by intellectual property protection laws including copyright, trademark, or patents."],  
  ["Read the following code fragment.</br><img src='images/2018_7a.png'/></br>Which row of the table shows the most appropriate data types for <i>Locked</i> and <i>Choice</i>?</br><img src='images/2018_7b.png'/>", "A", "B", "C", "D", "A", "2018 SDD Exam Q7", "datatypes", "notused","A Boolean value can be either true or false. An integer can be incremented."],  
  ["Consider the following diagram of a system.</br><img src='images/2018_8a.png'/></br>What information does the diagram provide about the system?", "The links between different types of modules", "The movement of data between entities and processes", "The connection and navigation between different user interfaces", "The relationship between the software and hardware components", "B", "2018 SDD Exam Q8", "modellingtools", "notused","This is a data flow diagram (DFD) that shows the movement of data between entities and processes."],  
  ["Which row of the table best matches a screen element with the data being entered?</br><img src='images/2018_9a.png'/>", "A", "B", "C", "D", "D", "2018 SDD Exam Q9", "interfacedesign", "notused","Radio buttons would allow the user to only select one value for their favourite day of the week and would be most suitable."],  
  ["A programmer can make use of stubs to", "reuse previously written and tested modules. ", "help clarify the operation of the software to the user.", "improve the performance of the code by removing unnecessary detail. ", "test the logic of the mainline, without having to fully code all modules.", "D", "2018 SDD Exam Q10", "testingcorrecting", "notused",""],  
  ["During which stages of the software development cycle is benchmarking relevant?", "Implementing, testing and evaluating", "Planning and designing, testing and evaluating", "Defining and understanding the problem, implementing", "Defining and understanding the problem, planning and designing", "B", "2018 SDD Exam Q11", "softwaredevcycle", "notused","Benchmarking is a process of measuring the performance of software against a standard to identify opportunities for improvement."],  
  ["A railroad diagram is shown.</br><img src='images/2018_12a.png'/></br>Which EBNF definition is equivalent to the railroad diagram?", "{ 5 X } ( M | 5 ) 5 { 5 }", "{ X 5 } ( M | 5 ) { 5 }", "{ 5 X } ( M | 5 ) { 5 }", "{ X 5 } M | 5 { 5 }", "A", "2018 SDD Exam Q12", "metalanguages", "notused",""],  
  ["Which row of the table correctly identifies ALL the search methods that can be used for unsorted and sorted arrays?</br><img src='images/2018_14a.png'/></br>Which pseudocode fragment will generate the same output as the flow chart?</br><img src='images/2018_14b.png'/>", "A", "B", "C", "D", "C", "2018 SDD Exam Q14", "algorithms", "notused",""],  
  ["At what level of the testing process does acceptance testing occur?", "Live", "Module", "Program", "System", "D", "2018 SDD Exam Q15", "testevaluate", "notused",""],  
  ["What is a program counter?", "A register that holds the next machine code instruction to be executed", "A variable that holds the next machine code instruction to be executed", "A register that holds the address of the next machine code instruction to be executed", "A variable that holds the address of the next machine code instruction to be executed", "C", "2018 SDD Exam Q16", "translation", "notused",""],  
  ["The following code fragment was developed to display the awards at a competition, based on scores up to 100.</br><img src='images/2018_17a.png'/></br>What is displayed if a score of <i>51</i> is entered?", "Credit", "Distinction", "Participation", "High Distinction", "B", "2018 SDD Exam Q17", "algorithms", "notused",""],  
  ["The table shows the initial contents of an array and the contents after one pass of a valid sorting procedure.</br><img src='images/2018_18a.png'/></br>What are the contents of the array after the second pass?</br><img src='images/2018_18b.png'/>", "A", "B", "C", "D", "A", "2018 SDD Exam Q18", "searchsort", "notused",""],  
  ["An item in an array containing <i>N</i> elements needs to be removed, and the elements following it shuffled back.</br></br>As an example, the diagram shows the array list before and after the number 4 is removed.</br><img src='images/2018_19a.png'/></br>Note that <i>list (1) = 3</i>.</br></br>Which code is best able to achieve this?</br><img src='images/2018_19b.png'/>", "A", "B", "C", "D", "A", "2018 SDD Exam Q19", "algorithms", "notused",""],  
  ["A driver has been developed to test the logic of a module. Which of the following best describes the use of the driver?", "It mimics the logic of the module and compares the outputs produced.", "It calls the module repeatedly until the required output has been achieved.", "It calls the module with a range of values and displays the values returned.", "It mimics the logic of the module, allowing the response time to be assessed.", "C", "2018 SDD Exam Q20", "testingcorrecting", "notused",""],  

  // 2017
  ["A project team has been contracted to develop a project but the client is uncertain about the requirements.</br></br>Which software approach would be best to clarify the requirements?", "End user", "Structured", "Prototyping", "Rapid application development", "C", "2017 SDD Exam Q1", "sdas", "notused","Prototyping approach would allow the developer to build prototypes where the user can give feedback and clarify the needs and requirements. The requirements of the project may also become clearer as prototypes are built. Prototypes can be regularly refined until the software product meets the requirements."],  
  ["Consider the flow chart shown.</br><img src='images/2017_2.png'/></br>Which set of pseudocode keywords matches the flow chart?", "FOR ... NEXT", "WHILE ... ENDWHILE", "CASWHERE ... ENDCASE", "IF ... THEN ... ELSE ... ENDIF", "C", "2017 SDD Exam Q2", "controlstructures", "notused","There are multiple cases shown in the flowchart which matches the structure of a switch/case statement (CASEWHERE...ENDCASE)."],  
  ["Which row of the table correctly shows items found in documentation for developers and for users?</br><img src='images/2017_3.png'/>", "A", "B", "C", "D", "D", "2017 SDD Exam Q3", "documentation", "notused","Algorithms and data dictionaries are relevant to the developer and installation guides and FAQs are relevant to the user. IPO charts, test results, storyboards, screen designs, and data dictionaries are not relevant to the user. Online help and balloon text are not as relevant to the developer."],  
  ["Which of the following describes the syntax of a programming language?", "Gantt chart", "Data dictionary", "Railroad diagram", "Program specifications", "C", "2017 SDD Exam Q4", "documentation", "notused","Gantt charts are used to show the project schedule and timing for each task or milestone in the project. Data dictionaries are used to describe variables and their data types, data validation rules, storage required, and examples of values stored. Program specifications are used to ensure the software meets the needs of the users, are measurable and and can be to accurately evaluate the success of the software solution. Railoard (syntax structure) diagrams are used to explain the syntax or rules of statements in a particular programming language just like other metalanguages such as BNF/EBNF."],  
  ["Which of the following is a reason for releasing software as open source?", "To simplify decompilation of the software", "To allow others to contribute to improving the software", "To protect the software developerâ€™s intellectual property", "To gather feedback from users about its features and functionality", "B", "2017 SDD Exam Q5", "issues", "notused","Open source software is software where other developers have access to the source code . Software developed under an open-source license or model is usually done with the intention of allowing other developers to contribute to and improve the software code and also identify and correct bugs in the code."],  
  ["At which stage of the software development cycle is the nature of the data first considered?", "Implementing", "Testing and evaluating", "Planning and designing", "Defining and understanding", "D", "2017 SDD Exam Q6", "softwaredevcycle", "notused","The nature of data must first be considered during the Defining and Understanding the Problem stage. The nature of data is an important part of understanding the needs of the client/users and the requirements of the solution such as the type of user interface to implement, and social and ethical issues to consider such as privacy and security, as well as the feasibility of the solution when considering issues such as the type of hardware required for processing and storing data."],  
  ["During the execution of a program, an incorrect value is displayed on screen. That value is much higher than expected.</br></br>What type of error caused this?", "Logic", "Overflow", "Runtime", "Syntax", "A", "2017 SDD Exam Q7", "testingcorrecting", "notused","The algorithm is producing an unexpected output or result as a result of incorrect logic in the algorithm. This is a logic error. A syntax error would not allow the code to compile and run and an overflow error would produce a value that is much lower than expected (eg. a negative value). A runtime error is an error that occurs when the program is executed and will cause the program to crash."],    
  ["What should be considered if an analyst is asked to identify the functionality requirements of a piece of software?", "What the client requires from the software", "The hardware requirements of the software", "The time when the software will be ready for release", "How to document the modular structure of the software", "A", "2017 SDD Exam Q8", "understandingproblem", "notused","The functionality requirements of software are determined by the client's needs."],    
  ["For which of the following is a one-dimensional array of Booleans an appropriate data structure?", "Pixel colours on a screen", "Match results for a soccer team for a season", "The state of each light in a set of traffic lights", "The number of males and females in each class", "C", "2017 SDD Exam Q9", "datastructures", "notused","A traffic light can either be on or off. A boolean data type is a good way of representing whether a light is an on or off state (true or false). Each light in a set of lights could also be stored in a one-dimensional array (where each array element represents a light as a boolean value). Therefore a one-dimensional array of Booleans would suit the state of each light in a set of traffic lights. There are many different colours that can be represented on a screen so Boolean data type would not be suitable for representing colours. Boolean data type would also not be suitable for storing match results and the number of males or females in classes."],    
  ["A software developer is concerned with compatibility issues.</br></br>How can the software developer make sure that these concerns are adequately addressed?", "Run the software using real-world data", "Test the software in a range of possible situations", "Compile the software for a variety of computer platforms", "Compare the performance of the software with benchmark software", "B", "2017 SDD Exam Q10", "testevaluate", "notused","Testing software in a range of possible situations will help to ensure that compatibility issues are resolved."],    
  ["What is the purpose of a sentinel value?", "To separate fields in a record", "To mark the end of a set of input values", "To mark the position of an element in an array", "To indicate where the first data item is stored in memory", "B", "2017 SDD Exam Q11", "datastructures", "notused","A sentinel value marks the end of a set of input values such as the end of a set of data in a text file. A sentinel value is often a character or set of characters not expected in the data eg 'ZZZ'"],    
  ["Which row of the table contains a true statement for both sequential and event driven software?</br><img src='images/2017_12.png'/>", "A", "B", "C", "D", "D", "2017 SDD Exam Q12", "planningdesigning", "notused",""],    
  ["The translation of source code into object code involves a number of steps. Which of the following lists the steps in the correct order?", "Syntactical analysis, lexical analysis, code generation", "Syntactical analysis, code generation, lexical analysis", "Lexical analysis, syntactical analysis, code generation", "Lexical analysis, code generation, syntactical analysis", "C", "2017 SDD Exam Q13", "translation", "notused",""],    
  ["After the first pass of a sort, only the last two elements of an array have changed value. Which list identifies ALL the possible sort methods that could have been used?", "Bubble, selection", "Bubble, insertion", "Insertion, selection", "Bubble, selection, insertion", "D", "2017 SDD Exam Q14", "searchsort", "notused",""],    
  ["Which row of the table contains a true statement for both sequential and relative files?</br><img src='images/2017_15.png'/>", "A", "B", "C", "D", "A", "2017 SDD Exam Q15", "datastructures", "notused",""],    
  ["Refer to the following diagram.</br><img src='images/2017_16_1.png'/></br>Which of the following algorithm fragments corresponds to the diagram?</br><img src='images/2017_16_2.png'/>", "A", "B", "C", "D", "A", "2017 SDD Exam Q16", "algorithms", "notused",""],    
  ["Use the following algorithm to answer this question.</br><img src='images/2017_17.png'/></br>What is the output from the algorithm if the input data is 4, 5, 6, 3, 9, 8?", "3 9 8", "4 5 6", "5 6 3", "4 5 6 3 9 8", "A", "2017 SDD Exam Q17", "algorithms", "notused",""],    
  ["Use the following algorithm to answer this question.</br><img src='images/2017_17.png'/></br>Which of the following algorithms would produce the same output as the algorithm above?</br><img src='images/2017_18.png'/>", "A", "B", "C", "D", "A", "2017 SDD Exam Q18", "algorithms", "notused",""],    
  ["The following code fragment is designed to calculate the cost of entry to a swimming pool for a family. The entry fee is $5 for adults and $2 for children. A subroutine call at REM is missing.</br><img src='images/2017_19.png'/></br>Which of the following correctly calls the subroutine?", "<u>Value</u>(A, C, T)", "<u>Value</u>(X, Y, Z)", "<u>Value</u>(Z, Y, X)", "<u>Value</u>(T, C, A)", "D", "2017 SDD Exam Q19", "algorithms", "notused",""],    
  ["The following shows two program fragments.</br><img src='images/2017_20.png'/></br>Which row in the table shows the correct output for each program?</br><img src='images/2017_20_1.png'/>", "A", "B", "C", "D", "B", "2017 SDD Exam Q20", "algorithms", "notused",""],    
  
  // 2016
  ["Some software is sold with keys that need to be entered to unlock the software or make it fully functional.</br></br>What is the most likely reason for this?", "To minimise software piracy", "To protect the user&#39;s private data", "To minimise the risk of data loss", "To prevent decompilation of the software", "A", "2016 SDD Exam Q1", "issues", "notused","Keys are used to ensure only users who have purchased a license and obtained a key can use the software. Use of keys are intended to prevent software piracy."],
  ["Which of the following best describes <i>reverse engineering</i>?", "Reducing compatibility issues when producing updates", "Using code from other sources during software development", "Ensuring the executable code matches the original source code", "Analysing a system to see how it works, in order to reproduce its functionality", "D", "2016 SDD Exam Q2", "issues", "notused","Reverse engineering involves analysing a system to see how it works, in order to reproduce its functionality. Extracting source code from executable software is known as decompilation and is a method used to reverse engineer software."],
  ["A company needs to replace its existing software but it does not have any software development capabilities.</br></br>Which of the following best solves this problem?", "Develop the software inhouse", "Outsource the development of the software", "Simplify the specifications for the new software", "Buy off-the-shelf software that meets some requirements", "B", "2016 SDD Exam Q3", "understandingproblem", "notused","If a development team does not have the software development capabilities or skills then it may be a good idea to outsource the development to others who do have the capabilities. Developing the solution inhouse would not be suitable if capabilities were not there, simplifying th specifications may cause the software to not meet needs and expectations of users, and buying off-the-shelf software which only meets some requirements would not be suitable."],
  ["A company spent a month training its staff before replacing its main software. After training was completed, the company switched to the new software.</br></br>Which installation method was used?", "Pilot", "Phased", "Parallel", "Direct cut over", "D", "2016 SDD Exam Q4", "implementation", "notused","The installation method used was direct cut over because the company immediately switched over from the old software to the new software after training staff. The method used is not pilot as the software was not used with a small group of users first, is not phased because features or parts of the new software were not gradually implemented over time, and it is also not parallel as both systems (old and new) were not being used at the same time."],
  ["Which of the following is a possible reason for developers to use CASE tools?", "To automate data entry processes", "To install packages on remote systems", "To link external modules with internal modules", "To automate some of the tasks when creating software", "D", "2016 SDD Exam Q5", "implementation", "notused","CASE tools are used to automate some tasks when creating software such as generating test data, managing and tracking software versions, creating data dictionaries, and producing documentation."],
  ["Which of the following sets of software features would be most relevant to the end user?", "Data types and data structures", "Screen settings and algorithms", "Accessibility and interface design", "Operating system and programming language", "C", "2016 SDD Exam Q6", "understandingproblem", "notused","Data types, data structures, algorithms, and programming language selected are only relevant to the software developer and are not looked at from the end user perspective. Accessibility and interface design are relevant to the user though. For example, a visually impaired user may require that software is compatible with a screen reader or allows the user to resize text and buttons on screen. The user will also desire a user interface which is easy to learn and use."],
  ["Which diagram best models the processes and physical components within a reporting system?</br><img src='images/2016_7.png'/>", "A", "B", "C", "D", "D", "2016 SDD Exam Q7", "understandingproblem", "notused","A system flowchart would be suitable for modelling the processes and physical components within a reporting system. An IPO (Input, Process, Output) table (from option A) does not model physical components in a system, neither does the chart from option B, or the gantt chart from option C."],
  ["Why is it necessary to develop a set of criteria to evaluate a software project?", "To allow selection of an appropriate development process", "To ensure that the end users know what the software can do", "To check that the software is suitable for the intended purpose", "To enable the project managers to develop a time management schedule", "C", "2016 SDD Exam Q8", "understandingproblem", "notused","Criteria are used to evaluate and measure the success of a project. For example, criteria may include fast and responsive user interface which can display effectively on desktop and mobile device screens and load within <i>x</i> seconds."],
  ["Compiled software often needs to access DLLs.</br></br>What is the main reason for using DLLs?", "To allow the reuse of existing code", "To provide common document libraries", "To standardise the structure of compiled code", "To simplify the installation process for the user", "A", "2016 SDD Exam Q9", "translation", "notused","Dynamic Link Libraries (DLLs) contain sub-routines that carry out common tasks in the Windows environment. DLLs allow a developer to use existing code for common tasks completed by the operating system such as sending a file to the printer. Instead of the developer writing this code, they can reuse code from a DLL. A linker is used to include DLLs when source code is translated into executable object code."],
  ["An algorithm is being designed to count the number of days between two dates in the calendar.</br></br>What would be the best data type to store this count?", "Date", "Integer", "Real", "String", "B", "2016 SDD Exam Q10", "datatypes", "notused","Integer would be most suitable as it can store the number of days between two dates as a whole number. Real (float) would not be necessary as only a whole number is needed. String is not used for mathematical operations so it would not be suitable."],
  ["Consider the following fragment of pseudocode.</br></br>x = 1</br>REPEAT</br>   x = x + 2</br>UNTIL x > 10</br>Display x</br></br>Which of the following flowcharts best matches the fragment of pseudocode?</br><img src='images/2016_11.png'/>", "A", "B", "C", "D", "D", "2016 SDD Exam Q11", "modellingtools", "notused","D is the most suitable answer because the algorithm is using a post-test repetition (loop) structure where the condition is tested after the code in the loop has been executed. The loop will end until <i>x</i> is greater than 10, or in other words, once <i>x</i> is no longer less than or equal to 10"],
  ["Consider the following algorithm which was designed to assign membership categories based on years of membership.</br><img src='images/2016_12.png'/></br>The logic of the algorithm was tested with the following test data:</br></br>3, 24, 30, 40</br></br>If two more items are to be added to the test data, which of the following pairs would be most beneficial to the overall testing?", "5, 20", "5, 27", "20, 35", "27, 35", "B", "2016 SDD Exam Q12", "testingcorrecting", "notused","The values 5 and 27 would be beneficial for testing as the value 5 can test a case where years is not less than 5 but less than 24, and the value 27 can test a case where years is not less than or equal to 27 and not greater than or equal to 30 (which covers the <i>otherwise</i> case.)"],
  ["An array originally contains the following six numbers to be sorted in ascending order.</br><img src='images/2016_13_1.png'/></br>Which row of the table shows the contents of the array after one pass of the specified sort method?</br><img src='images/2016_13_2.png'/>", "A", "B", "C", "D", "C", "2016 SDD Exam Q13", "searchsort", "notused",""],
  ["Which row of the table correctly identifies a feature of a compiler and that of an interpreter?</br><img src='images/2016_14.png'/>", "A", "B", "C", "D", "A", "2016 SDD Exam Q14", "translation", "notused","Compilers produce all of the object code for the application before execution, and interpreters execute instructions as soon as they are translated. Compilers do not translate each line of source code into a single machine instruction but instead produce object code that can run on the operating system. Also, a single line of source code would be the equivalent of several machine code instructions."],
  ["Consider the following code which operates on an array of integers called <i>List</i>, indexed from 1.</br><img src='images/2016_15_16.png'/></br>The array <i>List</i> originally contained <img src='images/2016_15.png'/>.</br>Which row of the table correctly shows the values of <i>X</i> and <i>Z</i> after the code has been executed?</br><img src='images/2016_15_1.png'/>", "A", "B", "C", "D", "C", "2016 SDD Exam Q15", "algorithms", "notused","It is important to read this question very carefully. Line 18 in the code swaps the values of the elements in the List array that have indexes X and Z (the X and Z variables each contain an integer which represents the indexes of the two values to be swapped in the array). This line of code is swapping the values of two elements in the List array, NOT the values of the variables X and Z. You are asked to identify the values of the X and Z <i>variables</i>, NOT the elements in the array represented by the indexes of Z and Z. The values of the variables X and Z are not swapped on line 18 so X will be 3 and Z will be 2. Therefore the answer is C."],
  ["Consider the following code which operates on an array of integers called <i>List</i>, indexed from 1.</br><img src='images/2016_15_16.png'/></br>Which of the following is the correct pseudocode for the <u>SwapElements</u> subprogram?</br><img src='images/2016_16.png'/>", "A", "B", "C", "D", "B", "2016 SDD Exam Q16", "algorithms", "notused","The SwapElements subprogram should be swapping elements in the List array, not variables. The values of variables X and Z are passed into the SwapElements subprogram as arguments for the paramaters and referred to as A and B inside the SwapElements subprogram. These two values are the indexes of the elements that are to be swapped in the List array. The temp variable is used to temporarily store the value from List(a), so that then the value in List(a) can be replaced with the value from List(b), and finally List(b) can take the temp value which originally came from List(a) - a swap therefore occurs."],
  ["The following railroad diagram defines the syntax for a variable in a particular programming language.</br><img src='images/2016_17.png'/></br>Which of the following has the correct syntax?", "$XXX$", "$X6X6$", "$X666X$", "$X6X6X$", "D", "2016 SDD Exam Q17", "metalanguages", "notused","The variable $X6X6X$ is the only one which follows the syntax defined on the railroad diagram. On the diagram, he second 6 and second X can be repeated and the last X is optional."],
  ["Some of the elements in the array <i>Num</i> need to be shifted to a different position so that 36 can be inserted in the position shown.</br><img src='images/2016_18_1.png'/></br>Which of the following code fragments should be used to shift the elements?</br><img src='images/2016_18_2.png'/>", "A", "B", "C", "D", "A", "2016 SDD Exam Q18", "algorithms", "notused",""],
  ["A CPU with a single accumulator is able to carry out these instructions.</br><img src='images/2016_19_20.png'/></br>Consider the following fragment of code.</br></br>LDR R, F</br>LDA R</br>LDR R, G</br>ADD R</br>STA R</br>STR R, H</br></br>Prior to executing the fragment of code, the contents of the memory locations are as follows.</br><img src='images/2016_19.png'/></br>What are the contents of the memory locations after execution?</br><img src='images/2016_19_1.png'/>", "A", "B", "C", "D", "B", "2016 SDD Exam Q19", "translation", "notused",""],
  ["A CPU with a single accumulator is able to carry out these instructions.</br><img src='images/2016_19_20.png'/></br>Consider the following fragment of code.</br></br>LDR R, F</br>LDA R</br>LDR R, G</br>ADD R</br>STA R</br>STR R, H</br></br>What is the role of the register in the execution of this code?", "To add numbers together and store the result in the accumulator", "To add numbers together and store the results in memory locations", "To store numbers, before and after being processed in the accumulator", "To store numbers, before and after being processed in memory locations", "C", "2016 SDD Exam Q20", "translation", "notused",""],

  // 2015
  ["A team has been contracted to create a software package. Which of the following is the teamâ€™s most appropriate first step?", "Use a Gantt chart to plan the development", "Look for useful modules in a software library", "Interview the client for the system requirements", "Create a prototype to show different interface styles", "C", "2015 SDD Exam Q1", "softwaredevcycle", "notused","The team needs to interview the client to understand the system requirements. If the team does not know what the system requirements are then they will not be able to schedule development, find existing modules to use, or build prototypes."],
  ["Which of the following is represented in a data flow diagram?", "The order in which processes occur", "Where data originates and where it is stored", "The sequence of tasks involved in completing a project", "The decisions that are made when sub-modules are called", "B", "2015 SDD Exam Q3","understandingproblem", "notused", "Data flow diagrams represent a system as a number of processes that together form a single system. A data flow diagram is a refinement of a context diagram. Data flow diagrams therefore show a further level of detail not seen in the context diagram. Data flow diagrams identify the source of data, its flow between processes and its destination along with data generated by the system. DFDs help visualise the movement of data and describe what participants do, rather than what computers do."],
  ["It is legal to copy software and sell the copies if", "copyright is acknowledged.", "the software is open source.", "the software has been paid for.", "the licence specifies that this is allowed.", "D","2015 SDD Exam Q4","issues", "notused", "License agreements specify the right and responsibilities of users and the developer of a piece of software. A license will specify how you may use the software and whether or not you can copy or redistribute the software."],
  ["A council website is being developed to allow residents to nominate one day of the week for garbage collection, and to select a bin from one of three sizes. Which combination of screen elements would be best for capturing the residentsâ€™ choices of collection day and bin size? </br> <img src='images/2015_2.png'>", "A", "B", "C", "D", "A","2015 SDD Exam Q2","interfacedesign", "notused", "Both dropdown lists and radio buttons allow you to choose from pre-determined items. Check boxes would be unsuitable because they would allow you to select more than one bin size rather than just one. Text boxes would also be unsuitable because they allow the user to enter in data that is not allowed eg. the user could type in a day that is not a valid garbage collection day. The user could also make a spelling mistake."],
  ["Some of the variables in a program are to be given new names. Which documentation must also be modified?", "Storyboard", "Data dictionary", "System flowchart", "Requirements definition", "B","2015 SDD Exam Q5","documentation", "notused", "Data dictionaries contain the names of variables along with a description of their use, the data type, size and an example of a valid value."],
  ["Consider this algorithm.</br><img src='images/2015_6.png'></br>What is the output of the algorithm?", "70", "60", "30", "25", "C","2015 SDD Exam Q6","algorithms", "notused", "When the switch statement finds the first case that is true (i.e. n is less than 30), the switch statement will stop testing cases and will return to the rest of the program. Because n=20, the condition <i>n is less than 30</i> will evaluate to true so n = 20 + 10. Therefore the result of 30 is displayed."],
  ["How can the inclusivity of a computer program be enhanced?", "By replacing password characters with asterisks", "By providing a range of methods for inputting data", "By providing all the necessary library routines in a single DLL", "By ensuring that all sources have been included in the acknowledgements", "B","2015 SDD Exam Q7","issues", "notused", "Inclusivity refers to the design and development of software that can be used and enjoyed by all members of society, and that does not exclude any members of society. Providing a range of methods for inputting data is the only answer that addresses inclusivity. For example, the developer may allow the user to enter text using a physical keyboard, touchscreen keyboard, or speech-to-text voice input. The software may also be compatible with other input devices for people with physical disabilities. This means that users from a range of different backgrounds or experiences will not be excluded from using the software."],
  ["Which of the following is usually a benefit of using the pilot method of installation?", "The development time is reduced.", "A backup of data is created for each new transaction.", "The personnel involved can be available to train others.", "CASE tools can be more effectively used.", "C","2015 SDD Exam Q8","implementing", "notused", "The pilot method allows software to be used by a small group of users before it is implemented for all users. Feedback is collected from these users and any major issues that need to be resolved or changes that need to be made can be addressed before the software is implemented for all users. Developers and users will be communicating during pilot implementation. Those involved can be available to train others."],
  ["Which row of the table best matches the data item with a suitable data type?</br><img src='images/2015_9.png'>", "A", "B", "C", "D", "C","2015 SDD Exam Q9","datatypes", "notused", "Boolean would not be suitable for phone numbers because boolean only accepts true or false values, not numbers. A student&#39;s personal details would include name, subjects, date of birth, etc containing letters, numbers and other characters so real would not be suitable because real only contains numbers with decimal places. Lottery numbers are whole numbers (integers) so real would also not be suitable. The correct answer is C because radio buttons are either selected (on) or not selected (off). These are two possible values that can be represented by true or false so boolean would be suitale."],
  ["Which row of the table correctly matches documentation with its purpose?</br><img src='images/2015_10.png'>", "A", "B", "C", "D", "A","2015 SDD Exam Q10","documentation", "notused", "A logbook is used to record progress and problems encountered during a project. Storyboards are used to show screen designs and the navigation and design elements used on each screen and how the screens are linked together. IPO charts show the inputs, processes, and outputs in a system. Benchmark reports are used to show the performance of software against a standard test or trial eg. how much time the program takes to export files of different sizes."],
  ["Which of the following control structures is used in the flowchart?</br><img src='images/2015_11_12.png'>", "Binary selection", "Pre-test repetition", "Post-test repetition", "Multiway selection", "B","2015 SDD Exam Q11","controlstructures", "notused", "The program flowchart shows that the <i>is low less than n</i> condition is tested before running any code inside the loop. The loop will run while that condition evaluates to true. This is an example of pre-test repetition."],
  ["Use the following algorithm to answer the question. </br><img src='images/2015_11_12.png'></br>Originally the array called <i>list</i> contains five numbers.</br><img src='images/2015_12_a.png'></br>What will </i>list</i> contain after the algorithm is executed?</br><img src='images/2015_12_b.png'>", "A", "B", "C", "D", "D","2015 SDD Exam Q12","algorithms", "notused", ""],
  ["What is the role of the program counter?", "It stores the address of the next instruction.", "It counts the number of times a loop is executed in a program.", "It keeps track of the line number in the source code as it is being translated.", "It stores the number of users permitted to simultaneously access a program.", "A","2015 SDD Exam Q13","translation", "notused", "The program counter stores the address of the next instruction to be processed by the CPU."],
  ["<i>MoveMe</i> is defined by the following railroad diagram.</br><img src='images/2015_14.png'>", "MoveMe = Move { &lt;Angle&gt; &lt;Length&gt; }", "MoveMe = Move [ &lt;Angle&gt; &lt;Length&gt; ]", "MoveMe = Move { &lt;Length&gt; &lt;Angle&gt; }", "MoveMe = Move [ &lt;Length&gt; &lt;Angle&gt; ]", "A","2015 SDD Exam Q14","metalanguages", "notused", "In EBNF, repetitions are indicated by enclosing the repeated element or elements in curly braces. Optional elements are enclosed in square brackets. In the railroad diagram shown, Angle and Length can be repeated so they are enclosed in curly braces. When repeated, Angle comes first, then Length."],
  ["A developer applies reverse engineering to a piece of software. What is the developer trying to achieve?", "To revert to a previous version", "To retrieve the original source code", "To understand how the software works", "To ensure compatibility with older versions", "C","2015 SDD Exam Q15","issues", "notused", "Reverse engineering is used to understand how the software works. Reverse engineering would involve decompiling the program to get code that could then be read and understood. However, decompiling does not produce the original source code - for example, variables in the code will not have their original meaningful names after decompilation. Decompilation is a process involved in reverse engineering. Answer B is therefore incorrect. Backups can be used to revert to a previous version of the software so answer A is incorrect. Reverse engineering does not ensure compatibility with older versions so answer D is also incorrect. The correct answer is C."],
  ["The following algorithm is designed to allow the user up to three attempts to enter a correct password.</br><img src='images/2015_16.png'></br>Which of the following correctly completes line 4?", "Count < 3 OR Flag = True", "Count < 4 OR Flag = True", "Count < 3 AND Flag = False", "Count < 4 AND Flag = False", "D","2015 SDD Exam Q16","algorithms", "notused", "After three attempts at entering the password, the count variable&#39;s value will be 4 and the flag value will still be false because the <i>IF PasswordAttempt is correct</i> if statement would have no evaluated to true therefore not changing the flag value to true. The while loop on line 4 should check if the count is less than 4 and flag is false because as soon as the user has made three attempts, the count will be equal to 4 and not less than 4 so the loop will end. If during the three attempts the user enters the correct password then the flag will change to true and the loop will also end."],
  ["An array was originally</br><img src='images/2015_17_a.png'></br>After one pass of a sort, the array became</br><img src='images/2015_17_b.png'></br>In which of the following are ALL the sorting methods listed capable of producing this result?", "Bubble, insertion", "Bubble, selection", "Insertion, selection", "Bubble, insertion, selection", "B","2015 SDD Exam Q17","searchsort", "notused", "Read more about sorting methods <a class='externalLink' href='http://theoryapp.com/selection-insertion-and-bubble-sort/' target='_blank'>here</a>."],
  ["Consider the following algorithm.</br><img src ='images/2015_18_a.png'></br>Which of the following algorithms will produce the same output?</br><img src='images/2015_18_b.png'>", "A", "B", "C", "D", "D","2015 SDD Exam Q18","algorithms", "notused", ""],
  ["After an array is sorted, its elements appear in the following order.</br><img src='images/2015_19.png'></br>What type(s) of data does the array contain?", "Real", "String", "Real and integer", "String and integer", "B","2015 SDD Exam Q19","datatypes", "notused", ""],
  ["<i>Diff(a, b, result)</i> is a subroutine that accepts two numbers as input. It returns 'yes' in result if the difference between the numbers is less than 10. Otherwise it returns 'no'. Which of the following code fragments would be most useful for testing the subroutine with a range of values?</br><img src='images/2015_20.png'>", "A", "B", "C", "D", "D","2015 SDD Exam Q20","algorithms", "notused", ""],
  // 2014
  ["Some children under the age of 18 are participating in a multiplayer web-based game intended for adults.</br>What issue does this raise?", "User privacy", "Cyber safety", "Data security", "Intellectual property", "B","2014 SDD Exam Q1","issues", "notused", ""],
  ["Which of the following is an ergonomic consideration in software design?", "The placement of screen icons", "The provision of back supports", "The height adjustability of the screen", "The backward compatibility of the software", "A","2014 SDD Exam Q2","issues", "notused", ""],
  ["A user does not know how to use a feature of a computer program. Which type of documentation should the user consult?", "An online tutorial", "The installation guide", "The licensing agreement", "A troubleshooting guide", "A","2014 SDD Exam Q3","documentation", "notused", ""],
  ["Which row of the table correctly compares features of sequential and relative files? </br><img src='images/2014_4.png'>", "A", "B", "C", "D", "D","2014 SDD Exam Q4","datastructures", "notused", ""],
  ["The following algorithm needs to be tested for logic errors.</br><img src='images/2014_5.png'></br>Which of the following sets of test data would provide the best test for the algorithm?", "15, 25, 50, 80, 100", "24, 26, 50, 79, 81", "10, 20, 25, 30, 80", "5, 10, 15, 20, 25, 30, 35", "A","2014 SDD Exam Q5","testingcorrecting", "notused", ""],
  ["The following was generated under controlled conditions as part of a softwaredevelopment process.</br><img src='images/2014_6.png'></br>What type of documentation is this?", "An IPO table", "A function chart", "A data dictionary", "A benchmark report", "D","2014 SDD Exam Q6","documentation", "notused", ""],
  ["In a program, a variable is set to TRUE if certain conditions are met. What type of variable is this?", "Flag", "Stub", "Sentinel", "Constant", "A","2014 SDD Exam Q7","testingcorrecting", "notused", ""],
  ["A team is developing a computer program. The team members want to save time during the debugging process, and they do not want to give the end-user access to the final source code.</br>Which row of the table shows the best translation methods to achieve this?</br><img src='images/2014_8.png'>", "A", "B", "C", "D", "B","2014 SDD Exam Q8","translation", "notused", ""],
  ["Which row of the table best matches an installation method with a valid reason forchoosing that method?</br><img src='images/2014_9.png'>", "A", "B", "C", "D", "C","2014 SDD Exam Q9","implementing", "notused", ""],
  ["<i>Big</i> is an array of 500 random numbers. <i>Small</i> is an array of 40 random numbers. Both arrays have been sorted. Which is the most efficient approach to identify the numbers that are in both of the arrays </i>Big</i> and </i>Small?</i>", "Use a linear search on <i>Small</i> for each element in <i>Big</i>.", "Use a linear search on <i>Big</i> for each element in <i>Small</i>.", "Use a binary search on <i>Small</i> for each element in <i>Big</i>.", "Use a binary search on <i>Big</i> for each element in <i>Small</i>.", "D","2014 SDD Exam Q10","searchsort", "notused", ""],
  ["Which of the following systems modelling tools shows the order of execution in a piece of software?", "Data dictionary", "Structure chart", "Context diagram", "Data flow diagram", "B","2014 SDD Exam Q11","modellingtools", "notused", ""],
  ["Which of the following statements about decompilation is true?", "It is a manual process.", "It does not produce meaningful identifiers.", "It uses reverse engineering as one of its processes.", "It produces an exact copy of the original source code.", "B","2014 SDD Exam Q12","translation", "notused", ""],
  ["For which of the following errors is a program trace particularly useful?", "An endless loop", "Invalid data entry", "Mismatch of data types", "Incorrect use of a programming reserved word", "A","2014 SDD Exam Q13","testingcorrecting", "notused", ""],
  ["The EBNF statements below describe the syntax of a variable name in a programming language.</br><img src ='images/2014_14.png'></br>Which of the following is an acceptable variable name in this language?", "FR2D2", "FFF3#", "A2A2%", "B!#&%", "A","2014 SDD Exam Q14","metalanguages", "notused", ""],
  ["Study the flow chart structure.</br><img src ='images/2014_15_a.png'></br>Which of the following sets of pseudocode has the same structure as the flow chart provided?</br><img src='images/2014_15_b.png'>", "A", "B", "C", "D", "B","2014 SDD Exam Q15","algorithms", "notused", ""],
  ["Which of the following occurs during the translation process?", "Parsing of the machine code", "Assembly of the source code", "Syntactical analysis of the machine code", "Generation of tokens from the source code", "D","2014 SDD Exam Q16","translation", "notused", ""],
  ["Consider the fragment of code.</br><img src ='images/2014_17_18.png'></br>What is <u>Random</u>()?", "An array", "A variable", "A function", "A parameter", "C","2014 SDD Exam Q17","algorithms", "notused", ""],
  ["Consider the fragment of code.</br><img src ='images/2014_17_18.png'></br>What does the fragment of code do to the elements of <i>List</i>?", "It sorts the elements.", "It reverses the order of the elements.", "It rearranges the elements in random order.", "It replaces all of the elements with one randomly generated value.", "C","2014 SDD Exam Q18","algorithms", "notused", ""],
  ["Consider the following assembly language instructions.</br><img src ='images/2014_19_a.png'></br>The following code is executed.</br><img src ='images/2014_19_b.png'></br>Which of the following shows the change in the contents of the accumulator?", "1, 3, 4, 5", "1, 3, 4", "1, 3, 5", "1, 4, 5", "D","2014 SDD Exam Q19","translation", "notused", ""],
  ["A list of numbers is being sorted using one of these sorting methods: bubble, selection or insertion. The table shows the initial data and the list after the first pass.</br><img src ='images/2014_20_a.png'></br>In what order will the items in the list be after the second pass?</br><img src ='images/2014_20_b.png'>", "A", "B", "C", "D", "D","2014 SDD Exam Q20","searchsort", "notused", ""],
  // 2013
  ["Consider this fragment of code.</br><img src ='images/2013_1_a.png'></br>What are the values of <i>length</i>, <i>breadth</i> and <i>area</i> after the fragment of code has been executed?</br><img src ='images/2013_1_b.png'>", "A", "B", "C", "D", "C","2013 SDD Exam Q1","algorithms", "notused", ""],
  ["Which of the following is NOT a system flowchart symbol?</br><img src ='images/2013_2.png'>", "A", "B", "C", "D", "D","2013 SDD Exam Q2","modellingtools", "notused", ""],
  ["Which of the following would be best to use to show the planned sequence of events for a development process?", "Logbook", "Gantt chart", "Context diagram", "Program flowchart", "B","2013 SDD Exam Q3","documentation", "notused", ""],
  ["Which of the following is most effective in preventing software piracy?", "Using a site licence", "Using an encryption key", "Making a file Read-only", "Providing source code instead of compiled code", "B","2013 SDD Exam Q4","issues", "notused", ""],
  ["The Millennium Bug (also known as the year 2000 problem) resulted from the common practice of only storing the last two digits of a calendar year (eg 63 instead of 1963) in order to save memory.</br>Which of the following is TRUE of the Millennium Bug?", "It was a virus, as it affected software worldwide.", "It was a logic error, resulting in inappropriate calculations.", "It was caused by an inappropriate data structure, requiring a lot of software to be updated.", "It was malware, introduced by programmers who were later employed to fix the problem they had created.", "C","2013 SDD Exam Q5","issues", "notused", ""],
  ["The quality of a piece of software is determined by a number of criteria.</br>At which stage of the software development cycle should these criteria be identified?", "Defining and understanding the problem", "Planning and designing the software solution", "Implementing the software solution", "Testing and evaluating the software solution", "A","2013 SDD Exam Q6","softwaredevcycle", "notused", ""],
  ["Which of the following is the most appropriate data type for storing telephone numbers?", "String", "Record", "Integer", "Floating point", "A","2013 SDD Exam Q7","datatypes", "notused", ""],
  ["Which of the following is NOT a valid reason for maintaining software?", "Existing software also has to work on hand-held devices, such as tablets.", "Equal opportunity legislation demands greater inclusivity in user interfaces.", "There are legislative changes, such as the introduction of the GST, requiring added functionality.", "The increased speed of the national broadband network (NBN) allows users to download software more efficiently.", "D","2013 SDD Exam Q8","maintaining", "notused", ""],
  ["Which type of documentation provides the most detailed information about calculations used in programs?", "IPO diagram", "Structure chart", "Data dictionary", "Data flow diagram", "A","2013 SDD Exam Q9","documentation", "notused", ""],
  ["Which type of coding error is test data used to detect?", "Compiler", "Lexical", "Logic", "Syntax", "C","2013 SDD Exam Q10","testingcorrecting", "notused", ""],
  ["A user pays for and installs a software package with a single user licence. Later, the user pays for and installs an upgrade to the package.</br>What is the user allowed to do with the original version?", "Sell it", "Archive it onto a DVD", "Give it away but not sell it", "Use it on a different computer", "B","2013 SDD Exam Q11","issues", "notused", ""],
  ["Consider the following code, where variables a, b and c each store different integer values.</br><img src='images/2013_12.png'></br>What will this code print?", "The numbers in ascending order", "The numbers in descending order", "Only the largest of the three values", "Only the smallest of the three values", "D","2013 SDD Exam Q12","algorithms", "notused", "For this question, you need to test the algorithm using different combinations of test data eg. 5, 6 and 7. We can then change the values around each time we test the algorithm to see what the result is with a different combination.</br>Firstly, let us say that a = 5, b = 6 and c = 7. In this case, a (with a value of 5) will be displayed. 5 is the smallest value.</br>Now say that a=7, b = 6, and c = 5. In this case, c (with a value of 5) will be displayed. Again, the smallest value is displayed.</br>Now, we will say a=5, b = 7, and c = 6. In this case, a (with a value of 5) will be displayed. Again, the smallest value is displayed.</br>This time, we will say a=6, b = 5, c=7. In this case, b (with a value of 5) will be displayed. Again, the smallest value is displayed. We could keep testing all the different combinations and we will find that each time the smallest of the three values will be displayed. Therefore the answer to this question is D."],
  ["Consider the fragment of code.</br><img src='images/2013_13_14.png'></br>The fragment of code works correctly, producing the correct output. Which row in the table correctly identifies the category of each variable?</br><img src='images/2013_13_a.png'>", "A", "B", "C", "D", "B","2013 SDD Exam Q13","algorithms", "notused", "The variable <i>days</i> is created in the <i>Libary-fine</i> function but also accessed in the <i>calculate</i> function. Therefore, it must be a global variable. The variable <i>owing</i> is created in the <i>calculate</i> function but also is accessed in the <i>Library-fine</i> function so it must also be a global variable. That means the answer has to be B - both are global variables."], // change question order
  ["Consider the fragment of code.</br><img src='images/2013_13_14.png'></br>The above fragment of code has been modified as shown.</br><img src='images/2013_14_a.png'></br>What is the most likely reason for making the modifications?", "It makes the code easier to maintain.", "The number of fine-free days has changed.", "The penalty for overdue items has changed.", "The functionality of the program needs to be increased.", "A","2013 SDD Exam Q14","maintaining", "notused", "New variables have been created at the beginning of the Libary-fine function to store free days and the fine. That means if the number of free days or if the value of the fine changes in the future, the values can easily be changed once at the beginning of that function rather than having to look for and change the values in other parts of the program including the calculate function. This makes the software easier to maintain. It is also makes the algorithm easier to understand for future developers who may be working on it for the first time."], // change question order
  ["Which of the following correctly matches an EBNF statement with its railroad diagram?</br><img src='images/2013_15.png'>", "A", "B", "C", "D", "B","2013 SDD Exam Q15","metalanguages", "notused", "The correct answer is B. Vertical bars represent a choice between elements and the square brackets enclose optional elements."], // change question order
  ["Which of the following best describes acceptance testing?", "Testing that the system can accept large volumes of data", "Testing the user-friendliness of the interface by the end users", "Testing whether the response times are acceptable to the end users", "Testing whether the system is ready to become available to the end users", "D","2013 SDD Exam Q16","testevaluate", "notused", ""],
  ["An array of 15 integers has been sorted in ascending order. A standard binary search algorithm is used to find out if a particular integer is in the array.</br>What is the maximum number of elements that need to be checked?", "2", "4", "8", "15", "B","2013 SDD Exam Q17","searchsort", "notused", "Read more about binary searches <a class='externalLink' href='https://www.topcoder.com/community/data-science/data-science-tutorials/binary-search/' target='_blank'>here</a>."],
  ["The subroutine <i>getValue</i> is designed to return a number within a given range.</br><img src='images/2013_18_19.png'></br>Which of the following is the most suitable for testing that the subroutine <i>getValue</i> returns a number between 15 and 20 inclusive?</br><img src='images/2013_18_a.png'>", "A", "B", "C", "D", "A","2013 SDD Exam Q18","algorithms", "notused", ""],
  ["The subroutine <i>getValue</i> is designed to return a number within a given range.</br><img src='images/2013_18_19.png'></br>The subroutine <i>getValue</i> has been modified as shown.</br><img src='images/2013_19_a.png'></br>What is the most likely reason for modifying the code?", "To test what would happen if a number outside the range was generated", "To test whether the lines marked &#39;REM can be removed for greater efficiency", "To determine whether the original subroutine was the cause of incorrect output", "To add comments to help explain the logic of the code for maintenance purposes", "C","2013 SDD Exam Q19","algorithms", "notused", ""],
  ["A CPU with a single accumulator is able to carry out these assembly language instructions.</br><img src='images/2013_20_a.png'></br>Consider this higher-level language statement.</br><img src='images/2013_20_b.png'>Which of the following represents a correct assembly language implementation of the statement for this CPU?</br><img src='images/2013_20_c.png'>", "A", "B", "C", "D", "C","2013 SDD Exam Q20","translation", "notused", ""],
  // 2012
  ["What are the values of <i>m</i> and <i>p</i> after the following four statements have been executed?</br>m = 1</br>p = 2</br>m = p</br>p = m</br><img src='images/2012_1.png'>", "A", "B", "C", "D", "B","2012 SDD Exam Q1","algorithms", "notused", "<i>m</i> becomes 2 (the value of <i>p</i>) and then <i>p</i> becomes <i>m</i> so its value becomes 2 as well."],
  ["A website is to be developed to allow users to provide feedback about certain issues. For each issue, a response is to be chosen from five levels ranging from <i>very important</i> to <i>very unimportant</i>.</br>Which of the following screen elements should be used to capture the responses?", "Text boxes", "Check boxes", "Push buttons", "Dropdown lists", "D","2012 SDD Exam Q2","interfacedesign", "notused", "Dropdown lists would be most suitable because they allow the user to select one item from a range of pre-defined options. The user cannot enter any other values apart from those provided by the dropdown list."],
  ["Which of the following is used in the CPU to store the results of a computation?", "Accumulator", "Control unit", "Program counter", "ROM", "A","2012 SDD Exam Q3","translation", "notused", "The accumulator store the results of a computation. The control unit controls all the operations of the CPU and ensures the correct paths are setup for the transfer of data. The program counter stores the <i>address</i> of the next instruction to be processed. ROM is read-only memory."],
  ["Which of the following is the most appropriate to represent the physical devices and the flow of processes within a system?", "Structure charts", "System flowcharts", "Program flowcharts", "Data flow diagrams", "B","2012 SDD Exam Q4","modellingtools", "notused", ""],
  ["One use of serial numbers on computer software is to combat ", "plagiarism.", "decompilation.", "software piracy.", "reverse engineering.", "C","2012 SDD Exam Q5","issues", "notused", "Serial numbers used to register software can help to prevent piracy. They do not prevent plagiarism, decompilation, or reverse engineering."],
  ["A programmer needs to show a client the input and output screens of a new program under development.</br>Which of the following should be used?", "A DFD", "A prototype", "An IPO diagram", "A context diagram", "B","2012 SDD Exam Q6","planningdesigning", "notused", ""],
  ["Which of the following is used to document the variables and their types in a program?", "Index", "Compilation", "Program trace", "Data dictionary", "D","2012 SDD Exam Q7","documentation", "notused", ""],
  ["A developer writes a program that will calculate and output the average of positive integers. The user may enter any number of positive integers. Entry of a negative integer indicates there is no more data.</br>What does this program require?", "Both a loop and an array", "Neither an array nor a loop", "A loop but not necessarily an array", "An array but not necessarily a loop", "C","2012 SDD Exam Q8","controlstructures", "notused", "A loop is required to keep checking for input and to add the positive integers together before calculating the average. However, an array is not required as the same variable can be used to store the new input value each time the loop repeats."],
  ["Which sorting algorithm finds the largest element in an unsorted list and places it into its correct position during each pass?", "Binary", "Bubble", "Insertion", "Selection", "D","2012 SDD Exam Q9","searchsort", "notused", "Read more about sorting methods <a class='externalLink' href='http://theoryapp.com/selection-insertion-and-bubble-sort/' target='_blank'>here</a>."],
  ["Use the following information to answer the question below.</br><img src='images/2012_10_11.png'></br>What type of data structure is used for the <i>People</i> variable?", "A record", "A sequential file", "An array of records", "A two-dimensional array", "C","2012 SDD Exam Q10","datastructures", "notused", "<i>People is an array that is accessed by an index (<i>i</i>). Each element of the array contains a record for a person. Each record contains a value for FirstName and a value for LastName."],
  ["Use the following information to answer the question below.</br><img src='images/2012_10_11.png'></br>What is the control structure used in the algorithm?", "Pre-test loop", "Counted loop", "Post-test loop", "Multiway loop", "B","2012 SDD Exam Q11","controlstructures", "notused", "The algorithm uses a <i>for</i> loop which is an example of a counted loop control structure."],
  ["What type of error is an arithmetic overflow?", "Crash", "Logic", "Runtime", "Syntax", "C","2012 SDD Exam Q12","testingcorrecting", "notused", "When a calculation in a program produces a result that is greater in magnitude than that which a given register or storage location can store or represent, an arithmtic overflow error occurs. An arithmetic overflow error is not caused by not following the rules of a programming language so it is not a syntax error. It is more likely caused by using the wrong data type or data structure. The logic of the algorithm may be sound (therefore not causing a logic error) but the wrong data type/structure might be used (eg. INT instead of LONG) causing an arithmetic overflow. These types of errors occurr during program execution (runtime). Therefore, they are known as runtime errors."],
  ["The following table was generated by a programmer who ran a program multiple times under controlled conditions.</br><img src='images/2012_13.png'></br>What is this an example of?", "Benchmarking", "Compiling", "Debugging", "Desk checking", "A","2012 SDD Exam Q13","testevaluate", "notused", "The table records the average time taken to sort different quantities of items. Testing performance of software like this example is known as benchmarking."],
  ["A large DVD collection is ordered according to the release date.</br>To find a particular movie title, what is the most efficient search method to use?", "Binary", "Insertion", "Linear", "Selection", "C","2012 SDD Exam Q14","searchsort", "notused", "Firstly, Selection and Insertion are sorting methods (not searching methods). Binary search is efficient on large data sets but only when they are already sorted. The DVD collection is sorted but it is sorted by release date and we want to find a movie by its title (name). So when looking at the collection of movies according to their title, they are not sorted. Therefore a linear search would be most suitable."],
  ["Consider this algorithm.</br><img src='images/2012_15.png'></br>Which of the following is the most suitable data type for the variable <i>USDollar</i>?", "Currency", "Floating point", "Integer", "String", "B","2012 SDD Exam Q15","datatypes", "notused", "The price of something is not always going to be a whole number so when working with currency, the floating point data type is always the most suitable. In this question, we can also see that the value of <i>USDollar</i> is the result of multiplying <i>AusDollar</i> by 1.05 (a number that contains a decimal place). Therefore, the value of <i>USDollar</i> is most likely going to contain a decimal place. The integer data type only stores whole numbers so the floating point data type is suitable for numbers containing a decimal place. Currency is not a data type known to most programming languages and string is not suitable as the values need to be treated as numbers and will need to be used for calculations."],
  ["During which stage of the compilation process does type checking of identifiers occur?", "Linking", "Lexical analysis", "Code generation", "Syntactical analysis", "D","2012 SDD Exam Q16","translation", "notused", "Type checking of identifiers ensures that that the names of variables and functions for example, will follow the rules (syntax) of the language. Therefore, this process occurs during syntactical analysis."],
  ["Consider the following code which operates upon an array of integers called <i>x</i>.</br><img src='images/2012_17.png'></br>Which of the following best describes what this code does?", "It reverses the order of the elements in the array.", "It copies the second half of the array to the first half.", "It copies the first half of the array to the second half.", "It swaps the first half of the array and the second half of the array.", "A","2012 SDD Exam Q17","algorithms", "notused", ""],
  ["Which of the following is the most effective in managing changes and versions during system development?", "CASE tools", "Gantt charts", "Progress logs", "Document flowcharts", "A","2012 SDD Exam Q18","documentation", "notused", ""],
  ["Consider the following EBNF definition of a <i>mussum</i> string.</br><img src='images/2012_19.png'></br>Which of the following is a legal <i>mussum</i> string?", "m1", "muum", "mu1sm", "mussum", "C","2012 SDD Exam Q19","metalanguages", "notused", ""],
  ["What does data validation involve?", "Checking that data conforms to certain rules", "Checking that data has been entered correctly", "Checking that test data covers all possible paths", "Checking that live test data meets volume testing requirements", "A","2012 SDD Exam Q20","testingcorrecting", "notused", "Data validation prevents the user from being able to enter any invalid data and ensures the user enters only valid and expected data."],
  // 2010
  ["The leaflet shown is sent by a web design company to potential customers.</br><img src='images/2010_10.png'></br>Which software development approach is being described in this leaflet?", "End user", "Pilot", "Prototyping", "Structured", "C","2010 SDD Exam Q10","sdas", "notused", ""], // change question order
  ["In developing a software solution, test data should be created for the first time when ", "coding a solution.", "designing a solution.", "implementing a solution.", "determining the feasibility of a solution.", "B","2010 SDD Exam Q6","softwaredevcycle", "notused", ""],
  ["Consider the following algorithm.</br></br>a = 2</br>b = 4</br>a = a + b</br>b = a + b</br>PRINT a, b</br></br>What is the output from this algorithm?", "6, 10", "6, 6", "2, 6", "2, 4", "A","2010 SDD Exam Q3","algorithms", "notused", ""],
  ["Which tool is used by project managers to track the actual progress of a project against its planned progress?", "Gantt chart", "Gateway report", "Feasibility study", "Structure diagram", "A","2010 SDD Exam Q1","documentation", "notused", ""],
  ["A large bank is introducing a new computer-based system. Parts of the old system will be replaced one by one until the new system is in place.</br></br>Which implementation method is being used by the bank?", "Phased", "Parallel", "Prototyping", "Direct cut over", "A","2010 SDD Exam Q2","implementation", "notused", ""],
  ["Part of the syntax of a programming language is represented in the documentation shown.</br><img src='images/2010_4.png'></br>What type of representation is this?", "BNF diagram", "Database schema", "IPO chart", "Railroad diagram", "D","2010 SDD Exam Q4","modellingtools", "notused", ""],
  ["Which of the following statements about open-source code is correct?", "It is hardware dependent.", "It is code that cannot legally be recompiled.", "It can be incorporated into commercial software with licensing.", "It can be run directly without the need for translation into object code.", "C","2010 SDD Exam Q5","issues", "notused", ""],
  ["The diagram shows an e-business being developed and monitored by a software developer.</br><img src='images/2010_7.png'></br>Which modelling tool is being used to represent this system?", "Context diagram", "Data flow diagram", "Logic flowchart", "System flowchart", "B","2010 SDD Exam Q7","modellingtools", "notused", ""],
  ["The formula shown is used to calculate the tax paid by employees in a small business.</br></br>tax_paid = F28 * G17 / H3</br></br>What type of documentation has been used in naming the variable tax_paid?", "External", "Extrinsic", "Internal", "Intrinsic", "D","2010 SDD Exam Q9","documentation", "notused", ""],
  ["What occurs when a program encounters a breakpoint?", "Program execution is terminated.", "Program execution is paused, awaiting an action from the programmer.", "The program prints an error message and immediately continues execution.", "The program prints the value of a variable and immediately continues execution.", "B","2010 SDD Exam Q12","testingcorrecting", "notused", ""],
  ["Kim wants to write a program to list her friends&#39; details in birthday order. She stores her friends&#39; details in a sequential file. Each line of the file contains the name, phone number and birthday for a friend.</br></br>Which is the most appropriate data structure for handling her friends&#39; data in the program?", "A record", "An array of records", "A multi-dimensional array", "A multi-dimensional record of arrays", "B","2010 SDD Exam Q13","datastructures", "notused", ""],
  ["Use the algorithm to answer this question.</br><img src='images/2010_14_15.png'></br>What is the most appropriate data type for the variable EndUnsorted?", "Array", "Boolean", "Floating point", "Integer", "D","2010 SDD Exam Q14","datatypes", "notused", ""],
  ["Use the algorithm to answer this question.</br><img src='images/2010_14_15.png'></br>The algorithm is applied to the following array of data. The smallest index is 1.</br><img src='images/2010_15.png'></br>What will this array look like after the algorithm is applied?</br><img src='images/2010_15_b.png'>", "A", "B", "C", "D", "A","2010 SDD Exam Q15","algorithms", "notused", ""],
  ["The newly developed portal of a national company was successfully tested by its developer. During the first two weeks of implementation, staff complained about not knowing how to use some of the new features of the software.</br></br>Which area of feasibility should have been considered more carefully during the development process?", "Budgetary", "Operational", "Scheduling", "Technical", "B","2010 SDD Exam Q16","understandingproblem", "notused", ""],
  ["What happens when a syntax error occurs during compilation?", "Object code will be created without the section containing the erroneous code.", "The compiler will pass over the error as syntax errors are ignored during compilation.", "The error will be included in an error listing which will be produced at the end of compilation.", "The syntax error will be automatically corrected by the compiler and updated source code will be generated.", "C","2010 SDD Exam Q17","translation", "notused", ""],
  ["A program based on the following algorithm generates an error whenever it is executed.</br><img src='images/2010_18.png'></br>What is the most likely cause of this error?", "Division by zero", "Arithmetic overflow", "Incorrect program syntax", "Accessing an inappropriate memory location", "D","2010 SDD Exam Q18","testingcorrecting", "notused", ""],
  ["The following processes take place during program translation.</br></br>Process X: validating the relationships between elements</br>Process Y: testing with a type checker</br>Process Z: labelling reserved words and identifiers</br></br>What is the correct sequence of these processes?", "Z, Y, X", "Y, Z, X", "Z, X, Y", "Y, X, Z", "C","2010 SDD Exam Q19","translation", "notused", ""],
  ["Consider the following algorithm.</br><img src='images/2010_20.png'></br>What would be the output from this algorithm?", "2, 3, 3, 2", "2, 3, 1, 8", "8, 1, 2, 3", "8, 1, 1, 8", "C","2010 SDD Exam Q20","algorithms", "notused", ""]
  ];

  // topics array stores HSC topics that questions belong to
  var topics = [
    ["softwaredevcycle"],
    ["sdas"],
    ["understandingproblem"],
    ["planningdesigning"],
    ["interfacedesign"],
    ["implementing"],
    ["testevaluate"],
    ["maintaining"],
    ["issues"],
    ["documentation"],
    ["algorithms"],
    ["datatypes"],
    ["datastructures"],
    ["controlstructures"],
    ["translation"],
    ["metalanguages"],
    ["searchsort"],
    ["testingcorrecting"],
    ["modellingtools"]
    ];

// Create get function to shorten the getElementById function
function get(x){
  return document.getElementById(x);
}

// checkFilter function will check if and which topics are selected
function checkFilter(){
// Go to top of page
scrollToTop();
// Initialise filteredQuestions array
filteredQuestions=[];
// Initialise topic_count to 0
var topic_count = 0;
// Loop through topics array and look for topic checkboxes that have been checked
for(i=0;i<topics.length;i++){
  var topic_name = topics[i];
  if(get(topic_name).checked == true){
    // Add checked topic checkboxes to filteredQuestions array
    filteredQuestions.push(topic_name);
    // Increase topic_count
    topic_count++;
  }
}
topicsChecked = topic_count;
// Data validation - check if no topics are selected
// If no topics selected, select all topics by default
if(topic_count == 0){
  // Call the enableAllTopics function
  enableAllTopics();
  // Update topic_count with length of topics array
  topic_count = topics.length;
  // alert('Please select a topic.'); - removed to prevent message displaying onload
}

// Call the renderQuestion function after filtering topics
renderQuestion();
}

// Create renderQuestion function to build the question for display
function renderQuestion(){
  // Get the score div
  score = get("score");
  // Get the testFeedback div
  testFeedback = get("testFeedback");
  // Get the detailedFeedback div
  detailedFeedback = get("detailedFeedback");
  detailedFeedback.style.display = 'none';
  // Get the nextQuestion div
  nextQuestion = get("nextQuestion");
  // Reset testFeedback and detailedFeedback divs to display no content
  testFeedback.innerHTML = "";
  nextQuestion.innerHTML = "";
  detailedFeedback.innerHTML = "";
  score.innerHTML = "";
  // Check if no topics selected in filter and call checkFilter function if necessary
  if(filteredQuestions.length == 0 || topicsChecked == 0){
  checkFilter();
  }
  // Get the test div
  test = get("test");
  // Get random question from questions array using random integer less than length of questions array
  pos = Math.floor((Math.random() * questions.length) + 0);
  // Get random filtered question using random integer less than length of filteredQuestions array
  filterPos = Math.floor((Math.random() * filteredQuestions.length) + 0);
  // Set currentQuestionTopic to be topic from randomly selected question
  currentQuestionTopic = questions[pos][7];

  // Check if current randomly selected question's topic matches currently randomly selected topic from user-generated filter
  if((currentQuestionTopic == filteredQuestions[filterPos]) && (questions[pos][8] != "used")){
    // Store the current selected question
    question = questions[pos][0];
    // Store the current selected question's answer options
    chA = questions[pos][1];
    chB = questions[pos][2];
    chC = questions[pos][3];
    chD = questions[pos][4];
    // Store the current selected question's exam name, exam year and exam question number
    exam = questions[pos][6];
    // Store the current selected question's feedback
    answerFeedback = questions[pos][9];
    // Display the question to the user in the test div
    test.innerHTML = "<h3>"+question+"</h3>";
    // Append the answer options and submit button to the user in the test div
    test.innerHTML += "<label for='chA'><input type='radio' name='choices' id='chA' value='A'/> "+chA+"</label><br>";
    test.innerHTML += "<label for='chB'><input type='radio' name='choices' id='chB' value='B'/> "+chB+"</label><br>";
    test.innerHTML += "<label for='chC'><input type='radio' name='choices' id='chC' value='C'/> "+chC+"</label><br>";
    test.innerHTML += "<label for='chD'><input type='radio' name='choices' id='chD' value='D'/> "+chD+"</label><br><br>";
    test.innerHTML += "<button id ='submitButton' onclick='checkAnswer()'>Submit Answer</button>";
  }

  // If randomly selected question does not match the randomly selected topic from user's topic filter, then call function again (until a match is found)
  else{
    try {
    renderQuestion();
    } catch (ex){
      endQuiz();
    }
      //renderQuestion();
  }
}

// Create checkAnswer function to check if user's answer is correct
function checkAnswer(){
  // Reset selectedCount back to 0;
  selectedCount = 0;

  // Add question to used question bank for this session (update array)
  questions[pos][8] = "used";

  // Get the question choices
  // Use getElementsByName because we have an array which it will loop through
  choices = document.getElementsByName("choices");
  choice = 1000; // reset choice to 1000 so it is definitely incorrect if no option selected - temporary (to be improved later)

  // Check if one answer was selected
  for(var i=0; i<choices.length; i++){
    if(choices[i].checked){
      selectedCount++;
    }
  }
  // If no answer selected, then remind user to select an answer and exit checkAnswer function
  if(selectedCount != 1){
    alert("You must select one answer.");
    return;
  }

  // Hide the submit button after user's answer submitted
  get('submitButton').style.display = 'none';

  // Check which choice radio button was selected and store as the user's answer
  for(var i=0; i<choices.length; i++){
    if(choices[i].checked){
      choice = choices[i].value;
    }
  }
  // Check if user's answer matches the correct choice
  if(choice == questions[pos][5]){
    // Increase the number of total questions answered
    totalAnswered++;
    // Increase number of correct answers
    correct++;
    // Increase the scorestreak
    scorestreak++;
    // Store user feedback in the feedback variable
    feedback = "<p>Your answer was <span id='green'><strong>correct</strong></span>.</br>";
  }
  else{
    // Increase the number of total questions answered
    totalAnswered++;
    // Increase number of incorrect answers
    incorrect++;
    // Reset scorestreak to 0 when question answered incorrectly
    scorestreak = 0;
    // Store user feedback in the feedback variable
    feedback = "<p>Your answer was <span id='red'><strong>incorrect</strong></span>. The correct answer was <strong>" + questions[pos][5] + "</strong>.</br>";
  }
  // Scroll down to the answer feedback using jQuery
  $("html, body").animate({ scrollTop: $('#testFeedback').offset().top }, 1000);
  // Use the old method below if jQuery not being used
  //document.getElementById("testFeedback").scrollIntoView(true);

  // Display feedback (correct or incorrect), score and scorestreak in the testFeedback div and display Next queston button
  testFeedback.innerHTML = "" + feedback + " <span onclick='showFeedback()' id='detailedFeedbackLink'>+ Show feedback</span></br>";
  // Display detailed question feedback
  if(answerFeedback == ""){
    answerFeedback = "There is no detailed feedback for this question yet.";
  }
  detailedFeedback.innerHTML = "<p><strong>Feedback:</strong> " + answerFeedback +  " This question is from <i>" + exam + "</i>.</p>";
  score.innerHTML = "<strong>Correct:</strong> " + correct + "/" + totalAnswered + "  <strong>Scorestreak:</strong> " + scorestreak + "</p>";
  nextQuestion.innerHTML = "<button onclick='loadNextQuestion();'>Next question</button>";
}

// Create enableAllTopics function which checks all topic filter checkboxes on pageload
function enableAllTopics(){
  for(i=0;i<topics.length;i++){
    checkboxItem = get(topics[i]);
    checkboxItem.checked = true;
  }
  // Call the checkFilter topic
  checkFilter();
}

// endQuiz function called if no un-used questions are left
function endQuiz(){
  testFeedback.innerHTML = "";
  test.innerHTML = "<p>You have completed all available questions using the current filter. Either increase the number of topics in your filter or start the quiz again.</br>";
  test.innerHTML += "<p>Scorestreak: <strong>" + scorestreak + "</strong></br>Correct answers: <strong>" + correct + "</strong></br></br>";

  testFeedback.innerHTML += "<button onclick='reloadQuiz();'>Start quiz again</button>";
}

// reloadQuiz will refresh the page to reload the quiz
function reloadQuiz(){
  location.reload();
}

function showFeedback(){
  detailedFeedbackLink = get("detailedFeedbackLink");
  if(detailedFeedbackLink.innerHTML == "+ Show feedback"){
    detailedFeedbackLink.innerHTML = "- Hide feedback";
    detailedFeedback.style.display = 'block';
  }
  else{
    detailedFeedbackLink.innerHTML = "+ Show feedback";
    detailedFeedback.style.display = 'none';
  }
}

function uncheckAll(){
  for(i=0;i<topics.length;i++){
    checkboxItem = get(topics[i]);
    checkboxItem.checked = false;
  }
  topicsChecked = 0;
}

function checkAll(){
  for(i=0;i<topics.length;i++){
    checkboxItem = get(topics[i]);
    checkboxItem.checked = true;
  }
  topicsChecked = topics.length;
}

function loadNextQuestion(){
  // Go to top of page
  // jQuery scroll to top function
  // $("html, body").animate({ scrollTop: $('#top').offset().top }, 1000);
  // Old scrollToTop function to use if jQuery not being used
  scrollToTop();
  // Call renderQuestion function
  renderQuestion();
}

// Create scrollToTop function with timeout
var timeOut;
function scrollToTop() {
	if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
		window.scrollBy(0,-50);
		timeOut=setTimeout('scrollToTop()',50); // set scroll time here
	}
	else clearTimeout(timeOut);
}

// Listen for page load event to call renderQuestion function and enableAllTopics function on page load
window.addEventListener("load", loadNextQuestion, false);
window.addEventListener("load", enableAllTopics, false);