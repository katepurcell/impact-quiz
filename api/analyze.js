<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Impact Report Personality Quiz</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
.quiz-container{max-width:800px;margin:0 auto;background:white;border-radius:20px;padding:40px}

/* Typography - Edit these to match your site */
h1{color:#251668;font-size:32px;font-weight:700;margin-bottom:10px}
h2{color:#251668;font-size:28px;font-weight:700;margin:15px 0}
h3{color:#251668;font-size:22px;font-weight:700;margin-bottom:15px}
h4{color:#251668;font-size:18px;font-weight:600;margin-bottom:20px;line-height:1.5}
p{color:#333;font-size:16px;line-height:1.7;margin-bottom:15px}
.subtitle{color:#666;font-size:16px;margin-bottom:30px}
strong{color:#251668;font-weight:600}

.progress{height:8px;background:#e0e0e0;border-radius:10px;margin-bottom:30px;overflow:hidden}
.progress-bar{height:100%;background:#251668;transition:width 0.3s;border-radius:10px}
.question{margin-bottom:40px;opacity:0;animation:fadeIn 0.5s forwards}
@keyframes fadeIn{to{opacity:1}}
.slider-container{padding:25px 0}
.slider-labels{display:flex;justify-content:space-between;margin-bottom:18px;font-size:14px;color:#888;font-weight:500}
.slider-wrapper{position:relative;height:8px;background:linear-gradient(to right,#ffd6d6,#d4e8ff);border-radius:4px;margin-bottom:10px;box-shadow:inset 0 1px 3px rgba(0,0,0,0.1)}
.slider{-webkit-appearance:none;appearance:none;width:100%;height:8px;background:transparent;outline:none;position:relative;z-index:2;cursor:pointer;margin:0}
.slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:32px;height:32px;background:#251668;border-radius:50%;cursor:grab;box-shadow:0 4px 12px rgba(37,22,104,0.5),0 0 0 4px rgba(37,22,104,0.1);transition:all 0.2s ease;border:3px solid white}
.slider::-webkit-slider-thumb:hover{transform:scale(1.1);box-shadow:0 6px 16px rgba(37,22,104,0.6),0 0 0 6px rgba(37,22,104,0.15)}
.slider::-webkit-slider-thumb:active{cursor:grabbing;transform:scale(1.05)}
.slider::-moz-range-thumb{width:32px;height:32px;background:#251668;border:3px solid white;border-radius:50%;cursor:grab;box-shadow:0 4px 12px rgba(37,22,104,0.5),0 0 0 4px rgba(37,22,104,0.1);transition:all 0.2s ease}
.slider-fill{position:absolute;height:8px;background:#251668;border-radius:4px;top:0;left:0;pointer-events:none;transition:width 0.2s ease-out;box-shadow:0 2px 6px rgba(37,22,104,0.3)}
.submit-btn{width:100%;padding:18px;background:#251668;color:white;border:none;border-radius:12px;font-size:18px;font-weight:600;cursor:pointer;transition:transform 0.3s;margin-top:20px}
.submit-btn:hover{transform:scale(1.02)}
.results{display:none}
.results.active{display:block;animation:fadeIn 0.5s}
.results-header{text-align:center;margin-bottom:40px}
.personality-badge{display:inline-block;background:#251668;color:white;padding:8px 20px;border-radius:20px;font-size:14px;font-weight:600;margin-bottom:15px}
.main-content{display:grid;grid-template-columns:2fr 1fr;gap:30px;margin-bottom:30px}
@media(max-width:768px){.main-content{grid-template-columns:1fr}}
.strengths-box{background:#f8f9ff;padding:30px;border-radius:12px}
.info-list{list-style:none;padding:0}
.info-list li{padding:12px 0;border-bottom:1px solid #e0e0e0;font-size:15px;color:#555;line-height:1.6}
.info-list li:last-child{border-bottom:none}
.personality-scores{background:white;padding:25px;border-radius:12px}
.score-item{margin-bottom:18px}
.score-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.score-bar-bg{height:8px;background:#e0e0e0;border-radius:4px;overflow:hidden}
.score-bar-fill{height:100%;background:#251668;border-radius:4px;transition:width 1s ease-out}
.risk-section{background:#fff4e6;padding:30px;border-radius:12px;margin-bottom:30px}
.balance-tip{background:white;padding:15px;border-radius:8px;margin-top:15px}
.cta-section{text-align:center;margin-top:40px}
.personalized-btn{margin:10px;padding:15px 35px;background:#251668;color:white;border:none;border-radius:10px;font-size:18px;font-weight:600;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 12px rgba(37,22,104,0.3)}
.personalized-btn:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(37,22,104,0.4)}
.personalized-btn:disabled{opacity:0.6;cursor:not-allowed;transform:none}
.view-all-btn{margin:10px;padding:12px 30px;background:white;color:#251668;border:2px solid #251668;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.3s}
.view-all-btn:hover{background:#251668;color:white}
.restart-btn{margin:10px;padding:12px 30px;background:#251668;color:white;border:none;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;transition:transform 0.3s}
.restart-btn:hover{transform:scale(1.05)}
.loading{display:none;text-align:center;padding:30px;background:#f8f9ff;border-radius:12px;margin:20px 0}
.loading.active{display:block}
.spinner{border:4px solid #e0e0e0;border-top:4px solid #251668;border-radius:50%;width:50px;height:50px;animation:spin 1s linear infinite;margin:0 auto 15px}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.personalized-content{display:none;background:#f8f9ff;padding:30px;border-radius:12px;margin:20px 0}
.personalized-content.active{display:block;animation:fadeIn 0.5s}
.personalized-content h3{color:#251668;font-size:20px;margin-top:25px;margin-bottom:12px}
.personalized-content h4{color:#251668;font-size:17px;margin-top:18px;margin-bottom:10px}
.personalized-content p{font-size:15px;color:#444;line-height:1.7;margin-bottom:12px}
.personalized-content ul{margin-left:20px;margin-bottom:15px}
.personalized-content li{margin-bottom:8px;font-size:15px;color:#555;line-height:1.6}
.personalized-content strong{color:#251668;font-weight:600}
.error-message{background:#fff0f0;padding:20px;border-radius:8px;color:#c00}
.all-personalities{display:none;margin-top:40px}
.all-personalities.active{display:block;animation:fadeIn 0.5s}
.personalities-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:25px}
.personality-card{background:white;padding:25px;border-radius:12px;transition:all 0.3s}
.personality-card:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(0,0,0,0.1)}
.personality-card h4{font-size:20px;color:#251668;margin-bottom:12px}
.personality-card p{font-size:15px;color:#555;line-height:1.6}
</style>
</head>
<body>
<div class="quiz-container">
<div id="quiz">
<h1>Impact Report Personality Quiz</h1>
<p class="subtitle">Rate how much you agree with each statement about your report-writing approach</p>
<div class="progress"><div class="progress-bar" id="progressBar"></div></div>
<div id="questions"></div>
<button class="submit-btn" onclick="showResults()">See My Results</button>
</div>
<div class="results" id="results">
<div class="results-header">
<div class="personality-badge">Your Primary Personality</div>
<h2 id="personalityType"></h2>
<p id="personalitySubtitle"></p>
</div>
<div class="main-content">
<div class="strengths-box">
<h3>Your Strengths</h3>
<p id="strengthsContent"></p>
<ul class="info-list" id="benefitsList"></ul>
</div>
<div class="personality-scores">
<h4>Your Personality Mix</h4>
<div id="scoresContent"></div>
</div>
</div>
<div class="risk-section">
<h3>If You're Overweighted</h3>
<p id="riskContent"></p>
<div class="balance-tip" id="balanceTipAdd"></div>
<div class="balance-tip" id="balanceTipAvoid" style="margin-top:10px"></div>
</div>
<div class="cta-section">
<button class="personalized-btn" id="personalizedBtn" onclick="getPersonalizedRecommendations()">
✨ Get Personalized Recommendations
</button>
<br>
<button class="view-all-btn" onclick="toggleAllPersonalities()">View All Personalities</button>
<button class="restart-btn" onclick="restartQuiz()">Take Quiz Again</button>
</div>
<div class="loading" id="loading">
<div class="spinner"></div>
<p><strong>Analyzing your answers...</strong></p>
<p>Creating a personalized assessment + suggestions</p>
</div>
<div class="personalized-content" id="personalizedContent"></div>
<div class="all-personalities" id="allPersonalities">
<h2>All 6 Impact Report Personalities</h2>
<div class="personalities-grid">
<div class="personality-card"><h4>The Storyteller</h4><p>You create emotional connection and reach people's hearts. Your communications put real people front and center, showing transformation and authentic voices.</p></div>
<div class="personality-card"><h4>The Data Whisperer</h4><p>You build credibility through evidence. Your reports are packed with proof: charts, metrics, and visualizations that show exactly what you've achieved.</p></div>
<div class="personality-card"><h4>The Big Picture Thinker</h4><p>You illuminate the "why." Your reports connect your work to root causes, systemic barriers, and theories of change.</p></div>
<div class="personality-card"><h4>The Doer</h4><p>You're crystal clear about your work. Readers can easily describe what you do, which programs you run, and who you serve.</p></div>
<div class="personality-card"><h4>The Designer</h4><p>You make information irresistible. Your reports are visually stunning with excellent use of white space, pull quotes, and scannable layouts.</p></div>
<div class="personality-card"><h4>The Truth-Teller</h4><p>You build trust through honesty. Your reports acknowledge what didn't work, lessons learned, and areas for growth alongside your wins.</p></div>
</div>
</div>
</div>
</div>
<script>
// ====================================================
// CHANGE THIS TO YOUR VERCEL URL AFTER DEPLOYMENT
// Example: 'https://your-project-name.vercel.app/api/analyze'
// ====================================================
const VERCEL_URL = 'https://impact-quiz.vercel.app/api/analyze';

const statements=[
{text:"We feature quotes or stories from participants or partners",dimension:"story"},
{text:"We turn key numbers into charts or graphics",dimension:"evidence"},
{text:"We explain how our work connects to larger issues",dimension:"bigPicture"},
{text:"Our activities are easy to picture after reading",dimension:"action"},
{text:"Our reports have strong visual design with good use of white space and formatting",dimension:"presentation"},
{text:"We include lessons learned, not just wins",dimension:"credibility"},
{text:"Readers can see how things improved over time",dimension:"story"},
{text:"Metrics show up where they help explain the content",dimension:"evidence"},
{text:"We consider how to make the report skimmable",dimension:"presentation"},
{text:"We explain our theory of change and how our work leads to impact",dimension:"bigPicture"},
{text:"The report makes what we do crystal clear",dimension:"action"},
{text:"The report shows our progress and the gaps",dimension:"credibility"},
{text:"We use captions strategically to tell mini-stories, not just describe images",dimension:"story"},
{text:"Data points are interpreted, not just listed",dimension:"evidence"},
{text:"We frame the report around a theme",dimension:"bigPicture"}
];

const personalities={
storyteller:{name:"The Storyteller",subtitle:"You create emotional connection",strengths:"You create emotional connection and reach people's hearts. Your communications put real people front and center, showing transformation and authentic voices. Readers don't just understand your impact, they feel it.",audiences:"Individual donors, foundation program officers, community members, and anyone who needs to connect emotionally before they connect financially.",skimmers:"Photos, quotes, and captions that grab attention immediately. Even a quick scroll reveals compelling human moments that stick in memory.",deepReaders:"They get absorbed in stories of transformation. Your narratives show change unfolding over time, making impact tangible and memorable.",risk:"Without data to back up your stories, skeptical readers may wonder about scale and rigor. If you aren't talking about the larger problem, a story is just nice, rather than illustrative.",balanceAdd:"Add: Anchor your stories with a few compelling statistics (like 'Maria's story represents 1 of 500 families we served') and connect individual transformation to your larger theory of change.",balanceAvoid:"Avoid: Stories that exist in isolation - a moving story without context or data can feel anecdotal rather than evidence of real impact."},
dataWhisperer:{name:"The Data Whisperer",subtitle:"You build credibility through evidence",strengths:"You build credibility through evidence. Your reports are packed with proof: charts, metrics, and visualizations that show exactly what you've achieved. Stakeholders leave confident in your rigor and results.",audiences:"Institutional funders, government partners, corporate sponsors, and analytical thinkers who need to see the numbers before they commit.",skimmers:"Bold statistics and clean charts communicate impact instantly. A quick glance reveals your scale and success.",deepReaders:"They can dig into methodology, trends over time, and detailed outcomes. Your data tells a sophisticated story of change.",risk:"Data without humanity can feel dry, transactional, and hard to access.",balanceAdd:"Add: Pair your strongest statistics with a powerful story that shows what those numbers mean for real people. Use captions and pull quotes to add warmth alongside your charts.",balanceAvoid:"Avoid: Cramming every metric onto one page. One well-explained number is worth more than fifteen numbers with no context."},
bigPictureThinker:{name:"The Big Picture Thinker",subtitle:"You illuminate the 'why'",strengths:"You illuminate the 'why.' Your reports connect your work to root causes, systemic barriers, and theories of change. Readers understand not just what you do, but how your approach drives lasting transformation.",audiences:"Social justice advocates, policy-minded funders, academics, and movement partners who care about systems change.",skimmers:"Your framing and section headers reveal your vision immediately. Even scanning shows you're thinking beyond band-aids.",deepReaders:"They appreciate the intellectual depth. Your analysis of power, systems, and change gives them confidence in your strategic approach.",risk:"Too much theory without concrete examples can feel abstract.",balanceAdd:"Add: Ground your big ideas in specific programs and real stories that show your theory of change in action. Help readers see the bridge between analysis and impact.",balanceAvoid:"Avoid: Leading with systems analysis before you've shown readers what you actually do. Ground them in your work first, then zoom out."},
doer:{name:"The Doer",subtitle:"You're crystal clear about your work",strengths:"You're crystal clear about your work. Readers can easily describe what you do, which programs you run, and who you serve. Your reports answer 'what did you actually accomplish?' with satisfying specificity.",audiences:"New supporters, media, community partners, volunteers, and anyone trying to understand your organization quickly.",skimmers:"Program descriptions and activity highlights make your work immediately understandable. No confusion about what you do.",deepReaders:"They get the full picture of your portfolio: every program, service, and activity laid out clearly with outcomes attached.",risk:"Activity lists without context can feel like 'just doing stuff' rather than driving change.",balanceAdd:"Add: Connect your programs to the bigger problem you're solving. Frame the issue upfront so readers understand why your activities matter.",balanceAvoid:"Avoid: Leading with what you do before explaining why it matters. Activities without context read like a task list, not a mission."},
designer:{name:"The Designer",subtitle:"You make information irresistible",strengths:"You make information irresistible. Your reports are visually stunning with excellent use of white space, pull quotes, scannable layouts, and inviting design. Readers actually want to engage because it's such a pleasure to look at.",audiences:"Busy executives, younger donors, social media sharers, and anyone overwhelmed by dense reports.",skimmers:"Your visual hierarchy is a skimmers dream. Pull quotes, callouts, and design elements guide eyes to key points instantly.",deepReaders:"They enjoy the journey. Your thoughtful design makes even lengthy content feel approachable and engaging.",risk:"Beauty without substance can feel hollow and too slick.",balanceAdd:"Add: Make sure your gorgeous design showcases compelling content - hard data visualized beautifully, real stories with photos, and clear connections to the problems you're solving.",balanceAvoid:"Avoid: Letting design become a distraction from substance. If someone can't describe your impact after reading, the design has overshadowed the message."},
truthTeller:{name:"The Truth-Teller",subtitle:"You build trust through honesty",strengths:"You build trust through honesty. Your reports acknowledge what didn't work, lessons learned, and areas for growth alongside your wins. Readers respect your integrity and believe everything else you say.",audiences:"Long-term partners, sophisticated funders, peer organizations, and anyone who values authentic learning cultures.",skimmers:"Your honesty stands out immediately. Even scanning reveals refreshing candor that builds instant credibility.",deepReaders:"They appreciate the nuance. Your willingness to grapple with complexity and acknowledge uncertainty makes them trust your judgment.",risk:"Too much focus on challenges can overshadow your impact and leave readers worried.",balanceAdd:"Add: Lead with your wins before sharing challenges. Frame struggles as 'what we're working on' and pair them with what you've learned.",balanceAvoid:"Avoid: Front-loading challenges or setbacks. Readers need to feel confident in your work before they can appreciate your honesty about its limits."}
};

let responses={};
let currentScores={};

function renderQuestions(){
const container=document.getElementById('questions');
container.innerHTML=statements.map((stmt,i)=>`
<div class="question" style="animation-delay:${i*0.05}s">
<h4>${stmt.text}</h4>
<div class="slider-container">
<div class="slider-labels">
<span>Not doing this yet</span>
<span>Doing this somewhat</span>
<span>Top priority</span>
</div>
<div class="slider-wrapper">
<div class="slider-fill" id="fill-${i}"></div>
<input type="range" min="1" max="5" value="3" step="0.1" class="slider" id="slider-${i}"
oninput="updateSlider(${i})">
</div>
</div>
</div>
`).join('');
statements.forEach((_,i)=>{responses[i]=3;updateSlider(i);});
updateProgress();
}

function updateSlider(index){
const slider=document.getElementById(`slider-${index}`);
const fill=document.getElementById(`fill-${index}`);
const value=parseFloat(slider.value);
responses[index]=value;
fill.style.width=((value-1)/4*100)+'%';
updateProgress();
}

function updateProgress(){
const answered=Object.keys(responses).length;
document.getElementById('progressBar').style.width=(answered/statements.length*100)+'%';
}

function calculateScores(){
const scores={story:0,evidence:0,bigPicture:0,action:0,presentation:0,credibility:0};
statements.forEach((stmt,i)=>{scores[stmt.dimension]+=responses[i];});
return scores;
}

function showResults(){
document.getElementById('quiz').style.display='none';
document.getElementById('results').classList.add('active');
window.scrollTo({top:0,behavior:'smooth'});
const scores=calculateScores();
currentScores=scores;
const dimensionToPersonality={story:'storyteller',evidence:'dataWhisperer',bigPicture:'bigPictureThinker',action:'doer',presentation:'designer',credibility:'truthTeller'};
const sortedScores=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
const primaryDimension=sortedScores[0][0];
const personality=dimensionToPersonality[primaryDimension];
const result=personalities[personality];
document.getElementById('personalityType').textContent=result.name;
document.getElementById('personalitySubtitle').textContent=result.subtitle;
document.getElementById('strengthsContent').textContent=result.strengths;
document.getElementById('benefitsList').innerHTML=`
<li><strong>Audiences this works well for:</strong> ${result.audiences}</li>
<li><strong>What you give skimmers:</strong> ${result.skimmers}</li>
<li><strong>What you give deep readers:</strong> ${result.deepReaders}</li>`;
document.getElementById('riskContent').textContent=result.risk;
document.getElementById('balanceTipAdd').innerHTML=`<strong>${result.balanceAdd}</strong>`;
document.getElementById('balanceTipAvoid').innerHTML=`<strong>${result.balanceAvoid}</strong>`;
const totalScore=Object.values(scores).reduce((a,b)=>a+b,0);
const percentages=Object.entries(scores).map(([dim,score])=>({
name:personalities[dimensionToPersonality[dim]].name,
percent:Math.round((score/totalScore)*100)
})).sort((a,b)=>b.percent-a.percent);
document.getElementById('scoresContent').innerHTML=percentages.map(p=>`
<div class="score-item">
<div class="score-header"><span><strong>${p.name}</strong></span><span><strong>${p.percent}%</strong></span></div>
<div class="score-bar-bg"><div class="score-bar-fill" style="width:${p.percent}%"></div></div>
</div>`).join('');
}

async function getPersonalizedRecommendations(){
document.getElementById('personalizedBtn').disabled=true;
document.getElementById('loading').classList.add('active');
document.getElementById('loading').scrollIntoView({behavior:'smooth',block:'start'});
document.getElementById('loading').scrollIntoView({behavior:'smooth',block:'start'});
try{
const response=await fetch(VERCEL_URL,{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({scores:currentScores})
});
if(!response.ok){
const err=await response.text();
throw new Error(`Server error: ${err}`);
}
const data=await response.json();
if(data.analysis){
let html=data.analysis;
html=html.replace(/## Action Plan/g,'<h2>Action Plan</h2>');
html=html.replace(/## (.*)/g,'<h3>$1</h3>');
html=html.replace(/### (.*)/g,'<h4>$1</h4>');
html=html.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
html=html.replace(/^- (.*)$/gm,'<li>$1</li>');
html=html.replace(/(<li>[\s\S]*?<\/li>)/g,'<ul>$1</ul>');
html=html.replace(/\n\n/g,'</p><p>');
html='<p>'+html+'</p>';
html=html.replace(/<p>(<h[234]>)/g,'$1');
html=html.replace(/(<\/h[234]>)<\/p>/g,'$1');
html=html.replace(/<p>(<ul>)/g,'$1');
html=html.replace(/(<\/ul>)<\/p>/g,'$1');
document.getElementById('personalizedContent').innerHTML=html;
document.getElementById('personalizedContent').classList.add('active');
document.getElementById('personalizedBtn').style.display='none';
}else{
throw new Error('No analysis in response');
}
}catch(error){
console.error('Error:',error);
document.getElementById('personalizedContent').innerHTML=`<div class="error-message"><p><strong>Something went wrong.</strong> Please try again in a moment.</p><p><small>${error.message}</small></p></div>`;
document.getElementById('personalizedContent').classList.add('active');
document.getElementById('personalizedBtn').disabled=false;
}finally{
document.getElementById('loading').classList.remove('active');
}
}

function restartQuiz(){
responses={};
document.getElementById('quiz').style.display='block';
document.getElementById('results').classList.remove('active');
document.getElementById('allPersonalities').classList.remove('active');
document.getElementById('personalizedContent').classList.remove('active');
document.getElementById('personalizedBtn').style.display='inline-block';
document.getElementById('personalizedBtn').disabled=false;
renderQuestions();
}

function toggleAllPersonalities(){
const section=document.getElementById('allPersonalities');
const btn=event.target;
if(section.classList.contains('active')){
section.classList.remove('active');
btn.textContent='View All Personalities';
}else{
section.classList.add('active');
btn.textContent='Hide All Personalities';
section.scrollIntoView({behavior:'smooth',block:'nearest'});
}
}

renderQuestions();
</script>
</body>
</html>
