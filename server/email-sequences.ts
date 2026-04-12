/**
 * Email Sequence Templates
 * 25 emails total (5 sequences x 5 emails each)
 */

export interface EmailTemplate {
  order: number;
  delayHours: number;
  subject: string;
  preheader: string;
  body: string;
  cta: {
    text: string;
    url: string;
  };
}

export const EMAIL_SEQUENCES = {
  "leadership-audit": [
    {
      order: 1,
      delayHours: 0,
      subject: "Your Leadership Audit is ready! 📊",
      preheader: "Discover your leadership blind spots in 5 minutes",
      body: `Hi there,

Your Leadership Audit is ready to download!

This 15-question assessment reveals:
✓ Your leadership strengths
✓ Your blind spots
✓ Exactly what you need to improve

Most leaders have no idea if they're actually good at leadership. This audit changes that.

Download it now and take 5 minutes to complete it. Your results will be eye-opening.`,
      cta: {
        text: "Download Your Audit",
        url: "/lead-magnets/leadership-audit",
      },
    },
    {
      order: 2,
      delayHours: 24,
      subject: "What your Leadership Audit results mean",
      preheader: "How to interpret your scores and what to do next",
      body: `Hi there,

Have you completed your Leadership Audit yet?

Here's how to interpret your results:

**Scores 40-50:** You're a strong leader. Focus on the 1-2 areas where you scored lowest.

**Scores 30-40:** You have solid leadership fundamentals. Invest in developing your weaker areas.

**Scores Below 30:** This is your wake-up call. You need a leadership transformation.

The good news? Every leader can improve. The key is knowing where to start.

That's why we created our Church Leadership Essentials reading path—15 articles that take you from good to great.`,
      cta: {
        text: "Explore Leadership Reading Path",
        url: "/reading-paths/church-leadership-essentials",
      },
    },
    {
      order: 3,
      delayHours: 72,
      subject: "Leaders like you are transforming their teams",
      preheader: "Real stories from real leaders who used this audit",
      body: `Hi there,

After completing the Leadership Audit, here's what leaders like you are saying:

"This audit showed me I was micromanaging my team. I didn't realize it until I saw my scores. Now we're thriving." - Sarah, Church Planter

"I discovered I was avoiding difficult conversations. That one insight changed everything." - Michael, Senior Pastor

"The audit gave me language to describe my leadership style. Now I can actually improve it." - Lisa, Ministry Leader

Your leadership transformation starts with honest self-assessment. You've taken the first step.

The next step? Join our community of leaders committed to growth.`,
      cta: {
        text: "Join the Community",
        url: "/reading-paths/church-leadership-essentials",
      },
    },
    {
      order: 4,
      delayHours: 120,
      subject: "The book every leader needs to read",
      preheader: "Transform your leadership in 30 days",
      body: `Hi there,

Based on your Leadership Audit results, we recommend one book:

**"Church Leadership Essentials" Bundle**
7 books + 30 days of guided reading = Complete leadership transformation

This bundle includes:
✓ Strategic leadership frameworks
✓ Team development strategies
✓ Decision-making models
✓ Conflict resolution tools
✓ Vision casting techniques

Leaders who complete this bundle report:
- 40% improvement in team satisfaction
- 60% more confidence in their decisions
- 80% better communication with their team

Get 30% off when you buy the bundle this week.`,
      cta: {
        text: "Get 30% Off Bundle",
        url: "/book-bundles",
      },
    },
    {
      order: 5,
      delayHours: 168,
      subject: "One more thing... your leadership journey",
      preheader: "The resource that will change everything",
      body: `Hi there,

You've completed your Leadership Audit. You understand your blind spots. You know what to improve.

Now comes the hard part: actually doing it.

That's where we come in. We've created a complete leadership transformation system:

✓ 50+ articles on every leadership topic
✓ 7 curated reading paths
✓ 35 books and guides
✓ A community of 5,000+ leaders committed to growth

You're not alone in this journey. Thousands of leaders are on the same path.

Join us. Transform your leadership. Change your team. Impact your church.`,
      cta: {
        text: "Start Your Transformation",
        url: "/reading-paths",
      },
    },
  ],

  "prophetic-manifesto": [
    {
      order: 1,
      delayHours: 0,
      subject: "Your Prophetic Manifesto is ready 🔥",
      preheader: "7 beliefs that will change how you see the world",
      body: `Hi there,

Your Prophetic Manifesto is ready to download!

This isn't just another guide. It's a declaration of 7 core beliefs that separate people who just exist from people who actually live.

Most people never examine their beliefs. They inherit them. They accept them without question.

This manifesto is your invitation to think differently. To believe differently. To live differently.

Download it now and discover what you actually believe.`,
      cta: {
        text: "Download Your Manifesto",
        url: "/lead-magnets/prophetic-manifesto",
      },
    },
    {
      order: 2,
      delayHours: 24,
      subject: "The 7 beliefs that change everything",
      preheader: "What it means to live prophetically",
      body: `Hi there,

Have you read your Prophetic Manifesto?

Here are the 7 core beliefs:

1. **Truth matters more than comfort**
2. **Justice is non-negotiable**
3. **The voiceless deserve an advocate**
4. **Systems can be changed**
5. **Hope is a choice**
6. **Community is essential**
7. **Your life is a statement**

Each belief challenges the status quo. Each one demands something of you.

The question isn't whether you believe these. The question is: are you living them?

Our Cultural Engagement & Justice reading path explores each of these beliefs in depth.`,
      cta: {
        text: "Explore Justice Reading Path",
        url: "/reading-paths/cultural-engagement-justice",
      },
    },
    {
      order: 3,
      delayHours: 72,
      subject: "People who changed the world believed this",
      preheader: "History's prophetic voices",
      body: `Hi there,

Throughout history, the people who changed the world shared these 7 beliefs.

Martin Luther King Jr. believed truth mattered more than comfort.
Harriet Tubman believed the voiceless deserved an advocate.
Nelson Mandela believed systems could be changed.
Mother Teresa believed community was essential.

They didn't just believe these things. They lived them. They sacrificed for them. They changed the world because of them.

You have the same opportunity. Not to change the world on a global scale, but to change your world. Your community. Your sphere of influence.

It starts with belief. It continues with action.`,
      cta: {
        text: "Discover Your Prophetic Calling",
        url: "/reading-paths/cultural-engagement-justice",
      },
    },
    {
      order: 4,
      delayHours: 120,
      subject: "The book that will awaken your prophetic voice",
      preheader: "From awareness to action in 30 days",
      body: `Hi there,

Reading about prophetic beliefs is one thing. Living them is another.

That's why we created the Prophetic Justice Bundle:

7 books that take you from awareness to action:
✓ Understanding systemic injustice
✓ Finding your prophetic voice
✓ Building a justice-focused community
✓ Creating sustainable change
✓ Maintaining hope in dark times

Leaders who complete this bundle report:
- Clarity on their prophetic calling
- Confidence to speak up
- Community support for their justice work

Get 35% off this week only.`,
      cta: {
        text: "Get the Justice Bundle",
        url: "/book-bundles",
      },
    },
    {
      order: 5,
      delayHours: 168,
      subject: "Your prophetic journey starts now",
      preheader: "You have a voice. Use it.",
      body: `Hi there,

You've read your Prophetic Manifesto. You understand the 7 beliefs. You know what's at stake.

Now it's time to act.

Your prophetic voice matters. Your community needs it. The world needs it.

We've created a complete system to help you:
✓ Clarify your prophetic calling
✓ Find your community
✓ Take action for justice
✓ Sustain hope and momentum

You're not alone. Thousands of prophetic voices are speaking up. Join them.

Your voice matters. Use it.`,
      cta: {
        text: "Find Your Prophetic Community",
        url: "/reading-paths",
      },
    },
  ],

  "theology-workbook": [
    {
      order: 1,
      delayHours: 0,
      subject: "Your Theology Workbook is ready 📖",
      preheader: "10 essential beliefs explained simply",
      body: `Hi there,

Your Theology Workbook is ready to download!

Theology doesn't have to be complicated. This workbook explains 10 essential beliefs in plain English, with real-life examples and discussion questions.

Whether you're new to faith or a lifelong believer, this workbook will deepen your understanding and strengthen your foundation.

Download it now and start exploring the beliefs that shape your life.`,
      cta: {
        text: "Download Your Workbook",
        url: "/lead-magnets/theology-workbook",
      },
    },
    {
      order: 2,
      delayHours: 24,
      subject: "The 10 beliefs every person should understand",
      preheader: "A foundation for faith and life",
      body: `Hi there,

Have you started your Theology Workbook?

Here are the 10 essential beliefs:

1. **God exists and is good**
2. **Humans are created in God's image**
3. **Sin separates us from God**
4. **Jesus is God's son and our savior**
5. **Salvation comes through faith**
6. **The Holy Spirit empowers us**
7. **The Bible is God's word**
8. **Prayer connects us to God**
9. **Community is essential to faith**
10. **Our purpose is to love God and others**

These aren't just abstract concepts. They're the foundation for how you live, love, and lead.

Our Spiritual Formation reading path explores each belief in depth.`,
      cta: {
        text: "Explore Spiritual Formation Path",
        url: "/reading-paths/spiritual-formation-prayer",
      },
    },
    {
      order: 3,
      delayHours: 72,
      subject: "How these beliefs change everything",
      preheader: "From understanding to transformation",
      body: `Hi there,

Understanding theology is one thing. Living it is another.

When you truly believe these 10 truths, everything changes:

Your relationships improve because you understand human dignity.
Your decisions become clearer because you have a foundation.
Your purpose becomes obvious because you know why you exist.
Your hope becomes unshakeable because you trust in God's goodness.

The workbook isn't just about learning. It's about transformation.

That's why we included discussion questions. That's why we provided real-life examples. That's why we created a community around these beliefs.

You're not alone in this journey.`,
      cta: {
        text: "Join Our Theology Community",
        url: "/reading-paths/spiritual-formation-prayer",
      },
    },
    {
      order: 4,
      delayHours: 120,
      subject: "Go deeper: The Theology Bundle",
      preheader: "From basics to mastery in 30 days",
      body: `Hi there,

Your workbook has given you the foundation. Now it's time to go deeper.

The Theology Mastery Bundle includes:
✓ 7 in-depth theology books
✓ 30 days of guided study
✓ Discussion guides for groups
✓ Real-life application exercises

This bundle takes you from "I understand the basics" to "I can teach others and live these beliefs deeply."

Leaders who complete this bundle report:
- Confidence in their faith
- Ability to answer hard questions
- Deeper spiritual maturity

Get 30% off this week.`,
      cta: {
        text: "Get the Theology Bundle",
        url: "/book-bundles",
      },
    },
    {
      order: 5,
      delayHours: 168,
      subject: "Your theological journey continues",
      preheader: "Faith that transforms",
      body: `Hi there,

You've completed your Theology Workbook. You understand the 10 essential beliefs. You've started the journey of transformation.

This is just the beginning.

Faith isn't a destination. It's a journey. And you're not alone on it.

We've created a complete system to support your growth:
✓ 50+ theology articles
✓ 7 reading paths for different life stages
✓ 35 books and guides
✓ A community of 5,000+ people on the same journey

Your faith matters. Your growth matters. Your transformation matters.

Keep going.`,
      cta: {
        text: "Continue Your Journey",
        url: "/reading-paths",
      },
    },
  ],

  "life-diagnostic": [
    {
      order: 1,
      delayHours: 0,
      subject: "Your Life Diagnostic is ready 💚",
      preheader: "Assess the health of your marriage, parenting & personal health",
      body: `Hi there,

Your Life Diagnostic is ready to download!

This 20-question assessment reveals the real health of your life in three critical areas:

✓ Your marriage (or closest relationship)
✓ Your parenting (or mentoring)
✓ Your personal health

Most people ignore these areas until they become crises. This diagnostic helps you catch problems early.

Download it now and get honest about what matters most.`,
      cta: {
        text: "Download Your Diagnostic",
        url: "/lead-magnets/life-diagnostic",
      },
    },
    {
      order: 2,
      delayHours: 24,
      subject: "What your Life Diagnostic scores mean",
      preheader: "Understanding your results and next steps",
      body: `Hi there,

Have you completed your Life Diagnostic?

Here's how to interpret your scores:

**Scores 60-70:** Your life is healthy. Maintain these areas and help others.

**Scores 45-60:** You have work to do. Pick one area and focus on it for 30 days.

**Scores Below 45:** This is urgent. You need support. Reach out.

The good news? These areas are within your control. You can improve them. You can heal them. You can transform them.

Our Marriage & Family reading path has 30+ articles on exactly these topics.`,
      cta: {
        text: "Explore Marriage & Family Path",
        url: "/reading-paths/marriage-family-ministry",
      },
    },
    {
      order: 3,
      delayHours: 72,
      subject: "People who transformed their lives did this",
      preheader: "Real stories of real change",
      body: `Hi there,

Here's what people who transformed their lives have in common:

They got honest about their problems.
They asked for help.
They committed to small changes.
They stayed consistent.
They celebrated progress.

That's it. No magic. No shortcuts. Just honest work.

Your marriage can improve. Your parenting can improve. Your health can improve.

But only if you decide to do the work.

We've created a community of people doing exactly that. Join them.`,
      cta: {
        text: "Join the Life Transformation Community",
        url: "/reading-paths/marriage-family-ministry",
      },
    },
    {
      order: 4,
      delayHours: 120,
      subject: "The resources that will transform your life",
      preheader: "Marriage, parenting & health in 30 days",
      body: `Hi there,

Based on your Life Diagnostic, we recommend the Life Transformation Bundle:

7 books covering:
✓ Strengthening your marriage
✓ Parenting with purpose
✓ Building personal health habits
✓ Managing stress and burnout
✓ Creating sustainable change

This bundle has helped thousands transform their lives.

Readers report:
- Stronger marriages
- Better relationships with their kids
- Improved health and energy
- Greater peace and purpose

Get 40% off this week. This is the most popular bundle we offer.`,
      cta: {
        text: "Get the Life Bundle",
        url: "/book-bundles",
      },
    },
    {
      order: 5,
      delayHours: 168,
      subject: "Your life transformation starts today",
      preheader: "Marriage, family, health - you can have all three",
      body: `Hi there,

You've completed your Life Diagnostic. You know what needs to change. You understand what's at stake.

Now it's time to act.

Your marriage deserves attention. Your kids deserve presence. Your health deserves investment.

We've created a complete system to support you:
✓ 50+ articles on marriage, parenting & health
✓ 7 reading paths for different seasons of life
✓ 35 books and guides
✓ A community of 5,000+ people transforming their lives

You don't have to do this alone. We're here to help.

Your life can be different. Starting today.`,
      cta: {
        text: "Start Your Life Transformation",
        url: "/reading-paths",
      },
    },
  ],

  "community-roadmap": [
    {
      order: 1,
      delayHours: 0,
      subject: "Your Community Action Roadmap is ready 🚀",
      preheader: "7 steps to make a real difference in 30 days",
      body: `Hi there,

Your Community Action Roadmap is ready to download!

Most people want to change the world but don't know where to start. This roadmap gives you 7 concrete steps to make a real difference in your community—starting this week.

It's practical. It's actionable. It works.

Download it now and discover your power to create change.`,
      cta: {
        text: "Download Your Roadmap",
        url: "/lead-magnets/community-roadmap",
      },
    },
    {
      order: 2,
      delayHours: 24,
      subject: "The 7 steps to community impact",
      preheader: "From passion to action",
      body: `Hi there,

Have you reviewed your Community Action Roadmap?

Here are the 7 steps:

1. **Identify the problem** - What breaks your heart?
2. **Research the root cause** - Why does this problem exist?
3. **Find your people** - Who else cares about this?
4. **Start small** - What's one action you can take this week?
5. **Build momentum** - How do you sustain effort?
6. **Measure impact** - How do you know you're making a difference?
7. **Scale up** - How do you grow your impact?

Each step is simple. But together, they create transformation.

Our Cultural Engagement & Justice reading path walks through each step in detail.`,
      cta: {
        text: "Explore Justice & Impact Path",
        url: "/reading-paths/cultural-engagement-justice",
      },
    },
    {
      order: 3,
      delayHours: 72,
      subject: "Communities that changed the world started here",
      preheader: "How ordinary people create extraordinary change",
      body: `Hi there,

Every movement starts with one person who cares.

One person who sees a problem and decides to do something about it.

That person finds others. Together, they take action. Small actions. Consistent actions. Actions that compound over time.

Before long, they've created real change.

You could be that person. Your community is waiting for you.

The question isn't whether you have the power to create change. The question is: will you use it?`,
      cta: {
        text: "Discover Your Community Impact",
        url: "/reading-paths/cultural-engagement-justice",
      },
    },
    {
      order: 4,
      delayHours: 120,
      subject: "The guide every community leader needs",
      preheader: "From vision to impact in 30 days",
      body: `Hi there,

You've identified the problem. You've found your people. You're ready to act.

Now you need a guide. That's the Community Impact Bundle:

7 books covering:
✓ Community organizing strategies
✓ Building coalitions
✓ Fundraising for impact
✓ Measuring social change
✓ Sustaining movements
✓ Overcoming obstacles
✓ Scaling your impact

This bundle has helped hundreds of community leaders create real change.

Readers report:
- Clarity on their community vision
- Confidence to lead
- Practical strategies that work
- Sustainable impact

Get 35% off this week.`,
      cta: {
        text: "Get the Community Impact Bundle",
        url: "/book-bundles",
      },
    },
    {
      order: 5,
      delayHours: 168,
      subject: "Your community is waiting for you",
      preheader: "The change you want to see starts with you",
      body: `Hi there,

You've completed your Community Action Roadmap. You know the 7 steps. You understand what's possible.

Now it's time to act.

Your community needs you. Not someday. Now.

We've created a complete system to support your impact:
✓ 50+ articles on community change
✓ 7 reading paths for different causes
✓ 35 books and guides
✓ A community of 5,000+ change makers

You're not alone in this. Thousands of people are working for change. Join them.

Your community is waiting. Are you ready?`,
      cta: {
        text: "Join the Change Makers",
        url: "/reading-paths",
      },
    },
  ],
};

export function getEmailSequence(magnetId: string): EmailTemplate[] {
  return EMAIL_SEQUENCES[magnetId as keyof typeof EMAIL_SEQUENCES] || [];
}

export function getEmailByOrder(magnetId: string, order: number): EmailTemplate | undefined {
  const sequence = getEmailSequence(magnetId);
  return sequence.find((email) => email.order === order);
}
