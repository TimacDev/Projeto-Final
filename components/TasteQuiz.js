import { useState } from 'react';

const QUIZ_QUESTIONS = [
  { q: 'When you think of a perfect drink, you prefer it to be…',
    options: ['Sweet and smooth', 'Bold and intense', 'Bright and refreshing', 'Mild and comforting'] },
  { q: 'Which food flavor do you enjoy most?',
    options: ['Fresh berries or citrus fruit', 'Dark chocolate or caramel', 'Roasted nuts or toffee', 'Earthy mushroom or cedar'] },
  { q: 'How do you feel about acidity (think lemon, vinegar, sourdough)?',
    options: ['I love it — bright and lively!', 'A little is fine but not too much', 'I prefer things smooth and mellow', 'I actively avoid acidic foods'] },
  { q: 'What sounds most appealing for your morning coffee?',
    options: ['A delicate, floral pour-over', 'A punchy double espresso', 'A smooth, chocolatey latte', 'A cold brew over ice'] },
  { q: 'How do you usually take your coffee?',
    options: ['Black — I want to taste everything', 'With a little milk or cream', 'Sweet — sugar or flavored syrup', 'I\'m still figuring that out'] },
];

const QUIZ_RESULTS = [
  { title:'The Bright Explorer', tags:['Fruity','Floral','Light Roast'], desc:'You love vibrant, complex flavors. Ethiopian and Kenyan light roasts are made for you.', recs:['Ethiopian Yirgacheffe','Kenyan AA','Guatemalan Antigua'] },
  { title:'The Bold Purist', tags:['Intense','Dark','Espresso'], desc:'You want coffee that punches back. Dark roasts and well-pulled espressos are your territory.', recs:['Sumatra Mandheling','Italian-style espresso blend','Vietnamese robusta'] },
  { title:'The Smooth Sipper', tags:['Caramel','Balanced','Medium Roast'], desc:'You like comfort and sweetness. Colombian and Brazilian medium roasts will become your go-to.', recs:['Colombian Huila','Brazilian Santos','Honduras Marcala'] },
  { title:'The Curious Taster', tags:['Versatile','Open to all'], desc:'You\'re still exploring — which is the best place to be. Try one coffee from each roast level and see what surprises you.', recs:['Ethiopian Yirgacheffe (light)','Colombian Huila (medium)','Sumatra Mandheling (dark)'] },
];

export default function TasteQuiz() {
  const [step, setStep] = useState(0);          // 0–4 = questions, 5 = result
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  // Picks the most common answer index and returns its matching result.
  function pickResult(ans) {
    const counts = [0, 0, 0, 0];
    ans.forEach(a => counts[a]++);
    const max = Math.max(...counts);
    return QUIZ_RESULTS[counts.indexOf(max)];
  }

  // Highlight the chosen option briefly, then advance.
  function choose(idx) {
    setSelected(idx);
    setTimeout(() => {
      const next = [...answers, idx];
      setAnswers(next);
      setSelected(null);
      if (step < QUIZ_QUESTIONS.length - 1) setStep(s => s + 1);
      else setStep(5);
    }, 320);
  }

  function restart() { setStep(0); setAnswers([]); setSelected(null); }

  if (step === 5) {
    const result = pickResult(answers);
    return (
      <div className="quiz-wrap">
        <h1 className="page-title">Your Coffee Profile</h1>
        <div className="sk-box result-box" style={{marginTop:16}}>
          <div className="result-title">{result.title}</div>
          <div className="result-tags">{result.tags.map(t => <span key={t} className="result-tag">{t}</span>)}</div>
          <p style={{fontSize:16,lineHeight:1.5,color:'#2c1a0e',marginBottom:16}}>{result.desc}</p>
          <div className="divider"></div>
          <div className="label">Coffees to try</div>
          <div className="rec-grid">
            {result.recs.map(r => <div key={r} className="sk-box dashed" style={{textAlign:'center',fontSize:15}}>{r}</div>)}
          </div>
        </div>
        <button className="btn" style={{marginTop:12}} onClick={restart}>← Retake quiz</button>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[step];
  return (
    <div className="quiz-wrap">
      <h1 className="page-title">Taste Quiz</h1>
      <p className="page-sub">5 quick questions to find your flavor profile.</p>
      <div className="progress-bar" style={{marginBottom:24}}>
        <div className="progress-fill" style={{width:`${(step/QUIZ_QUESTIONS.length)*100}%`}}></div>
      </div>
      <div className="label">Question {step+1} of {QUIZ_QUESTIONS.length}</div>
      <div className="quiz-question">{q.q}</div>
      <div className="quiz-options">
        {q.options.map((opt, i) =>
          <button key={i} className={`quiz-option${selected===i ? ' selected' : ''}`} onClick={() => choose(i)}>
            {opt}
          </button>
        )}
      </div>
    </div>
  );
}
