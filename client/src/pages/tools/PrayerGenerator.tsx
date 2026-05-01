import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { Heart, Copy, Check, RefreshCw } from "lucide-react";

const PRAYERS: Record<string, string[]> = {
  "Morning Prayer": [
    "Lord, as this new day begins, I offer it to You. Before the noise of the world reaches me, let Your voice be the first I hear. Fill me with purpose and patience. Guide my words, guard my heart, and give me eyes to see the people around me as You see them. I do not know what this day holds, but I know who holds it. Let me walk in that confidence. Amen.",
    "Father, I wake with gratitude that Your mercies are new this morning. I confess that yesterday I carried burdens You never asked me to hold. Today, I lay them down. Give me clarity for the decisions ahead, kindness for the conversations I will have, and courage to do the right thing even when it costs me. Let this day bring You glory. Amen.",
    "God of the morning, thank You for breath, for rest, for another chance. I bring You my anxieties before they multiply. I bring You my calendar before it controls me. I bring You my relationships before I damage them with hurry. Slow me down enough to hear You. Speed me up enough to obey. Amen.",
  ],
  "Evening Prayer": [
    "Lord, the day is ending and I bring it to You — the parts I'm proud of and the parts I regret. Thank You for carrying me through moments I didn't think I could handle. Forgive me where I fell short. As I rest tonight, quiet the voices that replay my failures. Let me sleep in the assurance that tomorrow is not mine to worry about. You are enough. Amen.",
    "Father, as darkness comes, I thank You for the light You gave today. There were moments of grace I almost missed. There were people You placed in my path that I almost walked past. Forgive my blindness. As I close my eyes, I trust that You never close Yours. Watch over my family tonight. Give us rest that restores. Amen.",
    "God, I am tired — not just physically, but in my soul. This day asked more of me than I had to give. But You never run dry. Refill what was emptied today. Heal what was broken. And as I sleep, do the work in me that only rest and Your Spirit can accomplish. I release this day to You. Amen.",
  ],
  "Prayer for Strength": [
    "Lord, I am running on empty and I know it. The weight of what I'm carrying was never meant for my shoulders alone. I confess I've been trying to power through in my own strength, and it's not working. Meet me in this weakness. Be the strength I cannot manufacture. Help me take the next step, even when I cannot see the path. Amen.",
    "Father, there are battles I'm fighting that no one around me can see. The weariness goes deeper than tired muscles — it's in my spirit. But Your Word says Your power is made perfect in weakness. I don't fully understand that, but I'm asking You to prove it in my life today. Carry what I cannot. Amen.",
    "God, I need Your strength for the conversation I don't want to have, the responsibility I didn't choose, and the season that won't seem to end. I'm not asking You to remove the hard thing. I'm asking You to walk with me through it. That has always been enough. Amen.",
  ],
  "Prayer for Guidance": [
    "Lord, I stand at a crossroads and I don't know which way to go. Both paths look uncertain. I've asked for clarity and received silence. But I trust that silence is not absence. Guide me not just with answers, but with peace. Help me move forward even without perfect vision, knowing that You redirect willing feet. Amen.",
    "Father, I have a decision to make and the stakes feel high. I'm afraid of getting it wrong. Remind me that Your sovereignty is bigger than my mistakes. Give me wisdom that goes beyond my own understanding. Surround me with people who will speak truth, not just comfort. And when the path becomes clear, give me the courage to take it. Amen.",
    "God, I don't need to see the whole road. I just need to see the next step. Illuminate it. Help me stop overthinking and start trusting. You have never led me somewhere You couldn't sustain me. I believe that. Help my unbelief. Amen.",
  ],
  "Prayer of Gratitude": [
    "Lord, I pause right now to say thank You — not because everything is perfect, but because You are present. Thank You for the meal I didn't have to worry about. For the people who love me imperfectly but faithfully. For the breath in my lungs and the faith in my heart, fragile as it sometimes feels. You are a good Father. Amen.",
    "Father, forgive me for how quickly I forget Your goodness. I have been so focused on what's missing that I've missed what's already here. Today, I choose gratitude. For health, for family, for Your Word, for the church — broken and beautiful as she is. Let thankfulness be my default, not my afterthought. Amen.",
    "God, everything I have is from You. My talent, my breath, my next heartbeat. I did nothing to earn the grace You give so freely. Let gratitude reshape how I see today — not as a list of problems to solve, but as a gift to steward. Amen.",
  ],
  "Prayer for a Loved One": [
    "Lord, I lift someone I love to You right now — someone who is hurting in ways I cannot fix. You know their name. You know their pain. You know the things they haven't told anyone. Meet them where they are. Don't let them believe the lie that they are alone. Use me if You will, but most of all, use Your Spirit to bring comfort only You can give. Amen.",
    "Father, my heart is heavy for someone I love who has wandered from You. I can't argue them back. I can't love them back hard enough. But You can. Pursue them with the same relentless grace that pursued me. Soften what has hardened. Restore what has been broken. And give me patience while I wait for Your timing. Amen.",
    "God, I pray for my family — for the ones I live with and the ones I carry in my heart. Protect them from the enemy's schemes. Give them courage when they're afraid, hope when they're discouraged, and faith when they doubt. Bind us together with a love that endures. Amen.",
  ],
  "Prayer in Suffering": [
    "Lord, I am in pain and I don't understand why. I have prayed for relief and it hasn't come. I want to trust You, but right now it's hard. I'm not going to pretend this is easy. What I will do is stay. I will stay in Your presence even when Your presence feels absent. Don't let this suffering be wasted. Redeem it for something only You can see. Amen.",
    "Father, I feel like Job — sitting in ashes, wondering what I did wrong. Maybe I did nothing wrong. Maybe this is the mystery of living in a broken world. I don't need an explanation right now. I need Your presence. Sit with me in the silence. Don't let me walk through this alone. Amen.",
    "God, suffering has taught me things comfort never could. It has shown me how fragile I am and how strong You are. I would not have chosen this road, but I will not waste it. Use this season to deepen my compassion, sharpen my faith, and prepare me for what's next. Even here, You are God. Amen.",
  ],
  "Pastoral Prayer": [
    "Lord, I pray for every pastor reading this right now — the ones who preached last Sunday with a broken heart, the ones who counseled someone else's marriage while their own was struggling, the ones who are quietly thinking about quitting. See them. Sustain them. Remind them that the call has not expired, even when the strength has. Surround them with brothers who will carry what they cannot. Amen.",
    "Father, the weight of ministry is real. The loneliness is real. The criticism is real. But so is Your faithfulness. For every shepherd who feels unseen today, let them know that You see. For every leader who feels unqualified, remind them that You don't call the qualified — You qualify the called. Renew their passion for the work. Amen.",
    "God, I pray for the pastor's family — the spouse who shares them with the church, the children who wonder why Dad or Mom is always at the hospital, the marriage that gets the leftovers. Protect what the enemy wants to destroy. Let the pastor's home be a place of rest, not another arena of performance. Amen.",
  ],
};

const TYPES = Object.keys(PRAYERS);

export default function PrayerGenerator() {
  const [selected, setSelected] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const prayer = selected ? PRAYERS[selected][index % PRAYERS[selected].length] : null;

  const handleCopy = () => {
    if (prayer) {
      navigator.clipboard.writeText(prayer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAnother = () => {
    setIndex((i) => i + 1);
    setCopied(false);
  };

  return (
    <Layout>
      <SEOMeta
        title="Prayer Generator — Guided Prayers for Every Occasion"
        description="Find guided prayers for morning, evening, strength, guidance, gratitude, suffering, and pastoral ministry. Theologically rich, personally meaningful."
        keywords="prayer generator, morning prayer, evening prayer, prayer for strength, guided prayer, Christian prayer"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Prayer Generator",
          description: "Guided prayers for every occasion — morning, evening, strength, guidance, and more.",
          url: "https://www.livewellbyjamesbell.co/tools/prayer-generator",
          applicationCategory: "ReligiousApp",
          offers: { "@type": "Offer", price: "0" },
        }}
      />

      <section style={{ background: "var(--forest)", color: "var(--ivory)", padding: "80px 32px 60px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "700px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", fontFamily: "var(--U)", marginBottom: "16px" }}>FREE TOOL</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, fontFamily: "var(--F)", lineHeight: 1.15, marginBottom: "16px" }}>
            Prayer <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Generator</em>
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.7, opacity: 0.85, fontFamily: "var(--B)" }}>
            Select a prayer type and receive a guided prayer you can personalize and make your own.
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 32px", background: "var(--paper)" }}>
        <div className="wrap" style={{ maxWidth: "800px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px", marginBottom: "40px" }}>
            {TYPES.map((type) => (
              <button
                key={type}
                onClick={() => { setSelected(type); setIndex(0); setCopied(false); }}
                style={{
                  padding: "18px 16px",
                  background: selected === type ? "var(--gold)" : "white",
                  color: selected === type ? "var(--ink)" : "var(--ink2)",
                  border: `1px solid ${selected === type ? "var(--gold)" : "var(--border)"}`,
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "var(--U)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "center",
                }}
              >
                <Heart size={18} style={{ display: "block", margin: "0 auto 8px", opacity: 0.6 }} />
                {type}
              </button>
            ))}
          </div>

          {prayer && (
            <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: "12px", padding: "40px 32px", borderTop: "4px solid var(--gold)" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--gold)", fontFamily: "var(--U)", marginBottom: "20px", letterSpacing: "0.1em" }}>
                {selected?.toUpperCase()}
              </div>
              <p style={{ fontSize: "18px", lineHeight: 2, color: "var(--ink)", fontFamily: "var(--B)", fontStyle: "italic" }}>
                {prayer}
              </p>
              <div style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
                <button onClick={handleCopy} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "6px", fontSize: "13px", fontWeight: 600, fontFamily: "var(--U)", color: "var(--ink)", cursor: "pointer" }}>
                  {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy Prayer</>}
                </button>
                <button onClick={handleAnother} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", background: "var(--gold)", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: 600, fontFamily: "var(--U)", color: "var(--ink)", cursor: "pointer" }}>
                  <RefreshCw size={14} /> Another Prayer
                </button>
              </div>
            </div>
          )}

          {!selected && (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--ink3)" }}>
              <Heart size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
              <p style={{ fontFamily: "var(--B)", fontSize: "16px" }}>Select a prayer type above</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
