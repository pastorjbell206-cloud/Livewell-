# Uploading the whole-site films to YouTube (started 2026-11-27)

James, 2026-11-27, of the 45 finished films not yet on the channel: "Public now".

- Titles: film/youtube/titles-2.json. Descriptions, playlists: film/youtube/build-descriptions-2.py writes metadata-2.json.
- Thumbnails: `node film/tools/thumbs.mjs <slugs>` writes film/out/thumbs/<slug>.jpg (made for all 45).
- Uploaded so far: film/youtube/uploaded-2.json (slug: video id).
- New playlists, Public: "Honest Answers to Hard Questions | LiveWell" (created). Still to create in the upload dialog's "New playlist" the first time each is needed: "Big Ideas of the Bible | Bible Themes Explained", "Bible Verses in Context | LiveWell", "Is the Bible Reliable? | LiveWell", "Church History | LiveWell". Existing: "What Christians Believe | Christian Beliefs Explained", "The Story of the Bible | Bible Overview".

## Stopped by YouTube's limits on 2026-11-27 (about 2 PM Eastern)
- "Daily upload limit reached. You can upload more videos in 24 hours." Only who-made-god went up (Public, Dge7i_BoQaI). The channel had already taken many uploads that day (remakes, trailer, Shorts).
- "Daily custom thumbnail limit reached." who-made-god has YouTube's own frame for now; set its custom thumbnail later.

## The method (Chrome, YouTube Studio tab)
1. Split: film/out/yt-parts2/ holds each MP4 cut with `split -b 10300000` and plan.json (order, part names, sizes), plus md.json (titles, descriptions, playlists).
2. In Studio, run studio-upload-helper.js (in this folder) in the page: it adds a small file input (#lw-part) top-left and window.__lw.
3. Feed md.json into #lw-part with the browser tool's file_upload, then `localStorage.__lwmd = await document.getElementById('lw-part').files[0].text(); __md = JSON.parse(localStorage.__lwmd)`.
4. Per film i (plan.json order): one file_upload per part into #lw-part (the tool takes about 10 MB per call, one part per call), each followed by `__lw.p()`. Then `await __go1(i)` (opens Create > Upload videos, hands the joined file to Studio, sets title, description, not made for kids, playlist) and `await __go2()` (Next x3, Public, Publish, closes the share box). __go1 returns the video id; add it to uploaded-2.json.
5. Thumbnails: put film/out/thumbs/<slug>.jpg into #lw-part and copy it into Studio's #file-loader on the video's edit page (or in the upload dialog), once the daily thumbnail limit allows.
