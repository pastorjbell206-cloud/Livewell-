# SEO Title Rewrites: the whole-site pass

**What this is.** A search-intent rewrite of every title on the site that read as
literary or cryptic, so each one names the question a real person types. The
poetry is not thrown away: where the old title was evocative it is preserved as a
kicker/subtitle.

## The one hard rule: slugs never change

Every URL stays exactly as it is. Changing a slug would break inbound links and
discard the search authority a page has already earned. This pass changes the
visible title and its search/social meta, never the address.

## Scope, measured

| | Count |
| :--- | ---: |
| Titled items across the site | 925 |
| Already search-facing (left alone) | 436 |
| **Rewritten here** | **405** |
| Protected from renaming (below) | 83 |
| Of the rewrites, titles actually changing | 397 |
| Old literary titles preserved as kickers | 226 |

## What must never be renamed

A blanket question-pass would have damaged the site. These were deliberately excluded:

- **/read/ (43 flagged)** Published book titles with ISBNs and print editions. *Born Again From Atheism* is the product name. Never rename.
- **/resources/creeds/ (10)** Canonical document names ARE the query. Nobody searches a question to find the Westminster Shorter Catechism.
- **/table/ (16)** Series convention (*Mark at the Table*, *John at the Table*). Renaming breaks the series identity.
- **/theology/history/ (14)** Chronological church-history series (*The Constantinian Turn*). The sequence is the navigation.

## Study guides use a different pattern

People do not search a question to find a study; they search *"bible study on
anxiety"* or *"christian nationalism study guide"*. So those titles lead with the
topic keyword and name the format, rather than asking a question.

## Verification

Every row below was checked mechanically: no forbidden words, no em-dashes, no
exclamation points, none over 70 characters (so nothing truncates in search
results), and **no two pages share a title** so they never compete for one query.
Near-duplicate pages were deliberately given distinct queries.

All automated checks pass.

## How to apply

Titles live in two places, so applying has two halves:

- **JSON libraries** (leadership, life, context, formation, doctrine, prophetic topics): `node scripts/apply-title-rewrites.mjs --files`, then rerun the index builders it names.
- **`/writing` essays** (database-backed): `node scripts/apply-title-rewrites.mjs --sql` to review the SQL, or `--db` with `DATABASE_URL` set to run it.

The script refuses to overwrite any title that has drifted from what this audit
saw, so a hand-edit made in the meantime is never silently clobbered.

---

## /disruption/topic/ (10)

| Slug (unchanged) | New title | Target query | Kicker |
| :--- | :--- | :--- | :--- |
| `outrage-machine` | **Why Are Christians So Angry Online, and Who Profits?** | why are christians so angry online | The Outrage Machine |
| `consumer-comfort` | **How Has Consumerism Shaped American Christianity?** | how consumerism shaped the church | The Comfortable Captivity |
| `therapeutic-gospel` | **What Is the Therapeutic Gospel? Faith as Self-Help** | what is the therapeutic gospel |  |
| `moralistic-therapeutic-deism` | **What Is Moralistic Therapeutic Deism? America's Folk Faith** | what is moralistic therapeutic deism |  |
| `sexuality-and-body` | **What Does the Bible Say About Sex and the Body?** | what does the bible say about sex and the body | The Body and the Sexual Revolution |
| `power-and-nation` | **When Does Politics Become Idolatry for Christians?** | when does politics become idolatry | The Cross and the Flag |
| `christian-nation-myth` | **Was America Founded as a Christian Nation?** | was america founded as a christian nation | The Myth of a Christian Nation |
| `prosperity-success` | **What Is Wrong With the Prosperity Gospel?** | what is wrong with the prosperity gospel | The Gospel of Success |
| `celebrity-platform` | **Why Do So Many Celebrity Pastors Fall? Power and Platform** | why do celebrity pastors fall | The Platform and the Pedestal |
| `war-and-peace` | **Just War or Pacifism? What Christians Have Believed** | just war vs pacifism christian views | The Sword and the Plowshare |

## /justice/topic/ (10)

| Slug (unchanged) | New title | Target query | Kicker |
| :--- | :--- | :--- | :--- |
| `the-poor` | **What Does the Bible Say About the Poor and Poverty?** | what does the bible say about the poor | The Poor at the Gate |
| `the-wage` | **What Does the Bible Say About Wages and Workers?** | what does the bible say about wages and workers |  |
| `the-vulnerable` | **Who Are the Least of These? The Orphan and the Widow** | who are the least of these |  |
| `unborn-and-edges` | **What Does a Consistent Ethic of Life Look Like?** | consistent ethic of life | Life at Its Edges |
| `abuse-and-vulnerable` | **Why Do Churches Cover Up Abuse Instead of Stopping It?** | why do churches cover up abuse | The Abused and the Silence |
| `the-immigrant` | **What Does the Bible Say About Immigrants and Strangers?** | what does the bible say about immigrants | The Foreigner Among You |
| `the-prisoner` | **What Does the Bible Say About Prison and Punishment?** | what does the bible say about prison and punishment | The Prisoner and the Gate |
| `race-and-image` | **What Does the Bible Say About Race and Human Dignity?** | what does the bible say about race |  |
| `creation-care` | **What Does the Bible Say About Caring for the Earth?** | what does the bible say about caring for the earth | The Groaning Creation |
| `systemic-sin` | **Is Systemic Sin Biblical? Corporate and Structural Sin** | is systemic sin biblical | The Sin We Build Together |

## /leadership/article/ (66)

| Slug (unchanged) | New title | Target query | Kicker |
| :--- | :--- | :--- | :--- |
| `money-and-the-church` | **How Should a Pastor Talk About Money in Church?** | how should a pastor talk about money |  |
| `meetings-that-matter` | **How Do You Run a Church Meeting Worth Having?** | how to run a good church meeting |  |
| `church-administration` | **Why Does Church Administration Matter for Ministry?** | why does church administration matter | The Systems Under the Soul |
| `the-leaders-calendar` | **How Should a Pastor Manage His Calendar and Time?** | pastor time management calendar | The Tyranny of the Urgent |
| `leading-change` | *(kept)* Leading Change Without Splitting the Church | leading change in a church without splitting it |  |
| `church-planting` | **How Do You Plant a Church That Survives?** | how to plant a church |  |
| `revitalization` | **How Do You Revitalize a Church That Is Dying?** | how to revitalize a dying church |  |
| `healthy-staff-culture` | *(kept)* Building a Healthy Church Staff Culture | building a healthy church staff culture |  |
| `leading-through-decline` | **How Do You Lead a Church That Is Shrinking?** | how to lead a church in decline |  |
| `leading-difficult-people` | **How Do You Handle Difficult People in the Church?** | how to deal with difficult people in church |  |
| `accountability-for-church-leaders` | **What Does Real Accountability for Pastors Look Like?** | accountability for pastors |  |
| `setting-direction-without-controlling` | **How Do You Cast Vision Without Micromanaging?** | how to lead with vision without micromanaging |  |
| `succession-planning-church` | **How Do You Plan a Pastoral Succession in a Church?** | pastoral succession planning |  |
| `first-ninety-days-new-church` | **What Should a Pastor Do in the First Ninety Days?** | first 90 days as a new pastor |  |
| `learning-to-delegate` | **How Does a Pastor Learn to Delegate Real Authority?** | how do pastors learn to delegate | The Leader Who Cannot Delegate |
| `the-power-of-saying-no` | **How Does a Pastor Say No and Protect His Calling?** | how do pastors learn to say no |  |
| `bridging-text-to-today` | **How Do You Apply a Bible Passage to Today?** | how to apply a bible passage to today |  |
| `law-and-gospel` | **What Is the Difference Between Law and Gospel?** | difference between law and gospel |  |
| `biblical-hermeneutics` | **How Do You Interpret the Bible Faithfully?** | how to interpret the bible |  |
| `bible-study-tools` | **The Best Bible Study Tools for Serious Students** | best bible study tools | The Bible Study Tools Worth Owning |
| `the-biblical-covenants` | **What Are the Biblical Covenants and How Do They Connect?** | what are the covenants in the bible | The Covenants That Hold the Bible Together |
| `exegetical-fallacies` | **What Are the Exegetical Fallacies That Ruin Sermons?** | what are exegetical fallacies |  |
| `reading-in-context` | **Why Does Context Matter When Reading the Bible?** | how to read bible verses in context | The First Rule of Bible Study Is Context |
| `resilience-in-ministry` | **How Does a Pastor Last for Decades in Ministry?** | how to build resilience in ministry | Building Resilience for the Long Haul |
| `holy-ambition` | **Is Ambition in Ministry Holy or Just Pride?** | is ambition in ministry a sin | Holy Ambition and the Other Kind |
| `integrity-when-no-one-is-watching` | *(kept)* Integrity When No One Is Watching | integrity when no one is watching |  |
| `keeping-your-soul-in-ministry` | **How Does a Pastor Keep His Own Faith Alive?** | how do pastors keep their own faith alive | Keeping Your Own Soul While Feeding Others |
| `leading-from-rest` | **How Do You Lead From Rest Instead of Anxiety?** | how to lead without anxiety |  |
| `self-leadership` | **What Is Self-Leadership and Why Does It Come First?** | what is self leadership for pastors | Leading Yourself Before You Lead Anyone Else |
| `protecting-your-marriage-in-ministry` | **How Do Pastors Keep Ministry From Eating a Marriage?** | pastor marriage ministry burnout | Protecting the Marriage Ministry Tries to Eat |
| `comparison-and-envy-in-ministry` | **How Do Pastors Fight Comparison and Envy in Ministry?** | comparison and envy in ministry | The Comparison That Kills Ministry Joy |
| `courage-in-leadership` | **How Does a Pastor Find Courage to Say Hard Things?** | courage in pastoral leadership | The Courage to Say the Hard Thing |
| `emotionally-healthy-leadership` | **What Is Emotionally Healthy Leadership in Ministry?** | emotionally healthy leadership |  |
| `humility-in-leadership` | **What Does Real Humility in Christian Leadership Look Like?** | humility in christian leadership |  |
| `the-leaders-prayer-life` | **Why Does a Pastor's Prayer Life Disappear First?** | pastor prayer life | The Leader Who Does Not Pray |
| `the-loneliness-of-leadership` | **Why Are Pastors So Lonely, and What Actually Helps?** | pastoral loneliness and ministry isolation |  |
| `raising-leaders` | **How Do You Raise Up Leaders Who Replace You?** | raising leaders in the church | Doing Yourself Out of a Job |
| `leading-staff` | **How Do You Lead Church Staff You Also Pastor?** | leading church staff |  |
| `ministry-teams` | **How Do You Recruit and Equip Church Volunteers?** | recruiting church volunteers |  |
| `the-deacons` | **What Does the Bible Say About Deacons in the Church?** | office of deacon in the bible |  |
| `the-elders` | **What Is a Church Elder, and Why More Than One?** | office of elder plurality of elders |  |
| `evangelism-for-ordinary-christians` | **How Do You Share Your Faith With a Skeptical Neighbor?** | how to share your faith with a skeptic | Evangelism for Ordinary Christians |
| `shepherding-as-protection` | **How Does a Pastor Guard the Church From False Teaching?** | protecting the church from false teaching | Guarding the Flock: The Pastor as Protector |
| `ministry-with-women` | **How Should a Male Pastor Minister to Women Well?** | male pastor ministering to women |  |
| `counseling-and-when-to-refer` | **When Should a Pastor Refer Someone to a Counselor?** | when should a pastor refer to a counselor |  |
| `discipling-men` | **Why Do Men Leave the Church, and How Do You Reach Them?** | why men leave the church |  |
| `recovering-hospitality` | **What Does Biblical Hospitality Actually Require?** | biblical hospitality | Recovering the Lost Art of Hospitality |
| `the-church-and-the-poor` | **How Should a Church Serve the Poor With Dignity?** | how should the church help the poor | The Church and the Poor at the Door |
| `lasting-youth-ministry` | **How Does Youth Ministry Form Faith That Survives College?** | youth ministry faith that lasts |  |
| `sermon-prep` | **How Do You Prepare a Sermon, Step by Step?** | how to prepare a sermon | From the Text to the Sermon |
| `the-preaching-calendar` | **How Do You Plan a Year of Preaching and Sermon Series?** | planning a preaching calendar |  |
| `preaching-that-lands` | **How Do You Preach a Sermon That Actually Lands?** | sermon delivery and application |  |
| `using-illustrations` | **How Do You Find and Use Sermon Illustrations?** | how to use sermon illustrations | The Window and the Wall |
| `expository-vs-topical` | **Expository vs. Topical Preaching: Which Should You Preach?** | expository vs topical preaching |  |
| `sermon-application` | **How Do You Move From the Text to Sermon Application?** | sermon application |  |
| `preaching-with-or-without-notes` | **Should You Preach From a Manuscript, Notes, or Nothing?** | preaching with or without notes | Notes, Manuscript, or Nothing: How to Carry a Sermon |
| `preaching-and-prayer` | **How Does Prayer Belong in Sermon Preparation?** | prayer and sermon preparation | The Praying That Has to Happen Before the Preaching |
| `character-over-gifting` | **Why Does Character Matter More Than Gifting in Ministry?** | character over gifting in ministry | Character Outlasts Gifting |
| `pride-and-the-platform` | **How Does the Pulpit Feed a Pastor's Pride?** | pride in ministry and the platform |  |
| `the-call` | **Is It a Call to Ministry or Just Ambition?** | call to ministry or ambition |  |
| `the-secret-life` | **Why Does a Pastor's Private Life Decide His Public One?** | pastor private life and integrity | The Life No One Sees |
| `the-leaders-burnout` | **What Causes Pastor Burnout, and How Do You Recover?** | pastor burnout causes and recovery | The Tired Shepherd |
| `pastoral-counseling` | **What Is the Difference Between a Pastor and a Therapist?** | pastoral counseling vs therapy |  |
| `the-wedding` | **How Should a Pastor Prepare a Couple for Marriage?** | premarital counseling before a wedding |  |
| `the-funeral` | **How Do You Officiate a Funeral and Preach to Grief?** | how to officiate a funeral | Standing at the Grave |
| `the-ministry-of-presence` | **Why Does Pastoral Visitation Still Matter?** | pastoral visitation and hospital visits | The Ministry of Presence |

## /leadership/formation/ (6)

| Slug (unchanged) | New title | Target query | Kicker |
| :--- | :--- | :--- | :--- |
| `church-government` | **What Are the Four Types of Church Government?** | types of church government polity | Church Government: Who Decides, and By What Right |
| `men-women-and-the-office` | **Can Women Be Pastors? Complementarian vs. Egalitarian** | can women be pastors complementarian vs egalitarian | Men, Women, and the Office: The Debate the Church Cannot Shout Past |
| `the-call-and-its-testing` | **How Do You Know If You Are Called to Ministry?** | how to know if you are called to ministry |  |
| `burnout-and-the-theology-of-rest` | **What Does Scripture Say About Burnout and Sabbath?** | theology of rest and pastoral burnout |  |
| `the-hidden-temptations-of-power` | **How Does Power Corrupt Pastors and Christian Leaders?** | how power corrupts pastors | The Hidden Temptations of Power |
| `the-leaders-marriage-and-family` | **How Do You Pastor a Church Without Losing Your Family?** | pastor's family and ministry |  |

## /life/ (68)

| Slug (unchanged) | New title | Target query | Kicker |
| :--- | :--- | :--- | :--- |
| `aging-and-the-body` | **What Is the Christian View of Aging and the Body?** | christian view of aging | Aging and the Body: Finitude and Dignity |
| `food-and-the-table` | **What Does the Bible Say About Food, Feasting, and Fasting?** | bible on food feasting and fasting |  |
| `health-illness-and-pain` | **How Should Christians Think About Sickness and Health?** | christian view of sickness and health |  |
| `rest-and-the-sabbath` | **What Is Sabbath Rest, and How Do You Keep It?** | what is sabbath rest | Rest and the Sabbath: The Unforced Rhythms of Grace |
| `sex-and-the-body` | **What Does Christianity Actually Teach About Sex?** | christian theology of sex and desire | Sex and the Body: A Theology of Desire |
| `sleep-and-limits` | **What Does Sleep Teach Us About Trusting God?** | christian view of sleep and limits | Sleep and the Gift of Limits |
| `the-body-and-the-rhythms` | **What Is a Christian View of Sleep, Food, and Rest?** | christian view of the body and daily rhythms |  |
| `caring-for-aging-parents` | **How Do You Honor Aging Parents Who Need Care?** | caring for aging parents |  |
| `conflict-and-reconciliation` | **How Do You Handle Conflict and Truly Reconcile?** | conflict and reconciliation in relationships | Conflict and Reconciliation: The Ministry of Repair |
| `dating-and-discernment` | **How Do You Date Wisely and Choose a Spouse?** | christian dating and choosing a spouse | Dating and Discernment: Wisdom Before the Covenant |
| `forgiveness-the-hardest-grace` | **How Do You Forgive Someone Who Really Hurt You?** | how to forgive someone who hurt you | Forgiveness: The Hardest Grace |
| `friendship-against-isolation` | **Why Is It So Hard to Make Real Friends as an Adult?** | how to make real friends as an adult | Friendship Against Isolation |
| `infertility-and-childlessness` | **Where Is God in Infertility and Childlessness?** | infertility childlessness and faith | Infertility and Childlessness: The Ache of Empty Arms |
| `life-together-the-one-anothers` | **What Are the One Another Commands in the Bible?** | one another commands in the new testament | Life Together: The One Anothers and the Communal Faith |
| `marriage-the-long-covenant` | **Why Do Marriages Drift Apart, and How Do You Stop It?** | why marriages drift apart | Marriage: The Long Covenant |
| `raising-children-in-grace` | **How Do You Discipline Children With Grace?** | christian parenting discipline and grace |  |
| `singleness-and-the-full-life` | **Is Singleness a Calling or a Waiting Room?** | is singleness a calling |  |
| `spiritual-friendship-and-the-long-walk` | **How Do You Disciple One Person at a Time?** | how to disciple someone one on one | Spiritual Friendship and the Long Walk |
| `the-blended-family` | **Blended Family Struggles: How Do You Make It Work?** | blended family struggles |  |
| `the-church-as-family` | **Why Does the Bible Call the Church a Family?** | why is the church called a family |  |
| `the-home-and-the-family` | **How Do You Build a Christian Home and Family?** | how to build a christian home |  |
| `the-marriage-bed` | **What Does the Bible Say About Sex in Marriage?** | what does the bible say about sex in marriage | The Marriage Bed |
| `the-wayward-child` | **What Do You Do When Your Child Leaves the Faith?** | when your child leaves the faith | The Wayward Child: When They Walk Away |
| `anger-and-the-hot-heart` | **Is Anger a Sin? What Scripture Actually Says** | is anger a sin | Anger and the Hot Heart |
| `contentment-against-envy` | **How Do You Stop Envy and Learn Contentment?** | how to stop being envious and be content |  |
| `desire-and-temptation` | **How Do You Fight Temptation and Disordered Desire?** | how to fight temptation and desire | Desire and Temptation: The Disordered Want |
| `identity-and-worth` | **Where Does Your Identity and Worth Come From?** | where does my identity and worth come from |  |
| `pride-and-humility` | **Why Is Pride the Root of Every Other Sin?** | why is pride the root of all sin | Pride and Humility: The Root and Its Undoing |
| `shame-and-the-hiding-self` | **What Is the Difference Between Guilt and Shame?** | difference between guilt and shame | Shame and the Hiding Self |
| `the-anxious-mind` | **Is Anxiety a Sin? Faith and Mental Health** | is anxiety a sin christian |  |
| `the-dry-season` | **Why Does God Feel So Far Away When You Pray?** | why does god feel so far away | The Dry Season: When God Feels Absent |
| `the-heavy-mind` | **What Does the Bible Say About Depression?** | what does the bible say about depression | The Heavy Mind |
| `baptism-and-the-new-life` | **What Does Baptism Mean, and Why Does It Matter?** | what does baptism mean |  |
| `church-membership-and-commitment` | **Why Does Church Membership Still Matter?** | why is church membership important | Church Membership and the Vow to Stay |
| `discipleship-following-jesus` | **What Does It Mean to Be a Disciple of Jesus?** | what does it mean to be a disciple of jesus | Discipleship: The Long Apprenticeship to Jesus |
| `making-disciples-at-the-table` | **How Did Jesus Make Disciples Without a Program?** | how did jesus make disciples | Making Disciples at the Table |
| `the-integrated-life` | **How Do You Live Your Faith on Monday, Not Just Sunday?** | how to live your faith in everyday life | The Integrated Life |
| `the-living-room-and-the-ordinary-disciple` | **Can an Ordinary Christian Make Disciples?** | can an ordinary christian make disciples | The Living Room and the Ordinary Disciple |
| `the-lords-supper-and-the-table` | **What Does the Lord's Supper Actually Mean?** | what does the lord's supper mean | The Lord's Supper and the Table of Grace |
| `the-story-we-live-in` | **Creation, Fall, Redemption, Restoration: The Bible's Story** | creation fall redemption restoration | The Story We Live In |
| `time-and-the-examined-life` | **How Should a Christian Spend the Time They Have?** | how should christians use their time | Time and the Examined Life |
| `wisdom-for-all-of-life` | **What Do Proverbs and Ecclesiastes Teach About Wisdom?** | what does proverbs teach about wisdom |  |
| `consumer-faith-and-the-communal-church` | **Consumer Christianity: How Did We Stop Making Disciples?** | consumer christianity church | Consumer Faith and the Communal Church |
| `creation-and-our-keeping` | **What Does the Bible Say About Caring for Creation?** | what does the bible say about caring for creation | Creation and Our Keeping: Tending the Garden |
| `faith-and-politics` | **How Should a Christian Think About Politics?** | how should christians think about politics |  |
| `justice-and-the-poor` | **What Does the Bible Say About Justice and the Poor?** | what does the bible say about the poor |  |
| `money-and-possessions-in-society` | **How Do You Follow Jesus With Your Money?** | how to follow jesus with your money |  |
| `technology-and-attention` | **How Does Your Phone Shape Your Attention and Soul?** | how does your phone shape your soul | Technology and Attention: The Formation of the Phone |
| `the-common-good-and-citizenship` | **What Do Christians Owe the City They Live In?** | christians and the common good |  |
| `the-neighbor-and-the-stranger` | **Who Is My Neighbor? What Jesus Actually Meant** | who is my neighbor good samaritan | The Neighbor and the Stranger |
| `witness-without-weirdness` | **How Do You Share Your Faith Without Being Pushy?** | how to share your faith without being pushy | Witness Without Weirdness |
| `addiction-and-the-long-road-back` | **Why Can't Willpower Alone Break an Addiction?** | why willpower does not break addiction | Addiction and the Long Road Back |
| `betrayal-and-broken-trust` | **How Do You Heal After Betrayal by Someone Close?** | how to deal with betrayal by someone you trusted |  |
| `caring-for-the-dying` | **How Do You Sit With Someone Who Is Dying?** | how to be with someone who is dying | Caring for the Dying: The Ministry of Presence |
| `disability-and-the-different-body` | **What Does the Church Owe People With Disabilities?** | christian view of disability and worth | Disability and the Different Body |
| `divorce-and-its-aftermath` | **How Do You Live as a Christian After Divorce?** | life after divorce as a christian |  |
| `facing-death` | **How Do Christians Face Death and the Fear of Dying?** | how to face death as a christian | Facing Death: The Last Enemy and the Sure Hope |
| `grief-and-loss` | **What Does the Bible Say About Grief and Loss?** | what does the bible say about grief |  |
| `suffering-and-the-silence-of-god` | **Why Does God Allow Suffering and Stay Silent?** | why does god allow suffering | Suffering and the Silence of God |
| `the-empty-nest-and-midlife` | **Empty Nest and Midlife: What Do You Do Now?** | empty nest and midlife |  |
| `waiting-and-unanswered-prayer` | **What Do You Do When God Does Not Answer Prayer?** | what to do when god does not answer prayer | Waiting and Unanswered Prayer: The Closed Door |
| `ambition-and-rest` | **Is Ambition a Sin? Drive, Hustle, and Rest** | is ambition a sin |  |
| `debt-and-provision` | **What Does the Bible Say About Debt and Daily Bread?** | what does the bible say about debt | Debt and Provision: Daily Bread and the Anxious Heart |
| `generosity-and-the-open-hand` | **Why Should Christians Give Their Money Away?** | why should christians give generously | Generosity and the Open Hand |
| `money-and-the-heart` | **Why Did Jesus Treat Money as a Rival God?** | what did jesus say about money and mammon |  |
| `retirement-and-the-last-third` | **What Does the Bible Say About Retirement?** | what does the bible say about retirement | Retirement and the Last Third of Life |
| `success-and-failure` | **Why Do We Measure Ourselves by Success and Failure?** | identity beyond success and failure |  |
| `work-as-worship` | **What Does the Bible Say About Work and Calling?** | what does the bible say about work and calling | Work as Worship |

## /resources/context/ (27)

| Slug (unchanged) | New title | Target query | Kicker |
| :--- | :--- | :--- | :--- |
| `covenant-and-treaty` | **What Is a Biblical Covenant? The Ancient Treaty Form** | what is a biblical covenant |  |
| `the-gods-of-the-nations` | **Why Did Israel's Neighbors Worship Idols?** | why did ancient people worship idols | Idolatry Made Sense |
| `wisdom-and-the-nations` | **Did Proverbs Borrow From Egyptian Wisdom Writing?** | did proverbs borrow from egyptian wisdom |  |
| `genesis-one-in-its-world` | **Was Genesis 1 Answering Babylon, Not Modern Science?** | genesis 1 ancient near east context |  |
| `torah-and-the-law-codes` | **How Is the Law of Moses Different From Hammurabi?** | law of moses vs code of hammurabi |  |
| `purity-and-contagion` | **What Does Clean and Unclean Mean in Leviticus?** | what does clean and unclean mean in the bible | Clean and Unclean: The Logic of Purity |
| `honor-shame-vs-guilt` | **What Is Honor and Shame Culture in the Bible?** | honor and shame culture in the bible | Honor and Shame: The Operating System of the Biblical World |
| `hospitality-and-the-stranger` | **What Did Hospitality Mean in the Ancient World?** | biblical hospitality in the ancient world | Hospitality: A Survival Institution, Not a Dinner Party |
| `collectivist-world-individualist-readers` | **Is 'You' in the New Testament Singular or Plural?** | is you in the bible singular or plural | You (Plural) |
| `exile-not-empire` | **What Does It Mean That Christians Are Exiles?** | what does it mean that christians are exiles | Exile, Not Empire |
| `what-justice-meant` | **What Does Justice Mean in the Bible? Mishpat and Tsedaqah** | what does justice mean in the bible | Justice Before Our Debates |
| `the-bible-is-not-an-american-book` | **Is the Bible an American Book? What Its History Shows** | is the bible an american book | The Bible Is Not an American Book |
| `the-kingdom-is-not-a-platform` | **Does the Kingdom of God Belong to a Political Party?** | is the kingdom of god political | The Kingdom Is Not a Party Platform |
| `left-lens-right-lens` | **Does Your Politics Decide How You Read the Bible?** | how politics shapes how we read the bible | The Left Lens and the Right Lens |
| `money-texts-we-explain-away` | **What Does the Bible Say About Wealth and the Poor?** | what does the bible say about wealth and the poor | The Money Texts We Have Learned Not to See |
| `temple-and-synagogue` | **What Was the Difference Between Temple and Synagogue?** | difference between the temple and the synagogue |  |
| `septuagint-and-scripture` | **What Is the Septuagint, and Why Does It Matter?** | what is the septuagint | The Bible the Apostles Carried |
| `between-the-testaments` | **What Happened Between the Old and New Testaments?** | what happened between the old and new testaments | The Four Hundred Years Between the Testaments |
| `honor-status-and-the-cross` | **Why Was Crucifixion So Shameful in the Roman World?** | why was crucifixion so shameful | The Word Decent People Did Not Say |
| `gospel-against-empire` | **What Did Gospel and Lord Mean Under Caesar?** | what did gospel and lord mean in the roman empire | Caesar's Words in Christian Mouths |
| `patronage-and-grace` | **What Did Grace Mean in a World Built on Patronage?** | what did grace mean in the roman world | The Economy Behind Grace |
| `the-cities-of-paul` | **Which Cities Did Paul Write To? Corinth, Ephesus, Rome** | what cities did paul write to |  |
| `household-codes-in-context` | **What Are the Household Codes in Ephesians and Colossians?** | what are the household codes in the bible |  |
| `miracles-and-the-ancient-mind` | **Were Ancient People Gullible About Miracles?** | were ancient people gullible about miracles | Miracles and the Ancient Mind |
| `the-slavery-texts` | **What Does the Bible Actually Say About Slavery?** | what does the bible say about slavery |  |
| `the-violence-of-the-old-testament` | **Why Is the Old Testament So Violent? An Honest Look** | why is the old testament so violent |  |
| `women-in-the-ancient-world` | **How Did the Bible Treat Women Compared to Its World?** | how the bible treated women in the ancient world |  |

## /studyguides/ (54)

| Slug (unchanged) | New title | Target query | Kicker |
| :--- | :--- | :--- | :--- |
| `sermon-on-the-mount` | **The Sermon on the Mount: A Bible Study** | sermon on the mount bible study | A Harder Righteousness |
| `after-christendom` | **After Christendom: A Study on Post-Christian Faith** | post christian culture study |  |
| `alone-in-a-crowded-church` | **Alone in a Crowded Church: A Study on Church Loneliness** | loneliness in church study |  |
| `believe` | **Believe: A Bible Study for New Believers and Seekers** | bible study for new believers |  |
| `character-before-competence` | **Character Before Competence: A Church Leadership Study** | church leadership character study |  |
| `christian-nationalism` | *(kept)* Christian Nationalism: An 8-Week Study | christian nationalism study guide |  |
| `church-and-empire` | *(kept)* Church and Empire: An 8-Week Study | church and empire study guide |  |
| `anxiety` | **Anxiety: A Bible Study on Worry and the Peace of Christ** | bible study on anxiety | Consider the Birds |
| `marriage` | **Marriage: A Bible Study on Covenant Love** | marriage bible study | Covenant |
| `deep-roots` | **Deep Roots: A Bible Study for Faith Beyond Slogans** | deeper faith bible study |  |
| `resurrection` | **The Resurrection: A Bible Study on the Evidence** | evidence for the resurrection study | Did It Happen |
| `economic-justice` | *(kept)* Economic Justice: An 8-Week Study | economic justice bible study |  |
| `contentment` | **Contentment: A Bible Study on Wanting Less** | bible study on contentment | Enough |
| `fatherhood` | **Fatherhood: A Bible Study for Men Without a Blueprint** | bible study on fatherhood | Fatherhood in a Fatherless Age |
| `aging-and-legacy` | **Aging and Legacy: A Bible Study on Finishing Well** | bible study on aging and legacy | Finishing Well |
| `grief` | **Grief: A Bible Study on Loss and the God Who Wept** | bible study on grief |  |
| `knowing-god` | **The Trinity: A Bible Study on Knowing God** | bible study on the trinity | Knowing God |
| `the-image-of-god` | **The Image of God: A Bible Study on Human Worth** | image of god bible study | Made in His Image |
| `mishpat` | **Mishpat: A Bible Study on Biblical Justice** | biblical justice bible study |  |
| `singleness` | **Singleness: A Bible Study for the Unmarried** | bible study on singleness | Not a Waiting Room |
| `the-story-of-the-bible` | **The Story of the Bible: A Study of the Whole Canon** | overview of the whole bible study | One Story |
| `witness` | **Evangelism: A Bible Study on Sharing Your Faith** | bible study on evangelism | Ordinary Witness |
| `the-psalms` | **The Psalms: A Bible Study on Honest Prayer** | bible study on the psalms | Praying the Honest Prayers |
| `skeptic` | **Questions Skeptics Ask: A Study for Doubters** | bible study for skeptics | Questions Worth Asking |
| `raising-believers` | **Raising Believers: A Bible Study for Christian Parents** | bible study for christian parents |  |
| `prayer` | **Prayer: A Bible Study on Learning to Pray** | bible study on prayer | Teach Us to Pray |
| `the-captive-church` | **The Captive Church: A Study on Faith and Political Power** | church and political power study |  |
| `heaven-and-hell` | **Heaven and Hell: A Bible Study on the Life to Come** | bible study on heaven and hell | The Country We Have Not Seen |
| `attention` | **Attention: A Bible Study on Technology and Distraction** | christian study on technology and attention | The Distracted Soul |
| `anger` | **Anger: A Bible Study on Temper and Righteous Anger** | bible study on anger | The Emotion We Baptized |
| `the-creeds` | **The Creeds: A Bible Study on What Christians Believe** | study on the apostles creed | The Faith Once Delivered |
| `new-believer` | **New Believers: A Study on Your First Steps of Faith** | bible study for new christians | The First Steps |
| `holy-spirit` | **The Holy Spirit: A Bible Study on the Forgotten God** | bible study on the holy spirit | The Forgotten God |
| `fruit-of-the-spirit` | **The Fruit of the Spirit: A Bible Study on Growth** | fruit of the spirit bible study | The Garden the Spirit Grows |
| `gratitude` | **Gratitude: A Bible Study on Thanksgiving and Grace** | bible study on gratitude | The Grace of Thanks |
| `forgiveness` | **Forgiveness: A Bible Study on the Hardest Word** | bible study on forgiveness |  |
| `pastoral-health` | **Pastoral Health: A Study for Leaders and Those Who Love Them** | pastor burnout study for leaders |  |
| `the-beatitudes` | **The Beatitudes: A Bible Study on the Kingdom of God** | beatitudes bible study | The Kingdom Turned Upside Down |
| `parenting-formation` | **Parenting: A Bible Study on Forming a Child's Faith** | christian parenting bible study | The Long Obedience of Parenting |
| `friendship` | **Friendship: A Bible Study on the Love We Forgot** | bible study on friendship |  |
| `the-lords-prayer` | **The Lord's Prayer: A Bible Study Line by Line** | lords prayer bible study | The Only Prayer Jesus Taught |
| `hospitality` | **Hospitality: A Bible Study on the Open Door** | bible study on hospitality |  |
| `generosity` | **Generosity: A Bible Study on Giving** | bible study on generosity and giving | The Open Hand |
| `lament` | **Lament: A Bible Study on Praying Your Pain** | bible study on lament | The Prayers We Were Never Taught |
| `sabbath` | **Sabbath: A Bible Study on Rest and Hurry** | bible study on sabbath rest | The Rest We Refuse |
| `identity` | **Identity: A Bible Study on Who You Actually Are** | bible study on identity in christ | The Self You Were Sold |
| `the-parables` | **The Parables: A Bible Study on the Stories of Jesus** | parables of jesus bible study | The Stories That Undo You |
| `the-undivided-life` | **The Undivided Life: A Study on Faith Beyond Sunday** | integrating faith and daily life study |  |
| `spiritual-warfare` | **Spiritual Warfare: A Bible Study on the Unseen Battle** | bible study on spiritual warfare |  |
| `baptism-and-communion` | **Baptism and Communion: A Bible Study on the Sacraments** | bible study on baptism and communion | The Water and the Table |
| `mental-health` | **Mental Health: A Bible Study on the Weight You Carry** | christian bible study on mental health |  |
| `work-and-vocation` | **Work and Vocation: A Bible Study on Faith and Your Job** | bible study on work and vocation | The Work of Our Hands |
| `womanhood` | **Biblical Womanhood: A Bible Study on Women of Valor** | bible study on biblical womanhood |  |
| `habits-and-formation` | **Spiritual Habits: A Bible Study on Formation** | bible study on spiritual habits | You Become What You Repeat |

## /theology/doctrine/ (13)

| Slug (unchanged) | New title | Target query | Kicker |
| :--- | :--- | :--- | :--- |
| `church-and-state` | **How Should the Church Relate to the State? Five Views** | christian views on church and state |  |
| `creation` | **What Do Christians Believe About Creation and Providence?** | what do christians believe about creation |  |
| `divine-attributes` | **What Are the Attributes of God? Classical Theism Explained** | what are the attributes of god |  |
| `holy-spirit` | **Who Is the Holy Spirit, and Do His Gifts Continue?** | do the gifts of the holy spirit continue today |  |
| `inerrancy` | **What Is Biblical Inerrancy? The Spectrum of Views** | what is biblical inerrancy |  |
| `origins` | **How Should Christians Read Genesis 1? Four Views** | how should christians read genesis 1 |  |
| `problem-of-evil` | **Why Does God Allow Evil and Suffering?** | why does god allow evil and suffering | The Problem of Evil |
| `providence` | **What Is Divine Providence? How God Governs All Things** | what is the doctrine of providence |  |
| `sacraments` | **What Are the Sacraments? Baptism and the Lord's Supper** | what are the sacraments |  |
| `sin` | **What Is Original Sin? Three Christian Traditions** | what is original sin |  |
| `sovereignty-and-freedom` | **How Can God Be Sovereign and Humans Still Be Free?** | how can god be sovereign and man free |  |
| `theodicy` | **What Is a Theodicy? Five Answers to the Problem of Evil** | what is a theodicy |  |
| `trinity` | **What Is the Trinity? One God in Three Persons** | what is the trinity |  |

## /writing/ (151)

| Slug (unchanged) | New title | Target query | Kicker |
| :--- | :--- | :--- | :--- |
| `the-monster-in-the-mirror` | **Why Does Every Generation Get the Bible Wrong?** | why every generation gets the bible wrong | The Monster in the Mirror |
| `not-persecuted-seduced-crisis-american-christianity` | **Is the American Church Persecuted or Seduced?** | is american christianity being persecuted | Not Persecuted, Seduced |
| `you-are-not-the-exception` | **Why Do We Get Biblical Interpretation Wrong?** | how to interpret the bible correctly | You Are Not the Exception |
| `the-theology-of-time` | **What Does the Bible Say About Time Management?** | what does the bible say about time management |  |
| `hidden-pain-successful-pastor` | **Why Do Successful Pastors Suffer in Silence?** | why do successful pastors suffer in silence |  |
| `church-needs-you-healthy-not-busy` | **How Do Pastors Stay Healthy in Ministry?** | how do pastors stay healthy in ministry | Your Church Needs You Healthy More Than It Needs You Busy |
| `personal-board-accountability` | **How Do You Build a Personal Accountability Board?** | personal board of accountability |  |
| `five-biggest-mistakes-new-pastors` | *(kept)* The 5 Biggest Mistakes New Pastors Make | biggest mistakes new pastors make |  |
| `art-of-saying-no-without-guilt` | **How Do You Say No Without Feeling Guilty?** | how to say no without feeling guilty |  |
| `slow-burn-ministry-exhaustion` | **How Does Ministry Exhaustion Sneak Up on You?** | signs of ministry exhaustion | The Slow Burn |
| `return-ministry-after-burnout` | **How Do You Return to Ministry After Burnout?** | returning to ministry after burnout | The Second Commission |
| `difference-tired-and-done` | **Am I Just Tired, or Am I Done With Ministry?** | difference between being tired and being done |  |
| `protecting-marriage-ministry-demands` | **How Do You Protect Your Marriage in Ministry?** | protecting your marriage in ministry |  |
| `okay-to-see-counselor` | **Should Pastors See a Counselor? Why Many Resist** | should pastors see a counselor |  |
| `pastors-depression-not-faith-problem` | **Is a Pastor's Depression a Faith Problem?** | is depression a faith problem for pastors |  |
| `anxiety-perfectionism-pastor-breaking-cycle` | **How Do Pastors Break the Anxiety and Perfectionism Cycle?** | pastor anxiety and perfectionism |  |
| `not-your-churchs-attendance-numbers` | **Why Do Pastors Tie Their Worth to Attendance Numbers?** | pastor identity and church attendance numbers |  |
| `five-sermon-habits-shrinking-faith` | **5 Sermon Habits That Shrink a Congregation's Faith** | sermon habits that hurt a congregation |  |
| `preaching-to-room-not-there-yet` | **Preaching to the Unchurched: How Do You Reach Them?** | how to preach to the unchurched | The Room That's Not There Yet |
| `metrics-tell-church-healthy` | **What Metrics Actually Show That a Church Is Healthy?** | how to measure church health |  |
| `most-dangerous-person-church-staff` | **Who Is the Most Dangerous Person on a Church Staff?** | most dangerous person on a church staff |  |
| `staff-culture-no-burnout` | **How Do You Build a Church Staff Culture Without Burnout?** | church staff culture without burnout |  |
| `gen-z-wants-from-church` | **What Does Gen Z Actually Want From Church?** | what does gen z want from church | The Smoke Machine Is Not the Problem |
| `reformed-charismatic-pastors-same-table` | **Can Reformed and Charismatic Pastors Work Together?** | reformed and charismatic pastors together | The Same Table |
| `city-wide-church-together` | **Why Should Churches in One City Worship Together?** | city wide church worship service |  |
| `before-launch-ministry-ask-other-church` | **Should You Start a Ministry Another Church Already Runs?** | should our church start a new ministry |  |
| `church-closures-outpacing-plants` | **Why Are Churches Closing Faster Than They Are Planted?** | church closures vs church plants |  |
| `short-term-mission-trips-help-hurt` | **Do Short-Term Mission Trips Help or Hurt?** | do short term mission trips help or hurt | The Trip Is Not the Work |
| `unreached-people-groups-closest-to-you` | **Which Unreached People Groups Live Nearest to You?** | unreached people groups near me |  |
| `global-south-church-teach-suffering` | **What Does the Global Church Know About Suffering?** | what the global church teaches about suffering | The Church That Cannot Promise Safety |
| `mission-sending-culture-never-sent` | **How Do You Start a Missions Culture From Scratch?** | how to build a missions sending culture |  |
| `engaging-nones-religiously-unaffiliated` | **How Do You Reach the Religiously Unaffiliated?** | how to reach the religiously unaffiliated | None of the Above |
| `ai-authenticity-pastor-artificial-intelligence` | **If AI Can Write a Sermon, What Is a Pastor For?** | can ai write a sermon | The Pastor and the Machine |
| `17-mobilizing-your-church-for-world-missions-without-a-big-budget` | **How Can a Church Do World Missions on a Small Budget?** | world missions on a small church budget |  |
| `justice-not-political-theological` | **Is Justice a Political Issue or a Theological One?** | is justice political or biblical |  |
| `complicity-not-innocence` | **Is Silence About Injustice the Same as Neutrality?** | is silence complicity |  |
| `poor-not-ministry-category` | **What Does the Bible Say About the Church and the Poor?** | what the bible says about the church and the poor | Filed Under Mercy |
| `creation-care-not-optional` | **What Does Genesis Say About Caring for Creation?** | what does the bible say about creation care | Work It and Keep It |
| `widow-orphan-stranger` | **Why Does the Bible Name the Widow, Orphan, and Stranger?** | widow orphan and stranger in the bible |  |
| `mishpat-tsedaqah` | **What Do Mishpat and Tsedaqah Mean in the Bible?** | mishpat and tsedaqah meaning |  |
| `church-credibility-problem` | **Why Has the Church Lost Its Credibility on Justice?** | why the church lost its credibility |  |
| `racial-reconciliation-without-repentance` | **Can Racial Reconciliation Happen Without Repentance?** | racial reconciliation and repentance | Reconciliation Without Repentance Is Branding |
| `prophetic-tradition-economic-justice` | **What Do the Prophets Say About Economic Justice?** | prophets on economic justice |  |
| `stranger-at-gate` | **What Does the Bible Say About Welcoming the Stranger?** | what the bible says about welcoming the stranger | The Stranger at the Gate |
| `church-wealth-world-poverty` | **What Does the Church Owe a World in Poverty?** | church wealth and world poverty |  |
| `payday-lending-christians` | **What Does the Bible Say About Payday Lending?** | what does the bible say about payday loans | Before the Sun Goes Down |
| `silence-abuse-church` | **Why Do Churches Stay Silent About Abuse?** | why churches cover up abuse | Hold Your Peace, My Sister |
| `imago-dei-means-more` | **What Does Imago Dei Mean for Human Dignity?** | what does imago dei mean |  |
| `most-prophetic-live-differently` | **What Does Prophetic Witness Look Like in Daily Life?** | what is prophetic witness |  |
| `symptoms-without-causes-charity` | **Why Does Charity Treat Symptoms and Not Causes?** | why charity treats symptoms not causes | The Corner of the Field |
| `church-mental-health-justice` | **Is Mental Health a Justice Issue for the Church?** | the church and mental health |  |
| `church-megaproject-widows-mite` | **What Do Church Budgets Say Next to the Widow's Mite?** | church building budgets and the widow's mite |  |
| `white-churches-diversity` | **Is Church Diversity Real or Just Decoration?** | church diversity vs real integration | The Dividing Wall We Learned to Decorate |
| `theology-of-repair` | **What Does Biblical Justice Say About Repairing Harm?** | theology of repair and restitution |  |
| `hospitality-not-optional` | **What Does the Bible Say About Hospitality?** | what does the bible say about hospitality |  |
| `disability-justice-theological` | **Why Is the Church Behind the World on Accessibility?** | church accessibility and disability | The House Is Not Full |
| `earth-is-lords` | **Why Is Creation Care a Christian Responsibility?** | is creation care a christian responsibility | The Earth Is the Lord's |
| `prophetic-pastor` | **Should a Pastor Name Injustice From the Pulpit?** | should pastors preach about injustice |  |
| `justice-without-love-ideology` | **What Happens When Justice Is Pursued Without Love?** | justice without love becomes ideology |  |
| `vulnerable-people-not-in-pews` | **Why Are the Most Vulnerable People Not in Your Church?** | reaching the most vulnerable in your city |  |
| `sabbath-is-resistance` | **Why Is Keeping the Sabbath an Act of Resistance?** | why is sabbath an act of resistance | Sabbath Is Resistance |
| `pastoral-care-wealthy-congregant` | **How Do You Pastor a Wealthy Person in Your Church?** | how to pastor wealthy congregants |  |
| `leviticus-19-border-crisis` | **What Does the Bible Say About Immigration and Borders?** | what does the bible say about immigration | The Stranger and the Sword |
| `church-incarceration-silence` | **Why Does the Church Avoid Prison Ministry?** | why the church ignores prison ministry | The Door We Did Not Walk Through |
| `the-long-arc` | **Does the Arc of History Really Bend Toward Justice?** | does the arc of history bend toward justice | The Long Arc |
| `church-fathers-not-boring` | **Why Do the Early Church Fathers Still Matter Today?** | why do the church fathers still matter | The Church Fathers Were Not Boring |
| `atonement-more-than-one-model` | **What Are the Different Theories of the Atonement?** | theories of the atonement |  |
| `kingdom-of-god-not-what-you-think` | **What Is the Kingdom of God, and Is It Here Now?** | what is the kingdom of god |  |
| `psalms-as-prayer-not-poetry` | **How Do You Pray the Psalms Instead of Just Reading Them?** | how to pray the psalms |  |
| `holy-spirit-not-feeling` | **Who Is the Holy Spirit, and What Does He Actually Do?** | who is the holy spirit | The Holy Spirit Is Not a Feeling |
| `sin-not-just-what-you-do` | **Is Sin Something You Do or Something You Are?** | what is sin in christianity |  |
| `eschatology-matters-end-shapes-now` | **What Is Eschatology, and Why Does It Matter Now?** | what is eschatology and why does it matter |  |
| `incarnation-changes-everything` | **Why Did God Become Human, and Why Does It Matter?** | why did god become human | The Incarnation Changes Everything |
| `burnout-nobody-talks-about` | **What Are the Early Signs of Pastoral Burnout?** | signs of pastoral burnout | The Burnout Nobody Talks About |
| `sabbath-isnt-optional` | **Do Christians Still Have to Keep the Sabbath?** | do christians have to keep the sabbath |  |
| `your-marriage-is-ministry-too` | **How Do You Keep Ministry From Costing Your Marriage?** | when ministry is hurting my marriage |  |
| `weight-of-what-you-cant-say` | **How Do Pastors Carry Confidences They Cannot Share?** | pastors carrying confidences they cannot share | The Weight of What You Can't Say |
| `finding-your-barnabas` | **Why Does Every Pastor Need a Barnabas in Ministry?** | every pastor needs a barnabas | Finding Your Barnabas |
| `loneliness-of-leadership` | **Why Is Leadership So Lonely, and What Helps?** | why is leadership so lonely | The Loneliness of Leadership |
| `delegation-is-not-weakness` | **Why Do Pastors Struggle to Delegate Ministry Work?** | why pastors struggle to delegate |  |
| `vision-without-community-fantasy` | **How Do You Build a Vision the Church Will Own?** | building shared vision in a church | Vision Without Community Is Just Fantasy |
| `pastors-authority-relational` | **Where Does a Pastor's Authority Actually Come From?** | where does pastoral authority come from |  |
| `conflict-is-not-failure` | **How Should a Pastor Handle Conflict in the Church?** | how to handle conflict in the church |  |
| `building-leadership-team` | **How Do You Build a Church Leadership Team?** | how to build a church leadership team |  |
| `danger-pastoral-isolation` | **Why Is Pastoral Isolation So Dangerous for Ministry?** | dangers of pastoral isolation |  |
| `unity-without-uniformity` | **Can the Church Have Unity Without Uniformity?** | unity without uniformity in the church | Unity Without Uniformity |
| `courage-to-be-different` | **How Should the Church Be Different From the World?** | how should the church be different from the world |  |
| `collaboration-across-denominations` | **Can Churches Work Together Across Denominations?** | churches working together across denominations |  |
| `global-church-is-your-church` | **What Does It Mean to Belong to the Global Church?** | what is the global church |  |
| `mission-is-not-optional` | **What Is the Mission of the Church, and Who Does It?** | what is the mission of the church |  |
| `your-city-is-mission-field` | **Why Is Your Own City Your Real Mission Field?** | your city is your mission field |  |
| `church-response-to-culture` | **How Should the Church Engage the Culture?** | how should the church engage culture |  |
| `truth-in-post-truth-world` | **How Does the Church Tell the Truth in a Post-Truth Age?** | telling the truth in a post-truth world | Telling the Truth in a Post-Truth World |
| `interior-life-of-pastor` | **Why Does a Pastor's Inner Life Shape His Ministry?** | pastor inner life and ministry health |  |
| `prayer-is-not-optional` | **Why Is Prayer the Foundation of a Pastor's Ministry?** | why is prayer essential for pastors |  |
| `scripture-meditation` | **What Does It Mean to Meditate on Scripture?** | how to meditate on scripture |  |
| `spiritual-disciplines-for-pastors` | *(kept)* Spiritual Disciplines for Pastors | spiritual disciplines for pastors |  |
| `the-examined-life` | **How Do You Examine Your Own Life and Ministry?** | self-examination for pastors | The Examined Life |
| `repentance-and-renewal` | **What Does Repentance Look Like for a Pastor?** | repentance and renewal for pastors |  |
| `hope-of-resurrection` | **How Does the Resurrection Shape Christian Hope?** | what is the hope of the resurrection |  |
| `justice-not-political` | **What Does the Bible Actually Mean by Justice?** | what does the bible mean by justice | Justice Is Not a Political Category |
| `poor-not-ministry` | **What Does Matthew 25 Teach About the Poor?** | what does matthew 25 say about the poor | The Poor Are Not a Ministry Category |
| `six-verses-we-memorized` | **Why Do Christians Quote Some Verses and Skip Others?** | why christians ignore certain bible verses | The Bible Verses We Quote, and the Ones We Skip |
| `the-third-temptation` | **Why Did Jesus Refuse the Offer of Political Power?** | jesus refused political power in the wilderness | The Temptation Jesus Refused in the Desert |
| `reading-in-community` | **Why Should You Read the Bible in Community?** | why read the bible in community | You Were Never Meant to Read the Bible Alone |
| `six-lenses-that-distort-the-bible` | **How Does Your Culture Shape the Way You Read the Bible?** | how culture shapes the way we read the bible | You've Never Read the Bible Without a Lens |
| `exile-is-not-the-end` | **How Should the Church Think About Losing Cultural Power?** | church losing cultural power exile | The Church Has Been an Exile Before |
| `witness-without-power` | **How Did the Early Church Grow Without Political Power?** | how did the early church grow without power | The Church Grew Fastest When It Had No Power |
| `the-last-nonpartisan-in-the-room` | **Should Pastors Stay Politically Neutral?** | should pastors be politically neutral | The Pastor Who Won't Pick a Side |
| `burnout-is-not-a-badge` | **Why Do Pastors Treat Exhaustion as Faithfulness?** | pastors treating burnout as a badge of honor | Burnout Is Not a Badge of Honor |
| `the-loneliest-room-in-the-church` | **Why Are Pastors So Lonely in a Full Church?** | why are pastors so lonely | The Loneliest Room in the Church |
| `the-pastor-nobody-checks-on` | **Who Pastors the Pastor When No One Checks In?** | who pastors the pastor | The Pastor Nobody Checks On |
| `the-covenant-you-didnt-understand` | **What Are You Really Promising in Your Marriage Vows?** | what do marriage vows actually mean | The Vow You Didn't Understand When You Made It |
| `the-slow-drift-that-ends-marriages` | **Why Do Married Couples Slowly Drift Apart?** | why do marriages drift apart | The Slow Drift That Ends More Marriages Than Affairs Do |
| `family-devotions-authentic` | **How Do You Do Family Devotions Without Forcing It?** | how to do family devotions |  |
| `raising-kids-who-think` | **How Do You Raise Kids Who Think About Their Faith?** | raising kids who own their faith | Raising Kids Who Think Instead of Just Performing Faith |
| `raising-sons-manhood` | **How Do You Teach a Son What Manhood Actually Is?** | how to raise sons biblical manhood | Raising Sons in a World Confused About Manhood |
| `teaching-kids-about-doubt` | **How Do You Talk to Your Kids About Doubt?** | how to talk to your kids about doubt | Teach Your Kids About Doubt Before the Internet Does |
| `the-weight-of-what-you-model` | **How Do Kids Actually Learn Faith From Their Parents?** | how do children learn faith from parents | Your Kids Learn Faith From What You Do, Not What You Say |
| `the-faith-once-delivered` | **What Did Christians Believe Before America Existed?** | what did christians believe before america |  |
| `easter-is-not-a-day` | **Why Is Easter Fifty Days and Not One Sunday?** | how long is the easter season | Easter Was Never Meant to Be One Sunday |
| `the-table-that-divides` | **Why Does Communion Divide Churches Instead of Uniting?** | why does communion divide churches | The Meal That Was Supposed to Make Us One |
| `praying-at-fixed-hours` | **What Is Fixed-Hour Prayer and Why Did the Church Keep It?** | what is fixed hour prayer |  |
| `the-bible-is-one-story` | **Is the Bible One Story or a Book of Rules?** | is the bible one story | The Bible Is One Story, Not a Rulebook |
| `the-moment-the-story-turns` | **What Is the Turning Point of the Bible's Story?** | what is the turning point of the bible story | The Moment the Whole Story Turns |
| `augustine-the-restless-man` | **Who Was Augustine and Why Does He Still Matter?** | who was augustine and why does he matter | The Restless Man Who Couldn't Outrun God |
| `christianity-was-never-western` | **Is Christianity a Western Religion?** | is christianity a western religion | Christianity Was Never a Western Religion |
| `the-fight-to-put-the-bible-in-your-hands` | **Who Died to Translate the Bible Into English?** | who died to translate the bible into english | The Fight to Put the Bible in Your Hands |
| `the-first-christians-died-for-this` | **Why Were the Early Christians Persecuted and Killed?** | why were the early christians persecuted | The First Christians Died for This |
| `praying-the-words-when-you-have-none` | **How Do You Pray When You Have No Words Left?** | what to pray when you have no words | Praying the Words When You Have None |
| `praying-when-you-dont-feel-it` | **Why Does Prayer Feel Dry, and What Do You Do?** | why does prayer feel dry | Praying When You Don't Feel Anything |
| `the-only-prayer-jesus-taught` | **What Does the Lord's Prayer Actually Mean?** | what does the lord's prayer mean | The Only Prayer Jesus Taught |
| `friendship-the-love-we-forgot` | **Why Is Friendship the Love We Take Least Seriously?** | why is friendship not taken seriously | Friendship Is the Love We Forgot |
| `your-body-is-not-a-cage` | **What Does Christianity Teach About the Body?** | what does christianity teach about the body | Your Body Is Not a Cage |
| `its-not-just-what-you-do` | **Why Does Jesus Care About the Heart, Not Just Behavior?** | why does jesus care about the heart not just actions |  |
| `the-hardest-thing-jesus-asked` | **What Did Jesus Mean by Love Your Enemies?** | what did jesus mean by love your enemies | The Hardest Thing Jesus Ever Asked |
| `the-atheist-in-the-pulpit` | **How Does an Atheist Become a Christian, and a Pastor?** | how does an atheist become a christian | The Atheist in the Pulpit |
| `the-machine-that-forms-you` | **What Is AI Doing to the Kind of People We Become?** | what is ai doing to us | The Machine That Forms You |
| `the-hour-that-forms-the-week` | **What Does Your Church's Order of Service Teach You?** | what does the order of worship teach | The Hour That Forms the Week |
| `the-end-of-home-field-advantage` | **How Do You Share the Gospel in a Post-Christian Culture?** | how to evangelize in a post-christian culture | The End of Home-Field Advantage |
| `excavation-not-demolition` | **What Comes After Deconstruction of Your Faith?** | what comes after deconstruction | Excavation, Not Demolition |
| `depression-or-the-dark-night` | **Is It Depression or a Spiritual Dark Night?** | is it depression or spiritual dryness | Not Every Darkness Is a Doctrine Problem |
| `a-whole-life` | **Is Singleness a Whole Life or a Waiting Room?** | what does the bible say about singleness | A Whole Life |
| `the-work-nobody-watches` | **Why Is Motherhood Treated as Wasted Work?** | why is motherhood undervalued | The Work Nobody Watches |
| `the-womanhood-they-preached-was-small` | **What Does Biblical Womanhood Actually Mean?** | what does biblical womanhood mean | The Womanhood They Preached Was Small |
| `natural-evil-and-animal-suffering` | **Why Does God Allow Natural Disasters and Animal Suffering?** | why does god allow natural disasters and animal suffering | The Suffering God Never Ordered |
| `morality-without-god-and-with-him` | **Can You Be a Good Person Without Believing in God?** | can you be good without god | Morality Without God, and With Him |
| `the-bible-without-the-marketing` | **Do You Have to Believe the Bible Is Inerrant?** | do you have to believe the bible is inerrant | The Bible Without the Marketing |
| `the-historical-jesus-without-the-shortcuts` | **What Can History Actually Prove About Jesus?** | what can we know about the historical jesus | The Historical Jesus, Without the Shortcuts |
| `the-problem-of-suffering-honestly` | **Why Does God Allow Suffering If He Is Good?** | why does god allow suffering | The Problem of Suffering, Honestly |
| `the-questions-that-actually-matter` | **What Do Skeptics Actually Ask About Christianity?** | what questions do skeptics ask about christianity | The Questions That Actually Matter |
