#!/usr/bin/env python3
import sys, json, os
from PIL import Image, ImageDraw, ImageFont
FD=os.path.join(os.path.dirname(os.path.abspath(__file__)),"fonts")
CREAM=(246,241,231); INK=(26,26,26); MUT=(107,100,86); MUST=(200,150,26); GOLD=(198,148,26); WHITE=(255,255,255); CREAM2=(237,232,220); CRTXT=(205,198,182)
DPI=300; BLEED=0.125; PW=6.0; PH=9.0
def px(i): return round(i*DPI)
def F(n,s): return ImageFont.truetype(f"{FD}/{n}",s)
def wrapt(d,t,f,mw):
    o=[];c=""
    for w in t.split():
        x=(c+" "+w).strip()
        if d.textlength(x,font=f)<=mw:c=x
        else:
            if c:o.append(c)
            c=w
    if c:o.append(c)
    return o
def cb(d,lines,f,cx,y,col,gap,track=0):
    for ln in lines:
        w=(sum(d.textlength(ch,font=f)+track for ch in ln)-track) if track else d.textlength(ln,font=f)
        x=cx-w/2
        if track:
            for ch in ln: d.text((x,y),ch,font=f,fill=col); x+=d.textlength(ch,font=f)+track
        else: d.text((x,y),ln,font=f,fill=col)
        a,de=f.getmetrics(); y+=a+de+gap
    return y
def lblock(d,lines,f,x,y,col,gap):
    for ln in lines:
        d.text((x,y),ln,font=f,fill=col); a,de=f.getmetrics(); y+=a+de+gap
    return y
KICK="LIVEWELL BY JAMES BELL"
def fit_title(d,title,maxw,maxlines=4,start=150,floor=58):
    s=start
    while s>floor:
        f=F("YoungSerif-Regular.ttf",s); ln=wrapt(d,title,f,maxw)
        if len(ln)<=maxlines: return f,ln
        s-=6
    return f,ln

# ---- FRONT STYLES (panel: left/spine edge at x0, right trim at x0+PW) ----
def front(d,x0,cfg):
    cx=x0+px(PW)/2; m=px(0.42); L=x0+m; R=x0+px(PW)-m
    title=cfg["title"].upper() if cfg.get("upper") else cfg["title"]
    style=cfg.get("style","banner")
    Rb=x0+px(PW)+px(BLEED); Tb=-px(BLEED); Bb=px(PH)+px(BLEED)
    if style=="midnight":
        d.rectangle([x0-px(BLEED),Tb,Rb,Bb],fill=INK)
        cb(d,[KICK],F("IBMPlexSerif-Bold.ttf",38),cx,px(0.62),MUST,0,track=12)
        f,ln=fit_title(d,title,px(PW)-2*m-px(0.2)); y=cb(d,ln,f,cx,px(2.1),CREAM,14)
        y+=px(0.16); d.rectangle([cx-px(0.5),y,cx+px(0.5),y+8],fill=MUST); y+=px(0.34)
        if cfg.get("subtitle"): y=cb(d,wrapt(d,cfg["subtitle"],F("InstrumentSerif-Italic.ttf",56),px(PW)-2*m),F("InstrumentSerif-Italic.ttf",56),cx,y,CRTXT,10)
        cb(d,[cfg["author"].upper()],F("IBMPlexSerif-Bold.ttf",58),cx,px(PH)-px(1.0),CREAM,0,track=8)
        d.rectangle([x0+px(0.16),px(0.16),R+px(0.12),px(PH)-px(0.16)],outline=MUST,width=4)
    elif style=="goldband":
        cb(d,[KICK],F("IBMPlexSerif-Bold.ttf",36),cx,px(0.55),MUT,0,track=11)
        d.rectangle([x0-px(BLEED),px(1.6),Rb,px(3.9)],fill=GOLD)
        f,ln=fit_title(d,title,px(PW)-px(0.7)); cb(d,ln,f,cx,px(1.95),INK,12)
        if cfg.get("subtitle"): cb(d,wrapt(d,cfg["subtitle"],F("InstrumentSerif-Italic.ttf",56),px(PW)-px(1.0)),F("InstrumentSerif-Italic.ttf",56),cx,px(4.25),MUT,10)
        cb(d,[cfg["author"].upper()],F("IBMPlexSerif-Bold.ttf",58),cx,px(PH)-px(1.0),INK,0,track=8)
    elif style=="minimal":
        m2=px(0.62); cx=x0+px(PW)/2
        cb(d,[KICK],F("IBMPlexSerif-Bold.ttf",34),cx,px(0.78),MUST,0,track=12)
        d.rectangle([x0+m2,px(1.18),x0+px(PW)-m2,px(1.18)+5],fill=MUST)
        f,ln=fit_title(d,title,px(PW)-2*m2); y=cb(d,ln,f,cx,px(2.7),INK,15)
        y+=px(0.22)
        if cfg.get("subtitle"): cb(d,wrapt(d,cfg["subtitle"],F("InstrumentSerif-Italic.ttf",56),px(PW)-2*m2),F("InstrumentSerif-Italic.ttf",56),cx,y,MUT,9)
        d.rectangle([x0+m2,px(PH)-px(1.32),x0+px(PW)-m2,px(PH)-px(1.32)+5],fill=MUST)
        cb(d,[cfg["author"].upper()],F("IBMPlexSerif-Bold.ttf",54),cx,px(PH)-px(1.1),INK,0,track=9)
    elif style=="split":
        d.rectangle([x0-px(BLEED),Tb,Rb,px(4.95)],fill=INK); d.rectangle([x0-px(BLEED),px(4.95),Rb,px(4.99)],fill=MUST)
        cb(d,[KICK],F("IBMPlexSerif-Bold.ttf",36),cx,px(0.68),MUST,0,track=11)
        f,ln=fit_title(d,title,px(PW)-px(0.8)); cb(d,ln,f,cx,px(2.0),CREAM,12)
        if cfg.get("subtitle"): cb(d,wrapt(d,cfg["subtitle"],F("InstrumentSerif-Italic.ttf",58),px(PW)-px(1.0)),F("InstrumentSerif-Italic.ttf",58),cx,px(5.45),(70,64,52),10)
        cb(d,[cfg["author"].upper()],F("IBMPlexSerif-Bold.ttf",60),cx,px(PH)-px(1.25),INK,0,track=8)
    elif style=="classic":
        d.rectangle([x0-px(BLEED),Tb,Rb,Bb],fill=CREAM2)
        d.rectangle([x0+px(0.18),px(0.18),R+px(0.1),px(PH)-px(0.18)],outline=INK,width=6)
        d.rectangle([x0+px(0.27),px(0.27),R+px(0.01),px(PH)-px(0.27)],outline=MUST,width=2)
        cb(d,[KICK],F("IBMPlexSerif-Bold.ttf",32),cx,px(0.78),MUST,0,track=10)
        cb(d,["• • •"],F("YoungSerif-Regular.ttf",42),cx,px(1.18),MUST,0)
        f,ln=fit_title(d,title,px(PW)-px(1.1)); y=cb(d,ln,f,cx,px(2.35),INK,12); y+=px(0.28)
        if cfg.get("subtitle"): cb(d,wrapt(d,cfg["subtitle"],F("InstrumentSerif-Italic.ttf",54),px(PW)-px(1.3)),F("InstrumentSerif-Italic.ttf",54),cx,y,MUT,8)
        cb(d,["• • •"],F("YoungSerif-Regular.ttf",34),cx,px(PH)-px(1.35),MUST,0)
        cb(d,[cfg["author"].upper()],F("IBMPlexSerif-Bold.ttf",52),cx,px(PH)-px(1.05),INK,0,track=8)
    else: # banner
        d.rectangle([x0-px(BLEED),Tb,Rb,px(1.55)],fill=INK)
        cb(d,[KICK],F("IBMPlexSerif-Bold.ttf",38),cx,px(0.5),MUST,0,track=12)
        f,ln=fit_title(d,title,px(PW)-2*m-px(0.16)); y=cb(d,ln,f,cx,px(2.05),INK,14)
        y+=px(0.16); d.rectangle([cx-px(0.5),y,cx+px(0.5),y+8],fill=MUST); y+=px(0.32)
        if cfg.get("subtitle"): y=cb(d,wrapt(d,cfg["subtitle"],F("InstrumentSerif-Italic.ttf",56),px(PW)-2*m-px(0.4)),F("InstrumentSerif-Italic.ttf",56),cx,y,MUT,10)
        cb(d,[cfg["author"].upper()],F("IBMPlexSerif-Bold.ttf",60),cx,px(PH)-px(1.0),INK,0,track=8)
        d.rectangle([x0+px(0.16),px(1.67),R+px(0.12),px(PH)-px(0.16)],outline=MUST,width=5)

def back(d,x0,cfg):
    cx=x0+px(PW)/2; m=px(0.5); L=x0+m; R=x0+px(PW)-m
    d.rectangle([x0-px(BLEED),-px(BLEED),x0+px(PW)+px(BLEED),px(0.125+1.05)],fill=INK)
    cb(d,[KICK],F("IBMPlexSerif-Bold.ttf",30),cx,px(0.42),MUST,0,track=10)
    y=px(1.5); tf=F("InstrumentSerif-Italic.ttf",62); y=cb(d,wrapt(d,cfg["tagline"],tf,px(PW)-2*m),tf,cx,y,INK,8); y+=px(0.35)
    bf=F("IBMPlexSerif-Regular.ttf",34)
    for para in cfg["blurb"].split("\n"): y=lblock(d,wrapt(d,para,bf,px(PW)-2*m),bf,L,y,(60,55,46),12); y+=px(0.12)
    y=px(PH)-px(2.5); d.rectangle([cx-px(0.4),y,cx+px(0.4),y+5],fill=MUST); y+=px(0.22)
    cb(d,["ABOUT THE AUTHOR"],F("IBMPlexSerif-Bold.ttf",26),cx,y,MUST,0,track=6); y+=px(0.4)
    lblock(d,wrapt(d,cfg["bio"],F("IBMPlexSerif-Regular.ttf",30),px(PW)-2*m),F("IBMPlexSerif-Regular.ttf",30),L,y,(60,55,46),10)
    bw,bh=px(2.0),px(1.2); bx=R-bw; by=px(PH)-px(1.55)
    d.rectangle([bx,by,bx+bw,by+bh],fill=WHITE,outline=(180,180,180),width=3)
    d.text((bx+px(0.15),by+bh-px(0.3)),"ISBN / barcode",font=F("IBMPlexSerif-Regular.ttf",22),fill=(150,150,150))
    d.text((L,px(PH)-px(0.55)),"livewellbyjamesbell.co",font=F("IBMPlexSerif-Italic.ttf",26),fill=MUT)
    d.rectangle([L-px(0.12),px(0.125+0.12),R+px(0.12),px(PH)-px(0.12)],outline=MUST,width=5)

def spine(d,x0,sw,cfg,im):
    if sw<px(0.45): d.rectangle([x0,-px(BLEED),x0+sw,px(PH)+px(BLEED)],fill=INK); return
    d.rectangle([x0,-px(BLEED),x0+sw,px(PH)+px(BLEED)],fill=INK)
    tmp=Image.new("RGBA",(px(PH)-px(1.0),sw),(0,0,0,0)); td=ImageDraw.Draw(tmp)
    tf=F("YoungSerif-Regular.ttf",min(sw-px(0.16),64)); t=cfg["title"]; tw=td.textlength(t,font=tf)
    td.text(((tmp.width-tw)/2,(sw-tf.size)/2-px(0.04)),t,font=tf,fill=CREAM)
    rot=tmp.rotate(90,expand=True); im.paste(rot,(int(x0),int(px(0.5))),rot)

def make(cfg):
    sw=px(cfg["pages"]*0.002252); Wt=px(BLEED*2+PW*2)+sw; Ht=px(PH+BLEED*2)
    im=Image.new("RGB",(Wt,Ht),CREAM); d=ImageDraw.Draw(im)
    back_x=px(BLEED); spine_x=px(BLEED+PW); front_x=px(BLEED+PW)+sw
    back(d,back_x,cfg); spine(d,spine_x,sw,cfg,im); front(d,front_x,cfg)
    os.makedirs(os.path.dirname(cfg["wrapout"]),exist_ok=True)
    im.save(cfg["wrapout"],"PDF",resolution=DPI)
    im.crop((front_x,px(BLEED),front_x+px(PW),px(BLEED)+px(PH))).save(cfg["frontout"],"JPEG",quality=92)
    im.crop((back_x,px(BLEED),back_x+px(PW),px(BLEED)+px(PH))).save(cfg["backout"],"JPEG",quality=92)
    print(f"{cfg['style']:9s} | {cfg['frontout'].split('/')[-1]}")

if __name__=="__main__":
    for cfg in json.load(open(sys.argv[1])): make(cfg)
