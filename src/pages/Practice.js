import React, { useState, useEffect } from 'react';

const Practice = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showMarksView, setShowMarksView] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Course list A-Z
  const courseList = [
    { id: 1, name: 'HTML', icon: '🌐', color: '#E34F26' },
    { id: 2, name: 'CSS', icon: '🎨', color: '#1572B6' },
    { id: 3, name: 'JavaScript', icon: '⚡', color: '#F7DF1E' },
    { id: 4, name: 'React', icon: '⚛️', color: '#61DAFB' },
    { id: 5, name: 'Node.js', icon: '🟢', color: '#339933' },
    { id: 6, name: 'Python', icon: '🐍', color: '#3776AB' },
    { id: 7, name: 'Java', icon: '☕', color: '#007396' },
    { id: 8, name: 'C++', icon: '⚙️', color: '#00599C' },
    { id: 9, name: 'SQL', icon: '🗄️', color: '#4479A1' },
    { id: 10, name: 'MongoDB', icon: '🍃', color: '#47A248' },
    { id: 11, name: 'Angular', icon: '🅰️', color: '#DD0031' },
    { id: 12, name: 'Vue.js', icon: '💚', color: '#4FC08D' },
    { id: 13, name: 'TypeScript', icon: '📘', color: '#3178C6' },
    { id: 14, name: 'PHP', icon: '🐘', color: '#777BB4' },
    { id: 15, name: 'Ruby', icon: '💎', color: '#CC342D' },
    { id: 16, name: 'Go', icon: '🔵', color: '#00ADD8' },
    { id: 17, name: 'Swift', icon: '🦅', color: '#FA7343' },
    { id: 18, name: 'Kotlin', icon: '🎯', color: '#7F52FF' },
    { id: 19, name: 'Rust', icon: '🦀', color: '#000000' },
    { id: 20, name: 'Docker', icon: '🐳', color: '#2496ED' },
  ];

  const levelConfig = [
    { level: 1, name: 'Beginner', questions: 20, marksPerQuestion: 10, difficulty: 'Easy', color: '#28a745' },
    { level: 2, name: 'Elementary', questions: 18, marksPerQuestion: 15, difficulty: 'Easy', color: '#20c997' },
    { level: 3, name: 'Basic', questions: 16, marksPerQuestion: 20, difficulty: 'Medium', color: '#17a2b8' },
    { level: 4, name: 'Intermediate', questions: 14, marksPerQuestion: 25, difficulty: 'Medium', color: '#007bff' },
    { level: 5, name: 'Skilled', questions: 12, marksPerQuestion: 30, difficulty: 'Medium', color: '#6610f2' },
    { level: 6, name: 'Advanced', questions: 10, marksPerQuestion: 35, difficulty: 'Hard', color: '#6f42c1' },
    { level: 7, name: 'Professional', questions: 8, marksPerQuestion: 40, difficulty: 'Hard', color: '#e83e8c' },
    { level: 8, name: 'Expert', questions: 6, marksPerQuestion: 45, difficulty: 'Hard', color: '#fd7e14' },
    { level: 9, name: 'Master', questions: 4, marksPerQuestion: 50, difficulty: 'Very Hard', color: '#dc3545' },
    { level: 10, name: 'Grandmaster', questions: 2, marksPerQuestion: 100, difficulty: 'Expert', color: '#c82333' }
  ];

  const loadQuestions = async (level) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/practices/?level=${level}`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions || []);
      } else {
        setQuestions(generateMockQuestions(level));
      }
    } catch (error) {
      setQuestions(generateMockQuestions(level));
    } finally {
      setLoading(false);
    }
  };

  const generateMockQuestions = (level) => {
    const config = levelConfig[level - 1];
    const mockQuestions = [];
    
    const questionTemplates = {
      1: [
        { q: 'What is the output of: print(2 + 2)?', options: ['4', '22', 'Error', 'None'], correct: 0 },
        { q: 'Which keyword is used to define a function in Python?', options: ['func', 'def', 'function', 'define'], correct: 1 },
        { q: 'What is the correct file extension for Python files?', options: ['.python', '.py', '.pt', '.pyt'], correct: 1 },
        { q: 'Which operator is used for exponentiation in Python?', options: ['^', '**', 'exp', 'pow'], correct: 1 },
        { q: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], correct: 0 }
      ],
      2: [
        { q: 'What is a variable in programming?', options: ['A constant value', 'A storage location', 'A function', 'A loop'], correct: 1 },
        { q: 'Which data type is used to store text?', options: ['int', 'float', 'string', 'boolean'], correct: 2 },
        { q: 'What is the purpose of a loop?', options: ['To store data', 'To repeat code', 'To define functions', 'To handle errors'], correct: 1 }
      ],
      3: [
        { q: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
        { q: 'Which data structure uses LIFO principle?', options: ['Queue', 'Stack', 'Array', 'Tree'], correct: 1 },
        { q: 'What is recursion?', options: ['A loop', 'A function calling itself', 'An array', 'A variable'], correct: 1 }
      ],
      4: [
        { q: 'What is polymorphism in OOP?', options: ['Multiple forms', 'Single form', 'No form', 'Abstract form'], correct: 0 },
        { q: 'Which sorting algorithm has best average case?', options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'], correct: 1 }
      ],
      5: [
        { q: 'What is a closure in JavaScript?', options: ['A loop', 'A function with access to outer scope', 'An object', 'A class'], correct: 1 },
        { q: 'What is the purpose of async/await?', options: ['Synchronous code', 'Asynchronous code', 'Error handling', 'Type checking'], correct: 1 }
      ],
      6: [
        { q: 'What is the difference between TCP and UDP?', options: ['TCP is reliable, UDP is not', 'UDP is reliable, TCP is not', 'No difference', 'Both are unreliable'], correct: 0 },
        { q: 'What is a design pattern?', options: ['A coding style', 'A reusable solution', 'A bug', 'A framework'], correct: 1 }
      ],
      7: [
        { q: 'What is the CAP theorem?', options: ['Consistency, Availability, Partition tolerance', 'Code, API, Protocol', 'Cache, API, Performance', 'None'], correct: 0 },
        { q: 'What is microservices architecture?', options: ['Monolithic design', 'Distributed services', 'Single service', 'No architecture'], correct: 1 }
      ],
      8: [
        { q: 'What is eventual consistency?', options: ['Immediate consistency', 'Delayed consistency', 'No consistency', 'Strong consistency'], correct: 1 },
        { q: 'What is the purpose of load balancing?', options: ['Distribute traffic', 'Store data', 'Compile code', 'Debug errors'], correct: 0 }
      ],
      9: [
        { q: 'What is the Byzantine Generals Problem?', options: ['A consensus problem', 'A sorting problem', 'A search problem', 'A graph problem'], correct: 0 },
        { q: 'What is sharding in databases?', options: ['Vertical partitioning', 'Horizontal partitioning', 'No partitioning', 'Random partitioning'], correct: 1 }
      ],
      10: [
        { q: 'Explain the trade-offs between consistency and availability in distributed systems.', options: ['Strong consistency reduces availability', 'No trade-offs', 'Both can be maximized', 'Availability reduces consistency'], correct: 0 },
        { q: 'What is the optimal approach for designing a globally distributed real-time system?', options: ['Centralized architecture', 'Edge computing with eventual consistency', 'Single server', 'No optimization needed'], correct: 1 }
      ]
    };

    const templates = questionTemplates[level] || questionTemplates[1];
    
    for (let i = 0; i < config.questions; i++) {
      const template = templates[i % templates.length];
      mockQuestions.push({
        id: i + 1,
        question: `Q${i + 1}: ${template.q}`,
        options: template.options,
        correctAnswer: template.correct,
        marks: config.marksPerQuestion
      });
    }

    return mockQuestions;
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setSelectedLanguage('javascript');
    setCode('// Write your JavaScript code here\nconsole.log("Hello, World!");');
    setOutput('');
    loadQuestions(level);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let totalScore = 0;
    questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        totalScore += question.marks;
      }
    });
    setScore(totalScore);
    setShowResults(true);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setQuestions([]);
    setUserAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);
  };

  const getTotalMarks = () => {
    return questions.reduce((sum, q) => sum + q.marks, 0);
  };

  const getAnsweredCount = () => {
    return Object.keys(userAnswers).length;
  };

  if (showMarksView) {
    return (
      <div>
        <div className="mentor-stat-card" style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📊</div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-dark)', margin: '0 0 8px 0' }}>
              Student Marks Overview
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
              View detailed marks and performance analytics for {selectedCourse?.name || 'all courses'}
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div className="mentor-table" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-light)' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>Level</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>Student Name</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>Score</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>Total</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>Percentage</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <tr key={level} style={{ borderBottom: '1px solid #F0F0F0' }}>
                      <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-dark)', fontWeight: 600 }}>Level {level}</td>
                      <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-dark)' }}>Student {level}</td>
                      <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--text-dark)', fontWeight: 600 }}>{150 + level * 10}</td>
                      <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>200</td>
                      <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: 600, color: 'var(--primary-blue)' }}>{75 + level}%</td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <span className="mentor-badge success" style={{ fontSize: '11px' }}>Passed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setShowMarksView(false)}
              style={{ padding: '12px 32px', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', background: 'var(--primary-blue)', color: 'white', transition: 'all 0.3s ease' }}
            >
              ← Back to Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedLevel) {
    return (
      <div>
        {/* Header with Course Dropdown */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '32px' }}>💻</span>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: 'var(--text-dark)' }}>Practice Module</h2>
            </div>
            
            {/* Course Dropdown Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                style={{
                  padding: '12px 24px',
                  border: '2px solid var(--primary-blue)',
                  borderRadius: '8px',
                  background: selectedCourse ? 'var(--primary-blue)' : 'white',
                  color: selectedCourse ? 'white' : 'var(--primary-blue)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
              >
                {selectedCourse ? (
                  <>
                    <span>{selectedCourse.icon}</span>
                    <span>{selectedCourse.name}</span>
                  </>
                ) : (
                  <span>📚 Select Course</span>
                )}
                <span style={{ fontSize: '12px' }}>▼</span>
              </button>

              {/* Course Dropdown Menu */}
              {showCourseDropdown && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  minWidth: '280px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  animation: 'dropdownFadeIn 0.2s ease'
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #E9ECEF' }}>
                    <h6 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Select a Course</h6>
                  </div>
                  <div style={{ padding: '8px' }}>
                    {courseList.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => {
                          setSelectedCourse(course);
                          setShowCourseDropdown(false);
                        }}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: 'none',
                          background: selectedCourse?.id === course.id ? 'var(--light-blue)' : 'transparent',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'left',
                          marginBottom: '4px'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedCourse?.id !== course.id) {
                            e.currentTarget.style.background = 'var(--bg-light)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedCourse?.id !== course.id) {
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        <span style={{ fontSize: '24px' }}>{course.icon}</span>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-dark)', flex: 1 }}>{course.name}</span>
                        {selectedCourse?.id === course.id && <span style={{ color: 'var(--primary-blue)' }}>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>
            {selectedCourse ? `Practice ${selectedCourse.name} - ` : ''}Choose your skill level and start practicing. Progress through 10 levels from Beginner to Grandmaster!
          </p>
        </div>

        {/* Levels Grid - 4 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
          {levelConfig.map((config) => {
            const totalMarks = config.questions * config.marksPerQuestion;
            return (
              <div
                key={config.level}
                className="mentor-stat-card"
                onClick={() => handleLevelSelect(config.level)}
                style={{
                  borderLeft: `4px solid ${config.color}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--hover-shadow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 700,
                    flexShrink: 0,
                    background: config.color
                  }}>
                    {config.level}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600, color: 'var(--text-dark)' }}>
                      {config.name}
                    </h3>
                    <span className="mentor-badge" style={{ background: config.color, color: 'white', fontSize: '11px', fontWeight: 600, padding: '4px 8px' }}>
                      {config.difficulty}
                    </span>
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 0', color: '#495057', fontSize: '13px' }}>
                    <span style={{ fontSize: '16px' }}>📝</span>
                    <span>{config.questions} Questions</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 0', color: '#495057', fontSize: '13px' }}>
                    <span style={{ fontSize: '16px' }}>⭐</span>
                    <span>{config.marksPerQuestion} marks each</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 0', color: '#495057', fontSize: '13px' }}>
                    <span style={{ fontSize: '16px' }}>🎯</span>
                    <span>Total: {totalMarks} marks</span>
                  </div>
                </div>
                <button
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: config.color,
                    fontSize: '14px'
                  }}
                >
                  Start Level {config.level}
                </button>
              </div>
            );
          })}

          {/* Click Here for Marks Card */}
          <div
            className="mentor-stat-card"
            onClick={() => setShowMarksView(true)}
            style={{
              borderLeft: '4px solid #6c757d',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              minHeight: '280px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--card-shadow)';
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 700, color: 'white' }}>
              View Marks
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '16px' }}>
              Check student performance and detailed marks
            </p>
            <button
              style={{
                padding: '10px 24px',
                border: '2px solid white',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = 'white';
              }}
            >
              Click Here
            </button>
          </div>

          {/* Generate Certificate Card */}
          <div
            className="mentor-stat-card"
            onClick={() => alert('Certificate generation feature coming soon!')}
            style={{
              borderLeft: '4px solid #28a745',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              minHeight: '280px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(56, 239, 125, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--card-shadow)';
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎓</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 700, color: 'white' }}>
              Generate Certificate
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '16px' }}>
              Create and download certificates for students
            </p>
            <button
              style={{
                padding: '10px 24px',
                border: '2px solid white',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#11998e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = 'white';
              }}
            >
              Click Here
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="mentor-stat-card">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '32px', flexShrink: 0 }}>💡</span>
            <div>
              <strong style={{ color: 'var(--text-dark)', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                How it works:
              </strong>
              <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)' }}>
                <li style={{ marginBottom: '4px', fontSize: '14px' }}>Select a level based on your skill</li>
                <li style={{ marginBottom: '4px', fontSize: '14px' }}>Answer all questions in the level</li>
                <li style={{ marginBottom: '4px', fontSize: '14px' }}>Each level has different difficulty and marks</li>
                <li style={{ marginBottom: '4px', fontSize: '14px' }}>Track your progress and improve your skills</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const config = levelConfig[selectedLevel - 1];
    const percentage = ((score / getTotalMarks()) * 100).toFixed(1);
    const passed = percentage >= 60;

    return (
      <div>
        <div className="mentor-stat-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '48px' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '80px', marginBottom: '16px', animation: passed ? 'bounce 1s ease-in-out' : 'none' }}>
              {passed ? '🎉' : '📚'}
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-dark)', margin: '0 0 8px 0' }}>
              {passed ? 'Congratulations!' : 'Keep Practicing!'}
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-muted)', margin: 0 }}>
              {passed ? 'You have passed this level!' : 'You need more practice to pass this level.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '8px' }}>{score}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>Your Score</div>
            </div>
            <div style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '8px' }}>{getTotalMarks()}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>Total Marks</div>
            </div>
            <div style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '8px' }}>{percentage}%</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>Percentage</div>
            </div>
            <div style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '8px' }}>{getAnsweredCount()}/{questions.length}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>Answered</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={handleBackToLevels}
              style={{
                padding: '14px 28px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '16px',
                background: '#6c757d',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
            >
              Back to Levels
            </button>
            <button
              onClick={() => handleLevelSelect(selectedLevel)}
              style={{
                padding: '14px 28px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '16px',
                background: 'var(--primary-blue)',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
            >
              Retry Level
            </button>
            {passed && selectedLevel < 10 && (
              <button
                onClick={() => handleLevelSelect(selectedLevel + 1)}
                style={{
                  padding: '14px 28px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '16px',
                  background: 'var(--success-green)',
                  color: 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                Next Level →
              </button>
            )}
          </div>
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #e9ecef',
          borderTopColor: 'var(--primary-blue)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }}></div>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Loading questions...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const config = levelConfig[selectedLevel - 1];
  const question = questions[currentQuestion];

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '⚡' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'cpp', name: 'C++', icon: '⚙️' },
    { id: 'csharp', name: 'C#', icon: '🔷' },
    { id: 'go', name: 'Go', icon: '🔵' },
    { id: 'rust', name: 'Rust', icon: '🦀' },
    { id: 'typescript', name: 'TypeScript', icon: '📘' }
  ];

  const getDefaultCode = (lang) => {
    const templates = {
      javascript: '// Write your JavaScript code here\nconsole.log("Hello, World!");',
      python: '# Write your Python code here\nprint("Hello, World!")',
      java: '// Write your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      cpp: '// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
      csharp: '// Write your C# code here\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
      go: '// Write your Go code here\npackage main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
      rust: '// Write your Rust code here\nfn main() {\n    println!("Hello, World!");\n}',
      typescript: '// Write your TypeScript code here\nconsole.log("Hello, World!");'
    };
    return templates[lang] || templates.javascript;
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(getDefaultCode(lang));
    setOutput('');
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Code executed successfully!\n\nNote: This is a demo compiler. In production, this would connect to a real code execution service.\n\nLanguage: ${languages.find(l => l.id === selectedLanguage)?.name}\nCode length: ${code.length} characters`);
      setIsRunning(false);
    }, 1500);
  };

  const handleClearCode = () => {
    setCode(getDefaultCode(selectedLanguage));
    setOutput('');
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
        <button
          onClick={handleBackToLevels}
          style={{
            background: 'white',
            border: '1px solid #dee2e6',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#495057',
            fontSize: '14px',
            transition: 'all 0.3s ease'
          }}
        >
          ← Back to Levels
        </button>
        <span style={{ color: '#dee2e6' }}>/</span>
        <span>Level {selectedLevel}: {config.name}</span>
      </div>

      {/* Split Screen Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '45% 55%', gap: '20px', marginBottom: '24px' }} className="practice-split-container">
        {/* Left Side - Question Section */}
        <div className="mentor-stat-card" style={{ height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <span style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 500 }}>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div style={{ width: '100%', height: '6px', background: '#e9ecef', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--primary-blue), #357abd)',
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
            <span className="mentor-badge warning" style={{ fontSize: '13px' }}>
              {question?.marks} marks
            </span>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '20px', lineHeight: 1.5 }}>
              {question?.question}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {question?.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswerSelect(question.id, index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    border: userAnswers[question.id] === index ? '2px solid var(--primary-blue)' : '2px solid #e9ecef',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: userAnswers[question.id] === index ? '#e7f3ff' : 'white'
                  }}
                  onMouseEnter={(e) => {
                    if (userAnswers[question.id] !== index) {
                      e.currentTarget.style.borderColor = 'var(--primary-blue)';
                      e.currentTarget.style.background = 'var(--bg-light)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (userAnswers[question.id] !== index) {
                      e.currentTarget.style.borderColor = '#e9ecef';
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                >
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid',
                    borderColor: userAnswers[question.id] === index ? 'var(--primary-blue)' : '#dee2e6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    {userAnswers[question.id] === index && (
                      <div style={{ width: '9px', height: '9px', background: 'var(--primary-blue)', borderRadius: '50%' }}></div>
                    )}
                  </div>
                  <span style={{ flex: 1, fontSize: '14px', color: '#495057' }}>{option}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #e9ecef', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                background: '#6c757d',
                color: 'white',
                opacity: currentQuestion === 0 ? 0.5 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              ← Previous
            </button>
            
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {getAnsweredCount()} / {questions.length}
            </div>

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '13px',
                  background: 'var(--primary-blue)',
                  color: 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={getAnsweredCount() < questions.length}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: getAnsweredCount() < questions.length ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  background: 'var(--success-green)',
                  color: 'white',
                  opacity: getAnsweredCount() < questions.length ? 0.5 : 1,
                  transition: 'all 0.3s ease'
                }}
              >
                Submit Test
              </button>
            )}
          </div>
        </div>

        {/* Right Side - Code Compiler */}
        <div className="mentor-stat-card" style={{ display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
          {/* Language Selector */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-dark)' }}>
                💻 Code Editor
              </h4>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Practice your code here
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang.id)}
                  style={{
                    padding: '6px 12px',
                    border: selectedLanguage === lang.id ? '2px solid var(--primary-blue)' : '1px solid #dee2e6',
                    borderRadius: '6px',
                    background: selectedLanguage === lang.id ? '#e7f3ff' : 'white',
                    color: selectedLanguage === lang.id ? 'var(--primary-blue)' : '#495057',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: selectedLanguage === lang.id ? 600 : 500,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{lang.icon}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div style={{ marginBottom: '16px', flex: 1 }}>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              style={{
                width: '100%',
                minHeight: '300px',
                padding: '16px',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                lineHeight: '1.6',
                resize: 'vertical',
                background: '#f8f9fa',
                color: '#212529',
                outline: 'none'
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              style={{
                flex: 1,
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                background: isRunning ? '#6c757d' : 'var(--success-green)',
                color: 'white',
                fontWeight: 600,
                fontSize: '14px',
                cursor: isRunning ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isRunning ? '⏳ Running...' : '▶️ Run Code'}
            </button>
            <button
              onClick={handleClearCode}
              style={{
                padding: '10px 20px',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                background: 'white',
                color: '#495057',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🗑️ Clear
            </button>
          </div>

          {/* Output Section */}
          <div>
            <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>
              Output:
            </h5>
            <div style={{
              padding: '16px',
              background: '#1e1e1e',
              color: '#d4d4d4',
              borderRadius: '8px',
              minHeight: '120px',
              fontSize: '13px',
              fontFamily: 'Monaco, Consolas, "Courier New", monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: '1.6'
            }}>
              {output || 'Output will appear here...'}
            </div>
          </div>
        </div>
      </div>

      {/* Question Grid */}
      <div className="mentor-stat-card">
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: 'var(--text-dark)' }}>
          Question Overview
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))', gap: '8px' }}>
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(index)}
              style={{
                width: '100%',
                aspectRatio: '1',
                border: '2px solid',
                borderColor: currentQuestion === index ? 'var(--primary-blue)' : (userAnswers[q.id] !== undefined ? 'var(--success-green)' : '#e9ecef'),
                background: currentQuestion === index ? 'var(--primary-blue)' : (userAnswers[q.id] !== undefined ? '#d4edda' : 'white'),
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                color: currentQuestion === index ? 'white' : (userAnswers[q.id] !== undefined ? '#155724' : '#495057'),
                transition: 'all 0.3s ease'
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1400px) {
          div[style*="repeat(4, 1fr)"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 1024px) {
          div[style*="repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .practice-split-container {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          div[style*="repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          .practice-split-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Practice;
